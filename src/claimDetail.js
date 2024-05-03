import {
  logEvent,
  setupAnalytics,
  updateIcon,
  addFeedbackLink,
  html,
  makeMobileFriendly,
  styleBody,
  HEADER_HTML,
  FOOTER_HTML,
  RETURN_TO_TOP_LINK,
  getClaimTypeContent,
  getUnstyledButtonHtml,
  getFormattedDate,
  css,
  getClaimStatus,
  isClaimNotesEmpty,
  getParsedClaimNotes,
  isDesktop,
  runWhenReady,
  updateDocument,
} from "./modules/shared.mjs";
import { Accordion } from "./modules/Accordion.mjs";

runWhenReady(executeOverride);

function executeOverride() {
  setupAnalytics();

  try {
    makeMobileFriendly();

    const metadata = getMetadata();
    logView(metadata);

    removeOldHtml();
    addHeadStyling();
    addNewHtml(metadata);

    styleBody();
    addFeedbackLink();
    updateIcon();
    updateDocument("Claim status details");
  } catch (e) {
    logEvent(
      "[DOL_DABI] Claim List redesign error",
      e instanceof Error ? e.message : "Unknown"
    );
  }
}

function getMetadata() {
  const baseChildren = document.getElementById("AutoNumber2")?.rows ?? [];
  const fullName =
    baseChildren[1]?.children[0]?.children[0]?.innerText.toLowerCase();
  const claimType = baseChildren[4]?.children[0]?.innerText
    .split(":")[1]
    ?.trim();
  const claimStatus = baseChildren[10]?.children[0]?.innerText
    .split(":")[1]
    ?.trim();
  const claimNotes =
    baseChildren[11]?.children[0]?.children[0]?.children[0]?.children[0]?.children[2]?.innerText
      .trim()
      .split("\n")
      .filter(
        (line) =>
          line.length > 0 &&
          !line.startsWith("As soon as this information is received your claim")
      );
  const claimDate = baseChildren[8]?.children[0]?.innerText.trim();
  const receivedDate = baseChildren[8]?.children[2]?.innerText;

  const eligibleColumns = Array.from(
    document.getElementsByClassName("tableBA")
  ).map((column) => column.innerText.trim());

  return {
    fullName,
    claimType,
    claimStatus,
    claimNotes,
    receivedDate,
    claimDate,
    avgWeeklyWage: eligibleColumns[0],
    weeklyBenefitRate: eligibleColumns[1],
    maxBenefitAmount: eligibleColumns[2],
    paidYearToDate: eligibleColumns[3],
    balanceRemaining: eligibleColumns[4],
    lastDayPaid: eligibleColumns[5],
    claimEndDate: eligibleColumns[6],
    nextPayDate: eligibleColumns[7],
  };
}

function getStepsHtml(contentList) {
  return html`<div style="margin-top: 12px">
    <h3 style="font-size: 16px; line-height: 24px; margin: 0">
      Steps to complete
    </h3>
    <ul
      style="padding-inline-start: 25px; margin-block-start: 0.5em; margin-block-end: 0.5em"
    >
      ${contentList.map((item) => html`<li>${item}</li>`).join("")}
    </ul>
  </div>`;
}

function getStatusAlertHtml(status) {
  let color = "";
  let borderColor = "";
  let icon = "";

  switch (status) {
    case "Information needed":
    case "Transferred to Disability During Unemployment team":
    case "Transferred to Family Leave During Unemployment team":
      color = "#FAF3D1";
      borderColor = "#FFBE2E";
      icon = "warning";
      break;
    case "Denied":
      color = "#F4E3DB";
      borderColor = "#D54309";
      icon = "cancel";
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
    <img src="./assets/${icon}.svg" alt="" />
    <div>${status}</div>
  </div>`;
}

function getStatusBodyHtml(
  newStatus,
  claimNotes,
  claimType,
  receivedDate,
  nextPayDate,
  weeklyBenefitRate,
  balanceRemaining,
  claimEndDate,
  lastDayPaid
) {
  if (newStatus === "In progress") {
    return getStepsHtml(["There's no action for you to take."]);
  } else if (newStatus === "Information needed") {
    return claimNotes
      .map((note, idx) => {
        let title = "";
        let body = "";

        const onlineResponseDate = new Date(receivedDate);
        onlineResponseDate.setDate(onlineResponseDate.getDate() + 14);
        const onlineResponseDateFormatted =
          getFormattedDate(onlineResponseDate);

        const mailDate = new Date(note.sentOn);
        const mailDateFormatted = getFormattedDate(mailDate);

        const mailBackDate = new Date(mailDate.getTime());
        mailBackDate.setDate(mailBackDate.getDate() + 14);
        const mailBackDateFormatted = getFormattedDate(mailBackDate);

        const mailExpectedDate = new Date(mailDate.getTime());
        mailExpectedDate.setDate(mailExpectedDate.getDate() + 10);
        const mailExpectedDateFormatted = getFormattedDate(mailExpectedDate);

        const claimDocsUrl = `https://secure.dol.state.nj.us/tdi/caller.aspx?Source=${claimType}`;
        const claimNumberContent = `${idx} of ${claimNotes.length - 1}`;

        switch (note.type) {
          case "GEN_C01":
            title = "Missing claimant information";
            body = html`<div>
              To process your claim, we need claimant information from you.<br /><br />
              <b>Steps to complete</b>
              <ul
                style="padding-inline-start: 20px; margin-block-start: 0; margin-block-end: 0"
              >
                <li>
                  Download and print the document under "Claimant Information
                  Forms" in your
                  <a href="${claimDocsUrl}" target="_blank">claim documents</a>.
                  This document lists all the information we need.
                </li>
                <li>
                  Make sure you complete the form, and fax or mail it to us by
                  <b>${onlineResponseDateFormatted}</b> so your claim isn't
                  delayed or denied.
                </li>
              </ul>
            </div>`;
            break;
          case "GEN_M01":
            title = "Missing medical information";
            body = html`<div>
              To process your claim, we need a medical certificate from your
              doctor (or
              <a
                href="https://www.nj.gov/labor/myleavebenefits/worker/resources/approvedmedicalpractitioners.shtml"
                target="_blank"
                >other approved medical provider</a
              >) to review your claim.<br /><br />
              <b>Steps to complete</b>
              <ul
                style="padding-inline-start: 20px; margin-block-start: 0; margin-block-end: 0"
              >
                <li>
                  Share the medical certificate instructions with your doctor.
                  The document is listed under "Medical Certificate
                  Instructions" in
                  <a href="${claimDocsUrl}" target="_blank">claim documents</a>.
                </li>
                <li>
                  Make sure your doctor completes this step by
                  <b>${onlineResponseDateFormatted}</b> so your claim isn't
                  delayed or denied. To confirm we received it, check under
                  "Medical Summary" in your
                  <a href="${claimDocsUrl}" target="_blank">claim documents</a>.
                </li>
              </ul>
            </div>`;
            break;
          case "GEN_W01":
            title = "Missing workers' compensation information";
            body = html`<div>
              To process your claim, we need workers' compensation information
              from you.<br /><br />
              <b>Steps to complete</b>
              <ul
                style="padding-inline-start: 20px; margin-block-start: 0; margin-block-end: 0"
              >
                <li>
                  Download and print the document under "Claimant Information
                  Forms" in your
                  <a href="${claimDocsUrl}" target="_blank">claim documents</a>.
                  This document lists all the information we need.
                </li>
                <li>
                  Make sure you complete the form, and fax or mail it to us by
                  <b>${onlineResponseDateFormatted}</b> so your claim isn't
                  delayed or denied.
                </li>
              </ul>
            </div>`;
            break;
          case "SENT_C10":
            title = "Missing claimant information";
            body = html`<div>
              To process your claim, we need claimant information from you. On
              ${mailDateFormatted}, we mailed a Request to Claimant for
              Information (C10) to ${note.sentTo}.<br /><br />
              <b>Steps to complete</b>
              <ul
                style="padding-inline-start: 20px; margin-block-start: 0; margin-block-end: 0"
              >
                <li>
                  Check your mail for a letter from us, mailed on
                  ${mailDateFormatted}.
                </li>
                <li>
                  Follow the instructions on the form and respond by
                  <b>${mailBackDateFormatted}</b> so your claim isn't delayed or
                  denied.
                </li>
                <li>
                  If you haven't received anything by
                  <b>${mailExpectedDateFormatted}</b>, reach out to our
                  <a href="#helpSection" style="text-underline-offset: 2.5px"
                    >customer help team</a
                  >.
                </li>
              </ul>
            </div>`;
            break;
          case "SENT_Mxx":
            title = "Missing medical information";
            body = html`<div>
              To process your claim, we need a medical certificate from your
              doctor (or
              <a
                href="https://www.nj.gov/labor/myleavebenefits/worker/resources/approvedmedicalpractitioners.shtml"
                target="_blank"
                >other approved medical provider</a
              >). On ${mailDateFormatted}, we mailed a Request for Medical
              Information (M10 or M20) to ${note.sentTo}.<br /><br />
              <b>Steps to complete</b>
              <ul
                style="padding-inline-start: 20px; margin-block-start: 0; margin-block-end: 0"
              >
                <li>
                  Share the medical form (M10 or M20) with your doctor. Once
                  it's complete, make sure you or your doctor send it to us by
                  <b>${mailBackDateFormatted}</b> so your claim isn't delayed or
                  denied.
                </li>
              </ul>
            </div>`;
            break;
          case "SENT_W10":
            title = "Missing workers' compensation information";
            body = html`<div>
              To process your claim, we need workers' compensation information
              from you. On ${mailDateFormatted}, we mailed a Notice of Required
              Pursuit of Workers' Compensation Claim (W10) to ${note.sentTo}.
              <br /><br />
              <b>Steps to complete</b>
              <ul
                style="padding-inline-start: 20px; margin-block-start: 0; margin-block-end: 0"
              >
                <li>
                  Check your mail for a letter from us, mailed on
                  ${mailDateFormatted}.
                </li>
                <li>
                  Follow the instructions on the form and respond by
                  <b>${mailBackDateFormatted}</b>.
                </li>
                <li>
                  If you haven't received anything by
                  <b>${mailExpectedDateFormatted}</b>, reach out to our
                  <a href="#helpSection" style="text-underline-offset: 2.5px"
                    >customer help team</a
                  >.
                </li>
              </ul>
            </div>`;
            break;
          case "SENT_Exx":
            title = "Missing wage information";
            body = html`<div>
              To process your claim, we need wage information from your
              employer. On ${mailDateFormatted}, we mailed a Request for Wage
              Information (E10) to ${note.sentTo}.
              <br /><br />
              In some cases, we need employment information from you, too. If
              so, we mailed it to you on the same date, ${mailDateFormatted}.
              <br /><br />
              <b>Steps to complete</b>
              <ul
                style="padding-inline-start: 20px; margin-block-start: 0; margin-block-end: 0"
              >
                <li>
                  Check your mail for a letter called Claimant's Affidavit of
                  Employment and Wages (C10) that we may have sent on
                  ${mailDateFormatted}. If so, follow the instructions on the
                  form and respond by <b>${mailBackDateFormatted}</b> so your
                  claim isn't delayed or denied.
                </li>
              </ul>
            </div>`;
            break;
          case "SENT_REQ":
          case "":
          case undefined:
          default:
            return "";
        }
        return html`<div style="margin: 8px 0">
          <h3 class="accordion-header" data-log-key="${note.type}">
            <button
              type="button"
              aria-expanded="false"
              class="accordion-trigger"
              aria-controls="sect${idx}"
              id="accordion${idx}id"
            >
              <div class="accordion-title">
                ${title} (${claimNumberContent})
              </div>
              <div>
                <img
                  class="accordion-icon"
                  src="./assets/add.svg"
                  alt="See more"
                />
              </div>
            </button>
          </h3>
          <div
            id="sect${idx}"
            role="region"
            aria-labelledby="accordion${idx}id"
            class="accordion-panel"
            hidden=""
          >
            ${body}
          </div>
        </div>`;
      })
      .join("");
  } else if (newStatus === "Approved") {
    let description = "";
    if (nextPayDate) {
      description = html`Your next payment is scheduled for
        <b>${getFormattedDate(nextPayDate)}</b>, and arrives on your benefits
        debit card about 2 business days later.<br /><br />
        For a detailed breakdown,<br />
        <button
          style="background-color: #0076D6; border: none; color: #fff; padding: 12px 20px; cursor: pointer; border-radius: 4px; font-weight: 700; font-size: 16px; line-height: 24px; margin-top: 16px; outline-offset: 0.25rem"
          onclick="paymentDetail()"
        >
          Go to payment information
        </button>`;
    } else {
      description = "Your payment is still processing.";
    }
    return html`<div style="margin-top: 8px">
      ${description}
      <div
        style="border: 0.5px solid #71767A; border-radius: 5px; padding: 16px 20px; margin-top: 16px"
      >
        <div style="margin-bottom: 12px"><b>My benefits package</b></div>
        <div style="margin-bottom: 12px">
          Weekly benefit rate
          <span
            style="color: #0076D6; font-weight: 700; font-size: 22px; line-height: 32px; display: block"
            >${weeklyBenefitRate}</span
          >
        </div>
        ${lastDayPaid
          ? html`<div style="margin-bottom: 12px">
              Paid through date
              <span
                style="font-weight: 700; font-size: 22px; line-height: 32px; display: block"
                >${getFormattedDate(lastDayPaid)}</span
              >
            </div>`
          : ""}
        <div style="margin-bottom: 12px">
          Balance remaining
          <span
            style="color: #0076D6; font-weight: 700; font-size: 22px; line-height: 32px; display: block"
            >${balanceRemaining}</span
          >
        </div>
        ${claimEndDate
          ? html`<div>
              Claim end date
              <span
                style="font-weight: 700; font-size: 22px; line-height: 32px; display: block"
                >${getFormattedDate(claimEndDate)}</span
              >
            </div>`
          : ""}
      </div>
    </div>`;
  } else if (newStatus === "Denied") {
    const noteType = claimNotes[0]?.type;
    let content = undefined;

    switch (noteType) {
      case "PRIV":
        content = html`
          Your employer has a private plan, so you don't qualify for State
          benefits, but you may be eligible through your employer.
          <a
            href="https://njdol.prod.simpligov.com/prod/portal/ShowWorkFlow/AnonymousEmbed/70aee173-1831-4223-baa5-891c20e10b39"
            target="_blank"
            >Reach out to our private plan team</a
          >
          for next steps and help applying through your employer.
        `;
        break;
      case "INVAL_WAGE":
        content = html`It looks like you didn't meet the wage requirement to
          qualify for benefits. You can find this year's earnings requirement on
          <a href="http://myleavebenefits.nj.gov" target="_blank"
            >myleavebenefits.nj.gov</a
          >. <br /><br />Check your mail for a denial letter, which includes
          more details about why you were denied, and how to appeal. `;
        break;
      case "INEL_M10":
        content = html`
          Your claim for benefits is currently <b>denied</b>. We didn't receive
          your medical information (Form M10 or M20) requested during our
          review.
          ${getStepsHtml([
            "Check your denial letter for more information about what was missing. You can also look for the Request for Medical Information (M10 or M20), sent earlier.",
            "You or your doctor need to <b>mail or fax</b> the missing information to us to continue your claim. It can take 6 weeks or longer for us to review your claim again.",
          ])}
        `;
        break;
      case "INEL_C10":
        content = html`
          Your claim for benefits is currently <b>denied</b>. We didn't receive
          your claimant information (Form C10) requested during our review.
          ${getStepsHtml([
            "Check your denial letter for more information about what was missing. You can also look for the Request for Claimant Information (C10) sent earlier.",
            "<b>Mail or fax</b> the missing information to us to continue your claim. It can take several weeks for us to review your claim again.",
          ])}
        `;
        break;
      case "INEL_5107":
        content = html`Your claim for benefits is currently <b>denied</b>. We
          didn't receive claimant information (Form C10) and medical information
          (Form M10 or M20) requested during our review.
          ${getStepsHtml([
            "Check your denial letter for more information about what was missing. You can also look for the Request for Medical Information (M10 or M20) and Request for Claimant Information (C10) sent earlier.",
            "<b>Mail or fax</b> the missing information to us to continue your claim. It can take 6 weeks or longer for us to review your claim again.",
          ])}`;
        break;
      case undefined:
      case "":
        content = html`Your claim for benefits is currently denied. Check your
        mail for a denial letter, which includes more details about why you were
        denied, and how to appeal.`;
        break;
    }

    return content != null
      ? html`<div style="margin-top: 8px">${content}</div>`
      : "";
  } else if (newStatus.startsWith("Transferred")) {
    const leaveType = claimType === "FLI" ? "Family Leave" : "Disability";
    const linkUrl =
      claimType === "FLI"
        ? "https://www.nj.gov/labor/myleavebenefits/worker/resources/FLDU_2020.shtml"
        : "https://nj.gov/labor/myleavebenefits/worker/resources/DDU_2020.shtml";
    return html`<div style="margin-top: 8px">Your claim was sent to our ${leaveType} During
        Unemployment team for review. Please contact that office at (609)
        292-3842 for more information, or visit:
        <a
          href="${linkUrl}"
          target="_blank"
          >${leaveType} During Unemployment</a>. You likely won't see any further
          updates about your claim here.
        </a></div>`;
  } else {
    return "";
  }
}

function getWhatsNextHtml(claimStatus, claimNotes, nextPayDate) {
  let listEls = undefined;

  if (claimStatus === "Undetermined") {
    if (isClaimNotesEmpty(claimNotes)) {
      listEls = html`<li>We'll review your claim.</li>
        <li>
          We'll notify you of important status updates here and by mail. It can
          take a number of weeks for a decision or status change depending on
          the volume of claims.
        </li>`;
    } else {
      listEls = html`<li>
          After we receive the information, we'll continue reviewing your claim.
        </li>
        <li>
          Your status may show "information needed" for a few weeks after we
          receive your document, while review is in progress.
        </li>
        <li>
          We'll update your status when your claim is approved or denied.
        </li>`;
    }
  } else if (claimStatus === "Eligible") {
    if (!nextPayDate) {
      listEls = html`<li>
          Payment is usually sent to your benefits debit card a few days after
          you're approved.
          <a
            href="https://www.nj.gov/labor/myleavebenefits/labor/myleavebenefits/worker/resources/debitcard.shtml"
            target="_blank"
            >Learn more about how you'll get paid.</a
          >
        </li>
        <li>
          Payments are sent biweekly. There's an initial
          <a
            href="https://www.nj.gov/labor/myleavebenefits/worker/resources/waiting-week.shtml"
            target="_blank"
            >waiting week</a
          >, which is sent as back pay after your 22nd day of TDI benefits paid.
        </li> `;
    } else {
      listEls = html`<li>
        You'll keep getting paid. We'll post here if anything changes.
      </li>`;
    }
  }

  return listEls;
}

function addHeadStyling() {
  const style = document.createElement("style");
  style.textContent = css`
    .progress-bar li {
      display: flex;
    }
    .progress-bar .circle {
      position: relative;
    }
    .progress-bar .circle::after {
      content: "";
      position: absolute;
      z-index: 2;
      right: 0;
      top: 0;
      transform: translateX(56%);
      border-radius: 50%;
      background-color: #dfe1e2;
      width: 22px;
      height: 22px;
      border: 2px solid #8d9297;
    }
    .progress-bar .circle.complete::after {
      background-color: #0076d6;
      border-color: #0076d6;
    }
    .progress-bar .circle.current::after {
      background-color: #ffffff;
      border-color: #0076d6;
    }
    .progress-bar span {
      padding: 0.2em 1.5em 1.5em 1.5em;
      position: relative;
    }
    .progress-bar span::before {
      content: "";
      position: absolute;
      z-index: 1;
      left: 0;
      height: 100%;
      border-left: 3.2px #8d9297 dotted;
    }
    .progress-bar span.complete,
    .progress-bar span.current {
      font-weight: bold;
    }
    .progress-bar span.received {
      font-weight: normal;
    }
    .progress-bar span.complete::before {
      border-left-width: 2.5px;
      border-left-color: #0076d6;
      border-left-style: solid;
    }
    .progress-bar span.end::before {
      border: none;
    }
    .accordion-header {
      margin: 0;
    }
    .accordion-trigger {
      background: none;
      display: flex;
      align-items: center;
      margin: 0;
      gap: 16px;
      padding: 16px 20px;
      justify-content: space-between;
      position: relative;
      text-align: left;
      width: 100%;
      cursor: pointer;
      border: 0.5px solid #a9aeb1;
      border-radius: 5px;
      outline-offset: 0.25rem;
    }
    .accordion-title {
      font-weight: 700;
      font-size: 16px;
      line-height: 18px;
    }
    .accordion-panel {
      padding: 19px 32px 16px;
      border: 0.5px solid #a9aeb1;
      border-radius: 5px;
      border-top: none;
      border-top-left-radius: 0px;
      border-top-right-radius: 0px;
      transform: translateY(-3px);
    }
  `;
  document.head.appendChild(style);
}

function removeOldHtml() {
  const rootChildren = document.getElementsByName("dabiDetail")[0]?.children;
  const numChildren = Array.from(rootChildren).length;
  if (rootChildren != null && numChildren === 5) {
    rootChildren[2]?.remove();
    rootChildren[2]?.remove();
    rootChildren[2]?.remove();
  } else {
    throw new Error(
      `Cannot safely remove old HTML, expected 5 root children, got ${numChildren}`
    );
  }
}

function addNewHtml(metadata) {
  const {
    claimType,
    claimStatus,
    claimNotes: rawClaimNotes,
    receivedDate,
    claimDate,
    nextPayDate,
    weeklyBenefitRate,
    balanceRemaining,
    claimEndDate,
    lastDayPaid,
  } = metadata;
  const claimNotes = getParsedClaimNotes(rawClaimNotes);

  const root = document.getElementsByName("dabiDetail")[0];
  const newContainer = document.createElement("div");
  const whatsNextContent = getWhatsNextHtml(
    claimStatus,
    claimNotes,
    nextPayDate
  );
  const newStatus = getClaimStatus(claimStatus, claimNotes, claimType);
  const rootMarginX = isDesktop() ? "107px" : "20px";

  newContainer.innerHTML = html`${HEADER_HTML}
    <div
      style="display: flex; align-items: center; margin-top: 4px; margin-left: ${rootMarginX}; margin-right: ${rootMarginX}; margin-bottom: 16px; line-height: 26px"
    >
      ${getUnstyledButtonHtml("All claims", "claimList()")}
      <img src="./assets/arrow.svg" alt="Right arrow" />
      <div style="display: inline-block"><b>Status</b></div>
    </div>
    <div
      style="display: flex; justify-content: flex-end; margin-top: 0; margin-left: ${rootMarginX}; margin-right: ${rootMarginX}; margin-bottom: 0"
    >
      <button
        onClick="userLogout()"
        style="
          background: none;
          font: inherit;
          cursor: pointer;
          border: 2px solid #0b4778;
          border-radius: 4px;
          padding: 12px 10.5px;
          font-size: 16px;
          font-weight: bold;
          color: #0b4778;
          background-color: #ffffff;
          display: flex;
          align-items: center;
          gap: 6px;
          outline-offset: 0.25rem;
        "
      >
        <img src="./assets/logout.svg" alt="" />
        <span>Log out</span>
      </button>
    </div>
    <div
      style="margin-top: 16px; margin-left: ${rootMarginX}; margin-right: ${rootMarginX}; margin-bottom: 44px"
    >
      <h1 style="margin: 0 0 8px; font-size: 32px; line-height: 40px">
        Status
      </h1>
      <div style="font-size: 22px; line-height: 32px; margin-bottom: 44px">
        Claim for ${getClaimTypeContent(claimType)}, starting
        ${getFormattedDate(claimDate)}
      </div>
    </div>
    <div
      style="${isDesktop()
        ? "display: grid; grid-template-columns: 1fr 2fr; gap: 20px; margin-left: 107px; margin-right: 107px"
        : ""}"
    >
      <div
        style="margin-top: 0px;  ${isDesktop()
          ? ""
          : "margin-left: 20px; margin-right: 20px;"} margin-bottom: 28px"
      >
        <ul
          style="padding-inline-start: 12px; ${isDesktop()
            ? "margin-block-start: 0px"
            : ""}"
          class="progress-bar"
        >
          <li>
            <div class="circle complete"></div>
            <span class="complete received"
              ><b>Received</b> ${getFormattedDate(receivedDate)}</span
            >
          </li>
          <li>
            <div
              class="circle ${claimStatus === "Undetermined"
                ? "current"
                : "complete"}"
            ></div>
            <span
              class="${claimStatus === "Undetermined" ? "current" : "complete"}"
              >Review</span
            >
          </li>
          <li>
            <div
              class="circle ${claimStatus === "Undetermined" ? "" : "complete"}"
            ></div>
            <span
              class="${claimStatus === "Undetermined"
                ? ""
                : "complete"} ${claimStatus === "Ineligible" ? "end" : ""}"
              >Decision</span
            >
          </li>
          ${claimStatus === "Ineligible"
            ? ""
            : html`<li>
                <div
                  class="circle ${claimStatus === "Eligible" ? "current" : ""}"
                ></div>
                <span class="end ${claimStatus === "Eligible" ? "current" : ""}"
                  >Payment</span
                >
              </li>`}
        </ul>
      </div>
      <div>
        <div
          style="${isDesktop()
            ? ""
            : "margin-left: 20px; margin-right: 20px;"} margin-bottom: 16px; margin-bottom: 36px"
        >
          <h2
            style="font-size: 22px; margin-top: 0px; margin-bottom: 0px; line-height: 32px"
          >
            Current status
          </h2>
          <hr
            style="
        margin: 0;
        border: none;
        border-top: 1px solid #dfe1e2;
        margin-bottom: 16px;
      "
          />
          ${getStatusAlertHtml(newStatus)}
          ${getStatusBodyHtml(
            newStatus,
            claimNotes,
            claimType,
            receivedDate,
            nextPayDate,
            weeklyBenefitRate,
            balanceRemaining,
            claimEndDate,
            lastDayPaid
          )}
        </div>
        ${whatsNextContent != null
          ? html`<div style="margin-bottom: 40px">
              <div
                style="${isDesktop()
                  ? ""
                  : "margin-left: 20px; margin-right: 20px;"} margin-bottom: 16px; margin-bottom: 36px"
              >
                <h2
                  style="font-size: 22px; margin-top: 0px; margin-bottom: 0px; line-height: 32px"
                >
                  What's next
                </h2>
                <hr
                  style="
                    margin: 0;
                    border: none;
                    border-top: 1px solid #dfe1e2;
                    margin-bottom: 16px;
                  "
                />
                <ul
                  style="padding-inline-start: 20px; margin-block-start: 0; margin-block-end: 0"
                >
                  ${whatsNextContent}
                </ul>
              </div>
            </div>`
          : ""}
      </div>
    </div>
    <div
      style="margin-top: 0px; margin-left: ${rootMarginX}; margin-right: ${rootMarginX}; margin-bottom: 8px"
    >
      ${RETURN_TO_TOP_LINK}
    </div>
    ${FOOTER_HTML}`;

  root.append(newContainer);
  const accordions = document.querySelectorAll(".accordion-header");
  accordions.forEach((accordionEl) => {
    new Accordion(accordionEl);
  });
}

function logView(metadata) {
  const { claimType, claimStatus, claimNotes } = metadata;
  const parsedNotes = getParsedClaimNotes(claimNotes)
    .map((note) => note.type)
    .join(";");

  logEvent("[DOL_DABI] Viewed Claim Detail page", {
    object_type: claimType || "N/A",
    object_status: claimStatus || "N/A",
    object_details: parsedNotes || "N/A",
  });
}
