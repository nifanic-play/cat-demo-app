const path = require('path');

module.exports = {
	stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(ts|tsx)'],
	addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
	webpackFinal: async (config, { configType }) => {
		config.module.rules.push({
			test: /\.scss$/,
			use: [
				'style-loader',
				{
					loader: 'css-loader',
					options: {
						modules: {
							localIdentName: '[local]___[hash:base64:5]'
						}
					}
				},
				'sass-loader'
			],
			include: path.resolve(__dirname, '../')
		});

		return config;
	}
};
