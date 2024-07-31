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
    : paymentType.includes("issued by check")
    ? "Check"
    : "";
  const status =
    baseChildren[10]?.children[0]?.children[0]?.children[0]?.children[0]
      ?.children[1]?.innerText ?? "";

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
  const { status, paymentType, p30DateSent, claimType, payments } = metadata;
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
      ${getUnstyledButtonHtml("Status", "claimDetail()")}
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
      <div style="font-size: 22px; line-height: 32px; margin-bottom: 44px">
        Claim for ${getClaimTypeContent(claimType)}
      </div>
    </div>
    <div
      style="${isDesktop()
        ? "display: grid; grid-template-columns: 1fr 2fr; gap: 20px; margin-left: 107px; margin-right: 107px"
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
          ${getPaymentInfoHtml(parsedStatus)}
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

function getPaymentInfoHtml(parsedStatus, status) {
  let body = "";
  switch (parsedStatus) {
    case "Max entitlement":
      break;
    case "Recovered/returned":
      break;
    case "P30 received":
      break;
    case "P30 sent":
      break;
    case "Pay code 99/6":
      break;
    case "Next pay scheduled":
      break;
    case "No additional benefits":
      break;
    case "Leave ended":
      break;
    default:
      body = status;
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
                  ? `Next ${gross} to issue on ${getFormattedDate(date)}`
                  : `${gross} issued on ${getFormattedDate(date)}`}</strong
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
            <div>${payId}</div>
          </div>
          <div style="display: flex; justify-content: space-between">
            <div><strong>Gross</strong></div>
            <div>${gross}</div>
          </div>
          <div style="display: flex; justify-content: space-between">
            <div><strong>Net</strong></div>
            <div>${net}</div>
          </div>
          <div style="display: flex; justify-content: space-between">
            <div><strong>FICA</strong></div>
            <div>${fica}</div>
          </div>
          <div style="display: flex; justify-content: space-between">
            <div><strong>Medicare</strong></div>
            <div>${medicare}</div>
          </div>
          <div style="display: flex; justify-content: space-between">
            <div><strong>DI Offset</strong></div>
            <div>${diOffset}</div>
          </div>
          <div style="display: flex; justify-content: space-between">
            <div><strong>Garnishment</strong></div>
            <div>${garnishment}</div>
          </div>
          <div style="display: flex; justify-content: space-between">
            <div><strong>FIT</strong></div>
            <div>${fit}</div>
          </div>
        </div>
      </div>`;
    })
    .join("");
}
