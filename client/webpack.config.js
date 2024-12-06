module.exports = {
  resolve: {
    fallback: {
      async_hooks: false,
      assert: require.resolve("assert/"),
      util: require.resolve("util/"),
      zlib: require.resolve("browserify-zlib"),
      stream: require.resolve("stream-browserify"),
      path: require.resolve("path-browserify"),
      querystring: require.resolve("querystring-es3"),
      fs: false,
    },
  },
};
