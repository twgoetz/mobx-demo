# Paths
distBasePath := dist
srcPath := src

# Source files
srcFiles := $(shell find src  \( -name '*.[jt]s' -o -name '*.[jt]sx' -o -name '*.[s]css' \) | grep -v '.test.')

# Target files
appCssBundle := $(distBasePath)/App.bundle.css
appJsBundle := $(distBasePath)/App.bundle.js

# Build scripts
esbuild := node dev/esbuild_client.mjs
esbuildServer := node dev/esbuild_server.mjs

.PHONY: all
all: prepare static $(appJsBundle) server ## Build everything; best to run with 'clean'
.DEFAULT_GOAL := all

# Remove everything
.PHONY: clean
clean: ## Clean the dist directory
	rm -rf dist

# Make directories, copy static files. We always run prepareBuild.js because it's hard
# to determine if it has run already.
.PHONY: prepare
prepare: $(distBasePath)

.PHONY: run
run: all ## Start the demo server
	node dist/server.js

# Help target copied from https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
# The help text is generated for targets that are followed by ## target description. See the 'help' target below for an example.
.PHONY: help
help: ## Shows this message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

# Make sure the basic dist directories exist
$(distBasePath):
	mkdir -p $(distBasePath)

# Copy over the mark-up templates
static: $(distBasePath) ## Copy static files to the dist directory
	cp -R src/public/* $(distBasePath)

# Transpile and bundle client-side JS/TS/CSS
$(appJsBundle): $(srcFiles)
	rm -f $(distJsPath)/App.*
	$(esbuild)

test: ## Run unit tests
	npm test

dist/server.js: server/main.ts
	$(esbuildServer)

.PHONY: server
server: dist/server.js ## Build the test server (run with 'node dist/server.js')
