.DEFAULT_GOAL := help

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install: ## Install dependencies
	yarn

start: ## Start server
	yarn dev

start-prod: ## Start production server
	yarn start

test: ## Run tests
	yarn test

build: ## Build next for production
	yarn build

demo: ## Open cypress
	yarn cypress open