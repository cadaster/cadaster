function createIterator () {
  return {
    idx: 0,
    val: this,
    next: function () {
      const keys = this.val._keys
      return this.idx === keys.length
        ? { done: true }
        : { value: this.val[keys[this.idx++]] }
    }
  }
}

module.exports = createIterator
