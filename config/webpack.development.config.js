var path = require('path');
var webpack = require('webpack');

// Set base path to be the project root
var basePath = path.resolve(__dirname, '..');

module.exports = entry => ({
  // Set the context and entry file
  context: basePath,
  entry,
  
  // Tell webpack where it should look for modules
  resolve: {
    modules: [path.resolve(basePath), path.resolve(basePath, 'node_modules')],
  },
  
  module: {
    rules: [
      {
     test: /\.js$/,
     exclude: /(node_modules)/,
     use: {
       loader: 'babel-loader',
       options: {
         presets: ['env']
       }
     }
   }
    ],
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
  ],
});
