#!/bin/bash
# Post-merge setup script: runs automatically after task agent merges.
set -e

echo "Running post-merge setup..."

# Install any new dependencies
npm install

echo "Post-merge setup complete."
