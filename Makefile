.DEFAULT_GOAL := help

REQUIRED_RUBY := $(shell cat .ruby-version 2>/dev/null || echo "unknown")
CURRENT_RUBY  := $(shell ruby -e 'puts RUBY_VERSION' 2>/dev/null || echo "none")

.PHONY: help _check-ruby install setup start start-drafts stop build clean update release \
        docker-start docker-stop docker-build docker-clean

# ── Colours ──────────────────────────────────────────────────────────────────
BOLD  := \033[1m
CYAN  := \033[36m
GREEN := \033[32m
RED   := \033[31m
RESET := \033[0m

help: ## Show available commands
	@echo ""
	@echo "  $(BOLD)donofden.github.io$(RESET) — local dev commands"
	@echo ""
	@echo "  $(GREEN)Quick start:$(RESET)  make start"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' Makefile | grep -v '^_' | sort | \
	  awk 'BEGIN {FS = ":.*?## "}; {printf "  $(CYAN)%-18s$(RESET) %s\n", $$1, $$2}'
	@echo ""

# Internal: validate Ruby version matches .ruby-version
_check-ruby:
	@if [ "$(CURRENT_RUBY)" != "$(REQUIRED_RUBY)" ]; then \
	  echo "$(RED)ERROR: Wrong Ruby version.$(RESET)"; \
	  echo "  Required : $(REQUIRED_RUBY)  (from .ruby-version)"; \
	  echo "  Active   : $(CURRENT_RUBY)"; \
	  echo ""; \
	  echo "  Run:  eval \"\$$(~/.rbenv/bin/rbenv init -)\" && make start"; \
	  exit 1; \
	fi

# Internal: install gems if vendor/bundle is missing or Gemfile.lock changed
_bundle-install:
	@if [ ! -d vendor/bundle ]; then \
	  echo "$(CYAN)vendor/bundle not found — running bundle install...$(RESET)"; \
	  gem install bundler --user-install; \
	  bundle config set --local path 'vendor/bundle'; \
	  bundle install; \
	elif [ Gemfile.lock -nt vendor/bundle ]; then \
	  echo "$(CYAN)Gemfile.lock changed — running bundle install...$(RESET)"; \
	  bundle install; \
	fi

install: _check-ruby ## First-time setup: install bundler and gems into vendor/bundle
	gem install bundler --user-install
	bundle config set --local path 'vendor/bundle'
	bundle install

setup: install ## Alias for install

start: _check-ruby _bundle-install ## Start local Jekyll server at http://localhost:4000/ (auto-installs gems)
	@echo "$(GREEN)→ http://localhost:4000/$(RESET)  (Ctrl-C to stop)"
	@bundle exec jekyll serve --livereload --incremental --config _config.yml,_config_dev.yml

start-drafts: _check-ruby _bundle-install ## Start local server including draft posts
	@echo "$(GREEN)→ http://localhost:4000/$(RESET)  (Ctrl-C to stop)"
	@bundle exec jekyll serve --livereload --drafts --config _config.yml,_config_dev.yml

stop: ## Kill Jekyll process running on port 4000
	@PID=$$(lsof -ti tcp:4000); \
	if [ -n "$$PID" ]; then kill -9 $$PID && echo "Killed PID $$PID (port 4000 free)"; \
	else echo "Nothing running on port 4000"; fi

build: _check-ruby _bundle-install ## Production build into ./_site
	JEKYLL_ENV=production bundle exec jekyll build
	@echo "$(GREEN)Built → _site/$(RESET)"

clean: ## Remove _site/, vendor/, and Jekyll caches
	rm -rf _site vendor .jekyll-cache .jekyll-metadata
	@echo "Cleaned."

update: _check-ruby ## Update all gems to latest allowed versions
	bundle update
	@echo "$(GREEN)Gems updated. Commit Gemfile.lock if it changed.$(RESET)"

release: ## Tag and push a release (usage: make release VERSION=v1.0.0)
	@[ -n "$(VERSION)" ] || (echo "$(RED)ERROR:$(RESET) Usage: make release VERSION=v1.0.0" && exit 1)
	@git diff --exit-code || (echo "$(RED)ERROR:$(RESET) Uncommitted changes. Commit first." && exit 1)
	git tag $(VERSION)
	git push origin $(VERSION)
	@echo "$(GREEN)Tag $(VERSION) pushed — GitHub Actions will build and deploy.$(RESET)"

# ── Docker targets (no local Ruby required) ──────────────────────────────────

docker-start: ## Start Jekyll in Docker at http://localhost:4000/ (no Ruby needed)
	@echo "$(GREEN)→ http://localhost:4000/$(RESET)  (Ctrl-C to stop)"
	docker compose up

docker-stop: ## Stop the Docker Jekyll server
	docker compose down

docker-build: ## Build the site for production via Docker
	docker compose run --rm jekyll jekyll build
	@echo "$(GREEN)Built → _site/$(RESET)"

docker-clean: ## Remove Docker containers, volumes, and _site
	docker compose down -v
	rm -rf _site
