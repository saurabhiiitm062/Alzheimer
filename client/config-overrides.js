module.exports = function override(config) {
  config.resolve.fallback = {
    zlib: require.resolve("browserify-zlib"),
    querystring: require.resolve("querystring-es3"),
    stream: require.resolve("stream-browserify"),
    path: require.resolve("path-browserify"),
    fs: false,
  };
  return config;
};
