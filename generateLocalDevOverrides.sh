#!/bin/bash

# Update to match your local override directory and source file path
OVERRIDE_DIR="/Users/johnchan/Documents/chrome-overrides/beta.nj.gov/files/tdi-fli-claim-application"
SOURCE_FILE="/Users/johnchan/paid-leave-claim-status/cypress/fixtures/claimApplication/tdiOverride.min.js"

# Use provided timestamp or default to current UTC time
if [ -z "$1" ]; then
    START_TIMESTAMP=$(date -u "+%Y%m%d%H%M")
    echo "No timestamp provided, using current UTC time: $START_TIMESTAMP"
else
    START_TIMESTAMP="$1"
    echo "Using provided timestamp: $START_TIMESTAMP"
fi

mkdir -p "$OVERRIDE_DIR"

# Generate files for 20 minutes starting from the timestamp
for i in $(seq 0 20); do
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS: parse input timestamp, add i minutes
        TIMESTAMP=$(date -u -j -f "%Y%m%d%H%M" -v+${i}M "$START_TIMESTAMP" "+%Y%m%d%H%M")
    else
        # Linux
        TIMESTAMP=$(date -u -d "${START_TIMESTAMP:0:8} ${START_TIMESTAMP:8:2}:${START_TIMESTAMP:10:2} + ${i} minutes" "+%Y%m%d%H%M")
    fi
    
    FILENAME="tdiOverrideDev.min.js?v=${TIMESTAMP}"
    
    cp "$SOURCE_FILE" "$OVERRIDE_DIR/$FILENAME"
    echo "Created: $FILENAME"
done

echo "Done! Files created in $OVERRIDE_DIR"
