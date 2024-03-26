import {
  logEvent,
  setupAnalytics,
  updateIcon,
  addFeedbackLink,
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
  logView();
  addFeedbackLink();
}

function logView() {
  const baseChildren =
    document.getElementById("AutoNumber2")?.children[0]?.children ?? [];

  const claimType =
    baseChildren[3]?.children[0]?.innerText.split("Claim Type:")[1]?.trim() ||
    "N/A";
  const p30Sent =
    baseChildren[6]?.children[0]?.children[0]?.children[0]?.children[0]?.children[1]?.innerText.trim() ||
    "N/A";
  const payType =
    baseChildren[8]?.children[0]?.children[0]?.children[0]?.children[0]
      ?.children[1]?.innerText ?? "";
  const payTypeAbbr = payType.includes("debit")
    ? "Debit"
    : paymentType.includes("issued by check")
    ? "Check"
    : "N/A";
  const payInfo =
    baseChildren[10]?.children[0]?.children[0]?.children[0]?.children[0]
      ?.children[1]?.innerText ?? "";

  let paymentInfoAbbr = payInfo;
  if (payInfo.includes("maximum entitlement")) {
    paymentInfoAbbr = "Max entitlement";
  } else if (payInfo.includes("recovered")) {
    paymentInfoAbbr = "Recovered/returned";
  } else if (
    payInfo.includes(
      "Request to Claimant for Continued Claim Information has been received"
    )
  ) {
    paymentInfoAbbr = "P30 received";
  } else if (
    payInfo.includes("completed request to Claimant for Continued Claim")
  ) {
    paymentInfoAbbr = "P30 sent";
  } else if (
    payInfo.includes("Please contact our office for additional information")
  ) {
    paymentInfoAbbr = "Pay code 99/6";
  } else if (payInfo.includes("next payment is scheduled")) {
    paymentInfoAbbr = "Next pay scheduled";
  } else if (payInfo.includes("No additional benefits have been authorized.")) {
    paymentInfoAbbr = "No additional benefits";
  } else if (payInfo.includes("ended on")) {
    paymentInfoAbbr = "Leave ended";
  }

  logEvent("[DOL_DABI] Viewed Payment Detail page", {
    object_type: claimType,
    object_status: paymentInfoAbbr,
    object_details: JSON.stringify({
      p30: p30Sent,
      payType: payTypeAbbr,
    }),
  });
}
