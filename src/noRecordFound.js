import {
  logEvent,
  setupAnalytics,
  updateIcon,
  makeMobileFriendly,
  addFeedbackLink,
  styleBody,
  styleLogoutButton,
  updateLogo,
  HEADER_HTML,
  getRedesignHtml,
} from "./modules/shared.mjs";

if (document.readyState === "loading") {
  window.addEventListener("DOMContentLoaded", () => {
    executeOverride();
  });
} else {
  executeOverride();
}

function executeOverride() {
  updateIcon();
  setupAnalytics();
  makeMobileFriendly();
  addFeedbackLink();
  styleBody();
  styleRoot();
  styleLogoutButton();
  updateLogo();
  logEvent("[DOL_DABI] Viewed SSN Not Found page");
}

function styleRoot() {
  const root = document.getElementsByName("notfound")[0];
  root.children[0].remove(); // Remove extra <br> tag
  root.children[0].children[0].children[0].children[1].remove(); // Remove extra logo
  root.children[0].setAttribute("border", "0");

  const headerRow = document.createElement("tr");
  root.children[0].children[0].prepend(headerRow);
  headerRow.innerHTML = HEADER_HTML;

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

  document.title = status;

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
