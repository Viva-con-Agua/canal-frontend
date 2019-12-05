process.env.VUE_APP_MM_URL = 'https://mattermost.vivaconagua.org',
module.exports = {
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  },
  publicPath: process.env.NODE_ENV === 'production'
        ? '/canal/'
        : '/canal/',
    chainWebpack: config => {
        const svgRule = config.module.rule('svg')

        // clear all existing loaders.
        // if you don't do this, the loader below will be appended to
        // existing loaders of the rule.
        svgRule.uses.clear()

        // add replacement loader(s)
        svgRule
            .use('svg-inline-loader')
            .loader('svg-inline-loader')
    }
}
