module.exports = {
  entry: './index.js',
  output: {
    path: './',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loaders: [
          'react-hot',
          'babel?presets[]=react,presets[]=es2015,presets[]=stage-2',
        ],
      },
    ],
  },
};
