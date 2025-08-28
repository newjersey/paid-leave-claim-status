import { HEADER_HTML } from "../modules/shared.mjs";

export function replaceHeader() {
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

      const stepIndicator = createStepIndicator();
      if (stepIndicator) {
        bannerDiv.append(stepIndicator);
        replaceStepTitle();
      } else {
        bannerDiv.append();
        replaceStepTitle(true);
      }

      table.replaceWith(bannerDiv);
    }
  });
}

function replaceStepTitle(singleStep = false) {
  // HACK: this element has no ID so selecting it is complicated
  const tables = document.querySelectorAll('table');
  tables.forEach(table => {
    const tbody = table.querySelector('tbody');
    if (tbody) {
      const tr = tbody.querySelector('tr');
      if (tr && tr.style.backgroundColor === 'rgb(0, 191, 255)') {
        if (tr.querySelector('td')) {
          const stepTitleText = tr.textContent;
          tr.remove();
          if (singleStep) {
            tbody.prepend(newStepTitle(stepTitleText));
          }
        }
      }
    }
  });
}

function newStepTitle(text) {
  const stepTitle = document.createElement('h1');
  stepTitle.style.fontVariant = 'normal';
  stepTitle.style.fontWeight = 'bold';
  stepTitle.style.color = 'black';
  stepTitle.style.textAlign = 'left';
  stepTitle.textContent = capitalizeFirstLetterOfEachWord(text);
  return stepTitle;
}

function createStepIndicator() {
  const inputs = document.querySelectorAll('table input[type="submit"][id*="header"]');

  if (inputs.length === 0) {
    return null;
  }

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

  const title = document.createElement('div');
  title.className = 'usa-step-indicator__heading';

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

  title.appendChild(counterSpan);

  const textSpan = document.createElement('span');
  textSpan.className = 'usa-step-indicator__heading-text';
  textSpan.textContent = steps[activeIndex];
  title.appendChild(textSpan);

  header.appendChild(title);
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

  var title = document.createElement('p');
  title.style.fontVariant = 'normal';
  title.style.color = 'black';
  title.style.fontSize = '16px';
  title.style.padding = '0';
  title.style.margin = '0';
  title.style.textAlign = 'left';
  title.textContent = 'New Jersey Temporary Disability Insurance Application';
  logoTitleContainer.appendChild(title);

  logoutHeader.appendChild(logoTitleContainer);

  var logoutButton = document.createElement('button');
  logoutButton.id = 'logoutButton';
  logoutButton.style.display = 'flex';
  logoutButton.style.alignItems = 'center';
  logoutButton.classList.add('usa-button', 'usa-button--outline');

  var iconElement = document.createElement('span');
  iconElement.style.marginRight = '5px';
  iconElement.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
      <path d="M0 0h24v24H0z" fill="none"/>
      <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" fill="currentColor"/>
    </svg>
  `;

  logoutButton.prepend(iconElement);

  var textElement = document.createElement('span');
  textElement.textContent = 'Logout';
  textElement.style.marginTop = '3px';

  logoutButton.appendChild(textElement);

  logoutButton.addEventListener('click', function (event) {
    event.preventDefault();
    if (confirmLogout()) {
      __doPostBack('ctl00$header$lbtnLogout', '');
    }
  });

  logoutHeader.appendChild(logoutButton);

  window.addEventListener('resize', adjustLayout);
  adjustLayout();

  function adjustLayout() {
    if (window.innerWidth < 480) {
      logoutHeader.style.flexDirection = 'column';
      logoutHeader.style.alignItems = 'flex-start';
      logoTitleContainer.style.marginBottom = '10px';
      logoutButton.style.marginBottom = '10px';
    } else {
      logoutHeader.style.flexDirection = 'row';
      logoutHeader.style.alignItems = 'center';
      logoTitleContainer.style.marginBottom = '0';
      logoutButton.style.marginBottom = '0';
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

export function adjustTabHeights() {
  const targetElements = document.querySelectorAll('div.ajax__tab_header span.ajax__tab_tab');
  targetElements.forEach(element => {
    if (element.id.includes('__tab_ContentPlaceHolder1')) {
      element.style.height = '20px';
    }
  });
}

function capitalizeFirstLetterOfEachWord(text) {
  return text.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
}
