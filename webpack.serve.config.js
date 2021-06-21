/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const config = require('./webpack.config.js');

config.entry = { main: './src/demo/index.tsx' };
config.output = {
  filename: './output.js',
  path: path.resolve(__dirname),
};
config.mode = 'development';
config.externals = undefined; // eslint-disable-line
// config.devtool = 'inline-source-map';
module.exports = config;
