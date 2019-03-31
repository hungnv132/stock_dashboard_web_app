<template>
  <LineChart :height="height" :labels="labels" :datasets="datasets"/>
</template>
<script>
import axios from 'axios'
import config from '@/config.js'
import LineChart from '@/components/charts/LineChart'

let self;

export default {
  name: 'ForeignTradeVolume',
  props: {
    symbol: String,
    height: Number,
  },
  components: {
    LineChart
  },

  data: function () {
    return {
      labels: [],
      datasets: []
    }
  },

  mounted: function () {
    self = this
    this.getForeignTradeVolume(this.symbol)
  },

  watch: {
    symbol: function () {
      this.getForeignTradeVolume(this.symbol)
    }
  },

  methods: {

    getForeignTradeVolume: function (symbol) {
      let url = config.api.trade.replace('{symbol}', symbol);
      axios.get(url)
      .then(function (response) {
        self.handleForeignTradeVolumne(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    },

    handleForeignTradeVolumne: function (data) {
      let buyVolume = [];
      let sellVolume = [];
      let labels = [];
      data.forEach(element => {
        labels.push(element.traded_at);
        buyVolume.push(element.foreign_buy_volume);
        sellVolume.push(element.foreign_sell_volume);
      });
      
      let datasets = [
        {
          label: 'Sell Volume',
          borderColor: 'red',
          data: sellVolume
        }, {
          label: 'Buy Volume',
          borderColor: 'green',
          data: buyVolume
        }]
        this.$set(self, 'labels', labels);
        this.$set(self, 'datasets', datasets);
    },
  }
}
</script>


