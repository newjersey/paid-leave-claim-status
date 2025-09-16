import 'uswds/css/uswds.css';
import { setupAnalytics } from "../modules/shared.mjs";
import { accessibilityChanges } from './accessibility.js';
import { analyticsChanges } from './analytics.js';
import { globalDesignChanges } from './globalDesign.js';
import { identifyPage } from './identifyPage.js';
import { pageSpecificChanges } from './pageSpecificChanges.js';

if (document.readyState === "loading") {
  window.addEventListener("DOMContentLoaded", () => {
    executeOverride();
  });
} else {
  executeOverride();
}

document.addEventListener('backButtonClicked', () => {
  executeOverride();
});

function executeOverride() {
  setupAnalytics();

  const pageId = identifyPage();
  if (pageId === 'other') {
    return; // do not apply any other changes
  }

  accessibilityChanges();
  analyticsChanges(pageId);
  globalDesignChanges(pageId);
  pageSpecificChanges(pageId);
}
