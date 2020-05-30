---
layout: post
title: "CI/CD with GitHub Actions with poetry"
date: 2020-05-15
author: DonOfDen
tags: [github, github-actions, poetry, CI, CD]
description: CI/CD with GitHub Actions with poetry.
---

## CI/CD with GitHub Actions with poetry

In this article, I'll show you.

- How to configure GitHub Action?
- Whats poetry? how can we use it with GitHub Actions?
- Install Dependencies using Poetry
- Config Github URL to download Private Repo
- Run pytest in GitHub Action.
- Run Coverage
- Generate XML Report

Every project - regardless of whether you are working on web app, some data science or AI - can benefit from well configured CI/CD.

We had some issue in recent when team is working on different operating systems and they are facing issues when running pytest in local environment (It's not the reson we went for github actions). Also its a good practive to check every PR so we can build and validate the Unittest.

We though of trying out Github Actions as its simple and easy compared to most of other implementations.

Before dive in to GitHub Action let see whats poetry and how useful it can be.

## Poetry

[Poetry](https://python-poetry.org/docs/) is a tool for dependency management and packaging in Python. It allows you to declare the libraries your project depends on and it will manage (install/update) them for you.

Poetry brings to Python the kind of all-in-one project management tool that Go and Rust have long enjoyed. Poetry allows projects to have deterministic dependencies with specific package versions, so they build consistently in different places. Poetry also makes it easier to build, package, and publish projects and libraries to PyPI, so others can share the fruits of your Python labors.

[Check out this article Pipenv and Poetry: Benchmarks & Ergonomics](https://johnfraney.ca/posts/2019/03/06/pipenv-poetry-benchmarks-ergonomics/) for more detailed reason why we moved over to petry from traditional pip.

**What’s different about Poetry**: Unlike other Python package management tools, Poetry mimics the simplicity and robustness of packaging tools in other programming languages, like Composer for PHP and Cargo for Rust.

Set up Poetry in Python:

```cmd
pip install poetry
```

Install poetry via curl

```cmd
curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py | python
```

### init

This command will help you create a `pyproject.toml` file interactively by prompting you to provide basic information about your package

It will interactively ask you to fill in the fields, while using some smart defaults.

```cmd
poetry init
```

The main file of your `poetry` project is the `pyproject.toml` file. Define the requirements, the dev-requirements and project metadata in this file. `poetry` uses the `.toml` file to resolve the dependencies of your defined requirements, and creates the `poetry.lock` file. Then `poetry` creates a virtual environment and installs everything from the `.lock` file.

```toml
[tool.poetry]
name = "demo-github"
version = "1.0.0"
description = "Test app"
authors = ["donofden <admin@donofden.com>"]

[tool.poetry.dependencies]
python = "^3.8"

[tool.poetry.dev-dependencies]
pytest = "^5.2"

[build-system]
requires = ["poetry>=0.12"]
build-backend = "poetry.masonry.api"
```

Here we have four sections defined:

- The First Section defines Metadata not related to dependency
- The second section defines all the dependencies needed for the project
- The third section defines all development dependencies not necessary to build the project, but to perfom other actions like testing, building, documentation, etc..
- The fourth section defines a build system as indicated in PEP 517.

### Add a package

The following command will add `requests` package to dependency.

```cmd
poetry add requests
```

If we want to install a development dependency, i.e not related directly with your project like pytest, we can do so by passing the -D option.

```cmd
poetry add -D pytest
```

### install

The `install` command reads the `pyproject.toml` file from the current project, resolves the dependencies, and installs them.

```cmd
poetry install
```

If there is a poetry.lock file in the current directory, it will use the exact versions from there instead of resolving them. This ensures that everyone using the library will get the same versions of the dependencies.

If there is no `poetry.lock` file, Poetry will create one after dependency resolution.

If you use some private repo in poetry it will look as follows:

```toml
[tool.poetry.dependencies]
python = "^3.7"
jsonify = "^0.5"
requests = "^2.23.0"
project-model = {git = "https://github.com/donofden/project-model.git", rev = "master"}
```

where `project-model` is my provate repo.

[For more information of the commands check official website for details.](https://python-poetry.org/docs/cli/)

So now, we have a basic knowledge of what poetrya nd how to use them to manage our dependencies. Lets see how to use it in github action.

## CI/CD with GitHub Actions

We will be using GitHub Actions and GitHub Package Registry to build our pipelines (jobs) and to store our images.

**GitHub Actions**

> GitHub Actions are jobs/pipelines that help you automate your development workflows. You can use them to create individual tasks and then combine them into custom workflows, which are then executed - for example - on every push to repository or when release is created.

**GitHub Package Registry**

> GitHub Package Registry is a package hosting service, fully integrated with GitHub. It allows you to store various types of packages.

Now, to use `GitHub Actions`, we need to create workflows that are going to be executed based on triggers (e.g. push to repository) we choose. These workflows are YAML files that live in `.github/workflows` directory in our repository:

```tree
.github
└── workflows
    └── pullrequestchecks.yml
```

`pullrequestchecks.yml` will contain a jobs which will be triggered on every push to the repository, let's look at it:

```yaml
# Checks that we can build and validate the Unittest
name: Pull-Request-Checks

on: [push]

jobs:

  test:
    runs-on: ubuntu-latest

    steps:
      - name: Check out the code
        uses: actions/checkout@v1
        with:
          fetch-depth: 1

      - name: Set up Python 3.7
        uses: actions/setup-python@v1
        with:
          python-version: 3.7

      - name: Install Poetry
        uses: dschep/install-poetry-action@v1.2

      - name: Cache Poetry virtualenv
        uses: actions/cache@v1
        id: cache
        with:
          path: ~/.virtualenvs
          key: poetry-${{ hashFiles('**/poetry.lock') }}
          restore-keys: |
            poetry-${{ hashFiles('**/poetry.lock') }}
```

The job runs it though, it first checks out our repository by executing action called `checkout` which is published on GitHub. 

Then it set up python 3.7 for our `pytest` to run. We then install `Poetry` which is already avaialbe in github registery. `Cache Poetry virtualenv` this will check our `poetry.lock` and allows caching dependencies and build outputs to improve workflow execution time.

## Config Github URL to download Private Repo

This is little more complicated. Here we are trying to download a private repo as our dependency to the project. So we need to do couple of additional steps to make it work.

First we need to great a GitHub Personal access token, so it can be used to fetch the repo.

Follow the steps [here (Creating a personal access token for the command line)](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line) to create PAT (Personal Access Token)

See how we can creating and storing encrypted secrets in github, so it can be used in `GitHub Actions` [Creating encrypted secrets for a repository](https://help.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets)

```yaml
- name: Config Github URL to download Private Repo
  env:
    GITHUB_TOKEN: ${{ secrets.ACCESS_TOKEN }}
  run: git config --global url."https://$GITHUB_TOKEN@github.com/".insteadOf "https://github.com/"
```

`ACCESS_TOKEN` - Is the GitHub personal access token.

`git config --global url` - Is where we configure the global url of git to use the token to download the repo.

Installing `poetry` and running `pytest` are straing forward.

```yaml
# Checks that we can build and validate the Unittest
name: Pull-Request-Checks
on: [push]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Check out the code
        uses: actions/checkout@v1
        with:
          fetch-depth: 1

      - name: Set up Python 3.7
        uses: actions/setup-python@v1
        with:
          python-version: 3.7

      - name: Install Poetry
        uses: dschep/install-poetry-action@v1.2

      - name: Cache Poetry virtualenv
        uses: actions/cache@v1
        id: cache
        with:
          path: ~/.virtualenvs
          key: poetry-${{ hashFiles('**/poetry.lock') }}
          restore-keys: |
            poetry-${{ hashFiles('**/poetry.lock') }}

      - name: Config Github URL to download Private Repo
        env:
          GITHUB_TOKEN: ${{ secrets.ACCESS_TOKEN }}
        run: git config --global url."https://$GITHUB_TOKEN@github.com/".insteadOf "https://github.com/"

      - name: Install Dependencies using Poetry
        run: poetry install
        if: steps.cache.outputs.cache-hit != 'true'

      - name: Run pytest
        run: PYTHONPATH=src/ poetry run python -m pytest -v --cov=src/ tests/

      - name: Run Coverage
        run: PYTHONPATH=src/ poetry run python -m coverage report -m;

      - name: Generate XML Report
        run: PYTHONPATH=src/ poetry run python -m coverage xml
```

That's it! We have created a GitHub action, Once u pushed this code to your repo. When ever a `Pull Request` is created for the repo, A `Github` action will be triggered and which will run `pytest` against the `checkout` branch and submit the report. We then can verify the test output and `coverage` during PR review.

![blog-head-image](/images/doc/github-action-1.png)

**On PR**:

![blog-head-image](/images/doc/github-action-2.png)

----------------------
Share your thoughts via twitter [`@aravind_kumar_g`](https://twitter.com/aravind_kumar_g) ``¯\_(ツ)_/¯``
