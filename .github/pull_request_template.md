<!-- Please complete the following sections as necessary. -->

## Description

[Ticket](https://github.com/)

<!-- Summary of the changes, related issue, relevant motivation, and context -->

## Approach

<!-- Any changed dependencies, e.g. requires an install/update/migration, etc. -->

## Steps to test

<!-- If this work affects a user's experience, provide steps to test these changes in-app. -->

## How to view changes
HTML files in `cypress/fixtures/` show example pages with the override scripts. They can be viewd as vanilla HTML pages (e.g. opening the file in your browser). Compare with the THML pages in the dev branch to these to see the changes made.
- If you want to see what a page looks like without the script altogether, delete the `<pageName>.min.js` override script in the directory (e.g. `claimDetail.min.js` in `cypress/fixtures/claimDetail/`),save, and then view one of the HTML files in that directory. `npm run build` will regenerate the scripts.
- If you want to make changes to this, you can update the js in `src/claimStatus/paymentDetail.js`, run `npm run build` and then view these HTML pages.


## Notes

<!-- Additional information, key learnings, and future development considerations. -->
