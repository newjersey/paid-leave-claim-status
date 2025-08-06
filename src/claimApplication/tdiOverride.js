import 'uswds/css/uswds.css';
import { setupAnalytics } from "../modules/shared.mjs";
import { accessibilityChanges } from './accessibility.js';
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
  applyGlobalFont();
  replaceHeader();
  applyFooter();
}

function applyGlobalFont() {
  document.body.style.fontFamily = '"Public Sans", sans-serif';
  document.querySelectorAll('*').forEach(element => {
    element.style.fontFamily = '"Public Sans", sans-serif';
  });
}

function replaceHeader() {
  const tables = document.querySelectorAll('#form1 > table');
  tables.forEach(table => {
    const bannerImage = Array.from(table.querySelectorAll('img')).find(img => img.src.includes('lwd_banner.jpg'));
    const logoImage = Array.from(table.querySelectorAll('img')).find(img => img.src.includes('lwd_logo.jpg'));
    const hasLogoutLink = table.querySelector('a#header_lbtnLogout');

    if (bannerImage && logoImage && hasLogoutLink) {
      const newElement = document.createElement('h2');
      newElement.textContent = 'Hello!';

      table.replaceWith(newElement);
    }
  });
}

function applyFooter() {
  const bodyContent = document.body;
  if (bodyContent) {
    const footerDiv = document.createElement('div');
    footerDiv.innerHTML = "<h2>FOOTER</h2>";
    bodyContent.appendChild(footerDiv);
  } else {
    console.error("Cannot find the body element to append the footer.");
  }
}
