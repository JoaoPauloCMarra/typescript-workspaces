/* eslint-disable @typescript-eslint/no-unused-vars */
const path = require('path');
const globImporter = require('node-sass-glob-importer');

const ENV_VARS = {};

module.exports = {
  future: {
    webpack5: true,
  },
  reactStrictMode: true,
  trailingSlash: false,
  poweredByHeader: false,
  distDir: '../../dist/web',
  env: ENV_VARS,

  sassOptions: {
    importer: globImporter,
  },

  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    const tsConfig = config.module.rules[1];
    tsConfig.include.unshift(path.join(__dirname, '../../shared'));
    config.module.rules[1] = tsConfig;
    return config;
  },
};
