module.exports = {
	mode: "development",
	entry: {
		main: "./main.js"
	},
	output: {
		filename: '[name].bundle.js'
	},

	module: {
				 rules: [
			      {
			        test: /\.css$/,
			        use: ['style-loader', 'css-loader'],
			      },
			    ],
		}
}