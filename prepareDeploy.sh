#!/bin/bash

stage=$1

# capitalize first letter for file name
stage_name="$(tr '[:lower:]' '[:upper:]' <<< ${stage:0:1})${stage:1}"

current_branch=$(git rev-parse --abbrev-ref HEAD)
if [ "$current_branch" != "$stage" ]; then
  echo "Error: You must be on the '$stage' branch to run this script. Current branch is '$current_branch'."
  exit 1
fi

echo "Moving scripts to beta repo... (assumes repo folder in root)"
cp dist/claimApplication/tdiOverride.min.js "../beta/files/tdi-fli-claim-application/tdiOverride${stage_name}.min.js"

cp dist/claimStatus/noRecordFound.min.js "../beta/files/tdi-fli-claim-status/ssnNotFoundOverride${stage_name}.min.js"
cp dist/claimStatus/appReceived.min.js "../beta/files/tdi-fli-claim-status/statusMailLogOverride${stage_name}.min.js"
cp dist/claimStatus/claimList.min.js "../beta/files/tdi-fli-claim-status/claimListOverride${stage_name}.min.js"
cp dist/claimStatus/claimDetail.min.js "../beta/files/tdi-fli-claim-status/claimDetailOverride${stage_name}.min.js"
cp dist/claimStatus/paymentDetail.min.js "../beta/files/tdi-fli-claim-status/paymentDetailOverride${stage_name}.min.js"

echo "Complete!"
