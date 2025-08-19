import { isDesktop, ICON_BASE_URL, HEADER_HTML, logEvent } from "../modules/shared.mjs";

export function globalDesignChanges(pageId) {
  applyBackgroundColor();
  replaceHeader();
  applyFooter(pageId);
  applyGlobalFont();
}

function applyBackgroundColor() {
  document.body.style.backgroundColor = "#FBFCFD";
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

      const alertBodyDiv = newDesignAlert();
      if (alertBodyDiv) {
        bannerDiv.append(alertBodyDiv);
      }

      const blackHeader = document.createElement('div');
      blackHeader.innerHTML = HEADER_HTML;
      bannerDiv.append(blackHeader);

      bannerDiv.append(logoutHeader());

      table.replaceWith(bannerDiv);
    }
  });
}

function logoutHeader() {
  const logoutHeader = document.createElement('div');
  logoutHeader.style.display = 'flex';
  logoutHeader.style.alignItems = 'center';
  logoutHeader.style.justifyContent = 'space-between';
  logoutHeader.style.width = '100%'

  var imgElement = document.createElement('img');
  imgElement.src = 'https://beta.nj.gov/files/dol_logo.png';
  imgElement.height = 60;
  imgElement.alt = 'Official logo for the New Jersey Department of Labor';
  imgElement.style.marginTop = '8px';
  imgElement.style.marginBottom = '8px';
  imgElement.style.marginLeft = '18px';
  imgElement.style.marginRight = '18px';

  logoutHeader.appendChild(imgElement);

  var buttonElement = document.createElement('button');
  buttonElement.style.display = 'flex';
  buttonElement.style.alignItems = 'center';
  buttonElement.classList.add('usa-button', 'usa-button--outline');

  var iconElement = document.createElement('span');
  iconElement.style.marginRight = '5px';
  iconElement.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
      <path d="M0 0h24v24H0z" fill="none"/>
      <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" fill="currentColor"/>
    </svg>
  `;

  buttonElement.prepend(iconElement);

  var textElement = document.createElement('span');
  textElement.textContent = 'Logout';
  textElement.style.marginTop = '3px';

  buttonElement.appendChild(textElement);

  logoutHeader.appendChild(buttonElement);

  return logoutHeader;
}

function newDesignAlert() {
  const isAlertDismissed = localStorage.getItem('newLookAlertDismissed');
  if (isAlertDismissed) {
    return null;
  }

  const alertDiv = document.createElement('div');
  alertDiv.id = 'info-alert';
  alertDiv.classList.add('usa-alert', 'usa-alert--info');

  const alertBodyDiv = document.createElement('div');
  alertBodyDiv.classList.add('usa-alert__body');

  const alertHeading = document.createElement('p');
  alertHeading.classList.add('usa-alert__heading');
  alertHeading.textContent = 'A new look is coming!';

  const alertText = document.createElement('p');
  alertText.classList.add('usa-alert__text');
  alertText.innerHTML = `
    You may notice changes to the New Jersey Temporary Disability Insurance application over the next few months.
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
    bodyContent.appendChild(createFooterElement(pageId));
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

export function createFooterElement(pageId) {
  const footer = document.createElement('footer');
  footer.id = 'helpSection';
  footer.style.backgroundColor = '#eff6fb';
  footer.style.padding = `20px ${isDesktop() ? '54px' : '13px'}`;
  footer.style.border = '0.5px solid #565C65';
  footer.style.color = '#000000';
  footer.style.margin = isDesktop() ? '20px 54px 40px' : '0';

  const h3 = document.createElement('h3');
  h3.style.margin = '0';
  h3.style.fontSize = '22px';
  h3.style.lineHeight = '32px';
  h3.style.marginBottom = '8px';
  h3.textContent = 'Need help?';
  footer.appendChild(h3);

  const gridDiv = document.createElement('div');
  gridDiv.style.display = 'grid';
  gridDiv.style.gridTemplateColumns = 'min-content auto';
  gridDiv.style.gap = '16px';
  gridDiv.style.marginBottom = '8px';

  const contactItems = [
    { icon: 'phone.svg', label: 'Call', content: '<a href="tel:609-292-7060">609-292-7060</a> | (8:00am - 4:30pm, Monday - Friday) Wait times are shortest Wednesday - Friday' },
    { icon: 'fax.svg', label: 'Fax', content: '609-984-4138' },
    { icon: 'mail.svg', label: 'Mail', content: 'Division of Temporary Disability and Family Leave Insurance<br />PO Box 387 Trenton, New Jersey 08625-0387' },
  ];

  contactItems.forEach(item => {
    const iconDiv = document.createElement('div');
    iconDiv.style.minWidth = '20px';
    const img = document.createElement('img');
    img.src = `${ICON_BASE_URL}/${item.icon}`;
    img.alt = '';
    iconDiv.appendChild(img);
    gridDiv.appendChild(iconDiv);

    const textDiv = document.createElement('div');
    textDiv.style.lineHeight = '21px';
    textDiv.innerHTML = `<strong>${item.label}</strong> ${item.content}`;
    gridDiv.appendChild(textDiv);
  });

  const emailIconDiv = document.createElement('div');
  emailIconDiv.style.minWidth = '20px';
  const emailImg = document.createElement('img');
  emailImg.src = `${ICON_BASE_URL}/email.svg`;
  emailImg.alt = '';
  emailIconDiv.appendChild(emailImg);
  gridDiv.appendChild(emailIconDiv);

  const emailDiv = document.createElement('div');
  emailDiv.style.lineHeight = '21px';
  
  const emailLink = document.createElement('a');
  emailLink.href = "https://www.nj.gov/labor/myleavebenefits/help/contact/contact-form.shtml";
  emailLink.target = "_blank";
  emailLink.style.textUnderlineOffset = '2px';
  emailLink.innerHTML = "<strong>Email</strong>";
  
  emailDiv.appendChild(emailLink);
  gridDiv.appendChild(emailDiv);

  const iconDiv = document.createElement('div');
  iconDiv.style.minWidth = '20px';
  const img = document.createElement('img');
  img.src = `${ICON_BASE_URL}/info.svg`;
  img.alt = '';
  iconDiv.appendChild(img);
  gridDiv.appendChild(iconDiv);

  const resourcesDiv = document.createElement('div');
  resourcesDiv.style.lineHeight = '21px';
  
  const resourcesLink = document.createElement('a');
  resourcesLink.href = "https://www.nj.gov/labor/myleavebenefits/worker/resources/";
  resourcesLink.target = "_blank";
  resourcesLink.style.textUnderlineOffset = '2px';
  resourcesLink.innerHTML = "<strong>Helpful resources</strong>";
  
  resourcesLink.onclick = function () {
    logEvent('Help Clicked', { pageId });
    return window.open('http://lwd.dol.state.nj.us/labor/tdi/content/webapplicationfaq.html#1');
  };

  resourcesDiv.appendChild(resourcesLink);
  gridDiv.appendChild(resourcesDiv);

  footer.appendChild(gridDiv);

  return footer;
}
