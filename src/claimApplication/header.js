import i18next from 'i18next';
import { HEADER_HTML } from "../modules/shared.mjs";
import { id as priorClaimSearchId } from "./priorClaimSearch/priorClaimSearch";
import { id as tdiIntroductionId } from "./tdiIntroduction/tdiIntroduction";
import { id as completeExistingIntroId } from "./completeExistingIntro/completeExistingIntro";
import { clearSessionData } from "./utils";

export function replaceHeader(pageId) {
  const screensWithoutTabs = [priorClaimSearchId, tdiIntroductionId, completeExistingIntroId];
  if (screensWithoutTabs.includes(pageId)) {
    replacePopulatedHeader();
  } else {
    let headerReady = false;
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(() => {
        if (headerReady) return;
        const tabsDiv = document.querySelector('.ajax__tab_header');
        if (tabsDiv) {
          headerReady = true;
          replacePopulatedHeader();
          const event = new CustomEvent('headerReady');
          document.dispatchEvent(event);
          observer.disconnect();
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true,
    });
  }
}

function replacePopulatedHeader() {
  addHeaderStyling();
  resetHeader();
  hideLogoHeader();
  hideSectionTitle();
  hideIntroSectionTitleElement();
}

function addHeaderStyling() {
  const style = document.createElement('style');  
  style.innerHTML = `
    #headerWithMargin {
      margin-left: 142px;
      margin-right: 142px;
    }

    #pageTitle {
      margin-bottom: 20px;
    }
    
    #titleHeader {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 25px;
      width: 100%;
    }

    #logoTitleContainer {
      display: flex;
      align-items: center;
      margin-right: 18px;
    }

    #logoutButton {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.75rem 1.25rem;
      margin-bottom: 0;
    }

    .usa-alert__heading {
      font-family: "Public Sans", sans-serif;
    }

    .ajax__tab_header {
      display: none;
    }

    @media (max-width: 767px) {
      #headerWithMargin {
        margin-left: 20px;
        margin-right: 20px;
      }
    }

    @media (max-width: 480px) {
      #titleHeader {
        flex-direction: column;
        align-items: flex-start;
      }
      
      #logoTitleContainer {
        margin-bottom: 10px;
      }
      
      #logoutButton {
        margin-bottom: 10px;
        width: 100%;
      }
    }
  `;
  document.head.appendChild(style);
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

  const newPageTitleText = getActiveTabTitle() || getSectionTitle();
  headerWithMargin.append(newPageTitle(newPageTitleText));

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
      backButton.style.padding = '20px 0';

      backButton.addEventListener('click', () => {
        const tabLink = previousTab.querySelector('a');
        if (tabLink) {
          tabLink.click();
          resetHeader();
          document.dispatchEvent(new CustomEvent('backButtonClicked'));
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
      return activeTab.textContent.trim();
    }
  }

  return null;
}

function getSectionTitleElement() {
  // HACK: this element has no ID or class so selecting it is complicated
  const tables = document.querySelectorAll('table');
  for (let table of tables) {
    const tbody = table.querySelector('tbody');
    if (tbody) {
      const tr = tbody.querySelector('tr');
      if (tr && tr.style.backgroundColor === 'rgb(0, 191, 255)' && tr.querySelector('td')) {
        return tr;
      }
    }
  }
  return null;
}

function hideSectionTitle() {
  const tr = getSectionTitleElement();
  if (tr) {
    tr.style.display = 'none';
  }
}

function hideIntroSectionTitleElement() {
  const introSectionTitleElement = getIntroSectionTitleElement();
  if (introSectionTitleElement) {
    introSectionTitleElement.style.display = 'none';
  }
}

function getIntroSectionTitleElement() {
  return document.querySelector('#ContentPlaceHolder1_tblContent tbody tr');
}

function getSectionTitle() {
  const tr = getSectionTitleElement();
  if (tr) {
    return tr.textContent.trim();
  } else {
    const introSectionTitleElement = getIntroSectionTitleElement();
    return introSectionTitleElement ? introSectionTitleElement.textContent.trim() : null;
  }
}

function newPageTitle(text) {
  const pageTitle = document.createElement('h1');
  pageTitle.id = 'pageTitle';
  pageTitle.style.fontVariant = 'normal';
  pageTitle.style.fontWeight = 'bold';
  pageTitle.style.color = 'black';
  pageTitle.style.textAlign = 'left';
  const capitalizedText = capitalizeFirstLetterOfEachWord(text);
  pageTitle.textContent = spellCheck(capitalizedText);
  return pageTitle;
}

function createStepIndicator() {
  const inputs = document.querySelectorAll('table input[type="submit"][id*="header"]');

  if (inputs.length === 0) {
    return null;
  }

  const steps = [
    i18next.t('header.personal_information'),
    i18next.t('header.leave_information'),
    i18next.t('header.work_information'),
    i18next.t('header.agree_and_finish'),
    i18next.t('header.summary_and_next_steps'),
  ];

  const newConfirmationSectionIndex = 4;

  const activeIndex = getActiveTabTitle() == "Confirmation" 
    ? newConfirmationSectionIndex
    : Array.from(inputs).findIndex(input => input.style.fontWeight === 'bold');

  const stepIndicator = document.createElement('div');
  stepIndicator.className = 'usa-step-indicator--no-labels';

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
  titleHeader.id = 'titleHeader';
  titleHeader.style.display = 'flex';
  titleHeader.style.alignItems = 'center';
  titleHeader.style.justifyContent = 'space-between';
  titleHeader.style.width = '100%';

  const logoTitleContainer = document.createElement('div');
  logoTitleContainer.id = 'logoTitleContainer';
  logoTitleContainer.style.display = 'flex';
  logoTitleContainer.style.alignItems = 'center';
  logoTitleContainer.style.marginRight = '18px';

  var imgElement = document.createElement('img');
  imgElement.src = 'https://beta.nj.gov/files/dol_logo.png';
  imgElement.height = 60;
  imgElement.alt = 'Official logo for the New Jersey Department of Labor';
  imgElement.style.marginTop = '8px';
  imgElement.style.marginBottom = '8px';
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
      clearSessionData();
    }
  });

  titleHeader.appendChild(logoutButton);

  return titleHeader;
}

function spellCheck(text) {
  return text.replace(/Beneits/g, 'Benefits');
}

function capitalizeFirstLetterOfEachWord(text) {
  return text.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
}
