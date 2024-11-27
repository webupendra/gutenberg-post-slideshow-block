const defaultConfig = require("@wordpress/scripts/config/webpack.config");
const webpack = require("webpack");

module.exports = {
	...defaultConfig,
	entry: {
		...defaultConfig.entry,
		index: "./src/index.js",
		frontend: "./src/frontend.js",
	},
	plugins: [
		...defaultConfig.plugins,
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
		}),
	],
};
