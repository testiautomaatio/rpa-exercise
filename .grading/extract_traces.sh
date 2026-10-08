#!/bin/bash

echo "Extracting .trace files from ZIP archives..."
find test-results -type f -name "*.zip" -execdir unzip -oq '{}' '*.trace' \;

TRACE_FILES=$(find test-results -type f -name "*.trace")

if [ -z "$TRACE_FILES" ]; then
    echo "No trace files were found."
    echo
    echo "This typically means that the tests did not run, or produced no traces."
    echo "Please check the workflow logs to ensure that the environment was set"
    echo "up correctly and that the tests were executed."
    exit 1  # Error
fi

echo "Traces found in the following folders:"
echo
echo "$TRACE_FILES" | xargs -n1 dirname | sort -u
echo
echo
echo "These files contain all the browser states and events that were recorded during"
echo "the tests. They will be used to verify that the tests covered the expected"
echo "scenarios and that the application behaved as intended."
