import { HEADER_HTML } from "../modules/shared.mjs";

export function replaceHeader() {
  resetHeader();
  hideLogoHeader();
  hideSectionTitle();
  hideTabs();
}

function resetHeader() {
  const existingHeader = document.getElementById('headerContainer');
  if (existingHeader) {
    existingHeader.remove();
  }

  const newHeader = document.createElement('div');
  newHeader.id = 'headerContainer';

  const fullWidthHeader = document.createElement('div');
  fullWidthHeader.id = 'fullWidthHeader';

  fullWidthHeader.append(createDolNameHeader());

  const alertBodyDiv = newDesignAlert();
  if (alertBodyDiv) {
    fullWidthHeader.append(alertBodyDiv);
  }

  newHeader.append(fullWidthHeader);

  const headerWithMargin = document.createElement('div');
  headerWithMargin.id = 'headerWithMargin';

  headerWithMargin.append(createTitleHeader());

  const backButton = createBackButton();
  if (backButton) {
    headerWithMargin.append(backButton);
  }

  const stepIndicator = createStepIndicator();
  if (stepIndicator) {
    headerWithMargin.append(stepIndicator);
  }

  const activeTabTitle = getActiveTabTitle();
  const sectionTitle = getSectionTitle();
  
  headerWithMargin.append(newPageTitle(activeTabTitle || sectionTitle));

  newHeader.append(headerWithMargin);

  document.body.prepend(newHeader);
}

function hideLogoHeader() {
  const tables = document.querySelectorAll('#form1 > table');
  tables.forEach(table => {
    const bannerImage = Array.from(table.querySelectorAll('img')).find(img => img.src.includes('lwd_banner.jpg'));
    const logoImage = Array.from(table.querySelectorAll('img')).find(img => img.src.includes('lwd_logo.jpg'));
    const hasLogoutLink = table.querySelector('a#header_lbtnLogout');

    if (bannerImage && logoImage && hasLogoutLink) {
      table.style.display = 'none';
    }
  });
}

function createDolNameHeader() {
  const dolNameHeader = document.createElement('div');
  dolNameHeader.innerHTML = HEADER_HTML;
  return dolNameHeader;
}


function createBackButton() {
  const tabsDiv = document.querySelector('.ajax__tab_header');
  if (tabsDiv) {
    const allTabs = Array.from(tabsDiv.children);

    const selectableTabs = allTabs.filter(tab =>
      !tab.classList.contains('ajax__tab_disabled') && !tab.classList.contains('ajax__tab_active')
    );

    if (selectableTabs.length > 0) {
      const previousTab = selectableTabs[selectableTabs.length - 1];
      const backButton = document.createElement('button');
      backButton.className = 'usa-button usa-button--unstyled';
      backButton.type = 'button';
      backButton.textContent = '< Back';

      backButton.addEventListener('click', () => {
        const tabLink = previousTab.querySelector('a');
        if (tabLink) {
          tabLink.click();
          resetHeader();
        }
      });


      return backButton;
    }
  }

  return null;
}

function getActiveTabTitle() {
  const tabsDiv = document.querySelector('.ajax__tab_header');
  if (tabsDiv) {
    const activeTab = tabsDiv.querySelector('.ajax__tab_active');
    if (activeTab) {
      return activeTab.textContent;
    }
  }

  return null;
}

function hideTabs() {
  const tabsDiv = document.querySelector('.ajax__tab_header');
  if (tabsDiv) {
    tabsDiv.style.display = 'none';
  }
}

function getSectionTitleElement() {
  // HACK: this element has no ID or class so selecting it is complicated
  const tables = document.querySelectorAll('table');
  for (let table of tables) {
    const tbody = table.querySelector('tbody');
    if (tbody) {
      const tr = tbody.querySelector('tr');
      if (tr && tr.style.backgroundColor === 'rgb(0, 191, 255)' && tr.querySelector('td')) {
        return table;
      }
    }
  }
  return null;
}

function hideSectionTitle() {
  const table = getSectionTitleElement();
  if (table) {
    table.style.display = 'none';
  }
}

function getSectionTitle() {
  const table = getSectionTitleElement();
  if (table) {
    const tr = table.querySelector('tbody tr');
    return tr ? tr.textContent.trim() : null;
  }
  return null;
}

function newPageTitle(text) {
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

function createTitleHeader() {
  const titleHeader = document.createElement('div');
  titleHeader.style.display = 'flex';
  titleHeader.style.alignItems = 'center';
  titleHeader.style.justifyContent = 'space-between';
  titleHeader.style.width = '100%';

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

  titleHeader.appendChild(logoTitleContainer);

  var logoutButton = document.createElement('button');
  logoutButton.id = 'logoutButton';
  logoutButton.style.display = 'flex';
  logoutButton.style.alignItems = 'center';
  logoutButton.style.padding = '0.75rem 1.25rem';
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

  titleHeader.appendChild(logoutButton);

  window.addEventListener('resize', adjustLayout);
  adjustLayout();

  function adjustLayout() {
    if (window.innerWidth < 480) {
      titleHeader.style.flexDirection = 'column';
      titleHeader.style.alignItems = 'flex-start';
      logoTitleContainer.style.marginBottom = '10px';
      logoutButton.style.marginBottom = '10px';
    } else {
      titleHeader.style.flexDirection = 'row';
      titleHeader.style.alignItems = 'center';
      logoTitleContainer.style.marginBottom = '0';
      logoutButton.style.marginBottom = '0';
    }
  }

  return titleHeader;
}

function newDesignAlert() {
  const isAlertDismissed = localStorage.getItem('newLookAlertDismissed');
  if (isAlertDismissed) {
    return null;
  }

  const alertDiv = document.createElement('div');
  alertDiv.id = 'info-alert';
  alertDiv.style.marginTop = '0';
  alertDiv.classList.add('usa-alert', 'usa-alert--info');

  const alertBodyDiv = document.createElement('div');
  alertBodyDiv.classList.add('usa-alert__body');

  const alertHeading = document.createElement('p');
  alertHeading.classList.add('usa-alert__heading');
  alertHeading.style.fontSize = '16px';
  alertHeading.style.fontWeight = 'bold';
  alertHeading.textContent = 'A new look is coming!';

  const alertText = document.createElement('p');
  alertText.classList.add('usa-alert__text');
  alertText.style.fontSize = '16px';
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

function capitalizeFirstLetterOfEachWord(text) {
  return text.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
}
