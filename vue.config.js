var BundleTracker  = require('webpack-bundle-tracker');

module.exports = {
    indexPath: 'stock_dashboard.html',
    outputDir: '/home/hnv132/Projects/thesite/mysite/static',
    publicPath: 'static/',
    configureWebpack: {
        plugins: [
            new BundleTracker({filename: './webpack-stats.json'}),
        ]
      }
  }