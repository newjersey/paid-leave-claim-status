import {
  logEvent,
  setupAnalytics,
  updateIcon,
  addFeedbackLink,
  makeMobileFriendly,
  styleBody,
  html,
  HEADER_HTML,
  FOOTER_HTML,
  RETURN_TO_TOP_LINK,
  getClaimTypeContent,
  getClaimStatusContent,
  getFormattedDate,
  getUnstyledButton,
  ICON_BASE_URL,
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
  makeMobileFriendly();

  const { claims, name } = getMetadata();
  removeOldHtml();
  addNewHtml(name, claims);

  styleBody();
  addFeedbackLink();
  updateIcon();
  logView(claims);
  document.title = "Check claim status";
}

function getMetadata() {
  const tableElements = document.getElementsByTagName("table");
  const claims = Array.from(tableElements[2]?.children[0]?.children)
    .slice(1)
    .map((row, i) => ({
      seqNum: row.children[0].innerText.trim(),
      type: row.children[1].innerText.trim(),
      date: row.children[2].innerText.trim(),
      status: row.children[3].innerText.trim(),
    }));
  const name =
    tableElements[1]?.children[0]?.children[0]?.children[0]?.innerText;
  return { claims, name };
}

function removeOldHtml() {
  const root = document.getElementsByName("claimlist")[0]?.children;
  root[3]?.remove();
  root[3]?.remove();
  root[3]?.remove();
}

function addNewHtml(name, claims) {
  const root = document.getElementsByName("claimlist")[0];
  const newContainer = document.createElement("div");
  const [recentClaims, oldClaims] = partition(claims, (e) => {
    const dateObj = new Date(e.date);
    const now = new Date();
    const oneYearAgo = new Date().setFullYear(now.getFullYear() - 1);
    return dateObj > oneYearAgo;
  });

  newContainer.innerHTML = html`${HEADER_HTML}
    <img
      src="https://beta.nj.gov/files/dol_logo.png"
      height="60"
      alt="Official logo for the New Jersey Department of Labor"
      style="margin: 36px 20px 8px"
    />
    <div style="margin: 0 18px">
      <h1
        style="font-weight: 400; line-height: 45px; font-size: 40px; margin: 0 0 36px"
      >
        Hi
        <span style="text-transform: capitalize">${name.toLowerCase()}</span
        >,<br />
        <b>Check all your claims</b>
      </h1>
      <div style="margin-bottom: 52px">
        <h2 style="font-size: 22px; line-height: 32px; margin: 0">Recent</h2>
        <hr
          style="
            margin: 0;
            border: none;
            border-top: 1px solid #dfe1e2;
            margin-bottom: 8px;
          "
        />
        <div
          style="text-transform: uppercase; font-size: 13px; line-height: 16px; margin-bottom: 16px"
        >
          started in the last 12 months
        </div>
        ${recentClaims.length > 0
          ? recentClaims
              .map(
                (claim) => html` <div
                  style="background-color: #fff; border: 1px solid #DFE1E2; border-radius: 4px; padding: 16px 32px 32px; margin-bottom: 8px"
                >
                  <div style="font-size: 22px; line-height: 32px">
                    Claim for ${getClaimTypeContent(claim.type)}
                  </div>
                  <div style="margin-bottom: 16px">
                    Started ${getFormattedDate(claim.date)}
                  </div>
                  ${claim.status === "Undetermined"
                    ? html` <button
                        style="background-color: #0076D6; border: none; color: #fff; padding: 12px 20px; cursor: pointer; border-radius: 4px; font-weight: 700; font-size: 16px; line-height: 24px"
                        onclick="${getClaimHandler(
                          claim.seqNum,
                          claim.type,
                          claim.status
                        )}"
                      >
                        Check claim status
                      </button>`
                    : html`
                        <div
                          style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px"
                        >
                          <img
                            src="${ICON_BASE_URL}/${claim.status === "Eligible"
                              ? "check_circle"
                              : "cancel"}.svg"
                            alt=""
                          />
                          <div
                            style="font-size: 16px; line-height: 24px; font-weight: 700"
                          >
                            ${getClaimStatusContent(claim.status)}
                          </div>
                        </div>
                        ${getUnstyledButton(
                          "View details",
                          getClaimHandler(
                            claim.seqNum,
                            claim.type,
                            claim.status
                          )
                        )}
                      `}
                </div>`
              )
              .join("")
          : html` <div
              style="background-color: #fff; border: 1px solid #DFE1E2; border-radius: 4px; padding: 32px; font-size: 16px; line-height: 24px"
            >
              <b>No recent claims on file.</b> We haven't received a claim from
              you in the past 12 months. If you recently applied, expect an
              update within the next couple weeks.
            </div>`}
      </div>
      ${oldClaims.length > 0
        ? html` <h2 style="font-size: 22px; line-height: 32px; margin: 0">
              Older
            </h2>
            <hr
              style="
                margin: 0;
                border: none;
                border-top: 1px solid #dfe1e2;
                margin-bottom: 8px;
              "
            />
            <div
              style="text-transform: uppercase; font-size: 13px; line-height: 16px; margin-bottom: 16px"
            >
              started more than a year ago
            </div>
            ${oldClaims
              .map(
                (claim) => html`
                  <button
                    style="	background: none;
                      color: inherit;
                      font: inherit;
                      cursor: pointer;
                      outline: inherit; 
                      display: flex;
                      align-items: center;
                      border: 0.5px solid #A9AEB1;
                      padding: 16px 32px;
                      background-color: #fff;
                      border-radius: 4px;
                      gap: 8px;
                      text-align: left;
                      margin-bottom: 8px;
                      width: 100%;
                      justify-content: space-between"
                  >
                    <div>
                      <b>Claim for ${getClaimTypeContent(claim.type)}</b>,
                      started ${getFormattedDate(claim.date)}
                    </div>
                    <img src="${ICON_BASE_URL}/navigate_next.svg" alt="" />
                  </button>
                `
              )
              .join("")}`
        : ""}
      <div style="margin-bottom: 20px; margin-top: 76px">
        ${RETURN_TO_TOP_LINK}
      </div>
    </div>
    ${FOOTER_HTML}`;
  root?.append(newContainer);
}

function partition(array, filter) {
  const pass = [],
    fail = [];
  array.forEach((e, idx, arr) => (filter(e, idx, arr) ? pass : fail).push(e));
  return [pass, fail];
}

function getClaimHandler(seqNum, type, status) {
  return `populateMoreDetail('${seqNum}', '${type}', '${status.charAt(0)}')`;
}

function logView(allClaims) {
  const recentClaims = allClaims
    .map((claim) => claim.date)
    .filter((date) => {
      const dateObj = new Date(date);
      const now = new Date();
      const sixMonthsAgo = new Date().setMonth(now.getMonth() - 6);
      return dateObj > sixMonthsAgo;
    });

  logEvent("[DOL_DABI] Viewed Claim List page", {
    object_status: allClaims.map((claim) => claim.status).join(";"),
    object_type: allClaims.map((claim) => claim.type).join(";"),
    object_details: recentClaims.length,
    event_label: allClaims.length,
  });
}
