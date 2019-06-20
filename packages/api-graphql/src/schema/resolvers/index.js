module.exports = {
  Query: {
    search (_, args, context) {
      const { adapter } = context

      const { address } = args.input

      return adapter
        .search({ address })
    }
  }
}
