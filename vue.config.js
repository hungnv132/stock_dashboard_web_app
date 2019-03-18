var BundleTracker  = require('webpack-bundle-tracker');

module.exports = {
    indexPath: 'stock_dashboard.html',
    publicPath: 'static/',
    configureWebpack: {
        plugins: [
            new BundleTracker({filename: './webpack-stats.json'}),
        ]
      }
  }