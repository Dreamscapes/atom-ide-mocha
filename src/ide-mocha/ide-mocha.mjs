import {
  CompositeDisposable,
} from 'atom'
import { EventEmitter } from 'events'
import fs from 'fs'
import path from 'path'
import pkg from '../../package'
import { remote } from '../remote'
import * as util from './util'
import { config, Linter, Console } from '.'

const HELP_TEMPLATE = fs.readFileSync(path.resolve(__dirname, 'static', 'help.md'), 'utf8')

class IdeMocha {
  #root = null
  #subscriptions = null
  #settings = null
  #reporter = null
  #remote = null

  config = config
  commands = {
    [`${pkg.name}:print-address-info`]: ::this.printAddressInfo,
    [`${pkg.name}:copy-receiver-address`]: ::this.copyReceiverAddress,
    [`${pkg.name}:copy-mocha-command`]: ::this.copyMochaCommand,
    [`${pkg.name}:show-help`]: ::this.showHelp,
  }

  busy = null
  console = null
  linter = null
  spinner = null

  stats = {
    total: 0,
    completed: 0,
  }

  activate() {
    this.#root = atom.project.getPaths().shift()

    this.#subscriptions = new CompositeDisposable()
    this.#reporter = new EventEmitter()

    this.#settings = atom.config.get(pkg.name)
    this.#settings.address = util.mkaddress({ root: this.#root, type: this.#settings.interface })
    this.#remote = remote({ address: this.#settings.address, receiver: this.#reporter })

    this.#subscriptions.add(atom.commands.add('atom-workspace', this.commands))

    this.#reporter.on('start', runner => this.didStartRunning({ runner }))
    this.#reporter.on('end', runner => this.didFinishRunning({ runner }))
    this.#reporter.on('suite', suite => this.didStartSuite({ suite }))
    this.#reporter.on('test end', () => this.didFinishTest())
    this.#reporter.on('pass', test => this.didPassTest({ test }))
    this.#reporter.on('fail', (test, err) => this.didFailTest({ test, err }))
    this.#reporter.on('pending', test => this.didSkipTest({ test }))
  }

  deactivate() {
    this.spinner && this.spinner.dispose()
    this.#subscriptions.dispose()
    this.#settings = null
    this.#remote.close()
    this.#reporter = null
    this.busy = null
    this.console = null
    this.linter = null
  }

  consumeBusySignal(busy) {
    this.busy = busy
  }

  consumeConsole(mkconsole) {
    this.console = new Console({ mkconsole })
    this.#subscriptions.add(this.console)
  }

  consumeLinter(mklinter) {
    this.linter = new Linter({ mklinter, root: this.#root })
    this.#subscriptions.add(this.linter)
  }

  didStartRunning({ runner }) {
    this.stats.total = runner.total
    this.stats.completed = 0
    this.spinner = this.busy.reportBusy('Running Mocha tests: 0%')

    if (this.#settings.openConsoleOnStart) {
      this.console.focus()
    }

    this.linter.didStartRunning()
  }

  didFinishRunning({ runner }) {
    this.spinner = this.spinner.dispose()
    this.stats.total = 0
    this.stats.completed = 0

    const stats = util.mkstats({ runner })

    this.linter.didFinishRunning()
    this.console.didFinishRunning({ stats })

    if (!runner.stats.failures && this.#settings.notifyOnSuccess) {
      this.showSuccessNotification({ stats })
    }

    if (runner.stats.failures && this.#settings.notifyOnFailure) {
      this.showFailureNotification({ stats })
    }
  }

  didStartSuite({ suite }) {
    this.console.didStartSuite({ suite })
  }

  didFinishTest() {
    this.stats.completed++
    const percent = Math.floor(this.stats.completed / this.stats.total * 100)

    this.spinner.setTitle(`Running Mocha tests: ${Math.floor(percent)}%`)
  }

  didPassTest({ test }) {
    this.console.didPassTest({ test })
  }

  didFailTest({ test, err }) {
    this.console.didFailTest({ test, err })
    this.linter.didFailTest({ test, err })
  }

  didSkipTest({ test }) {
    this.console.didSkipTest({ test })
  }

  showSuccessNotification({ stats }) {
    atom.notifications.addSuccess('Test suite passed.', {
      description: '**IDE-Mocha**',
      detail: stats,
    })
  }

  showFailureNotification({ stats }) {
    atom.notifications.addError('Test suite failed.', {
      description: '**IDE-Mocha**',
      detail: stats,
      buttons: [{
        text: 'Open Console',
        onDidClick: () => this.console.focus(),
      }],
    })
  }

  printAddressInfo() {
    const address = util.mkaddressinfo({ address: this.#remote.address() })
    const type = this.#settings.interface

    this.console.printAddressInfo({ address, type })
  }

  copyReceiverAddress() {
    atom.clipboard.write(this.#settings.address)
    atom.notifications.addInfo('Copied!', {
      description: '**IDE-Mocha**',
    })
  }

  copyMochaCommand() {
    const address = this.#settings.address
    const command = util.mkcommandinfo({ address })

    atom.clipboard.write(command)
    atom.notifications.addInfo('Copied!', {
      description: '**IDE-Mocha**',
    })
  }

  showHelp() {
    const address = this.#settings.address
    const command = util.mkcommandinfo({ address })
    const help = HELP_TEMPLATE.replace('#{COMMAND}', command)

    atom.notifications.addInfo('IDE-Mocha: Help', {
      description: help,
      icon: 'mortar-board',
      dismissable: true,
      buttons: [{
        // Extra space to make room between the clippy icon and text 🎨
        text: ' Copy Mocha command to clipboard',
        className: 'btn btn-info icon-clippy selected',
        onDidClick() {
          atom.clipboard.write(command)
          atom.notifications.addSuccess('Copied!', {
            description: '**IDE-Mocha**',
          })
        },
      }],
    })
  }
}

export {
  IdeMocha,
}
