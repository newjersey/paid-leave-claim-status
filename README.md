# Paid Leave Benefits - Claim Status and TDI Claim

This repository contains the code used to redesign the existing "Claim Status" application used for New Jersey's Temporary Disability Insurance (TDI) and Family Leave Insurance (FLI), managed by the Department of Labor.

## Approach

JavaScript scripts are injected onto the existing application and manually update the layout and content for a better user experience. Rather than updating the existing JSP code directly, this will enable frequent testing on dev and deployments to prod without OIM as a dependency, both in terms of infrastructure and bandwidth. See `CHANGELOG.md` for list of updates made to production.

The script files are hosted on the `beta.nj.gov` domain and automatically pushed from the `beta` Github repository. This repository houses the code and tests for developing the scripts, while the `beta` repository simply houses the compiled assets that need to be hosted. Note that there is a `dev` and `prod` hosting of the scripts, which corresponds to the dev and prod (https://secure.dol.state.nj.us/DOL_DABI/) versions of the Claim Status application.

The same approach is taken for the TDI Claim Application, which is built on an underlying codebase of .NET 4.0. Thus it is the `.NET Analytics, Modernization, and Accessibility for New Jersey (NAMAN)` approach.

## Setup

1. Clone this `paid-leave-claim-status` repository
2. Use Node 20
3. Run `npm install` to install dependencies
4. Run `npm run build` to build bundled files
5. Run `npm test` to run Cypress tests

## Development

When you make a change and want to see if everything is working, do the following:

1. Edit `.js` file in `src/` directory (edit corresponding Cypress test if relevant)
2. Run `npm run build` to compile files
3. Run `npm test` to ensure tests still pass
4. Open relevant test file in `cypress/fixtures` in browser to ensure change looks okay (edit or add new test file if your scenario is not covered).
5. You can use [Local Overrides](https://developer.chrome.com/docs/devtools/overrides) while navigating on the live Test environment to test changes that involve multiple screens. (For TDI Claim Application: Because the underlying pages append the current datetime's minute when fetching the JS override, you need a file for every minute while you are testing. You can use `generateLocalDevOverrides.sh` to generate 20 minutes' worth of override files.)
6. After code review, push changes to `dev` branch.
7. Deploy the changes to the beta environment. See instructions below for deployment.

## Deployment

1. If deploying to production, create a PR to squash & merge changes from `dev` into `prod`.
2. Trigger the `Deploy to Beta` action in the GitHub UI for either `dev` or `prod`. This workflow (defined the same on all branches) will refresh the builds on the specified branch, and make a PR in the `beta` repo.
3. Once the files are merged to the `main` branch of `beta` repo, they will be automatically deployed to `beta.nj.gov` to be referenced by the Claim Status/TDI application.

_Note_: The following [internal Google Doc](https://docs.google.com/document/d/1XD06eJ9Q6e5z8_fKcQrDs7K6r0lbsqMab_xlikYdqAA/edit?usp=sharing) has URLs and account credentials to test claim status scenarios live in both development and production.
