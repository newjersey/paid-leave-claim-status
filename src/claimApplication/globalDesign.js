import { logEvent } from "../modules/shared.mjs";

export function globalDesignChanges(pageId) {
  applyGlobalFont();
  replaceHeader();
  applyFooter(pageId);
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
      const newElement = document.createElement('p');
      newElement.textContent = 'Hello!';

      table.replaceWith(newElement);
    }
  });
}

function applyFooter(pageId) {
  const bodyContent = document.body;
  if (bodyContent) {
    const footerDiv = document.createElement('div');
    footerDiv.appendChild(helpLink(pageId));
    bodyContent.appendChild(footerDiv);
  } else {
    console.error("Cannot find the body element to append the footer.");
  }
}

function helpLink(pageId) {
  const helpLink = document.createElement('a');
  helpLink.id = 'footer_lbtnShowFAQ';
  helpLink.href="javascript:__doPostBack('ctl00$header$lbtnShowFAQ','')"
  helpLink.textContent = 'Help';
  helpLink.onclick = function() {
    logEvent('Help Clicked', { pageId });
    return openFAQWindow('http://lwd.dol.state.nj.us/labor/tdi/content/webapplicationfaq.html#1');
  };
  return helpLink;
}
