# IDE-Mocha

> Stream Mocha progress to Atom ☕️ + ⚛️ = 🚀

## About

This package allows Mocha to send its progress reports (which are normally shown on your Terminal window) to Atom and then do all kinds of interesting things with it, like

- showing progress logs in the Console
- spinning the busy signal while Mocha is crunching your tests
- displaying Diagnostics messages when tests fail, complete with stack traces and code locations 😍

![IDE-Mocha in action][ide-mocha-screenshot]

## Installation

- Make sure you have [Atom-IDE-UI][atom-ide-ui] installed (it will be installed for you when you install this package)
- Install IDE-Mocha: `apm install ide-mocha`
- Install a [Mocha reporter][mocha-reporter-remote] which feeds the progress data to Atom: `npm i --save-dev mocha-reporter-remote`

Now you can use the custom reporter. The reporter needs to know where to send the progress data. The easiest way to see how to run Mocha is to execute `ide-mocha:show-help` from the command pallete. 💪 Generally the command looks like this:

```sh
# Using automatic socket/port derivation based on project root
npx mocha --reporter mocha-reporter-remote --reporter-options root=${PWD}

# Using Unix socket connections
npx mocha --reporter mocha-reporter-remote --reporter-options address=/var/folders/np/yp1y_nk504b0k61prl2pk4b40000gn/T/mocha-reporter-remote.sock

# Using TCP connections
npx mocha --reporter mocha-reporter-remote --reporter-options address=12345
```

Each project uses its own socket and port which remains stable even if you quit Atom, so it's safe to persist the socket/port info in your project config/environment variables or any other suitable place. If you don't have _"any other suitable place"_ you can always use `ide-mocha:copy-receiver-address` from the command pallete to get the socket path/port number for your current session, or `ide-mocha:copy-mocha-command` to get the full command which you can just paste into a terminal. 💪

Alternatively, you can use the `root` reporter option to tell the Mocha reporter where your project is located and it will use a deterministic algorithm to arrive at the same socket or port address as Atom so that you do not have to explicitly provide the socket or port to it.

## Known issues

- Windows: Sockets (named pipes) are not supported. When you use this package on Windows it will default to `IP` (TCP) mode.

## ... but why?

Because existing Mocha integrations for Atom kinda suck. They either do not work at all, implement custom UI elements which look weird and do not integrate well into Atom (or your current theme 🎨), or force you into giving up your test toolchain because they want to spawn Mocha for you in unexpected ways. This package has no such restrictions - all you need on your end is to install one dev dependency and pass two flags to Mocha to make the whole thing work. And the test suite could be started with a custom binary, `make`, or heck, even from inside a Docker container (_disclaimer: untested but should work in theory_)! As long as Mocha can connect to the local socket or TCP port this is guaranteed to work. 💪

## Ugly gif

One picture is worth a thousand words, and a gif has many pictures... It's ugly, but it shows all the bits & pieces of this thing.

![ide-mocha in action][ide-mocha-gif]

## Contributing

Please do! 🙏 If you have feedback, problems, or ideas, please open an issue and I'll do my best to help you out.

## Future plans

- [ ] Test suite 🤦
- [x] Verify that the stack traces get properly placed if enough information about the error is available
- [x] Monitor the general stability of the package and fix potential issues
- [x] Tweak and enhance general usability (ie. an Atom command to paste the Mocha command to the IDE Terminal? Or an Atom command which actually, optionally, spawns the Mocha process, just as a convenience? 🤔)
- [x] ... profit! 💰

## License

See the [LICENSE](LICENSE) file for information.

[ide-mocha-screenshot]: https://user-images.githubusercontent.com/3058150/48307793-11e4fa80-e555-11e8-8d09-eb57969e7b8f.png
[mocha-reporter-remote]: https://github.com/Dreamscapes/atom-ide-mocha-core/tree/master/packages/mocha-reporter-remote
[ide-mocha-gif]: https://user-images.githubusercontent.com/3058150/48307632-32ab5100-e551-11e8-90d8-8dc18891d46c.gif
[atom-ide-ui]: https://ide.atom.io
