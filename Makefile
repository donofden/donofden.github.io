.DEFAULT_GOAL := explain
.PHONY: explain
explain:
	### Welcome
	#
	#
	### Targets
	@echo " Choose a command run:"
	@cat Makefile* | grep -E '^[a-zA-Z_-]+:.*?## .*$$' | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: kill
kill: ## Kill the process running in Port: 4000 ruby
	sudo lsof -wni tcp:4000 | grep ruby
	echo "RUN sudo kill -9 PID"

.PHONY: start
start: ## Start the application - http://localhost:4000/
	echo "Visit http://localhost:4000/"
	bundle exec jekyll serve

.PHONY: install
install: ## install plugins from Gemfile
	sudo gem install jekyll bundler
	sudo bundle install

.PHONY: build-live
build-live: ## build live website
	./RebuildPage.sh