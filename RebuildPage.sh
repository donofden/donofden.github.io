#!/bin/bash
# Parameterize the var name, so I can loop over a variable sized list of variable names:
# declare -a vars=(GIT_BUILD_TOKEN BUILD_URL), GIT_BUILD_TOKEN and BUILD_URL are env variables add as many with a space to check.
declare -a vars=(GIT_BUILD_TOKEN)

for var_name in "${vars[@]}"
do
  if [ -z "$(eval "echo \$$var_name")" ]; then
    echo "Missing environment variable $var_name"
    exit 1
  fi
done

curl -u donofden:$GIT_BUILD_TOKEN -X POST https://api.github.com/repos/donofden/donofden.github.io/pages/builds -H "Accept: application/vnd.github.mister-fantastic-preview+json"