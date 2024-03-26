#!/bin/bash

stage=$1

# capitalize first letter for file name
stage_name="$(tr '[:lower:]' '[:upper:]' <<< ${stage:0:1})${stage:1}"

echo "Moving scripts to beta repo... (assumes repo folder in root)"
cp dist/noRecordFound.min.js "../beta/files/tdi-fli-claim-status/ssnNotFoundOverride${stage_name}.min.js"
cp dist/appReceived.min.js "../beta/files/tdi-fli-claim-status/statusMailLogOverride${stage_name}.min.js"
cp dist/claimList.min.js "../beta/files/tdi-fli-claim-status/claimListOverride${stage_name}.min.js"
cp dist/claimDetail.min.js "../beta/files/tdi-fli-claim-status/claimDetailOverride${stage_name}.min.js"
cp dist/paymentDetail.min.js "../beta/files/tdi-fli-claim-status/paymentDetailOverride${stage_name}.min.js"

echo "Complete!"