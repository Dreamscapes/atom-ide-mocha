# Defining shell is necessary in order to modify PATH
SHELL := sh
export PATH := node_modules/.bin/:$(PATH)
export NODE_OPTIONS := --trace-deprecation

# Allow overriding the current distribution channel when using `make link`
APM_BIN := apm-nightly

# Modify these variables in local.mk to add flags to the commands, ie.
# FINSTALL += --prefer-offline
FINSTALL :=

GITFILES := $(patsubst utils/githooks/%, .git/hooks/%, $(wildcard utils/githooks/*))

# Do this when make is invoked without targets
all: node_modules githooks

# GENERIC TARGETS

# package-lock.json breaks Atom's activation process because it thinks that fsevents, a dev dep, is
# actually a production dep. 🤷‍♂️
node_modules: package.json
	npm install $(FINSTALL) && touch node_modules && rm package-lock.json

# Default target for all possible git hooks
.git/hooks/%: utils/githooks/%
	cp $< $@

# TASK DEFINITIONS

githooks: $(GITFILES)

install: node_modules $(GITFILES)

lint: force install
	remark --quiet .

outdated:
	npm outdated || true

unlock: pristine
	rm -f package-lock.json
	touch package.json

clean:
	rm -rf {.nyc_output,coverage,docs}
	find . -name '*.log' -print -delete

pristine: clean
	rm -rf node_modules

# Set up everything needed for local development. This expects that the atom-ide-mocha-core
# repository is cloned next to this repository, ie. in the same parent folder. ⚠️
link: node_modules $(GITFILES)
	$(APM_BIN) remove ide-mocha && $(APM_BIN) link .
	npm link ../atom-ide-mocha-core/packages/atom-ide-mocha-core .

.PHONY: force

-include local.mk
