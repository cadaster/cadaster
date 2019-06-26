module.exports = {
  Query: {
    search (_, args, context) {
      const { source, address } = args.input

      const adapter = context.adapters[source]

      return adapter
        .search({ address })
    }
  }
}
