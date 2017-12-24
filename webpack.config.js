const path = require('path')

module.exports = {
    entry: {
        main:'./src/main.ts',
    },
    output: {
        path: path.resolve(__dirname, 'comp'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            { test: /\.ts$/, loader: 'ts-loader' },
        ]
    }
}