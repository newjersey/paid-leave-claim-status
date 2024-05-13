# Paid Leave Benefits - Claim Status

This repository contains the code used to redesign the existing "Claim Status" application used for New Jersey's Temporary Disability Insurance (TDI) and Family Leave Insurance (FLI), managed by the Department of Labor.

## Approach

JavaScript scripts are injected onto the existing application and manually update the layout and content for a better user experience. Rather than updating the existing JSP code directly, this will enable frequent testing on dev and deployments to prod without OIM as a dependency, both in terms of infrastructure and bandwidth. See `CHANGELOG.md` for list of updates made to production.

## Setup

1. Clone this `paid-leave-claim-status` repository
2. Use Node 20
3. Run `npm install` to install dependencies
4. Run `npm run build` to build bundled files
5. Run `npm test` to run Cypress tests

## Deployment

1. Clone the `beta` repository in the same local folder that the `paid-leave-claim-status` folder is in
2. Run `npm run build` to build latest files into bundle
3. Run `npm run prep-deploy-dev` (or `prep-deploy-prod` based on intended stage), which should copy the files into the correct `beta` directory
4. Push files to `main` branch of `beta` repo, and they will be automatically deployed to `beta.nj.gov` to be referenced by the Claim Status application
