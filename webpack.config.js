module.exports = {
  //...
  module:{
    rules:{
      test:/\.sccs$/,
      use:[
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    }
  }
}