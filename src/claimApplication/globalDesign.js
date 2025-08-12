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
      const bannerDiv = document.createElement('div');
      bannerDiv.classList.add('usa-alert', 'usa-alert--info');

      const alertBodyDiv = document.createElement('div');
      alertBodyDiv.classList.add('usa-alert__body');

      const alertHeading = document.createElement('h4');
      alertHeading.classList.add('usa-alert__heading');
      alertHeading.textContent = 'Informative status';

      const alertText = document.createElement('p');
      alertText.classList.add('usa-alert__text');
      alertText.innerHTML = 'Lorem ipsum dolor sit amet, <a class="usa-link" href="javascript:void(0);">consectetur adipiscing</a> elit, sed do eiusmod.';

      alertBodyDiv.append(alertHeading, alertText);
      bannerDiv.append(alertBodyDiv);
      table.replaceWith(bannerDiv);

      const styleElement = document.createElement('style');
      styleElement.innerHTML = `
        .usa-alert--info::before {
          content: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0Ij48cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTEgMTVoLTJ2LTZoMnY2em0wLThoLTJWN2gydjJ6Ii8+PC9zdmc+');
          display: inline-block;
          width: 1em;
          height: 1em;
          margin-right: 0.5em;
          background: none !important;
          -webkit-mask: none !important;
          mask: none !important;
        }
      `;
      document.head.appendChild(styleElement);
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
