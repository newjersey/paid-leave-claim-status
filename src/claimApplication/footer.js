import { isDesktop, ICON_BASE_URL, logEvent } from "../modules/shared.mjs";

export function applyFooter(pageId) {
  const bodyContent = document.body;
  if (bodyContent) {
    bodyContent.appendChild(createFooterElement(pageId));
  } else {
    console.error("Cannot find the body element to append the footer.");
  }
}

function createFooterElement(pageId) {
  const existingFooter = document.getElementById('helpSection');
  if (existingFooter) {
    existingFooter.remove();
  }

  const footer = document.createElement('footer');
  footer.id = 'helpSection';
  footer.style.backgroundColor = '#eff6fb';
  const horizontalPadding = isDesktop() ? '54px' : '13px';
  footer.style.padding = `20px ${horizontalPadding} 50px ${horizontalPadding}`;
  footer.style.border = '0.5px solid #565C65';
  footer.style.color = '#000000';
  footer.style.margin = '0';

  const title = document.createElement('h2');
  title.style.margin = '0';
  title.style.fontSize = '22px';
  title.style.lineHeight = '32px';
  title.style.marginBottom = '8px';
  title.style.fontVariant = 'normal';
  title.style.fontWeight = 'bold';
  title.style.color = 'black';
  title.textContent = 'Need help?';
  footer.appendChild(title);

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
    img.alt = item.label;
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
  emailImg.alt = 'email';
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
  img.alt = 'info';
  iconDiv.appendChild(img);
  gridDiv.appendChild(iconDiv);

  const resourcesDiv = document.createElement('div');
  resourcesDiv.style.lineHeight = '21px';
  
  const resourcesLink = document.createElement('a');
  resourcesLink.id = "resourcesLink";
  resourcesLink.href = "https://www.nj.gov/labor/myleavebenefits/worker/resources/";
  resourcesLink.target = "_blank";
  resourcesLink.style.textUnderlineOffset = '2px';
  resourcesLink.innerHTML = "<strong>Helpful resources</strong>";
  
  resourcesLink.onclick = function () {
    logEvent('Resources Clicked', { pageId });
  };

  resourcesDiv.appendChild(resourcesLink);
  gridDiv.appendChild(resourcesDiv);

  footer.appendChild(gridDiv);

  return footer;
}
