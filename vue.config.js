var BundleTracker  = require('webpack-bundle-tracker');

var publicPath = process.env.NODE_ENV === 'production' ? 'static/' : '/';

module.exports = {
    indexPath: 'stock_dashboard.html',
    publicPath: publicPath,
    configureWebpack: {
        plugins: [
            new BundleTracker({filename: './webpack-stats.json'}),
        ]
      }
  }