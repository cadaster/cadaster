module.exports = {
  Query: {
    search (_, args, context) {
      const { adapter } = context
      console.log(adapter, args)
      return { status: 'ok' }
    }
  }
}
