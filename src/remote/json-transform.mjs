import { Transform } from 'stream'

/**
 * Given a raw buffer, attempt to parse it as JSON
 */
class JSONTransform extends Transform {
  constructor(options = {}) {
    super({ ...options, objectMode: true })
  }

  _transform(chunk, encoding, done) {
    try {
      // Delay the delivery until next loop because it might happen that some other, unrelated
      // error occurs down the stack (somewhere inside done(), basically) which would trigger the
      // catch block below and cause the done() callback to be called again, effectively masking
      // the real problem. ⚠️
      return void setImmediate(done, null, JSON.parse(chunk.toString('utf8')))
    } catch (err) {
      return void done(err)
    }
  }
}

export {
  JSONTransform,
}
