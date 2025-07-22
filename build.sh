#!/bin/bash

echo "Using rollup to bundle & minify files..." 

rollup -c rollup.config.mjs -i src/claimStatus/noRecordFound.js -o dist/claimStatus/noRecordFound.min.js
rollup -c rollup.config.mjs -i src/claimStatus/appReceived.js -o dist/claimStatus/appReceived.min.js
rollup -c rollup.config.mjs -i src/claimStatus/claimList.js -o dist/claimStatus/claimList.min.js
rollup -c rollup.config.mjs -i src/claimStatus/claimDetail.js -o dist/claimStatus/claimDetail.min.js
rollup -c rollup.config.mjs -i src/claimStatus/paymentDetail.js -o dist/claimStatus/paymentDetail.min.js

rollup -c rollup.config.mjs -i src/claimApplication/tdiOverride.js -o dist/claimApplication/tdiOverride.min.js

echo "Copying bundled scripts to Cypress test assets..."
cp dist/claimStatus/noRecordFound.min.js cypress/fixtures/claimStatus/noRecordFound/noRecordFound.min.js
cp dist/claimStatus/claimDetail.min.js cypress/fixtures/claimStatus/claimDetail/claimDetail.min.js
cp dist/claimStatus/claimList.min.js cypress/fixtures/claimStatus/claimList/claimList.min.js
cp dist/claimStatus/paymentDetail.min.js cypress/fixtures/claimStatus/paymentDetail/paymentDetail.min.js

cp dist/claimApplication/tdiOverride.min.js cypress/fixtures/claimApplication/tdiIntroduction/tdiOverride.min.js

echo "Complete!"
