module.exports = {

		 publicPath: process.env.NODE_ENV === 'production'
			    ? '/haval/'
			    : '/',

	configureWebpack: {
		resolve: {
			extensions: ['.js', '.vue', '.json'],
			alias: {
				'vue$': 'vue/dist/vue.esm.js',
			}
		}
	}
}