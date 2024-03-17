const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');  
const MiniCssExtractPlugin = require('mini-css-extract-plugin');  
const CopyWebpackPlugin = require('copy-webpack-plugin');  

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 9001,
    hot: true
  },
  module: {
    rules: [  
      {  
        test: /\.scss$/,  
        use: [  
           // 将 JS 字符串生成为 style 节点  
           process.env.NODE_ENV !== 'production'  
           ? 'style-loader'  
           : MiniCssExtractPlugin.loader,  
          'css-loader',  
          'sass-loader',  
        ],  
      },
      {  
        test: /\.css$/,  
        use: [  
           // 将 JS 字符串生成为 style 节点  
           process.env.NODE_ENV !== 'production'  
           ? 'style-loader'  
           : MiniCssExtractPlugin.loader,  
          'css-loader',  
        ],  
      },
      {  
        test: /\.(png|svg|jpg|jpeg|gif)$/i,  
        type: 'asset/resource', // webpack 5 的新特性，处理图片资源 
        generator: {  
          filename: 'img[hash][ext][query]', // 输出文件的名称模板  
        },  
      }, 
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({  
      template: './src/index.html', // 源码中的HTML文件路径  
      filename: 'index.html' // 打包后的HTML文件名  
    }),
    new MiniCssExtractPlugin({  
      filename: '[name].css',  
      chunkFilename: '[name].[contenthash].css',  
    }), 
    new CopyWebpackPlugin({  
      patterns: [  
        { from: 'src/img', to: 'img' }, // 将 `src/images` 目录下的文件复制到输出目录的 `images` 文件夹  
      ],  
    }),  
  ],
  resolve: {  
    extensions: ['.js', '.jsx', '.scss', 'css'], // 自动解析某些扩展名  
  },
}