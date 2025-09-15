import { setupAnalytics } from "../modules/shared.mjs";
import { accessibilityChanges } from './accessibility.js';
import { analyticsChanges } from './analytics.js';
import { identifyPage } from './identifyPage.js';

if (document.readyState === "loading") {
  window.addEventListener("DOMContentLoaded", () => {
    executeOverride();
  });
} else {
  executeOverride();
}

function executeOverride() {
  setupAnalytics();

  const pageId = identifyPage();
  if (pageId === 'other') {
    return; // do not apply any other changes
  }

  accessibilityChanges();
  analyticsChanges(pageId);
}
