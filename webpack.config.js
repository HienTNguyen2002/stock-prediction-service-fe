module.exports = {
  entry: ['babel-polyfill', './src/index.js'],

  output: {
    filename: 'bundle.js',
    publicPath: ''
  },

  module: {
    loaders: [
      { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: 'babel-loader?presets[]=es2015&presets[]=react&presets[]=stage-2' }
    ]
  },
  devServer: {
    compress: true,
    // Please comment this line
    disableHostCheck: true
    // Instead replace the <HOSTNAME> with your host and uncomment this line
    // public: '<HOSTNAME>'
 }    
}
