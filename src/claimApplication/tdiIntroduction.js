import {
  FOOTER_HTML,
  HEADER_HTML,
  makeMobileFriendly,
  setupAnalytics,
  updateIcon,
} from "../modules/shared.mjs";

if (document.readyState === "loading") {
  window.addEventListener("DOMContentLoaded", () => {
    executeOverride();
  });
} else {
  executeOverride();
}

function executeOverride() {
  updateIcon();
  setupAnalytics();
  makeMobileFriendly();
  replaceHeaderTable();
  replaceContentTable();
  appendFooter();
  makeLinkAccessible();
}

function replaceHeaderTable() {
  const headerTable = document.querySelector('table[style*="border-color: #800080"]');

  if (headerTable) {
    const newHeaderDiv = document.createElement('div');
    newHeaderDiv.innerHTML = HEADER_HTML;
    headerTable.replaceWith(newHeaderDiv);
  } else {
    console.error("Cannot find the header table to replace.");
  }
}

function replaceContentTable() {
  const contentTable = document.querySelector('table#ContentPlaceHolder1_tblContent');

  if (contentTable) {
    contentTable.style.display = 'none';

    const newDiv = document.createElement('div');
    newDiv.innerHTML = `
      <img
        src="https://beta.nj.gov/files/dol_logo.png"
        height="60"
        alt="Official logo for the New Jersey Department of Labor"
        style="margin-top: 36px; margin-bottom: 8px; margin-left: 8px; margin-right: 8px"
      />
      <h1>Application for State Temporary Disability Benefits</h1>
      Welcome to the New Jersey Division of Temporary Disability Insurance online application.
      <hr>
      <h2>Instructions for Filing Online</h2>
      <p>It is your responsibility to file this claim promptly. Your claim must be filed within thirty (30) days of the beginning of your disability period. Benefits may be denied or reduced if your claim is filed late.</p>
      <p>To use this application, you will need a printer. It is your responsibility to provide your health care provider with the instructions to file online. <strong>Any missing information may cause your application to be denied.</strong></p>
      <p>Questions noted by an asterisk (*) are required and must be answered. You will not be allowed to proceed until that question has a response.</p>
      <p>Allow approximately thirty (30) minutes to complete this application. If you begin the application but are unable to finish, you will have fourteen (14) days to return and complete your claim or your data will be removed. You will then need to restart the application process.
      If your disability date is in the future, you must also return to certify your claim within fourteen (14) days after your first date of disability or your data will be removed. 
      You will then need to restart the application process.</p>
      <p>After submitting your application, you will be provided a confirmation. Keep this confirmation for your records, as it is proof that you filed your claim successfully.</p>
      <p>If you require any assistance with your claim, call:
      <ul>
      <li>Customer Service Section (609) 292-7060</li>
      <li>Telecommunication Device for the Deaf (609) 292-8319</li>
      <li>New Jersey Relay Service: TT user 1-800-852-7899, Voice User 1-800-852-7897</li>
      </ul></p>
      <hr>
      <h2>After Submitting Your Application</h2>
      <p>If you recover or return to work earlier than expected, report this date immediately to the Division of Temporary Disability Insurance to avoid overpayment.</p>
      <hr>
      <h2>Data Privacy and Security</h2>
      <p>The information collected as a result of your application is private data and cannot be released except when authorized by state or federal law, by court order or with your permission.</p>
      <p>The information you or your health care provider submit may be used for any New Jersey Department of Labor and Workforce Development business. It may be shared with other state or federal agencies as permitted by law.</p>
      <p>Precautions are taken to keep the information you provide in this application private and secure. The online application uses a secure connection and the data submitted is encrypted. 
      Using a shared computer to complete this application may enable others to view your personal information.</p>
      <hr>
      <p>I have read the above information and wish to file an Application For State Temporary Disability Benefits.</p>
      <button
        style="background-color: #0076D6; border: none; color: #fff; padding: 12px 20px; cursor: pointer; border-radius: 4px; font-weight: 700; font-size: 16px; line-height: 24px; outline-offset: 0.25rem; margin: 0 0 20px 20px;"
        onclick="document.getElementById('ContentPlaceHolder1_chkAgree').checked = true; document.getElementById('__EVENTTARGET').value = 'ctl00$ContentPlaceHolder1$chkAgree'; __doPostBack('ctl00$ContentPlaceHolder1$chkAgree', '')"
      >
        Agree & Continue
      </button>
    `;
    contentTable.after(newDiv);
  } else {
    throw new Error("Cannot find HTML.");
  }
}

function appendFooter() {
  const bodyContent = document.body;
  if (bodyContent) {
    const footerDiv = document.createElement('div');
    footerDiv.innerHTML = FOOTER_HTML;
    bodyContent.appendChild(footerDiv);
  } else {
    console.error("Cannot find the body element to append the footer.");
  }
}

function makeLinkAccessible() {
  const link = document.getElementById('lnkFake');
  if (link) {
    link.setAttribute('aria-hidden', 'true');
    link.setAttribute('tabindex', '-1');
  }
}
