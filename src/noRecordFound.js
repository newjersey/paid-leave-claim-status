import {
  logEvent,
  setupAnalytics,
  updateIcon,
  makeMobileFriendly,
  addFeedbackLink,
  HEADER_HTML,
  isDesktop,
  html,
  styleBody,
  updateDocument,
} from "./modules/shared.mjs";

if (document.readyState === "loading") {
  window.addEventListener("DOMContentLoaded", () => {
    executeOverride();
  });
} else {
  executeOverride();
}

function executeOverride() {
  setupAnalytics();

  try {
    makeMobileFriendly();
    addFeedbackLink();
    styleBody();
    styleRoot();
    styleLogoutButton();
    updateLogo();
    updateIcon();
    updateDocument("No claim on file");
    logEvent("[DOL_DABI] Viewed SSN Not Found page");
  } catch (e) {
    logEvent(
      "[DOL_DABI] Claim List redesign error",
      e instanceof Error ? e.message : "Unknown"
    );
  }
}

function updateLogo() {
  const logo = document.getElementsByTagName("img")[0];
  if (logo != null) {
    logo.src = "https://beta.nj.gov/files/dol_logo.png";
    logo.style.removeProperty("width");
    logo.style.removeProperty("height");
    logo.style.marginLeft = isDesktop() ? "107px" : "18px";
    logo.alt = "Official logo for the New Jersey Department of Labor";
    logo.parentElement.parentElement.removeAttribute("height");
  }
}

function styleLogoutButton() {
  const logoutButton = document.getElementsByName("logout")[0];
  if (logoutButton != null) {
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
}

function getRedesignHtml(status, statusExtra, whatsNext, whatsNextExtra) {
  if (!status || !statusExtra) return "";

  const currentDate = new Date().toLocaleDateString("en-us", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return html`
    <main
      style="margin:0 ${isDesktop()
        ? "107px"
        : "18px"};text-align:left;line-height:150%;margin-top:1.5rem"
    >
      <h1
        style="margin:0;font-size:40px;font-weight:700;margin-top:34px;margin-bottom:36px"
      >
        Welcome
      </h1>
      <div
        style="display:grid;grid-template-columns:${isDesktop()
          ? "1fr 1fr"
          : "1fr"};column-gap: 2rem"
      >
        <div>
          <h2
            style="margin:0;font-size:22px;font-weight:400;margin-bottom:16px"
          >
            Claim status
          </h2>
          <h3
            style="margin:0;font-size:22px;font-weight:700;margin-bottom:36px"
          >
            ${status}
          </h3>
          <p>${statusExtra}</p>
          <p style="font-size:14px;margin-bottom:64px">
            <i>[Current as of ${currentDate}]</i>
          </p>
        </div>
        <div>
          <h2
            style="margin:0;font-size:22px;font-weight:400;margin-bottom:16px"
          >
            What to do next
          </h2>
          ${whatsNext
            ? `<h3 style="margin:0;font-size:22px;font-weight:700;margin-bottom:36px">${whatsNext}</h3>`
            : ""}
          ${whatsNextExtra ? `<div>${whatsNextExtra}</div>` : ""}
        </div>
      </div>
    </main>
  `;
}

function styleRoot() {
  const root = document.getElementsByName("notfound")[0];
  root.children[0].remove(); // Remove extra <br> tag
  root.children[0].children[0].children[0].children[1].remove(); // Remove extra logo
  root.children[0].setAttribute("border", "0");

  const headerRow = document.createElement("tr");
  root.children[0].children[0].prepend(headerRow);
  headerRow.innerHTML = HEADER_HTML;
  headerRow.children[0].style.marginBottom = "52px";

  const status = "No claim on file";
  const statusExtra =
    "We don't have a claim for your account yet. If you recently applied, expect an update within a couple of weeks.";
  const whatsNext = "If you recently applied, don't worry!";
  const whatsNextExtra = `
    <ul style="padding-inline-start:22px;margin-bottom:36px">
      <li>It can take anywhere from a few days (online/fax applications) to two weeks (mail applications) to see your first claim status.</li>
      <li>If you applied online, you can find a summary in your <a href="https://secure.dol.state.nj.us/tdi/caller.aspx?Source=TDI" target="_blank" id="linkClaimDocs">claim documents</a>. If you don't see it, make sure you completed every step of the application, especially if you filled it out before your first day of leave. Check if you have a draft application below:
        <br /><br />
        <a href="https://secure.dol.state.nj.us/tdi/TDI_PndClaim_Intro.aspx" target="_blank" id="linkTdiContinue">Temporary Disability Insurance</a>
        <br />
        <a href="https://secure.dol.state.nj.us/fli/FLI_PndClaim_Intro.aspx" target="_blank" id="linkFliContinue">Family Leave Insurance</a>
      </li>
    </ul>
    <p>
      <b>If you applied more than two weeks ago...</b>
      <br />
      Give us a call: (609) 292-7060. The customer help team is available 8am-4:30pm, Monday-Friday (except holidays). Wait times are currently shortest Wednesday-Friday.
    </p>
    <p><b>Tip</b>: Sometimes we still need to verify your identity before processing your online application (even if it appears in your claim documents). If this is the case, you'll get instructions when you call the customer help team.</p>
  `;
  root.children[0].children[0].children[3].children[0].innerHTML =
    getRedesignHtml(status, statusExtra, whatsNext, whatsNextExtra);

  document.getElementById("linkClaimDocs").addEventListener("click", () => {
    logEvent("[DOL_DABI] Clicked link on SSN Not Found page", {
      object_details: "linkClaimDocs",
    });
  });
  document.getElementById("linkTdiContinue").addEventListener("click", () => {
    logEvent("[DOL_DABI] Clicked link on SSN Not Found page", {
      object_details: "linkTdiContinue",
    });
  });
  document.getElementById("linkFliContinue").addEventListener("click", () => {
    logEvent("[DOL_DABI] Clicked link on SSN Not Found page", {
      object_details: "linkFliContinue",
    });
  });
}
