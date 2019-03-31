import axios from 'axios'
import config from '@/config.js'

export default {
  methods: {
    prepareForeignTradeUrl: function (instance, url) {
      let queryArr = [];
      let param = '';
      if (instance.order) {
        param = "order=" + instance.order
        queryArr.push(param)
      }
      if (instance.startDate) {
        param = "start_date=" + instance.startDate
        queryArr.push(param)
      }
      if (instance.endDate) {
        param = "end_date=" + instance.endDate
        queryArr.push(param)
      }

      let queryString = queryArr.join('&');
      let fullUrl = url;
      if (queryString) {
        fullUrl += "?" + queryString
      }

      return fullUrl
    },

    statisticizeVolume: function (instance) {
      let self = this
      let url = config.api.statistic.foreignTradeVolume;
      let fullUrl = this.prepareForeignTradeUrl(instance, url)

      axios.get(fullUrl)
        .then(function (response) {
          self.handleForeignTradeData(instance, response.data)
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    handleForeignTradeData: function (instance, data) {
      let labels = [];
      let buyVolume = [];
      let sellVolume = [];

      data.forEach(element => {
        labels.push(element.symbol);
        buyVolume.push(element.total_buy_volume);
        sellVolume.push(element.total_sell_volume * -1);
      });

      let datasets = [
        {
          label: 'Buy Volume',
          backgroundColor: 'green',
          data: buyVolume
        },
        {
          label: 'Sell Volume',
          backgroundColor: 'red',
          data: sellVolume
        }
      ]
      let chartData = {
        labels: labels,
        datasets: datasets
      }
      this.$set(instance, 'chartData', chartData)
    },
  }
}