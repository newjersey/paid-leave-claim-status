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

export const HEADER_HTML = html`
  <header
    style="padding:12px 18px;background-color:black;color:white;font-size:13px;line-height:150%;margin-bottom:52px"
  >
    <div style="margin-bottom:4px">
      <b>New Jersey Department of Labor and Workforce Development</b>
    </div>
    <a
      href="https://www.nj.gov/labor/myleavebenefits/"
      style="text-decoration:underline;color:white"
      >myLeaveBenefits.nj.gov</a
    >
  </header>
`;
