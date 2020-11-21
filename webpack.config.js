/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack');
const path = require('path');
const package = require('./package.json');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const boxen = require('boxen');
const chalk = require('chalk');

const isProduction = process.argv.indexOf('-p') >= 0 || process.env.NODE_ENV === 'production';
const sourcePath = path.join(__dirname, './src');
const outPath = path.join(__dirname, './build');
const port = 3000;

module.exports = {
	context: sourcePath,
	entry: {
		app: './index.tsx'
	},
	output: {
		path: outPath,
		filename: '[name].[hash].js',
		chunkFilename: '[name].[hash].js'
	},
	target: 'web',
	resolve: {
		extensions: ['.js', '.ts', '.tsx', '.scss'],
		mainFields: ['module', 'browser', 'main'],
		alias: {
			app: path.resolve(__dirname, 'src/app/')
		}
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [
					!isProduction && {
						loader: 'babel-loader',
						options: { plugins: ['react-hot-loader/babel'] }
					},
					'ts-loader'
				].filter(Boolean)
			},
			{
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
				]
			},
			{
				test: /\.md$/i,
				use: 'raw-loader'
			},
			{ test: /\.html$/, use: 'html-loader' },
			{
				test: /\.(jpe?g|gif|png|mp3|mp4|ogg|wav|eot|ttf|woff|woff2)$/,
				use: 'file-loader'
			}
		]
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					chunks: 'initial',
					minChunks: 2
				},
				'default-vendors': {
					test: /[\\/]node_modules[\\/]/,
					chunks: 'all',
					filename: 'vendor.[hash].js',
					priority: -10
				}
			}
		},
		runtimeChunk: true
	},
	plugins: [
		new BundleAnalyzerPlugin({
			analyzerMode: 'static',
			openAnalyzer: false,
			reportFilename: 'bundlesize/bundle-visualizer.html'
		}),
		new webpack.EnvironmentPlugin({
			NODE_ENV: 'development',
			DEBUG: false // !isProduction
		}),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: '[hash].css',
			disable: false // !isProduction
		}),
		new HtmlWebpackPlugin({
			template: 'assets/index.html',
			minify: {
				minifyJS: true,
				minifyCSS: true,
				removeComments: true,
				useShortDoctype: true,
				collapseWhitespace: true,
				collapseInlineTagWhitespace: true
			},
			meta: {
				title: package.name,
				description: package.description,
				keywords: Array.isArray(package.keywords) ? package.keywords.join(',') : undefined
			}
		}),
		{
			apply: (compiler) => {
				this.isFirstBuild = true;
				compiler.hooks.done.tap('Notifier', () => {
					if (this.isFirstBuild === true) {
						this.isFirstBuild = false;
						console.log(
							// prettier-ignore
							`${boxen(`
${chalk.yellow(`Cat Demo App                      `)}
${chalk.grey('------------------------------------\n')}
${chalk.grey("Tasks: ")}${chalk.cyan(`http://localhost:${port}`)}
${chalk.grey("Todo: ")}${chalk.cyan(`http://localhost:${port}/todo`)}
${chalk.grey("Counter: ")}${chalk.cyan(`http://localhost:${port}/counter`)}
${chalk.grey("Form: ")}${chalk.cyan(`http://localhost:${port}/form`)}
`,
								{ borderStyle: 'round', padding: 1, borderColor: '#ffcc11' }
							)}\n`
						);
					}
				});
			}
		}
	],
	devServer: {
		before: (app) => {
			app.get('/test', function (req, res) {
				res.json({
					data: [
						{ id: 3012, name: 'bananas', isChecked: false },
						{ id: 4556, name: 'cheetos', isChecked: false },
						{ id: 7899, name: 'oranges', isChecked: true },
						{ id: 5472, name: 'rice', isChecked: false }
					]
				});
			});
		},
		port,
		contentBase: sourcePath,
		hot: true,
		inline: true,
		historyApiFallback: true,
		stats: 'minimal',
		clientLogLevel: 'warning'
	},
	devtool: isProduction ? 'hidden-source-map' : 'cheap-module-eval-source-map',
	node: {
		fs: 'empty',
		net: 'empty'
	}
};
