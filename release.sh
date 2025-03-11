#!/bin/bash

# This script was generated using AI based on the written documentation for the release instructions.

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Ensure git, npm, and jq are installed
if ! command_exists git || ! command_exists npm || ! command_exists jq; then
    echo "Error: git, npm, and jq must be installed."
    exit 1
fi

# Step 1: Ensure you have the most recent commits to the SAF Action locally
echo "Step 1: Ensure you have the most recent commits to the SAF Action locally."
echo "Have you cloned the repository before? (yes/no)"
read cloned_before

if [ "$cloned_before" == "no" ]; then
    echo "Enter the repository URL:"
    read repo_url
    git clone "$repo_url"
    cd saf_action
else
    git pull
fi

# Step 2: Determine the new SAF Action version
echo "Step 2: Determine the new SAF Action version."

# Read default versions from package.json
default_saf_cli_version=$(jq -r '.dependencies["@mitre/saf"]' package.json | tr -d '^')
default_action_version=$(jq -r '.version' package.json)

echo "Enter the latest SAF CLI version [default: $default_saf_cli_version]:"
read saf_cli_version
saf_cli_version=${saf_cli_version:-$default_saf_cli_version}

echo "Enter the current SAF Action version (before this release update) [current version listed in package.json: $default_action_version]:"
read current_version
current_version=${current_version:-$default_action_version}

IFS='.' read -r -a cli_version_parts <<< "$saf_cli_version"
IFS='.' read -r -a action_version_parts <<< "$current_version"

if [ "${cli_version_parts[0]}" -gt "${action_version_parts[0]}" ]; then
    new_version="${cli_version_parts[0]}.0.0"
elif [ "${cli_version_parts[1]}" -gt "${action_version_parts[1]}" ]; then
    new_version="${action_version_parts[0]}.$((action_version_parts[1] + 1)).0"
else
    new_version="${action_version_parts[0]}.${action_version_parts[1]}.$((action_version_parts[2] + 1))"
fi

echo "New SAF Action version: $new_version"

# Step 3: Update package.json file and node modules
echo "Step 3: Update package.json file and node modules."
rm -rf node_modules/*
jq ".version = \"$new_version\" | .dependencies[\"@mitre/saf\"] = \"^$saf_cli_version\"" package.json > package.tmp.json && mv package.tmp.json package.json
npm install

git add .
git commit -s -m "Updated node modules to use new SAF CLI version and updated SAF Action version number"

# Run the SAF CLI local tests to make sure the new version is working
# echo "Running SAF CLI local tests to make sure the new version is working."
# npm run test

# Step 4: Update SAF Action version based on the criteria
echo "Step 4: Update SAF Action version based on the criteria."
git tag -a -m "Using SAF CLI version $saf_cli_version" "v$new_version"
git tag -f -a -m "Using SAF CLI version $saf_cli_version" "v${cli_version_parts[0]}"
git push --atomic origin main "v$new_version" "v${cli_version_parts[0]}"
# If you have issues with this step, try manually running git push for the commit and each tag.
# git push 
# git push origin main v$new_version
# git push origin main v${cli_version_parts[0]}

# Step 5: Check that the updated SAF Action is working
echo "Step 5: Check that the updated SAF Action is working."
echo "Please check the unit test results and integration test results on GitHub Actions at https://github.com/mitre/saf_action/actions."

# Step 6: Release the newly tagged version
echo "Step 6: Release the newly tagged version."
echo "Wait for the draft-release workflow to complete."
echo "Visit the GitHub releases page to publish the release here: https://github.com/mitre/saf_action/releases"

echo "Release process completed."
