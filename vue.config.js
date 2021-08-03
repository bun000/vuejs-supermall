module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'views': '@/views',
        'components': '@/components',
        'network': '@/network',
        'common': '@/common',
        'assets': '@/assets',
      }
    }
  },
  devServer: {
    proxy: 'http://localhost:8080',
    public: 'localhost:8080'  // 本地ip
  }
}