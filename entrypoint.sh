#!/bin/bash
# Parameterize the var name, so I can loop over a variable sized list of variable names:
# declare -a vars=(GIT_BUILD_TOKEN BUILD_URL), GIT_BUILD_TOKEN and BUILD_URL are env variables add as many with a space to check.

set -eu # Immediately exit on fail
set -o pipefail

URI="https://api.github.com"
API_HEADER="Accept: application/vnd.github.mister-fantastic-preview+json";
curl -u donofden:${GIT_BUILD_TOKEN} -X POST "${URI}/repos/${GITHUB_REPOSITORY}/pages/builds" -H "${API_HEADER}"