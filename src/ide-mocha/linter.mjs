import os from 'os'
import path from 'path'
import { CompositeDisposable, Disposable } from 'atom'
import StackUtils from 'stack-utils'

const stackutils = new StackUtils({
  internals: StackUtils.nodeInternals(),
})

class Linter extends Disposable {
  #subscriptions = new CompositeDisposable()
  #linter = null
  #root = null
  #messages = new Map()

  constructor({ mklinter, root }) {
    super()

    this.#root = root
    this.#linter = mklinter({
      name: 'IDE-Mocha',
    })
    this.#subscriptions.add(this.#linter)
  }

  didFailTest({ test, err }) {
    const callsite = mkcallsite(err)

    // If we have no viable error location do not show the error in diagnostics 🤷‍♂️
    if (!callsite) {
      return
    }

    callsite.file = path.resolve(this.#root, callsite.file)
    callsite.line--

    const { file, line, column } = callsite
    const message = {
      location: {
        file,
        position: [[line, column], [line, column]],
      },
      severity: 'error',
      excerpt: err.message,
      description: `${test.fullTitle}\n\n${err.stack}`,
    }
    const messages = this.#messages.get(file) || []

    messages.push(message)
    this.#messages.set(file, messages)
    this.#linter.setMessages(file, messages)
  }

  didStartRunning() {
    this.#messages = new Map()
    this.#linter.clearMessages()
  }

  didFinishRunning() {
    this.#messages = new Map()
  }

  dispose() {
    this.linter.clearMessages()
    this.#subscriptions.dispose()
    this.#messages = null
    this.#linter = null

    return super.dispose()
  }
}

function mkcallsite(err) {
  const line = stackutils
    .clean(err.stack)
    .trim()
    .split(os.EOL)
    .shift()

  return stackutils.parseLine(line)
}

export {
  Linter,
}
