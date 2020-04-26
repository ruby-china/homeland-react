const { environment } = require('@rails/webpacker')

const extendConfig = {
  devtool: false,
  performance: {
    hints: false,
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /node_modules|vendor/,
          name: 'vendor',
          enforce: true,
          chunks: 'all',
        },
      },
    },
  },
};

environment.config.merge(extendConfig);

module.exports = environment;
