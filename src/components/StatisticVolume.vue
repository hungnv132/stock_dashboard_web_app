<template>
    <div>
      <BarChart :chart-data="chartData" :order="order"></BarChart>
    </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import axios from 'axios'
import config from '@/config.js'
import BarChart from '@/components/charts/BarChart'

let self;

export default {
  name: 'StatisticVolumeComponent',
  props: {
    height: Number,
    startDate: String,
    endDate: String,
    order: String,
    orderBy: String,
    id: String
  },
  components: {
    BarChart
  },

  data: function () {
    return {
      chartData: null,
    }
  },

  mounted: function () {
    self = this;
    this.statisticizeVolume();
  },

  methods: {

    prepareUrl: function (url) {
      let queryArr = [];
      let param = '';
      if (this.order) {
        param = "order=" + this.order
        queryArr.push(param)
      }
      if (self.startDate) {
        param = "start_date=" + this.startDate
        queryArr.push(param)
      }
      if (self.endDate) {
        param = "end_date=" + this.endDate
        queryArr.push(param)
      }

      let queryString = queryArr.join('&');
      let fullUrl = url;
      if (queryString) {
        fullUrl += "?" + queryString
      }

      return fullUrl
    },

    statisticizeVolume: function () {
      let url = config.api.statistic.foreignTradeVolume;
      let fullUrl = self.prepareUrl(url)

      axios.get(fullUrl)
      .then(function (response) {
        self.handleData(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
    },

    handleData: function(data) {
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
      this.$set(self, 'chartData', chartData)
      console.log( this.chartData)
    },
  }
}
</script>


