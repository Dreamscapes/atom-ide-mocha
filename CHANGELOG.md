# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.1.1](https://github.com/Dreamscapes/atom-ide-mocha-core/compare/atom-ide-mocha-core@2.1.0...atom-ide-mocha-core@2.1.1) (2019-01-15)


### Bug Fixes

* fall back to full title in the console when on test failure ([d180803](https://github.com/Dreamscapes/atom-ide-mocha-core/commit/d180803))





# [2.1.0](https://github.com/Dreamscapes/atom-ide-mocha-core/compare/atom-ide-mocha-core@2.0.0...atom-ide-mocha-core@2.1.0) (2019-01-13)


### Features

* **ui:** allow reporting test case durations to console ([61b3cdd](https://github.com/Dreamscapes/atom-ide-mocha-core/commit/61b3cdd))





# [2.0.0](https://github.com/Dreamscapes/atom-ide-mocha-core/compare/atom-ide-mocha-core@1.6.0...atom-ide-mocha-core@2.0.0) (2019-01-02)


### Features

* add option to clear the console on new test session ([ed4265b](https://github.com/Dreamscapes/atom-ide-mocha-core/commit/ed4265b))
* open console immediately when a failure occurs ([628169d](https://github.com/Dreamscapes/atom-ide-mocha-core/commit/628169d))
* re-organise config ([3270c61](https://github.com/Dreamscapes/atom-ide-mocha-core/commit/3270c61))


### BREAKING CHANGES

* Old configuration will no longer apply.





# [1.6.0](https://github.com/Dreamscapes/atom-ide-mocha-core/compare/atom-ide-mocha-core@1.5.2...atom-ide-mocha-core@1.6.0) (2018-12-13)


### Features

* use a better way to extract relevant callsite location from stacks ([e76f6d7](https://github.com/Dreamscapes/atom-ide-mocha-core/commit/e76f6d7))





## [1.5.2](https://github.com/Dreamscapes/atom-ide-mocha-core/compare/atom-ide-mocha-core@1.5.1...atom-ide-mocha-core@1.5.2) (2018-12-10)


### Bug Fixes

* help->copy mocha command should really copy the command ([449811d](https://github.com/Dreamscapes/atom-ide-mocha-core/commit/449811d))





## [1.5.1](https://github.com/Dreamscapes/atom-ide-mocha-core/compare/atom-ide-mocha-core@1.5.0...atom-ide-mocha-core@1.5.1) (2018-12-07)


### Bug Fixes

* avoid parse errors when the socket closes ([d144bd2](https://github.com/Dreamscapes/atom-ide-mocha-core/commit/d144bd2)), closes [Dreamscapes/atom-ide-mocha#7](https://github.com/Dreamscapes/atom-ide-mocha/issues/7)





# [1.5.0](https://github.com/Dreamscapes/atom-ide-mocha-core/compare/atom-ide-mocha-core@1.4.1...atom-ide-mocha-core@1.5.0) (2018-12-06)


### Bug Fixes

* show actual number of tests to be executed in tooltip ([4e06724](https://github.com/Dreamscapes/atom-ide-mocha-core/commit/4e06724))
* update wording on Mocha Help, it's not always sockets ([e429d2b](https://github.com/Dreamscapes/atom-ide-mocha-core/commit/e429d2b))


### Features

* be consistent, use `ide-mocha:help` instead of `show-help` ([d05b9a2](https://github.com/Dreamscapes/atom-ide-mocha-core/commit/d05b9a2))
* show test counts in busy spinner's tooltip ([866aa52](https://github.com/Dreamscapes/atom-ide-mocha-core/commit/866aa52))





## [1.4.1](https://github.com/Dreamscapes/atom-ide-mocha-core/compare/atom-ide-mocha-core@1.4.0...atom-ide-mocha-core@1.4.1) (2018-11-23)


### Bug Fixes

* avoid crash due to something throwing non-compliant error objects ([b31e70a](https://github.com/Dreamscapes/atom-ide-mocha-core/commit/b31e70a))





# [1.4.0](https://github.com/Dreamscapes/atom-ide-mocha-core/compare/atom-ide-mocha-core@1.3.0...atom-ide-mocha-core@1.4.0) (2018-11-16)


### Bug Fixes

* remove forgotten console.log() ([10e4851](https://github.com/Dreamscapes/atom-ide-mocha-core/commit/10e4851))


### Features

* add option to configure console verbosity 💬 ([88325f6](https://github.com/Dreamscapes/atom-ide-mocha-core/commit/88325f6))
* allow changing the interface without restarting Atom 💪 ([b117818](https://github.com/Dreamscapes/atom-ide-mocha-core/commit/b117818))





# [1.3.0](https://github.com/Dreamscapes/atom-ide-mocha-core/compare/atom-ide-mocha-core@1.2.2...atom-ide-mocha-core@1.3.0) (2018-11-15)


### Bug Fixes

* change the final stats entry in Console back to log level ([ef05bf2](https://github.com/Dreamscapes/atom-ide-mocha-core/commit/ef05bf2))


### Features

* add button to open the console to the Suite's success notification ([70ae794](https://github.com/Dreamscapes/atom-ide-mocha-core/commit/70ae794))
* support multiple project folder in a single Atom window 🎉 ([0515c7d](https://github.com/Dreamscapes/atom-ide-mocha-core/commit/0515c7d))





## [1.2.2](https://github.com/Dreamscapes/atom-ide-mocha-core/compare/atom-ide-mocha-core@1.2.1...atom-ide-mocha-core@1.2.2) (2018-11-15)


### Bug Fixes

* always attempt to open already existing Console pane ([b157742](https://github.com/Dreamscapes/atom-ide-mocha-core/commit/b157742))
* default to IP interface on win32 systems ([11d5e1c](https://github.com/Dreamscapes/atom-ide-mocha-core/commit/11d5e1c))
* restore "Open Console on Start" functionality ([5940390](https://github.com/Dreamscapes/atom-ide-mocha-core/commit/5940390))





## [1.2.1](https://github.com/Dreamscapes/atom-ide-mocha-core/compare/atom-ide-mocha-core@1.2.0...atom-ide-mocha-core@1.2.1) (2018-11-14)


### Bug Fixes

* do not require Atom restart to apply new settings ([3d63625](https://github.com/Dreamscapes/atom-ide-mocha-core/commit/3d63625))





# [1.2.0](https://github.com/Dreamscapes/atom-ide-mocha-core/compare/atom-ide-mocha-core@1.1.3...atom-ide-mocha-core@1.2.0) (2018-11-14)


### Features

* add option to open Console on suite failure ([c6c1524](https://github.com/Dreamscapes/atom-ide-mocha-core/commit/c6c1524))
* attempt to extract more meaningful stack traces for diagnostics ([454eaf0](https://github.com/Dreamscapes/atom-ide-mocha-core/commit/454eaf0))
* epic rewrite, more stable, such wow 🐕 ([c84de1a](https://github.com/Dreamscapes/atom-ide-mocha-core/commit/c84de1a))





## [1.1.3](https://github.com/Dreamscapes/atom-ide-mocha-core/compare/atom-ide-mocha-core@1.1.2...atom-ide-mocha-core@1.1.3) (2018-11-14)


### Bug Fixes

* improve UX by making all notifications dismissable with ESC ❤️ ([f4be377](https://github.com/Dreamscapes/atom-ide-mocha-core/commit/f4be377))





## [1.1.2](https://github.com/Dreamscapes/atom-ide-mocha-core/compare/atom-ide-mocha-core@1.1.1...atom-ide-mocha-core@1.1.2) (2018-11-13)


### Bug Fixes

* the busy spinner may be released while a suite is pending ([e595fa5](https://github.com/Dreamscapes/atom-ide-mocha-core/commit/e595fa5))





# [1.1.0](https://github.com/Dreamscapes/atom-ide-mocha-core/compare/atom-ide-mocha-core@1.0.2...atom-ide-mocha-core@1.1.0) (2018-11-13)


### Bug Fixes

* do not go below 0 when tracking runs ([5788314](https://github.com/Dreamscapes/atom-ide-mocha-core/commit/5788314))
* forward 'close' events to the receiver ([156085a](https://github.com/Dreamscapes/atom-ide-mocha-core/commit/156085a))
* properly dispose of linter instance ([eb90000](https://github.com/Dreamscapes/atom-ide-mocha-core/commit/eb90000))
* stop spinning busy signal when mocha dies prematurely ([fa61846](https://github.com/Dreamscapes/atom-ide-mocha-core/commit/fa61846))


### Features

* focus console on busy spinner click ([5ab95b8](https://github.com/Dreamscapes/atom-ide-mocha-core/commit/5ab95b8))





## [1.0.2](https://github.com/Dreamscapes/atom-ide-mocha-core/compare/atom-ide-mocha-core@1.0.1...atom-ide-mocha-core@1.0.2) (2018-11-12)


### Bug Fixes

* prevent mocha re-runs in watch mode from crashing spinner.dispose() ([cad1a25](https://github.com/Dreamscapes/atom-ide-mocha-core/commit/cad1a25))
* relay socket errors to the receiver ([3dfebf0](https://github.com/Dreamscapes/atom-ide-mocha-core/commit/3dfebf0))
* we do not have access to the correct package.json from here ([8f1de43](https://github.com/Dreamscapes/atom-ide-mocha-core/commit/8f1de43))





## 1.0.1 (2018-11-12)

**Note:** Version bump only for package atom-ide-mocha-core
