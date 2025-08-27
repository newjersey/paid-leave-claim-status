
import { applyFooter } from "./footer.js";
import { adjustTabHeights, replaceHeader } from "./header.js";

export function globalDesignChanges(pageId) {
  applyBackgroundColor();
  replaceHeader();
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
