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
  getClaimStatus,
  getFormattedDate,
  getUnstyledButtonHtml,
  isDesktop,
  partition,
  runWhenReady,
  updateDocument,
  ICON_BASE_URL,
} from "./modules/shared.mjs";

runWhenReady(executeOverride);

function executeOverride() {
  setupAnalytics();

  try {
    makeMobileFriendly();

    const metadata = getMetadata();
    logView(metadata.claims);

    removeOldHtml();
    addNewHtml(metadata);

    styleBody();
    addFeedbackLink();
    updateIcon();
    updateDocument("Check claim status");
  } catch (e) {
    logEvent(
      "[DOL_DABI] Claim List redesign error",
      e instanceof Error ? e.message : "Unknown"
    );
  }
}

function getMetadata() {
  const tableElements = document.getElementsByTagName("table");
  const claimsTable = tableElements[2];
  const claims = Array.from(claimsTable?.rows)
    .slice(1)
    .map((row) => ({
      seqNum: row.children[0].innerText.trim(),
      type: row.children[1].innerText.trim(),
      date: row.children[2].innerText.trim(),
      status: row.children[3].innerText.trim(),
    }));

  const name = tableElements[1]?.rows[0]?.children[0]?.innerText;
  return { claims, name };
}

function removeOldHtml() {
  const rootChildren = document.getElementsByName("claimlist")[0]?.children;
  const numChildren = Array.from(rootChildren).length;
  if (rootChildren != null && numChildren === 6) {
    rootChildren[3]?.remove();
    rootChildren[3]?.remove();
    rootChildren[3]?.remove();
  } else {
    throw new Error(
      `Cannot safely remove old HTML, expected 6 root children, got ${numChildren}`
    );
  }
}

function getClaimHandler(seqNum, type, status) {
  return `populateMoreDetail('${seqNum}', '${type}', '${status.charAt(0)}')`;
}

function addNewHtml(metadata) {
  const { name, claims } = metadata;
  const root = document.getElementsByName("claimlist")[0];
  const newContainer = document.createElement("div");
  const [recentClaims, oldClaims] = partition(claims, (e) => {
    if (!e.date) {
      return true;
    }
    const dateObj = new Date(e.date);
    const now = new Date();
    const oneYearAgo = new Date().setFullYear(now.getFullYear() - 1);
    return dateObj > oneYearAgo;
  });
  const rootMarginX = isDesktop() ? "107px" : "18px";

  newContainer.innerHTML = html`${HEADER_HTML}
    <img
      src="https://beta.nj.gov/files/dol_logo.png"
      height="60"
      alt="Official logo for the New Jersey Department of Labor"
      style="margin-top: 36px; margin-bottom: 8px; margin-left: ${rootMarginX}; margin-right: ${rootMarginX}"
    />
    <div style="margin: 0 ${rootMarginX}">
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
          from last 12 months
        </div>
        ${recentClaims.length > 0
          ? html`<div
              style="${isDesktop()
                ? "display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px"
                : ""}"
            >
              ${recentClaims
                .map(
                  (claim) => html` <div
                    style="background-color: #fff; border: 1px solid #DFE1E2; border-radius: 4px; padding: 16px 32px 32px; margin-bottom: 8px"
                  >
                    <div style="font-size: 22px; line-height: 32px">
                      ${getClaimTypeContent(claim.type)} Claim
                    </div>
                    <div style="margin-top: 4px; margin-bottom: 16px">
                      ${claim.date
                        ? `Leave starting ${getFormattedDate(claim.date)}`
                        : ""}
                    </div>
                    ${claim.status === "Undetermined"
                      ? html` <button
                          style="background-color: #0076D6; border: none; color: #fff; padding: 12px 20px; cursor: pointer; border-radius: 4px; font-weight: 700; font-size: 16px; line-height: 24px; outline-offset: 0.25rem"
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
                              src="${ICON_BASE_URL}/${claim.status ===
                              "Eligible"
                                ? "check_circle"
                                : "cancel"}.svg"
                              alt=""
                            />
                            <div
                              style="font-size: 16px; line-height: 24px; font-weight: 700"
                            >
                              ${getClaimStatus(claim.status)}
                            </div>
                          </div>
                          ${getUnstyledButtonHtml(
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
                .join("")}
            </div>`
          : html` <div
              style="background-color: #fff; border: 1px solid #DFE1E2; border-radius: 4px; padding: 32px; font-size: 16px; line-height: 24px"
            >
              <b>No claim on file.</b> We don't have a recent claim for this
              account. If you recently applied, expect an update within the next
              couple weeks.<br /><br />
              Learn what to do if
              <a
                href="https://www.nj.gov/labor/myleavebenefits/worker/resources/claims-status.shtml#flush-headingFour"
                target="_blank"
              >
                your claim is not on file</a
              >.
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
              from more than 12 months ago
            </div>
            ${oldClaims
              .map(
                (claim) => html`
                  <button
                    style="	background: none;
                      color: inherit;
                      font: inherit;
                      cursor: pointer;
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
                      justify-content: space-between;
                      outline-offset: 0.25rem"
                    onclick="${getClaimHandler(
                      claim.seqNum,
                      claim.type,
                      claim.status
                    )}"
                  >
                    <div>
                      <b>${getClaimTypeContent(claim.type)}</b>${claim.date
                        ? ` - ${getFormattedDate(claim.date)}`
                        : ""}
                    </div>
                    <img src="${ICON_BASE_URL}/navigate_next.svg" alt="" />
                  </button>
                `
              )
              .join("")}`
        : ""}
    </div>
    <div
      style="margin-bottom: 8px; margin-top: 44px; margin-left: ${isDesktop()
        ? "54px"
        : "13px"}; margin-right: ${isDesktop() ? "54px" : "13px"};"
    >
      ${RETURN_TO_TOP_LINK}
    </div>
    ${FOOTER_HTML}`;
  root?.append(newContainer);
}

function logView(allClaims) {
  const now = new Date();
  const sixMonthsAgo = new Date().setMonth(now.getMonth() - 6);
  const recentClaims = allClaims
    .map((claim) => claim.date)
    .filter((date) => {
      const dateObj = new Date(date);
      return dateObj > sixMonthsAgo;
    });

  logEvent("[DOL_DABI] Viewed Claim List page", {
    object_status: allClaims.map((claim) => claim.status).join(";"),
    object_type: allClaims.map((claim) => claim.type).join(";"),
    object_details: recentClaims.length,
    event_label: allClaims.length,
  });
}
