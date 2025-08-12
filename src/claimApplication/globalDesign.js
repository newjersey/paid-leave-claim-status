import { logEvent } from "../modules/shared.mjs";

export function globalDesignChanges(pageId) {
  replaceHeader();
  applyFooter(pageId);
  applyGlobalFont();
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

      const alertBodyDiv = newDesignAlert(bannerDiv);
      if (alertBodyDiv) {
        bannerDiv.append(alertBodyDiv);
      }

      const nonAlertContent = document.createElement('div');
      nonAlertContent.textContent = 'Some header content that always displays.';
      bannerDiv.append(nonAlertContent);

      table.replaceWith(bannerDiv);
    }
  });
}

function newDesignAlert(bannerDiv) {
  const isAlertDismissed = localStorage.getItem('newLookAlertDismissed');
  if (isAlertDismissed) {
    return null;
  }

  const alertDiv = document.createElement('div');
  alertDiv.classList.add('usa-alert', 'usa-alert--info');

  const alertBodyDiv = document.createElement('div');
  alertBodyDiv.classList.add('usa-alert__body');

  const alertHeading = document.createElement('p');
  alertHeading.classList.add('usa-alert__heading');
  alertHeading.textContent = 'A new look is coming!';

  const alertText = document.createElement('p');
  alertText.classList.add('usa-alert__text');
  alertText.innerHTML = `
    You may notice design changes to the Temporary Disability Insurance application over the next few months.
    <br>
    <a href="#" id="dismiss-alert">Dismiss</a>`;

  alertBodyDiv.append(alertHeading, alertText);
  alertDiv.append(alertBodyDiv);

  const dismissLink = alertDiv.querySelector('#dismiss-alert');
  dismissLink.addEventListener('click', (event) => {
    event.preventDefault();
    alertDiv.style.display = 'none';
    localStorage.setItem('newLookAlertDismissed', 'true');
  });

  const styleElement = document.createElement('style');
  styleElement.innerHTML = `
    .usa-alert--info::before {
      content: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0Ij48cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTEgMTVoLTJ2LTZoMnY2em0wLThoLTJWN2gydjJ6Ii8+PC9zdmc+');
      background: none !important;
      -webkit-mask: none !important;
      mask: none !important;
      top: auto !important;
    }
  `;
  document.head.appendChild(styleElement);
  
  return alertDiv;
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
