import os from 'os'
import path from 'path'
import hashToPort from 'hash-to-port'

function mkaddress({ root, type = 'unix' }) {
  const name = path.basename(root)

  switch (type) {
    case 'unix':
      return path.resolve(os.tmpdir(), `ide-mocha-${name}.sock`)
    case 'IP':
      return hashToPort(name)
    default:
      throw new Error(`Unknown address interface type: ${type}`)
  }
}

function mkaddressinfo({ address }) {
  return typeof address === 'string'
    ? address
    : `${address.address}:${address.port} (${address.family})`
}

function mkcommandinfo({ address }) {
  return [
    'npx mocha',
    '--reporter mocha-reporter-remote',
    `--reporter-options address=${address}`,
  ].join(' ')
}

function mkstats({ runner }) {
  return [
    `Passing: ${runner.stats.passes}`,
    `Failing: ${runner.stats.failures}`,
    `Pending: ${runner.stats.pending}`,
    `Duration: ${runner.stats.duration} ms`,
  ].join('\n')
}

export {
  mkaddress,
  mkaddressinfo,
  mkcommandinfo,
  mkstats,
}
