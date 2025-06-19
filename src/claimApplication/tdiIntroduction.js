import {
  setupAnalytics,
  updateIcon,
  makeMobileFriendly,
  addFeedbackLink,
} from "../modules/shared.mjs";

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
}
