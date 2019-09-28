const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');

const buildMode = process.env.VUE_APP_MODE;
const assetsDir = process.env.VUE_APP_ASSETS || '/';
const publicPath = process.env.VUE_APP_PUBLICPATH || '/';
const distDit = process.env.VUE_APP_DISTDIR || 'dist';

module.exports = {
  productionSourceMap: false,
  publicPath: publicPath,
  assetsDir: assetsDir,
  outputDir: distDit,
  devServer: {
    open: process.platform === 'darwin',
    host: 'localhost',
    port: 8888,
    proxy: {
      'operation': {
        target: 'http://localhost:8888/',
        ws: true,
        changeOrigin: true
      }
    }
  },
  configureWebpack: config => {
    config.externals = {
    };
    config.resolve = {
      extensions:['.js', '.vue', '.json'],
      alias: {
        'vue':'vue/dist/vue.common.js',
        '@': path.resolve(__dirname,'src')
      }
    };
    if (buildMode === 'analysis') {
      config.plugins.push(new BundleAnalyzerPlugin());
    } 
  }
};

