const path = require('path');

const ENV_VARS = {};

module.exports = {
  future: {
    webpack5: true,
  },
  reactStrictMode: true,
  trailingSlash: false,
  poweredByHeader: false,
  distDir: '../../dist/web',
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  env: ENV_VARS,
};
