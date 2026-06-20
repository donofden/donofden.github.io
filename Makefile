.DEFAULT_GOAL := help

.PHONY: help install setup start start-drafts stop build clean update release

help: ## Show available commands
	@echo "Usage: make [target]"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' Makefile | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-18s\033[0m %s\n", $$1, $$2}'

install: ## First-time setup: install bundler and all gems into vendor/bundle
	gem install bundler --user-install
	bundle config set --local path 'vendor/bundle'
	bundle install

setup: install ## Alias for install

start: ## Start local Jekyll server with live-reload at http://localhost:4000/
	@echo "Visit http://localhost:4000/"
	bundle exec jekyll serve --livereload --incremental

start-drafts: ## Start local server including draft posts
	@echo "Visit http://localhost:4000/"
	bundle exec jekyll serve --livereload --drafts

stop: ## Kill Jekyll process running on port 4000
	@PID=$$(lsof -ti tcp:4000); \
	if [ -n "$$PID" ]; then kill -9 $$PID && echo "Killed PID $$PID"; \
	else echo "No process found on port 4000"; fi

build: ## Build the site for production into ./_site
	JEKYLL_ENV=production bundle exec jekyll build

clean: ## Remove Jekyll build cache, _site, and vendor directory
	bundle exec jekyll clean
	rm -rf .jekyll-cache _site vendor

update: ## Update all gem dependencies to latest allowed versions
	bundle update

release: ## Create and push a release tag (usage: make release VERSION=v1.0.0)
	@[ -n "$(VERSION)" ] || (echo "ERROR: Provide a version, e.g.  make release VERSION=v1.0.0" && exit 1)
	@git diff --exit-code || (echo "ERROR: Uncommitted changes present. Commit first." && exit 1)
	git tag $(VERSION)
	git push origin $(VERSION)
	@echo "Tag $(VERSION) pushed. GitHub Actions will build and deploy."
