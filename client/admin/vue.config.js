const path = require("path");

module.exports = {
    transpileDependencies: [
        'vuetify'
    ],
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = "BC - Moderation Tool";
                return args;
            })
    },
    publicPath: '',
    outputDir: path.resolve(__dirname, "../../public/admin")
}
