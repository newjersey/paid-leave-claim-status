import { setupAnalytics } from "../modules/shared.mjs";
import { accessibilityChanges } from './accessibility.js'

if (document.readyState === "loading") {
  window.addEventListener("DOMContentLoaded", () => {
    executeOverride();
  });
} else {
  executeOverride();
}

function executeOverride() {
  setupAnalytics();
  accessibilityChanges();
}
