import { CompositeDisposable, Disposable } from 'atom'

const CONSOLE_VIEW_URI = 'atom://nuclide/console'

class Console extends Disposable {
  #subscriptions = new CompositeDisposable()
  #console = null

  constructor({ mkconsole }) {
    super()

    this.#console = mkconsole({
      id: 'IDE-Mocha',
      name: 'IDE-Mocha',
    })
  }

  didFinishRunning({ stats }) {
    this.#console.log(stats)
  }

  didStartSuite({ suite }) {
    this.#console.log(suite.titlePath.join(' ▶︎ '))
  }

  didPassTest({ test }) {
    this.#console.success(test.title)
  }

  didFailTest({ test, err }) {
    this.#console.error(test.title)
    this.#console.error(err.stack)
  }

  didSkipTest({ test }) {
    this.#console.warn(test.title)
  }

  printAddressInfo({ address, type }) {
    this.focus()
    this.#console.log(`Listening on ${type}: ${address}`)
  }

  focus() {
    atom.workspace.open(CONSOLE_VIEW_URI)
  }

  dispose() {
    this.#subscriptions.dispose()
    this.#console = null

    return super.dispose()
  }
}

export {
  Console,
}
