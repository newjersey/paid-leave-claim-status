import { isDesktop, ICON_BASE_URL, HEADER_HTML, logEvent } from "../modules/shared.mjs";

export function globalDesignChanges(pageId) {
  applyBackgroundColor();
  replaceHeader();
  removeOldStepTitle();
  applyFooter(pageId);
  adjustTabHeights();
  applyGlobalFont();
  applyFontVariantNormal();
}

function applyFontVariantNormal() {
  const headings = document.querySelectorAll('h1, h2, h3, h4');
  headings.forEach(heading => {
    heading.style.fontVariant = 'normal';
  });
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

      bannerDiv.append(createStepIndicator());

      table.replaceWith(bannerDiv);
    }
  });
}

function removeOldStepTitle() {
  // HACK: this element has no ID so selecting it is complicated
  const tables = document.querySelectorAll('table');
  tables.forEach(table => {
    const tbody = table.querySelector('tbody');
    if (tbody) {
      const tr = tbody.querySelector('tr');
      if (tr && tr.style.backgroundColor === 'rgb(0, 191, 255)') {
        const td = tr.querySelector('td');
        if (td && td.querySelector('a')) {
          table.remove();
        }
      }
    }
  });
}

function createStepIndicator() {
  const inputs = document.querySelectorAll('table input[type="submit"][id*="header"]');

  const steps = Array.from(inputs).map(input => input.value);
  const activeIndex = Array.from(inputs).findIndex(input => input.style.fontWeight === 'bold');

  const stepIndicator = document.createElement('div');
  stepIndicator.className = 'usa-step-indicator--no-labels';
  stepIndicator.style.padding = '10px';

  const ol = document.createElement('ol');
  ol.className = 'usa-step-indicator__segments';

  steps.forEach((step, index) => {
    const li = document.createElement('li');
    li.className = 'usa-step-indicator__segment';

    if (index < activeIndex) {
      li.classList.add('usa-step-indicator__segment--complete');
    } else if (index === activeIndex) {
      li.classList.add('usa-step-indicator__segment--current');
      li.setAttribute('aria-current', 'true');
    }

    const span = document.createElement('span');
    span.className = 'usa-step-indicator__segment-label';
    span.textContent = step;

    if (index < activeIndex) {
      const srSpan = document.createElement('span');
      srSpan.className = 'usa-sr-only';
      srSpan.textContent = 'completed';
      span.appendChild(srSpan);
    } else if (index > activeIndex) {
      const srSpan = document.createElement('span');
      srSpan.className = 'usa-sr-only';
      srSpan.textContent = 'not completed';
      span.appendChild(srSpan);
    }

    li.appendChild(span);
    ol.appendChild(li);
  });

  stepIndicator.appendChild(ol);

  const header = document.createElement('div');
  header.className = 'usa-step-indicator__header';

  const h4 = document.createElement('h4');
  h4.className = 'usa-step-indicator__heading';

  const counterSpan = document.createElement('span');
  counterSpan.className = 'usa-step-indicator__heading-counter';

  const srSpanStep = document.createElement('span');
  srSpanStep.className = 'usa-sr-only';
  srSpanStep.textContent = 'Step';
  counterSpan.appendChild(srSpanStep);

  const currentStepSpan = document.createElement('span');
  currentStepSpan.className = 'usa-step-indicator__current-step';
  currentStepSpan.style.marginRight = '10px';
  currentStepSpan.textContent = activeIndex + 1;
  counterSpan.appendChild(currentStepSpan);

  const totalStepsSpan = document.createElement('span');
  totalStepsSpan.className = 'usa-step-indicator__total-steps';
  totalStepsSpan.textContent = `of ${steps.length}`;
  counterSpan.appendChild(totalStepsSpan);

  h4.appendChild(counterSpan);

  const textSpan = document.createElement('span');
  textSpan.className = 'usa-step-indicator__heading-text';
  textSpan.textContent = steps[activeIndex];
  h4.appendChild(textSpan);

  header.appendChild(h4);
  stepIndicator.appendChild(header);

  return stepIndicator;
}

function logoutHeader() {
  const logoutHeader = document.createElement('div');
  logoutHeader.style.display = 'flex';
  logoutHeader.style.alignItems = 'center';
  logoutHeader.style.justifyContent = 'space-between';
  logoutHeader.style.width = '100%';

  const logoTitleContainer = document.createElement('div');
  logoTitleContainer.style.display = 'flex';
  logoTitleContainer.style.alignItems = 'center';
  logoTitleContainer.style.marginRight = '18px';

  var imgElement = document.createElement('img');
  imgElement.src = 'https://beta.nj.gov/files/dol_logo.png';
  imgElement.height = 60;
  imgElement.alt = 'Official logo for the New Jersey Department of Labor';
  imgElement.style.marginTop = '8px';
  imgElement.style.marginBottom = '8px';
  imgElement.style.marginLeft = '18px';
  imgElement.style.marginRight = '10px';

  logoTitleContainer.appendChild(imgElement);

  var title = document.createElement('h1');
  title.style.fontVariant = 'normal';
  title.style.color = 'black';
  title.style.fontSize = '16px';
  title.style.padding = '0';
  title.style.margin = '0';
  title.style.textAlign = 'left';
  title.textContent = 'New Jersey Temporary Disability Insurance Application';
  logoTitleContainer.appendChild(title);

  logoutHeader.appendChild(logoTitleContainer);

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

  window.addEventListener('resize', adjustLayout);
  adjustLayout();

  function adjustLayout() {
    if (window.innerWidth < 480) {
      logoutHeader.style.flexDirection = 'column';
      logoutHeader.style.alignItems = 'flex-start';
      logoTitleContainer.style.marginBottom = '10px';
      buttonElement.style.marginBottom = '10px';
    } else {
      logoutHeader.style.flexDirection = 'row';
      logoutHeader.style.alignItems = 'center';
      logoTitleContainer.style.marginBottom = '0';
      buttonElement.style.marginBottom = '0';
    }
  }

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
  alertHeading.style.fontSize = '1.33rem';
  alertHeading.style.fontWeight = 'bold';
  alertHeading.textContent = 'A new look is coming!';

  const alertText = document.createElement('p');
  alertText.classList.add('usa-alert__text');
  alertText.style.fontSize = '1.06rem';
  alertText.style.lineHeight = '1.5';
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
  h3.style.fontVariant = 'normal';
  h3.style.fontWeight = 'bold';
  h3.style.color = 'black';
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
    logEvent('FAQ Clicked', { pageId });
    return window.open('http://lwd.dol.state.nj.us/labor/tdi/content/webapplicationfaq.html#1');
  };

  resourcesDiv.appendChild(resourcesLink);
  gridDiv.appendChild(resourcesDiv);

  footer.appendChild(gridDiv);

  return footer;
}

function adjustTabHeights() {
  const targetElements = document.querySelectorAll('div.ajax__tab_header span.ajax__tab_tab');
  targetElements.forEach(element => {
    if (element.id.includes('__tab_ContentPlaceHolder1')) {
      element.style.height = '20px';
    }
  });
}
