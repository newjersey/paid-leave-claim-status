import {
  logEvent,
  setupAnalytics,
  updateIcon,
  addFeedbackLink,
  runWhenReady,
  makeMobileFriendly,
  styleBody,
  updateDocument,
  css,
  html,
  isDesktop,
  HEADER_HTML,
  ICON_BASE_URL,
  getUnstyledButtonHtml,
  getClaimTypeContent,
  RETURN_TO_TOP_LINK,
  FOOTER_HTML,
  getFormattedDate,
  isFutureDate,
  extractDateFromString,
} from "../modules/shared.mjs";
import { Accordion } from "../modules/Accordion.mjs";

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
    updateDocument("Payments");
  } catch (e) {
    logEvent("[DOL_DABI] Payment redesign error", {
      object_details: e instanceof Error ? e.message : "Unknown",
    });
  }
}

function getMetadata() {
  const baseChildren =
    document.getElementById("AutoNumber2")?.children[0]?.children ?? [];

  const claimType = baseChildren[3]?.children[0]?.innerText
    .split("Claim Type:")[1]
    ?.trim();
  const p30Sent =
    baseChildren[6]?.children[0]?.children[0]?.children[0]?.children[0]?.children[1]?.innerText.trim();
  const payType =
    baseChildren[8]?.children[0]?.children[0]?.children[0]?.children[0]
      ?.children[1]?.innerText ?? "";
  const payTypeAbbr = payType.includes("debit")
    ? "Debit"
    : payType.includes("issued by check")
    ? "Check"
    : "";
  const status =
    baseChildren[10]?.children[0]?.children[0]?.children[0]?.children[0]
      ?.children[1]?.innerText ?? "";

  const name = baseChildren[1]?.children[0]?.children[0]?.children[0]?.innerText ?? ""
  const payments = Array.from(document.getElementsByTagName("table")[5].rows)
    .slice(1)
    .map((row) => {
      const columns = row.children;
      return {
        date: columns[0].innerText,
        gross: columns[1].innerText,
        fica: columns[2].innerText,
        medicare: columns[3].innerText,
        diOffset: columns[4].innerText,
        garnishment: columns[5].innerText,
        fit: columns[6].innerText,
        net: columns[7].innerText,
        payId: columns[8].innerText,
        fromDate: columns[9].innerText,
        toDate: columns[10].innerText,
      };
    });

  return {
    status,
    paymentType: payTypeAbbr,
    p30DateSent: p30Sent,
    claimType,
    payments,
    name
  };
}

function removeOldHtml() {
  const root = document.getElementsByName("claimlist")[0];
  const rootChildren = root.children;
  const numChildren = Array.from(rootChildren).length;
  if (rootChildren != null && numChildren === 4) {
    rootChildren[1]?.remove();
    rootChildren[1]?.remove();
    rootChildren[1]?.remove();
  } else {
    throw new Error(
      `Cannot safely remove old HTML, expected 4 root children, got ${numChildren}`
    );
  }
}

function addHeadStyling() {
  const style = document.createElement("style");
  style.textContent = css`
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
      line-height: 24px;
    }
    .accordion-title.highlighted {
      color: #0076d6;
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
    form {
      margin-block-end: 0;
    }
  `;
  document.head.appendChild(style);
}

function addNewHtml(metadata) {
  const { status, p30DateSent, claimType, payments, name } = metadata;
  const parsedStatus = getParsedStatus(status);

  const root = document.getElementsByName("claimlist")[0];
  const newContainer = document.createElement("div");
  const rootMarginX = isDesktop() ? "107px" : "20px";

  newContainer.innerHTML = html`${HEADER_HTML}
    <div
      style="display: flex; align-items: center; margin-top: 4px; margin-left: ${rootMarginX}; margin-right: ${rootMarginX}; margin-bottom: 16px; line-height: 26px"
    >
      <div style="display: inline-block">All claims</div>
      <img src="${ICON_BASE_URL}/arrow.svg" alt="Right arrow" />
      ${getUnstyledButtonHtml("Status", "claimdetail()")}
      <img src="${ICON_BASE_URL}/arrow.svg" alt="Right arrow" />
      <div style="display: inline-block"><b>Payments</b></div>
    </div>
    <div
      style="display: flex; justify-content: flex-end; margin-top: 0; margin-left: ${rootMarginX}; margin-right: ${rootMarginX}; margin-bottom: 0"
    >
      <button
        onclick="userLogout()"
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
        <img src="${ICON_BASE_URL}/logout.svg" alt="" />
        <span>Log out</span>
      </button>
    </div>
    <div
      style="margin-top: 16px; margin-left: ${rootMarginX}; margin-right: ${rootMarginX}; margin-bottom: 44px"
    >
      <h1 style="margin: 0 0 8px; font-size: 32px; line-height: 40px">
        Payments
      </h1>
      <div style="font-size: 22px; line-height: 32px; margin-bottom: 8px;">
        Claim for ${getClaimTypeContent(claimType)}
      </div>
      <div style="font-size: 13px; line-height: 26px; margin-bottom: 44px; text-transform: capitalize; font-weight: 700;">
      ${name}
      </div>
    </div>
    <div
      style="${isDesktop()
        ? "display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-left: 107px; margin-right: 107px"
        : ""}"
    >
      <div>
        <div
          style="${isDesktop()
            ? ""
            : "margin-left: 20px; margin-right: 20px;"} margin-bottom: 16px; margin-bottom: 36px"
        >
          <h2
            style="font-size: 22px; margin-top: 0px; margin-bottom: 0px; line-height: 32px"
          >
            Payment information
          </h2>
          <hr
            style="
        margin: 0;
        border: none;
        border-top: 1px solid #dfe1e2;
        margin-bottom: 16px;
      "
          />
          ${getPaymentInfoHtml(parsedStatus, status, claimType)}
        </div>
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
            Payment history
          </h2>
          <hr
            style="
              margin: 0;
              border: none;
              border-top: 1px solid #dfe1e2;
              margin-bottom: 16px;
            "
          />
          <div style="margin-bottom: 16px;">Total payments: <strong>${getTotalPayments(payments)}</strong></div>
          ${getPaymentHistoryAccordions(payments)}
        </div>
      </div>
    </div>
    <div
      style="margin-top: 0px; margin-left: ${isDesktop()
        ? "54px"
        : "13px"}; margin-right: ${isDesktop()
        ? "54px"
        : "13px"}; margin-bottom: 8px"
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

function getParsedStatus(status) {
  let parsedStatus = status;
  if (status.includes("maximum entitlement")) {
    parsedStatus = "Max entitlement";
  } else if (status.includes("recovered")) {
    parsedStatus = "Recovered/returned";
  } else if (
    status.includes(
      "Request to Claimant for Continued Claim Information has been received"
    )
  ) {
    parsedStatus = "P30 received";
  } else if (
    status.includes("completed request to Claimant for Continued Claim")
  ) {
    parsedStatus = "P30 sent";
  } else if (
    status.includes("Please contact our office for additional information")
  ) {
    parsedStatus = "Pay code 99/6";
  } else if (status.includes("next payment is scheduled")) {
    parsedStatus = "Next pay scheduled";
  } else if (status.includes("No additional benefits have been authorized.")) {
    parsedStatus = "No additional benefits";
  } else if (status.includes("ended on")) {
    parsedStatus = "Leave ended";
  }

  return parsedStatus;
}

function getPaymentInfoHtml(parsedStatus, status, claimType) {
  let body = "";
  switch (parsedStatus) {
    case "Max entitlement":
      body = html`<div>
        You've reached the maximum benefits allowed
        <a
          href="https://www.nj.gov/labor/myleavebenefits/labor/myleavebenefits/worker/tdi/index.shtml#maximum"
          target="_blank"
        >
          under state law</a
        >. <br /><br />
        You can't extend your state benefits for this condition/disability,
        regardless of whether your doctor approves it. If your medical condition
        continues to prevent you from working, apply for
        <a
          href="https://www.nj.gov/labor/claims/dds/claimants.shtml"
          target="_blank"
          >Social Security Disability Insurance</a
        >.
      </div>`;
      break;
    case "P30 received":
      const receivedDate = extractDateFromString(status);
      if (claimType === "FLI") {
        body = html`Your FL3 form (Family Leave Insurance Continued Claim
          Certification) was received on ${getFormattedDate(receivedDate)}.<br /><br />
          <strong>Steps to complete</strong><br />
          <ul style="margin-block-start: 0.25em">
            <li>There's no action for you to take.</li>
          </ul> `;
      } else if (claimType === "TDI") {
        body = html`Your P30 form (Request to Claimant for Continued Claim
          Information) was received on ${getFormattedDate(receivedDate)}.<br /><br />
          <strong>Steps to complete</strong><br />
          <ul style="margin-block-start: 0.25em">
            <li>There's no action for you to take.</li>
          </ul>
          <strong>Tips for pregnancy claims</strong>
          <ul style="margin-block-start: 0.25em">
            <li>
              If you're taking bonding leave (Family Leave Insurance)
              immediately after, look out for an FL2 form in the mail. We'll
              send it to you after your P30 is processed.
            </li>
            <li>
              The FL2 is how you'll start your bonding leave, without a break in
              payments.
            </li>
          </ul>`;
      }
      break;
    case "P30 sent":
      const mailedDate = extractDateFromString(status);
      body = html`<div>
        <strong>Heads up!</strong><br />Your last scheduled payment is coming
        up. We need you to end or extend your claim online. To complete this
        step, you'll need the P30 letter, or Request for Continued Claim
        Information. We mailed this to you on ${getFormattedDate(mailedDate)}.
        <br /><br />
        It's important to complete this step so we know whether you recovered
        (end claim), or if you need to file a medical extension (extend claim).
        <br /><br />
        <strong>Steps to complete</strong><br />
        <ul style="margin-block-start: 0.25em">
          <li>
            Look for a letter in the mail: "Form P30: Request to Claimant for
            Continued Information."
          </li>
          <li>Find the "Form ID" (11 digits) in the middle of the page.</li>
          <li>
            <a
              href="https://www.nj.gov/labor/myleavebenefits/worker/tdi/P30notice.shtml"
              target="_blank"
              >Log in to your benefits account</a
            >
            and follow the instructions.
          </li>
          <li>Share the Form ID with your doctor.</li>
          <li>
            If this is a pregnancy claim and you're starting bonding leave
            immediately after, keep an eye on the mail for your FL2 (new
            mother/bonding claim).
          </li>
        </ul>
        <strong>Need help?</strong><br />
        If you can't find the letter, give us a call: 609-292-7060. The form is
        unique to your claim, so you can't print it online. The P30 letter looks
        like this:<br />
        <img
          src="https://beta.nj.gov/files/tdi-fli-claim-status/assets/p30.png"
          alt="Sample P30 letter titled 'Request for Continued Claim Information' from the New Jersey Department of Labor, showing nine sections of claimant information. The form ID is found in the middle of the page."
          style="
            margin-top: 8px;
            max-width: 100%;
            height: auto;
          "
        />
      </div>`;
      break;
    case "Next pay scheduled":
      const scheduledDate = extractDateFromString(status);
      body = html`<div>
        We're sending payment to your benefits debit card on
        ${getFormattedDate(scheduledDate)}. You can access the funds about 2
        business days later.<br /><br />Questions? Learn more about
        <a
          href="https://www.nj.gov/labor/myleavebenefits/worker/resources/debitcard.shtml"
          target="_blank"
          >how payments are sent</a
        >.
      </div>`;
      break;
    case "Leave ended":
      const endDate = extractDateFromString(status);
      body = html`<div>
        Your ${claimType === "FLI" ? "Family Leave" : "Temporary Disability"}
        claim ended on ${getFormattedDate(endDate)}.
        ${claimType === "TDI"
          ? html` <br /><br />
              <strong>Tips for pregnancy claims</strong>
              <ul style="margin-block-start: 0.25em">
                <li>
                  If you're taking bonding leave (Family Leave Insurance)
                  immediately after, look out for an FL2 form in the mail. We'll
                  send it to you after your P30 is processed.
                </li>
                <li>
                  The FL2 is how you'll start your bonding leave, without a
                  break in payments.
                </li>
              </ul>`
          : ""}
      </div>`;
      break;
    case "Recovered/returned":
      body =
        "No further benefits have been issued since you recovered / returned to work.";
      break;
    case "Pay code 99/6":
      body = html`Please
        <a href="#helpSection" style="text-underline-offset: 2.5px"
          >contact our office</a
        >
        for additional information.`;
      break;
    case "No additional benefits":
    default:
      body = status;
      break;
  }

  return body;
}

function logView(metadata) {
  const { status, paymentType, p30DateSent, claimType } = metadata;
  const parsedStatus = getParsedStatus(status);

  logEvent("[DOL_DABI] Viewed Payment Detail page", {
    object_type: claimType || "N/A",
    object_status: parsedStatus || "N/A",
    object_details: JSON.stringify({
      p30: p30DateSent || "N/A",
      payType: paymentType || "N/A",
    }),
  });
}

function getTotalPayments(paymentRecords) {
  let totalPayments = 0;

  paymentRecords.forEach((record) => {
    const {date, gross} = record;
    if (isFutureDate(date) === false && gross) {
      const numericGross = parseFloat(gross.replace(/[$,]/g, ''));
      if (!isNaN(numericGross)) {
        totalPayments += numericGross;
      }
    }
  });

  return totalPayments.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  });
}

function getPaymentHistoryAccordions(paymentRecords) {
  return paymentRecords
    .map((record, idx) => {
      const {
        date,
        gross,
        fica,
        medicare,
        diOffset,
        garnishment,
        fit,
        net,
        payId,
        fromDate,
        toDate,
      } = record;

      const isFuturePayment = isFutureDate(date);

      return html`<div style="margin: 8px 0">
        <h3 class="accordion-header">
          <button
            type="button"
            aria-expanded="false"
            class="accordion-trigger"
            aria-controls="sect${idx}"
            id="accordion${idx}id"
          >
            <div
              class="accordion-title ${isFuturePayment ? "highlighted" : ""}"
            >
              <strong
                >${isFuturePayment
                  ? `Next ${gross || "payment"} to issue on ${getFormattedDate(
                      date
                    )}`
                  : `${gross || "Payment"} issued on ${getFormattedDate(
                      date
                    )}`}</strong
              ><br /><span style="font-weight: normal"
                >Covers ${getFormattedDate(fromDate)} to
                ${getFormattedDate(toDate)}</span
              >
            </div>
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
          <div style="display: flex; justify-content: space-between">
            <div><strong>Payment ID</strong></div>
            <div>${payId || "N/A"}</div>
          </div>
          <div style="display: flex; justify-content: space-between">
            <div><strong>Gross</strong></div>
            <div>${gross || "N/A"}</div>
          </div>
          <div style="display: flex; justify-content: space-between">
            <div><strong>Net</strong></div>
            <div>${net || "N/A"}</div>
          </div>
          <div style="display: flex; justify-content: space-between">
            <div><strong>FICA</strong></div>
            <div>${fica || "N/A"}</div>
          </div>
          <div style="display: flex; justify-content: space-between">
            <div><strong>Medicare</strong></div>
            <div>${medicare || "N/A"}</div>
          </div>
          <div style="display: flex; justify-content: space-between">
            <div><strong>Overpayment</strong></div>
            <div>${diOffset || "N/A"}</div>
          </div>
          <div style="display: flex; justify-content: space-between">
            <div><strong>Garnishment</strong></div>
            <div>${garnishment || "N/A"}</div>
          </div>
          <div style="display: flex; justify-content: space-between">
            <div><strong>FIT</strong></div>
            <div>${fit || "N/A"}</div>
          </div>
        </div>
      </div>`;
    })
    .join("");
}
