<template>
  <div class="container-fluid">
    <div id="ui-view">
      <div class="animated fadeIn">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-sm-5">
                <h4 class="card-title mb-0">{{symbol}} - Volume of Foreign</h4>
                <!-- <span class="small text-muted">12/02/2019</span> -->
              </div>
              <div class="col-sm-7 d-none d-md-block">
                <div class="btn-group btn-group-toggle float-right mr-3" data-toggle="buttons">
                  <form action="#" @submit="findForeignTradeVolume">
                    <input  v-model="symbol"  type="text" class="form-control" autocomplete="off"/>
                  </form>
                </div>
              </div>
            </div>
            <LineChart :height="foreignTradeVolume.height" :labels="foreignTradeVolume.labels" :datasets="foreignTradeVolume.datasets"/>
          </div>
        </div>
        <!-- /.card-->
        <div class="row">
          <div class="col-md-6">
              <div class="card">
                <div class="card-header">
                  Most BUY Volume Today
                  <input type="text" id="datepicker">
                  </div>
                <div class="card-body">
                  <VerticalBarChart :height="mostBuyVolume.height" :labels="mostBuyVolume.labels" :datasets="mostBuyVolume.datasets" />
                </div>
              </div>
          </div>
          <div class="col-md-6">
              <div class="card">
                <div class="card-header">Most SELL Volume Today</div>
                <div class="card-body">
                  <VerticalBarChart :height="mostSellVolume.height" :labels="mostSellVolume.labels" :datasets="mostSellVolume.datasets"/>
                </div>
              </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">Most BUY in last 30 days</div>
            <div class="card-body">
              <VerticalBarChart :height="totalBuyVolume.height" :labels="totalBuyVolume.labels" :datasets="totalBuyVolume.datasets" />
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">Most SELL in last 30 days</div>
            <div class="card-body">
              <div class="chart-wrapper" style="height:400px;">
                <canvas class="chart" id="most-sell-30"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Vue from 'vue'
import Chart from 'chart.js';
import $ from 'jquery';
import DateRangePicker from 'bootstrap-daterangepicker'
import axios from 'axios'
import config from '@/config.js'
import LineChart from '@/components/LineChart'
import VerticalBarChart from '@/components/VerticalBarChart'


let self;

export default {
  name: 'Dashboard',
  components: {
    LineChart,
    VerticalBarChart,
  },
  data: function () {
    return {
      symbol: 'VNINDEX',
      foreignTradeVolume: {
        height: 600,
        labels: [],
        datasets: []
      },
      mostBuyVolume: {
        height: 350,
        labels: [],
        datasets: []
      },
      mostSellVolume: {
        height: 350,
        labels: [],
        datasets: []
      },
      totalBuyVolume: {
        height: 350,
        labels: [],
        datasets: []
      },
      totalSellVolume: {
        height: 350,
        labels: [],
        datasets: []
      },
    }
  },
  mounted: function() {
    self = this
    $('#datepicker').daterangepicker();
    this.getForeignTradeVolume(this.symbol);
    this.statisticizeForeignTradeVolume();
  },
  methods: {

    findForeignTradeVolume: function (event) {
      event.preventDefault()
      this.getForeignTradeVolume(this.symbol)
    },

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
        Vue.set(self.foreignTradeVolume, 'labels', labels);
        this.$set(self.foreignTradeVolume, 'datasets', datasets);
    },

    statisticizeForeignTradeVolume: function () {
      let url = config.api.statistic.foreignTradeVolume;
      axios.get(url + "?order=-total_buy_volume&start_date=25/03/2019")
      .then(function (response) {
        self.getMostBuyVolume(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });

      axios.get(url + "?order=-total_sell_volume&start_date=25/03/2019")
      .then(function (response) {
        self.getMostSellVolume(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });

      axios.get(url + "?order=-total_buy_volume&start_date=01/03/2019")
      .then(function (response) {
        self.getTotalBuyVolume(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
    },

    getMostBuyVolume: function(data) {
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
      this.$set(self.mostBuyVolume, 'labels', labels)
      this.$set(self.mostBuyVolume, 'datasets', datasets)
    },

    getMostSellVolume: function(data) {
      let labels = [];
      let buyVolume = [];
      let sellVolume = [];

      data.forEach(element => {
        labels.push(element.symbol);
        buyVolume.push(element.total_buy_volume * -1);
        sellVolume.push(element.total_sell_volume);
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
      this.$set(self.mostSellVolume, 'labels', labels)
      this.$set(self.mostSellVolume, 'datasets', datasets)
    },

    getTotalBuyVolume: function (data) {
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
      this.$set(self.totalBuyVolume, 'labels', labels)
      this.$set(self.totalBuyVolume, 'datasets', datasets)
    },

    showMostBuyVolume30Days: function () {
      var MONTHS = ['SHB', 'VNM', 'VCB','SHB', 'VNM', 'VCB','SHB', 'VNM', 'VCB','SHB', 'VNM', 'VCB','SHB', 'VNM', 'VCB','SHB', 'VNM', 'VCB',];
      var color = 'green';
      var horizontalBarChartData = {
        labels: MONTHS,
        datasets: [{
          label: 'Dataset 1',
          backgroundColor: 'blue',
          borderColor: 'blue',
          borderWidth: 1,
          data: [
            10, 45, 30, 200, 10, 45, 30, 60, 10, 45, 30, 90, 50, 45, 30, 200, 10, 45, 30, 300,  30, 180, 10, 45, 30, 200, 
          ]
        }]
      };

      var mostBuy30 = new Chart($('#most-buy-30'), {
        type: 'horizontalBar',
        data: horizontalBarChartData,
        options: {
          // Elements options apply to all of the options unless overridden in a dataset
          // In this case, we are setting the border of each horizontal bar to be 2px wide
          elements: {
            rectangle: {
              borderWidth: 2,
            }
          },
          responsive: true,
          legend: {
            display: false,
            position: 'right',
          },
           scales: {
            xAxes: [{
              position: "right",
            }],
            yAxes: [{
              position: "left",
              gridLines: {
                display: false
              },
            }],
           }
        }
      });
      
    }
  }

}
</script>
<style lang="scss" scoped>
@import '../../node_modules/bootstrap-daterangepicker/daterangepicker.css'
</style>

