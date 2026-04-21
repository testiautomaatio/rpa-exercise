#!/usr/bin/env bash

# -e: Exit immediately if any command fails.
# -u: Treat use of unset variables as an error.
# -o pipefail: In a pipeline, fail if any command in the pipeline fails (not just the last one).
set -euo pipefail

# Install Playwright and types:
npm install

# Container does not include all browser dependencies, so we install them too:
npx playwright install chromium --with-deps
