import os from 'os'
import { Transform } from 'stream'

/**
 * Given a raw buffer, split it on newline characters and treat each split part as a single "event"
 */
class SplitterTransform extends Transform {
  #buffer = null

  _transform(chunk, encoding, done) {
    this.#buffer = this.#buffer
      ? Buffer.concat([this.#buffer, chunk])
      : chunk

    let index

    // As long as we keep finding newlines, keep making slices of the buffer and push them to the
    // readable side of the transform stream
    while ((index = this.#buffer.indexOf(os.EOL)) !== -1) {
      this.push(this.#buffer.slice(0, ++index))
      this.#buffer = this.#buffer.length
        ? this.#buffer.slice(index)
        : null
    }

    return void done()
  }

  _flush(done) {
    // If we have any remaining data in the cache, send it out
    if (this.#buffer && this.#buffer.length) {
      return void done(null, this.#buffer)
    }
  }
}

export {
  SplitterTransform,
}
