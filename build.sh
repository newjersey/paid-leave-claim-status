#!/bin/bash

echo "Using rollup to bundle & minify files..." 

rollup -c rollup.config.mjs -i src/noRecordFound.js -o dist/noRecordFound.min.js
rollup -c rollup.config.mjs -i src/appReceived.js -o dist/appReceived.min.js
rollup -c rollup.config.mjs -i src/claimList.js -o dist/claimList.min.js
rollup -c rollup.config.mjs -i src/claimDetail.js -o dist/claimDetail.min.js
rollup -c rollup.config.mjs -i src/paymentDetail.js -o dist/paymentDetail.min.js

echo "Copying bundled scripts to Cypress test assets..."
cp dist/noRecordFound.min.js cypress/fixtures/noRecordFound/noRecordFound.min.js
cp dist/claimDetail.min.js cypress/fixtures/claimDetail/claimDetail.min.js
cp dist/claimList.min.js cypress/fixtures/claimList/claimList.min.js

echo "Complete!"