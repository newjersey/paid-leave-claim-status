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

  const { claimType, claimStatus, claimNotes, receivedDate, claimDate } =
    getMetadata();
  removeOldHtml();
  addNewHtml(claimType, claimStatus, claimNotes, receivedDate, claimDate);

  styleBody();
  addFeedbackLink();
  updateIcon();
  logView(claimType, claimStatus, claimNotes);
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
          !line.startsWith(
            "As soon as this information is received your claim"
          ) &&
          !line.startsWith("A request for information has been mailed")
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

function getWhatsNextContent(claimStatus, claimNoteDetails, eligibleDetails) {
  if (claimStatus === "Undetermined") {
    if (
      claimNoteDetails.length === 0 ||
      claimNoteDetails.some((note) => note.type === "14_DAY")
    ) {
      return html`<li>We'll review your claim.</li>
        <li>
          We'll notify you of important status updates here and by mail. It can
          take anywhere from 2-6 weeks for a decision or status change depending
          on the volume of claims.
        </li>`;
    } else {
      return html`<li>
          After we receive the information, we'll continue reviewing your claim.
        </li>
        <li>
          Your status may show “information needed” for a few weeks after we
          receive your document, while review is in progress.
        </li>
        <li>
          We'll update your status when your claim is approved or denied.
        </li>`;
    }
  } else if (claimStatus === "Eligible") {
    if (eligibleDetails.nextPaymentDate == null) {
      return html`<li>
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
      return html`<li>
        You'll keep getting paid. We'll post here if anything changes.
      </li>`;
    }
  }

  return null;
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

  newContainer.innerHTML = html`${HEADER_HTML}
    <div style="display: flex; align-items: center; margin: 12px 18px">
      ${getUnstyledButton("All claims", "claimList()")}
      <img src="./assets/arrow.svg" alt="Right arrow" />
      <div style="display: inline-block"><b>Status</b></div>
    </div>
    <div style="margin: 12px 18px">
      <div style="display: flex; justify-content: flex-end">
        <button
          onClick="userLogout()"
          style="
            background: none;
            font: inherit;
            cursor: pointer;
            outline: inherit;
            border: 2px solid #0b4778;
            border-radius: 4px;
            padding: 12px 14px;
            font-size: 16px;
            font-weight: bold;
            color: #0b4778;
            background-color: #f5f6f7;
            margin-top: 12px;
            margin-bottom: 12px;
            display: flex;
            align-items: center;
            gap: 6px;
          "
        >
          <img src="./assets/logout.svg" alt="" />
          <span>Log out</span>
        </button>
      </div>
      <h1 style="margin: 0; margin-bottom: 8px">Status</h1>
      <div style="font-size: 22px; line-height: 32px; margin-bottom: 28px">
        Claim for ${getClaimTypeContent(claimType)}, started
        ${getFormattedDate(claimDate)}
      </div>
      <hr style="margin: 0; border: none; border-top: 1px solid #dfe1e2" />
      <div style="margin-bottom: 56px">
        <style>
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
            transform: translateX(57%);
            border-radius: 50%;
            background-color: #a9aeb1;
            width: 24px;
            height: 24px;
          }
          .progress-bar .circle.complete::after {
            background-color: #0076d6;
          }
          .progress-bar .circle.current::after {
            background-color: green;
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
            border-left: 4px #a9aeb1 solid;
          }
          .progress-bar span.current {
            font-weight: bold;
          }
          .progress-bar span.complete::before {
            border-color: #cfe8ff;
          }
          .progress-bar span.end::before {
            border: none;
          }
        </style>
        <ul style="padding-inline-start: 12px" class="progress-bar">
          <li>
            <div class="circle complete"></div>
            <span class="complete"
              >Received<br />
              ${receivedDate}</span
            >
          </li>
          <li>
            <div
              class="circle ${claimStatus === "Undetermined"
                ? "current"
                : "complete"}"
            ></div>
            <span class="${claimStatus === "Undetermined" ? "current" : ""}"
              >Review</span
            >
          </li>
          <li>
            <div
              class="circle ${claimStatus !== "Undetermined" ? "complete" : ""}"
            ></div>
            <span
              class="${claimStatus === "Ineligible"
                ? "current"
                : ""} ${claimStatus === "Ineligible" ? "end" : ""}"
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
        <div style="margin-bottom: 56px">
          <h2 style="font-size: 22px; margin: 0; line-height: 32px">
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
          <b>In progress</b>
        </div>
        <div style="margin-bottom: 56px">
          <h2 style="font-size: 22px; margin: 0; line-height: 32px">
            Steps to complete
          </h2>
          <hr
            style="
          margin: 0;
          border: none;
          border-top: 1px solid #dfe1e2;
          margin-bottom: 16px;
        "
          />
          <div
            style="
          border: 1px solid #dcdee0;
          padding: 24px 16px;
          background-color: white;
          margin-top: 12px;
        "
          >
            There's no action needed from you at this time.
          </div>
          <div style="margin-top: 8px">
            <div
              style="border-left: 8px solid #FFBE2E; background-color: #FAF3D1; padding: 8px 16px 8px 14px; display: flex; align-items: center; gap: 14px"
            >
              <img src="${ICON_BASE_URL}/warning.svg" alt="" />
              <div style="line-height: 24px">Missing medical information</div>
            </div>
            <div
              style="
          border: 1px solid #dcdee0;
          padding: 24px 16px;
          background-color: white;
        "
            >
              We still need a medical certificate to process your claim. Make
              sure your medical provider completes it by DATE so your claim
              isn't delayed or denied.
            </div>
          </div>
        </div>
        <div style="margin-bottom: 344px">
          <h2 style="font-size: 22px; margin: 0; line-height: 32px">
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
          <ul style="line-height: 24px; padding-inline-start: 20px"></ul>
        </div>
      </div>
      <div style="margin-bottom: 20px; margin-top: 76px">
        ${RETURN_TO_TOP_LINK}
      </div>
    </div>
    ${FOOTER_HTML}`;

  root.append(newContainer);
}

function logView(claimType, claimStatus, claimNotes) {
  const parsedNotes = claimNotes
    .map((note) => extractNoteData(note).type)
    .join(";");

  logEvent("[DOL_DABI] Viewed Claim Detail page", {
    object_type: claimType || "N/A",
    object_status: claimStatus || "N/A",
    object_details: parsedNotes || "N/A",
  });
}
