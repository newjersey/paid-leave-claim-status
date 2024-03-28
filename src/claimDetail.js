import {
  logEvent,
  setupAnalytics,
  updateIcon,
  addFeedbackLink,
  html,
  makeMobileFriendly,
} from "./modules/shared.mjs";

if (document.readyState === "loading") {
  window.addEventListener("DOMContentLoaded", () => {
    executeOverride();
  });
} else {
  executeOverride();
}

function styleBody() {
  document.documentElement.lang = "en";
  const bodyStyle = document.body.style;
  bodyStyle.backgroundColor = "#F5F6F7";
  bodyStyle.fontFamily = "'Public Sans', sans-serif";
  bodyStyle.color = "#1C1D1F";
  bodyStyle.padding = "0px";
}

function executeOverride() {
  setupAnalytics();
  makeMobileFriendly();
  const { claimType, claimStatus, claimNotes, receivedDate, claimDate } =
    extractData();
  removeOldHtml();
  addNewHtml(claimType, claimStatus, claimNotes, receivedDate, claimDate);
  styleBody();
  addFeedbackLink();
  updateIcon();
  logView(claimType, claimStatus, claimNotes);
}

function extractData() {
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
  const claimDate = baseChildren[8].children[0].innerText.trim();
  const receivedDate = baseChildren[8].children[2].innerText;

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
  root[2].remove();
  root[2].remove();
  root[2].remove();
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

  newContainer.innerHTML = html`<header
      style="
        padding: 12px 18px;
        background-color: black;
        color: white;
        font-size: 13px;
        line-height: 150%;
      "
    >
      <div style="margin-bottom: 4px">
        <b>New Jersey Department of Labor and Workforce Development</b>
      </div>
      <a
        href="https://www.nj.gov/labor/myleavebenefits/"
        style="
          text-decoration: underline;
          color: white;
          text-underline-offset: 2px;
        "
        >myLeaveBenefits.nj.gov</a
      >
    </header>
    <div style="display: flex; align-items: center; margin: 12px 18px">
      <button
        onClick="claimList()"
        style="
          background: none;
          border: none;
          padding: 0;
          font: inherit;
          outline: inherit;
          cursor: pointer;
          font-size: 16px;
          color: #0b4778;
          text-decoration: underline;
          display: inline-block;
          text-underline-offset: 2.5px;
        "
      >
        All claims
      </button>
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
        Claim for
        ${claimType === "TDI"
          ? "Temporary Disability Insurance (TDI)"
          : claimType === "FLI"
          ? "Family Leave Insurance (FLI)"
          : claimType},
        starting ${claimDate}
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
          <ul style="line-height: 24px; padding-inline-start: 20px">
            <li>
              Once we receive the requested information, a claim examiner will
              review your application and make a decision to approve or deny
              benefits. This process can take several weeks.
            </li>
            <li>
              We'll update your claim status when you're approved or denied, or
              if there is any other action you need to take. Keep an eye out for
              future updates here and by mail.
            </li>
          </ul>
        </div>
      </div>
      <div style="margin-bottom: 20px">
        <button
          onClick="window.scrollTo(0, 0)"
          style="
        background: none;
        border: none;
        padding: 0;
        font: inherit;
        outline: inherit;
        cursor: pointer;
        font-size: 16px;
        color: #0b4778;
        text-decoration: underline;
        line-height: 24px;
        text-underline-offset: 2.5px;
      "
        >
          Return to top
        </button>
      </div>
    </div>
    <footer
      style="
    background-color: #eff6fb;
    padding: 18px 14px;
    border-top: 1px solid #0b4778;
    color: black;
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
        style="display: flex; align-items: start; gap: 16px; margin-bottom: 8px"
      >
        <img src="./assets/phone.svg" alt="" />
        <div style="line-height: 21px">
          <strong>Call</strong> 609-292-7060 | (8:00am - 4:30pm, Monday -
          Friday) Wait times are shortest Wednesday- Friday
        </div>
      </div>
      <div
        style="
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 8px;
    "
      >
        <img src="./assets/fax.svg" alt="" />
        <div style="line-height: 21px"><strong>Fax</strong> 609-984-4138</div>
      </div>
      <div
        style="display: flex; align-items: start; gap: 16px; margin-bottom: 8px"
      >
        <img src="./assets/mail.svg" alt="" />
        <div style="line-height: 21px">
          <strong>Mail</strong><br />Division of Temporary Disability and Family
          Leave Insurance<br />
          PO Box 387 Trenton, New Jersey 08625-0387
        </div>
      </div>
      <div
        style="
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 8px;
    "
      >
        <img src="./assets/email.svg" alt="" />
        <div style="line-height: 21px">
          <a
            href="https://www.nj.gov/labor/myleavebenefits/help/contact/contact-form.shtml"
            target="_blank"
            style="text-underline-offset: 2px"
            ><strong>Email</strong></a
          >
        </div>
      </div>
      <div
        style="
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 24px;
    "
      >
        <img src="./assets/info.svg" alt="" />
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
        8:00am - 4:30pm, Monday - Friday
      </div>
    </footer>`;

  root.append(newContainer);
}

function logView(claimType, claimStatus, claimNotes) {
  const parsedNotes = claimNotes
    .map((note) => {
      if (note.includes("Error while processing")) {
        return "ERR";
      } else if (note.includes("Private Plan Operations")) {
        return "PRIV";
      } else if (note.includes("Disability During Unemployment")) {
        return "DDU";
      } else if (note.includes("invalid because you did not meet the wage")) {
        return "INVAL_WAGE";
      } else if (
        note.includes("ineligible because you failed") &&
        note.includes("Form C10")
      ) {
        return "INEL_C10";
      } else if (
        note.includes("ineligible because you failed") &&
        note.includes("Form M10")
      ) {
        return "INEL_M10";
      } else if (
        note.includes("ineligible because you failed") &&
        note.includes("additional information and medical certification")
      ) {
        return "INEL_5107";
      } else if (note.includes("A request for information has been mailed")) {
        return "SENT_REQ";
      } else if (note.includes("No decision has been made")) {
        return "14_DAY";
      } else if (
        note.includes("Request to Claimant for Information was sent to")
      ) {
        return "SENT_C10";
      } else if (note.includes("Request for Medical Information was sent to")) {
        return "SENT_Mxx";
      } else if (note.includes("Request for Wage information was sent to")) {
        return "SENT_Exx";
      } else if (
        note.includes(
          "Notice of Required Pursuit of Workers' Compensation Claim was sent to"
        )
      ) {
        return "SENT_W10";
      } else if (
        note.includes("Request to Claimant for Information was generated")
      ) {
        return "GEN_C01";
      } else if (note.includes("Form W01")) {
        return "GEN_W01";
      } else if (note.includes("Form M-01")) {
        return "GEN_M01";
      } else if (note.includes("An Employer Statement")) {
        return "GEN_E01";
      } else {
        return note;
      }
    })
    .join(";");

  logEvent("[DOL_DABI] Viewed Claim Detail page", {
    object_type: claimType || "N/A",
    object_status: claimStatus || "N/A",
    object_details: parsedNotes || "N/A",
  });
}
