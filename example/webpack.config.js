const path = require('path');

module.exports = {
    devtool: 'eval',
    entry: './app.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
            { test: /\.css$/, loader: 'style-loader!css-loader' },
       ],
    },
    resolve: {
        alias: {
            'rest-ui': path.join(__dirname, '..', 'src'),
            'react': path.resolve('./node_modules/react'),
            'react-native': 'react-native-web'
        },
    },
};
