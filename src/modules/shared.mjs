/* ANALYTICS */
function isProduction() {
  return window.location.hostname === "secure.dol.state.nj.us";
}

export function logEvent(name, parameters) {
  if (window.gtag != null && isProduction()) {
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
  if (isProduction()) {
    const GA4_ID = "G-2F7W0D0NDJ";
    const analyticsScript = document.createElement("script");
    analyticsScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
    document.head.appendChild(analyticsScript);

    const analyticsInit = document.createElement("script");
    analyticsInit.innerHTML = `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${GA4_ID}');`;
    document.head.appendChild(analyticsInit);
  }
}

/* SHARED PAGE UPDATES */
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
  aside.innerHTML = `<a href="${feedbackUrl}" target="_blank" style="font-family: sans-serif; text-decoration: none; color: #ffffff">Give feedback</a>`;
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

export function updateDocument(title) {
  document.title = title;
  document.documentElement.lang = "en";
}

export function styleBody() {
  const bodyStyle = document.body.style;
  bodyStyle.backgroundColor = "#ffffff";
  bodyStyle.fontFamily = "'Public Sans', sans-serif";
  bodyStyle.lineHeight = "16px";
  bodyStyle.lineHeight = "24px";
  bodyStyle.color = "#1C1D1F";
  bodyStyle.padding = "0px";
}

export const ICON_BASE_URL =
  "https://beta.nj.gov/files/tdi-fli-claim-status/assets";

/* GENERAL HELPER FUNCTIONS */
export function getFormattedDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-us", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function partition(array, filter) {
  const pass = [];
  const fail = [];
  array.forEach((e, idx, arr) => (filter(e, idx, arr) ? pass : fail).push(e));
  return [pass, fail];
}

export function html(strings, ...values) {
  return String.raw({ raw: strings }, ...values);
}

export function css(strings, ...values) {
  return String.raw({ raw: strings }, ...values);
}

export function runWhenReady(func) {
  if (document.readyState === "loading") {
    window.addEventListener("DOMContentLoaded", () => {
      func();
    });
  } else {
    func();
  }
}

export function isDesktop() {
  return screen.width > 768;
}

/* CLAIM STATUS DATA PARSERS */
export function getClaimTypeContent(type) {
  return type === "TDI"
    ? "Temporary Disability Insurance (TDI)"
    : type === "FLI"
    ? "Family Leave Insurance (FLI)"
    : type;
}

export function isClaimNotesEmpty(claimNotes) {
  return (
    claimNotes.length === 0 ||
    (claimNotes.length === 1 && claimNotes === "SENT_REQ") ||
    (claimNotes.length === 1 && claimNotes === "14_DAY")
  );
}

export function getClaimStatus(status, claimNotes, claimType) {
  switch (status) {
    case "Eligible":
      return "Approved";
    case "Ineligible":
      if (claimNotes != null && claimNotes[0]?.type === "DDU") {
        return `Transferred to ${
          claimType === "FLI" ? "Family Leave" : "Disability"
        } During Unemployment team`;
      }
      return "Denied";
    case "Undetermined":
      return !isClaimNotesEmpty(claimNotes)
        ? "Information needed"
        : "In progress";
    default:
      return status;
  }
}

export function getParsedClaimNotes(rawClaimNotes) {
  return rawClaimNotes.map((note) => {
    const parsedNote = note.split("was sent to ")[1]?.split(" on ") ?? [];
    const data = {
      type: undefined,
      sentOn: parsedNote[1]?.slice(0, -1), // remove `.` character
      sentTo: parsedNote[0],
    };

    if (note.includes("Error while processing")) {
      data.type = "ERR";
    } else if (note.includes("Private Plan Operations")) {
      data.type = "PRIV";
    } else if (note.includes("Disability During Unemployment")) {
      data.type = "DDU";
    } else if (note.includes("invalid because you did not meet the wage")) {
      data.type = "INVAL_WAGE";
    } else if (
      note.includes("ineligible because you failed") &&
      note.includes("Form C10")
    ) {
      data.type = "INEL_C10";
    } else if (
      note.includes("ineligible because you failed") &&
      note.includes("Form M10")
    ) {
      data.type = "INEL_M10";
    } else if (
      note.includes("ineligible because you failed") &&
      note.includes("additional information and medical certification")
    ) {
      data.type = "INEL_5107";
    } else if (note.includes("A request for information has been mailed")) {
      data.type = "SENT_REQ";
    } else if (note.includes("No decision has been made")) {
      data.type = "14_DAY";
    } else if (
      note.includes("Request to Claimant for Information was sent to")
    ) {
      data.type = "SENT_C10";
    } else if (note.includes("Request for Medical Information was sent to")) {
      data.type = "SENT_Mxx";
    } else if (note.includes("Request for Wage information was sent to")) {
      data.type = "SENT_Exx";
    } else if (
      note.includes(
        "Notice of Required Pursuit of Workers' Compensation Claim was sent to"
      )
    ) {
      data.type = "SENT_W10";
    } else if (
      note.includes("Request to Claimant for Information was generated")
    ) {
      data.type = "GEN_C01";
    } else if (note.includes("Form W01")) {
      data.type = "GEN_W01";
    } else if (note.includes("Form M-01")) {
      data.type = "GEN_M01";
    } else if (note.includes("An Employer Statement")) {
      data.type = "GEN_E01";
    } else {
      data.type = note;
    }

    return data;
  });
}

export function getClaimHandler(seqNum, type, status) {
  return `populateMoreDetail('${seqNum}', '${type}', '${status.charAt(0)}')`;
}

/* HTML COMPONENTS */
export const HEADER_HTML = html`
  <header
    style="padding: 10px 20px; background-color: #000000; color: #ffffff; font-size: 13px; line-height: 150%"
    id="header"
  >
    <div style="margin-bottom:4px">
      <b>New Jersey Department of Labor and Workforce Development</b>
    </div>
    <a
      href="https://www.nj.gov/labor/myleavebenefits/"
      style="text-decoration: underline; color: #ffffff; text-underline-offset: 2px"
      >myLeaveBenefits.nj.gov</a
    >
  </header>
`;

export const FOOTER_HTML = html`
  <footer
    id="helpSection"
    style="
      background-color: #eff6fb;
      padding: 20px ${isDesktop() ? "54px" : "13px"};
      border-top: 1px solid #0b4778;
      color: #000000;
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
      style="display: grid; grid-template-columns: min-content auto; gap: 16px; margin-bottom: 8px"
    >
      <div><img src="${ICON_BASE_URL}/phone.svg" alt="" /></div>
      <div style="line-height: 21px">
        <strong>Call</strong> 609-292-7060 | (8:00am - 4:30pm, Monday - Friday)
        Wait times are shortest Wednesday - Friday
      </div>
      <div><img src="${ICON_BASE_URL}/fax.svg" alt="" /></div>
      <div style="line-height: 21px"><strong>Fax</strong> 609-984-4138</div>
      <div><img src="${ICON_BASE_URL}/mail.svg" alt="" /></div>
      <div style="line-height: 21px">
        <strong>Mail</strong><br />Division of Temporary Disability and Family
        Leave Insurance<br />
        PO Box 387 Trenton, New Jersey 08625-0387
      </div>
      <div><img src="${ICON_BASE_URL}/email.svg" alt="" /></div>
      <div style="line-height: 21px">
        <a
          href="https://www.nj.gov/labor/myleavebenefits/help/contact/contact-form.shtml"
          target="_blank"
          style="text-underline-offset: 2px"
          ><strong>Email</strong></a
        >
      </div>
      <div><img src="${ICON_BASE_URL}/info.svg" alt="" /></div>
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
      8:00am - 4:30pm, Monday - Friday.
    </div>
  </footer>
`;

export const RETURN_TO_TOP_LINK = html`<a
  href="#header"
  style="font-size: 16px; color: #0b4778; text-underline-offset: 2.5px"
  >Return to top</a
>`;

export function getUnstyledButtonHtml(label, onClick) {
  return html` <button
    onClick="${onClick}"
    style="
      background: none;
      border: none;
      padding: 0;
      font: inherit;
      cursor: pointer;
      font-size: 16px;
      color: #0b4778;
      text-decoration: underline;
      display: inline-block;
      text-underline-offset: 2.5px;
      outline-offset: 0.25rem;
    "
  >
    ${label}
  </button>`;
}
