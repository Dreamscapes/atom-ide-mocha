# Welcome to IDE-Mocha!

## Features

- Show test logs in Console
- Show test failures in Diagnostics
- Spin the busy indicator while the test suite is running

## Installation

First, make sure you have [`mocha-reporter-remote`][reporter-home] installed in your project:

```sh
npm i -D mocha-reporter-remote
```
<br />

## Running

Make sure that running `npx mocha` successfully runs your test suite. And finally, if all works, you can use this command to stream the test results to Atom:

```sh
#{COMMAND}
```
<br />

The most important part is the socket/port. This will remain the same even if you restart Atom, as long as the first folder in your project window keeps its name.

**Happy testing!**

[reporter-home]: https://github.com/Dreamscapes/mocha-reporter-remote
