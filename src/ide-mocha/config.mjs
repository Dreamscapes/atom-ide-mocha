
const config = {
  interface: {
    title: 'Preferred interface type',
    description: [
      'Preferred communications interface. Unix sockets tend to be generally faster, while IP',
      'allows Atom to receive Mocha reports from anywhere on your local loopback interface (ie.',
      'from inside Docker).\nNote that for IP, the port will remain the same as long as the',
      'first folder name in your Atom project remains the same.',
    ].join(' '),

    type: 'string',
    enum: [
      'unix',
      'IP',
    ],
    default: 'unix',
  },

  notifyOnSuccess: {
    title: 'Notify on successful test run',
    description: 'Show a notification when the test suite finishes successfully.',

    type: 'boolean',
    default: false,
  },

  notifyOnFailure: {
    title: 'Notify on failed test run',
    description: 'Show a notification when the test suite fails.',

    type: 'boolean',
    default: true,
  },

  openConsoleOnStart: {
    title: 'Open Console pane on start',
    description: [
      'When Mocha starts providing progress information the Console pane will',
      'automatically show up.',
    ].join(' '),
    type: 'boolean',
    default: true,
  },
}

export {
  config,
}
