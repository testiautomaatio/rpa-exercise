#!/bin/bash

# Check if a search string was provided
if [ -z "$1" ]; then
    echo "Usage: $0 <search_string>"
    exit 1
fi

SEARCH_STRING="$1"

if grep -rqi "$SEARCH_STRING" --include="*.trace" test-results; then
    echo "'$SEARCH_STRING' was found in test traces."
    exit 0  # Success
else
    echo "'$SEARCH_STRING' was not found in test traces."
    echo
    echo "This typically means that the tests did not cover this specific scenario."
    echo "It could also mean that there was an error in running the tests, or a configuration issue,"
    echo "so please check the test results and logs for any errors or warnings."
    exit 1  # Error
fi
