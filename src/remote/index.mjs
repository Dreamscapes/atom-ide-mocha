import net from 'net'
import fs from 'fs'
import { SplitterTransform } from './splitter-transform'
import { JSONTransform } from './json-transform'

function remote({ address, receiver }) {
  // Ensure the socket does not exist first
  if (typeof address === 'string') {
    /* eslint-disable no-sync */
    try {
      fs.accessSync(address)
      fs.unlinkSync(address)
    } catch (err) {
      if (err.code !== 'ENOENT') {
        fs.unlinkSync(address)
      }
    }
    /* eslint-enable */
  }

  return net.createServer(req =>
    req
      .pipe(new SplitterTransform())
      .pipe(new JSONTransform())
      .on('data', ({ event, args }) => {
        receiver.emit(event, ...args)
      }))
    .listen(address)
}

export {
  remote,
}
