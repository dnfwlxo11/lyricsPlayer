const path = require('path');

module.exports = {
    outputDir: path.resolve(__dirname, '../server/public'),
    
    css: {
        loaderOptions: {
            sass: {
                prependData: `
                    @import "@/assets/scss/_modal.scss";
                `
            }
        }
    },

    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:16000/'
            },
            '/cover': {
                target: 'http://localhost:16000/'
            },
            '/ai': {
                target: 'http://localhost:8000/'
            }
        },
        overlay: true,
    }
}