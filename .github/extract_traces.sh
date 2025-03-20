#!/bin/bash

echo "Extracting .trace files from ZIP archives..."
find test-results -type f -name "*.zip" -execdir unzip -o {} "*.trace" \;
