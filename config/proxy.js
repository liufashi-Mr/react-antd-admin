module.exports = {
  proxy: {
    '/dev-api/': {
      target: 'https://expo.liufashi.top',
      changeOrigin: true,
      pathRewrite: { '^/dev-api': '' },
    },
  },
};
