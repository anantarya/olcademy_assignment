module.exports = {
    // ... other configurations

    resolve: {
        fallback: {
            "crypto": require.resolve('crypto-browserify'),
            "stream": require.resolve('stream-browserify'),
            "util": require.resolve('util/'),
            "zlib": require.resolve('browserify-zlib'), // Add this line
        },
    },
};
