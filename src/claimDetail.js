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
  getUnstyledButton,
  ICON_BASE_URL,
  getFormattedDate,
  getStatusAlert,
  css,
} from "./modules/shared.mjs";
import { Accordion } from "./modules/Accordion.mjs";

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

  const { claimType, claimStatus, claimNotes, receivedDate, claimDate } =
    getMetadata();
  const parsedClaimNotes = extractNoteData(claimNotes);
  removeOldHtml();
  addHeadStyles();
  addNewHtml(claimType, claimStatus, parsedClaimNotes, receivedDate, claimDate);

  styleBody();
  addFeedbackLink();
  updateIcon();
  logView(claimType, claimStatus, parsedClaimNotes);
}

function getMetadata() {
  const baseChildren =
    document.getElementById("AutoNumber2")?.children[0]?.children ?? [];
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

  const eligibleTable =
    document.getElementsByName("dabiDetail")[0]?.children[4]?.children[0]
      ?.children[0]?.children[1];

  return {
    fullName,
    claimType,
    claimStatus,
    claimNotes,
    receivedDate,
    claimDate,
  };
}

function addHeadStyles() {
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
      background-color: white;
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
  const root = document.getElementsByName("dabiDetail")[0]?.children;
  root[2]?.remove();
  root[2]?.remove();
  root[2]?.remove();
}

function extractNoteData(claimNotes) {
  return claimNotes.map((note) => {
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

function isClaimNotesEmpty(claimNotes) {
  return (
    claimNotes.length === 0 ||
    (claimNotes.length === 1 && claimNotes === "SENT_REQ") ||
    (claimNotes.length === 1 && claimNotes === "14_DAY")
  );
}

function getStatus(claimStatus, claimNotes) {
  let status = "In progress";
  if (claimStatus === "Eligible") {
    status = "Approved";
  } else if (claimStatus === "Ineligible") {
    status = "Denied";
  } else if (claimStatus === "Undetermined" && !isClaimNotesEmpty(claimNotes)) {
    status = "Information needed";
  }
  return status;
}

function getWhatsNextContent(claimStatus, claimNotes, eligibleDetails) {
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
    if (eligibleDetails == null) {
      // .nextPaymentDate
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

function getStatusContent(newStatus, claimNotes, claimType, receivedDate) {
  if (newStatus === "In progress") {
    return html`<div
      style="font-size: 16px; line-height: 24px; margin-top: 12px"
    >
      <h3 style="font-size: 16px; line-height: 24px; margin: 0">
        Steps to complete
      </h3>
      <ul
        style="padding-inline-start: 25px; margin-block-start: 0.5em; margin-block-end: 0.5em"
      >
        <li>There's no action for you to take.</li>
      </ul>
    </div>`;
  } else if (newStatus === "Information needed") {
    console.log(claimNotes);
    return claimNotes
      .map((note, idx) => {
        let title = "";
        let body = "";

        switch (note.type) {
          case "GEN_C01":
            const expectedDate = new Date(receivedDate);
            expectedDate.setDate(expectedDate.getDate() + 14);
            title = "Missing claimant information";
            body = html`<div>
              We need claimant information to review your claim.<br /><br />
              <b>Steps to complete</b>
              <ul
                style="line-height: 24px; padding-inline-start: 20px; margin-block-start: 0; margin-block-end: 0"
              >
                <li>
                  Download and print the document under "Claimant Information
                  Forms" in your
                  <a
                    href="https://secure.dol.state.nj.us/tdi/caller.aspx?Source=${claimType}"
                    target="_blank"
                    >claim documents</a
                  >. This document lists all the information we need.
                </li>
                <li>
                  Make sure you complete the form, and fax or mail it to us by
                  <b>${getFormattedDate(expectedDate)}</b> so your claim isn't
                  delayed or denied.
                </li>
              </ul>
            </div>`;
            break;
          case "SENT_REQ":
          default:
            return "";
        }
        return html`<div style="margin: 8px 0">
          <h3 class="accordion-header">
            <button
              type="button"
              aria-expanded="false"
              class="accordion-trigger"
              aria-controls="sect${idx}"
              id="accordion${idx}id"
            >
              <div class="accordion-title">${title}</div>
              <div>
                <img
                  class="accordion-icon"
                  src="${ICON_BASE_URL}/add.svg"
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
    return "";
  } else if (newStatus === "Denied") {
    return "";
  } else {
    return "";
  }
}

function addNewHtml(
  claimType,
  claimStatus,
  claimNotes,
  receivedDate,
  claimDate
) {
  const root = document.getElementsByName("dabiDetail")[0];
  const newContainer = document.createElement("div");
  const whatsNextContent = getWhatsNextContent(
    claimStatus,
    claimNotes,
    undefined
  );
  const newStatus = getStatus(claimStatus, claimNotes);

  newContainer.innerHTML = html`${HEADER_HTML}
    <div
      style="display: flex; align-items: center; margin: 4px 20px 16px; line-height: 26px"
    >
      ${getUnstyledButton("All claims", "claimList()")}
      <img src="./assets/arrow.svg" alt="Right arrow" />
      <div style="display: inline-block"><b>Status</b></div>
    </div>
    <div style="display: flex; justify-content: flex-end; margin: 0 20px">
      <button
        onClick="userLogout()"
        style="
          background: none;
          font: inherit;
          cursor: pointer;
          outline: inherit;
          border: 2px solid #0b4778;
          border-radius: 4px;
          padding: 12px 10.5px;
          font-size: 16px;
          font-weight: bold;
          color: #0b4778;
          background-color: #f5f6f7;
          display: flex;
          align-items: center;
          gap: 6px;
        "
      >
        <img src="./assets/logout.svg" alt="" />
        <span>Log out</span>
      </button>
    </div>
    <div style="margin: 16px 20px 44px">
      <h1 style="margin: 0 0 8px; font-size: 32px; line-height: 40px">
        Status
      </h1>
      <div style="font-size: 22px; line-height: 32px; margin-bottom: 44px">
        Claim for ${getClaimTypeContent(claimType)}, started
        ${getFormattedDate(claimDate)}
      </div>
    </div>
    <div style="margin: 0 20px 28px">
      <ul style="padding-inline-start: 12px" class="progress-bar">
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
    <h2 style="font-size: 22px; margin: 0 32px 8px; line-height: 32px">
      Current status
    </h2>
    <div
      style="background-color: #fff; padding: 16px 32px; margin-bottom: 36px"
    >
      ${getStatusAlert(newStatus)}
      ${getStatusContent(newStatus, claimNotes, claimType, receivedDate)}
    </div>
    ${whatsNextContent != null
      ? html`<div style="margin-bottom: 40px">
          <h2 style="font-size: 22px; margin: 0 32px 8px; line-height: 32px">
            What's next
          </h2>
          <div style="background-color: #fff; padding: 24px 32px">
            <ul
              style="line-height: 24px; padding-inline-start: 20px; margin-block-start: 0; margin-block-end: 0"
            >
              ${whatsNextContent}
            </ul>
          </div>
        </div>`
      : ""}
    <div style="margin: 0 20px 8px">${RETURN_TO_TOP_LINK}</div>
    ${FOOTER_HTML}`;

  root.append(newContainer);
  const accordions = document.querySelectorAll(".accordion-header");
  accordions.forEach((accordionEl) => {
    new Accordion(accordionEl);
  });
}

function logView(claimType, claimStatus, claimNotes) {
  const parsedNotes = claimNotes.map((note) => note.type).join(";");

  logEvent("[DOL_DABI] Viewed Claim Detail page", {
    object_type: claimType || "N/A",
    object_status: claimStatus || "N/A",
    object_details: parsedNotes || "N/A",
  });
}
