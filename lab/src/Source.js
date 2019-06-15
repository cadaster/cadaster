class _Source {
  constructor (opts) {
    this.dict = opts.dict || {}
  }

  get (key) {
    return this.dict[key]
  }
}

function Source (opts) {
  return new _Source(opts)
}

module.exports = Source
