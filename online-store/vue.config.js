// 配置文件

module.exports = {
  publicPath: './',
  devServer: {
    open: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000/', // 本地后端地址
        changeOrigin: true, //允许跨域
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  configureWebpack: {
		module: {
			rules: [
				{
					test: /\.md$/,
					use: ["text-loader"],
				},
			],
		},
	},
}