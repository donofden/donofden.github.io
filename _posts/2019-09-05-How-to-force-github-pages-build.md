---
layout: post
title: "How to force GitHub Pages build"
date: 2019-09-05
author: DonOfDen
tags: [Github, Github Personal Website, pages, build, Github pages]
description: To force build the GitHub Pages without pushing a new commit.
---
## Github Personal Website Force Build

Recently I have come across a scenario where I need to build the GitHub pages, But I'm forced to do a commit in order to rebuild the website. So i quickly searched in google for a solution and following will help for those who end up in such situation.

## How long does it take for GitHub page to show changes

The first time you generate your site it will take about 10 minutes for it to show up. Subsequent builds take only seconds from the time you push the changes to your GitHub repository. However, depending on how you have your domain configured, there may be extra time for the CDN cache to break.

## Usage limits:

GitHub Pages sites are subject to the following usage limits:

- GitHub Pages source repositories have a recommended limit of 1GB .

- Published GitHub Pages sites may be no larger than 1 GB.

- GitHub Pages sites have a soft bandwidth limit of 100GB per month.

- **GitHub Pages sites have a soft limit of 10 builds per hour.**

Kindly note the build limitations for your GitHub website.

Ok, let's discuss the script which I wrote to queue my build to Github.

1. Create a personal access token for the command line:

        - Create a Github TOKEN [link to official website](https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line) Basically, you have to log in your GitHub account and go to: Settings > Developer ```settings > Personal access tokens > Generate new token.```

        - Tick ```repo``` scope.
        - Copy the token and save as an environment variable ```GIT_BUILD_TOKEN```

2. Create the following script:

    - Create a file called RebuildPage.sh and add the lines:
    ```
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
    ```
The above code is self-explanatory. I have added comments to code.
    - Which has a bash script which checks the environment variable.
- In place of `donofden` replace your GitHub username.
    - Replace `donofden.github.io` with your website name/repo name.

3. Create a `Makefile` to run the script easily.

    Add the following to ur Makefile so we can build the website just with a command instead of remembering all the file name.

    ```
    .PHONY: build-live
    build-live: ## build live website
        ./RebuildPage.sh
    ```

So now when you run the command `make build-live` you see the following:

```
SHADOW: ~/git/donofden.github.io (master)
$ make build-live 
./RebuildPage.sh
{
  "status": "queued",
  "url": "https://api.github.com/repositories/203170630/pages/builds/latest"
}
```

As you can see the build is queued by GITHUB usually it will take a few mins to kickstart the build.

Share your thoughts via twitter @aravind_kumar_g ``¯\_(ツ)_/¯``
