function isDesktop() {
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

export function styleLogoutButton() {
  const logoutButton = document.getElementsByName("logout")[0];
  logoutButton.style.backgroundColor = "white";
  logoutButton.style.border = "2px solid #1C1D1F";
  logoutButton.style.borderRadius = "4px";
  logoutButton.style.color = "#1C1D1F";
  logoutButton.style.fontWeight = "bold";
  logoutButton.style.padding = "12px 20px";
  logoutButton.style.width = "100%";
  logoutButton.style.cursor = "pointer";
  logoutButton.style.marginBottom = "2rem";
  logoutButton.innerText = "Log out";
  if (isDesktop()) {
    logoutButton.style.maxWidth = "288px";
  } else {
    logoutButton.parentElement.style.padding = "1rem";
  }
  logoutButton.parentElement.removeAttribute("height");
}

export function styleBody() {
  document.documentElement.lang = "en";
  const bodyStyle = document.body.style;
  bodyStyle.backgroundColor = "#F5F6F7";
  bodyStyle.fontFamily = "'Public Sans', sans-serif";
  bodyStyle.fontSize = "22px";
  bodyStyle.color = "#1C1D1F";
  bodyStyle.padding = "0px";
  bodyStyle.marginBottom = "2rem";
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

export function updateLogo() {
  const logo = document.getElementsByTagName("img")[0];
  logo.src = "https://beta.nj.gov/files/dol_logo.png";
  logo.style.removeProperty("width");
  logo.style.removeProperty("height");
  logo.style.marginLeft = isDesktop() ? "107px" : "18px";
  logo.alt = "Official logo for the New Jersey Department of Labor";
  logo.parentElement.parentElement.removeAttribute("height");
}

export const HEADER_HTML = `
  <header style="padding:12px 18px;background-color:black;color:white;font-size:13px;line-height:150%;margin-bottom:52px">
    <div style="margin-bottom:4px"><b>New Jersey Department of Labor and Workforce Development</b></div>
    <a href="https://www.nj.gov/labor/myleavebenefits/" style="text-decoration:underline;color:white">myLeaveBenefits.nj.gov</a>
  </header>
`;

export function getRedesignHtml(
  status,
  statusExtra,
  whatsNext,
  whatsNextExtra
) {
  if (!status || !statusExtra) return "";

  const currentDate = new Date().toLocaleDateString("en-us", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return `
    <main style="margin:0 ${
      isDesktop() ? "107px" : "18px"
    };text-align:left;line-height:150%;margin-top:1.5rem">
      <h1 style="margin:0;font-size:40px;font-weight:700;margin-top:34px;margin-bottom:36px">Welcome</h1>
      <div style="display:grid;grid-template-columns:${
        isDesktop() ? "1fr 1fr" : "1fr"
      };column-gap: 2rem">
        <div>
          <h2 style="margin:0;font-size:22px;font-weight:400;margin-bottom:16px">Claim status</h2>
          <h3 style="margin:0;font-size:22px;font-weight:700;margin-bottom:36px">${status}</h3>
          <p>${statusExtra}</p>
          <p style="font-size:14px;margin-bottom:64px"><i>[Current as of ${currentDate}]</i></p>
        </div>
        <div>
          <h2 style="margin:0;font-size:22px;font-weight:400;margin-bottom:16px">What to do next</h2>
          ${
            whatsNext
              ? `<h3 style="margin:0;font-size:22px;font-weight:700;margin-bottom:36px">${whatsNext}</h3>`
              : ""
          }
          ${whatsNextExtra ? `<div>${whatsNextExtra}</div>` : ""}
        </div>
      </div>
    </main>
  `;
}
