module.exports = {
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
                target: 'http://localhost:3000/'
            },
            '/cover': {
                target: 'http://localhost:3000/'
            },
            '/ai': {
                target: 'http://daein-fastapi:8000/'
            }
        },
        overlay: true,
    }
}