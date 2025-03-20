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
    exit 1  # Error
fi
