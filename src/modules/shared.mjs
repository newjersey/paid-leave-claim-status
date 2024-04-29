export function isDesktop() {
  return screen.width > 768;
}

export function logEvent(name, parameters) {
  if (
    window.gtag != null &&
    window.location.hostname === "secure.dol.state.nj.us"
  ) {
    gtag("event", name, parameters);
  } else {
    console.log(
      "In production, the following event would be logged to Google Analytics:",
      {
        name,
        parameters,
      }
    );
  }
}

export function setupAnalytics() {
  if (window.location.hostname === "secure.dol.state.nj.us") {
    const GA4_ID = "G-2F7W0D0NDJ";
    const analyticsScript = document.createElement("script");
    analyticsScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
    document.head.appendChild(analyticsScript);

    const analyticsInit = document.createElement("script");
    analyticsInit.innerHTML = `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${GA4_ID}');`;
    document.head.appendChild(analyticsInit);
  }
}

export const ICON_BASE_URL =
  "https://cdn.jsdelivr.net/npm/@newjersey/njwds@1.0.0/dist/img/usa-icons";

export function updateIcon() {
  let iconLink = document.querySelector("link[rel~='icon']");
  if (iconLink == null) {
    iconLink = document.createElement("link");
    iconLink.rel = "icon";
    document.head.appendChild(iconLink);
  }
  iconLink.href = "https://beta.nj.gov/files/favicon.ico";
}

export function makeMobileFriendly() {
  if (!isDesktop()) {
    const meta = document.createElement("meta");
    meta.name = "viewport";
    meta.content = "width=device-width, initial-scale=1";
    document.getElementsByTagName("head")[0]?.appendChild(meta);

    const images = document.getElementsByTagName("img");
    for (let i = 0; i < images.length; i++) {
      const node = images[i];
      node.style.width = "100%";
      node.style.height = "auto";
    }
  }
}

export function addFeedbackLink() {
  const feedbackUrl = "https://forms.office.com/g/mKz7hjnZ6N";
  const aside = document.createElement("aside");
  aside.innerHTML = `<a href="${feedbackUrl}" target="_blank" style="font-family: sans-serif; text-decoration: none; color: white">Give feedback</a>`;
  aside.style.fontSize = "16px";
  aside.style.lineHeight = "normal";
  aside.style.backgroundColor = "#003366";
  aside.style.padding = "8px 16px";
  aside.style.borderRadius = "4px";
  aside.style.position = "fixed";
  aside.style.top = isDesktop() ? "15%" : "5%";
  aside.style.right = "0px";
  aside.style.transformOrigin = "bottom right";
  aside.style.transform = "rotate(-90deg)";
  document.body.appendChild(aside);
}

// Used for tagged template strings
export function html(strings, ...values) {
  return String.raw({ raw: strings }, ...values);
}

export function js(strings, ...values) {
  return String.raw({ raw: strings }, ...values);
}

export function css(strings, ...values) {
  return String.raw({ raw: strings }, ...values);
}

export const HEADER_HTML = html`
  <header
    style="padding:10px 20px; background-color: black; color:white; font-size: 13px; line-height: 150%"
    id="header"
  >
    <div style="margin-bottom:4px">
      <b>New Jersey Department of Labor and Workforce Development</b>
    </div>
    <a
      href="https://www.nj.gov/labor/myleavebenefits/"
      style="text-decoration: underline; color: white; text-underline-offset: 2px"
      >myLeaveBenefits.nj.gov</a
    >
  </header>
`;

export const FOOTER_HTML = html`
  <footer
    style="
      background-color: #eff6fb;
      padding: 20px 13px;
      border-top: 1px solid #0b4778;
      color: black;
    "
  >
    <h3
      style="
        margin: 0;
        font-size: 22px;
        line-height: 32px;
        margin-bottom: 8px;
      "
    >
      Need help?
    </h3>
    <div
      style="display: flex; align-items: start; gap: 16px; margin-bottom: 8px"
    >
      <img src="${ICON_BASE_URL}/phone.svg" alt="" />
      <div style="line-height: 21px">
        <strong>Call</strong> 609-292-7060 | (8:00am - 4:30pm, Monday - Friday)
        Wait times are shortest Wednesday- Friday
      </div>
    </div>
    <div
      style="
        display: flex;
        align-items: center;
        gap: 16px;
        margin-bottom: 8px;
      "
    >
      <img src="${ICON_BASE_URL}/fax.svg" alt="" />
      <div style="line-height: 21px"><strong>Fax</strong> 609-984-4138</div>
    </div>
    <div
      style="display: flex; align-items: start; gap: 16px; margin-bottom: 8px"
    >
      <img src="./assets/mail.svg" alt="" />
      <div style="line-height: 21px">
        <strong>Mail</strong><br />Division of Temporary Disability and Family
        Leave Insurance<br />
        PO Box 387 Trenton, New Jersey 08625-0387
      </div>
    </div>
    <div
      style="
        display: flex;
        align-items: center;
        gap: 16px;
        margin-bottom: 8px;
      "
    >
      <img src="${ICON_BASE_URL}/mail.svg" alt="" />
      <div style="line-height: 21px">
        <a
          href="https://www.nj.gov/labor/myleavebenefits/help/contact/contact-form.shtml"
          target="_blank"
          style="text-underline-offset: 2px"
          ><strong>Email</strong></a
        >
      </div>
    </div>
    <div
      style="
        display: flex;
        align-items: center;
        gap: 16px;
        margin-bottom: 24px;
      "
    >
      <img src="${ICON_BASE_URL}/info.svg" alt="" />
      <div style="line-height: 21px">
        <a
          href="https://www.nj.gov/labor/myleavebenefits/worker/resources/"
          target="_blank"
          style="text-underline-offset: 2px"
          ><strong>Helpful resources</strong></a
        >
      </div>
    </div>
    <div>
      Due to technical constraints, you can access this claim status checker
      8:00am - 4:30pm, Monday - Friday
    </div>
  </footer>
`;

export function styleBody() {
  document.documentElement.lang = "en";
  const bodyStyle = document.body.style;
  bodyStyle.backgroundColor = "#F5F6F7";
  bodyStyle.fontFamily = "'Public Sans', sans-serif";
  bodyStyle.lineHeight = "16px";
  bodyStyle.lineHeight = "24px";
  bodyStyle.color = "#1C1D1F";
  bodyStyle.padding = "0px";
}

export function getClaimTypeContent(type) {
  return type === "TDI"
    ? "Temporary Disability Insurance (TDI)"
    : type === "FLI"
    ? "Family Leave Insurance (FLI)"
    : type;
}

export function getClaimStatusContent(status) {
  switch (status) {
    case "Eligible":
      return "Approved";
    case "Ineligible":
      return "Denied";
    case "Undetermined":
      return "Information needed";
    default:
      return status;
  }
}

export function getUnstyledButton(label, onClick) {
  return html` <button
    onClick="${onClick}"
    style="
      background: none;
      border: none;
      padding: 0;
      font: inherit;
      outline: inherit;
      cursor: pointer;
      font-size: 16px;
      color: #0b4778;
      text-decoration: underline;
      display: inline-block;
      text-underline-offset: 2.5px;
    "
  >
    ${label}
  </button>`;
}

export const RETURN_TO_TOP_LINK = html`<a
  href="#header"
  style="font-size: 16px; color: #0b4778; text-underline-offset: 2.5px"
  >Return to top</a
>`;

export function getStatusAlert(status) {
  let color = "";
  let borderColor = "";
  let icon = "";

  switch (status) {
    case "Information needed":
      color = "#FAF3D1";
      borderColor = "#FFBE2E";
      icon = "warning";
      break;
    case "Denied":
      color = "#F4E3DB";
      borderColor = "#D54309";
      icon = "info";
      break;
    case "Approved":
      color = "#ECF3EC";
      borderColor = "#00A91C";
      icon = "check_circle";
      break;
    case "In progress":
    default:
      color = "#E7F6F8";
      borderColor = "#00BDE3";
      icon = "info";
      break;
  }

  return html` <div
    style="border-left: 8px solid ${borderColor}; background-color: ${color}; padding: 8px 16px 8px 14px; display: flex; align-items: center; gap: 14px"
  >
    <img src="${ICON_BASE_URL}/${icon}.svg" alt="" />
    <div>${status}</div>
  </div>`;
}

export function getFormattedDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-us", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
