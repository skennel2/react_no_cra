// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
// const dotenv = require('dotenv');
const webpack = require('webpack');
const dotenvWebpack = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV == 'production';
const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';

// function setupDotenv() {
//     dotenv.config({
//         path: isProduction ? path.resolve(process.cwd(), '.env.production') : path.resolve(process.cwd(), '.env')
//     });
// }
// setupDotenv();

/**@type {import('webpack').Configuration} */
const config = {
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    devServer: {
        open: true,
        host: 'localhost',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',

        }),
        // CSS 파일을 별도 파일로 추출
        new MiniCssExtractPlugin(),
        // DefinePlugin을 이용한 환경변수 설정
        // new webpack.DefinePlugin({
        //     "process.env": JSON.stringify(process.env),
        // })
        // dotenv-webpack 패키지를 이용한 환경변수 설정
        new dotenvWebpack({
            path: isProduction ? 
                path.resolve(process.cwd(), '.env.production') : path.resolve(process.cwd(), '.env')
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                loader: 'ts-loader',
                exclude: ['/node_modules/'],
            },
            {
                test: /\.css$/i,
                use: [stylesHandler, 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset'
            },
        ],
    },
    resolve: {
        // import 구문에서 다음 확장자를 생략할수 있게 해준다.
        extensions: ['.tsx', '.ts', '.js'],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
        
        
    } else {
        config.mode = 'development';
        config.devtool = 'inline-source-map';
    }
    return config;
};
