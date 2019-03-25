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
                  <label class="btn btn-outline-secondary">
                    <input id="option1" type="radio" name="options" autocomplete="off"> Day
                  </label>
                  <label class="btn btn-outline-secondary active">
                    <input id="option2" type="radio" name="options" autocomplete="off" checked=""> Month
                  </label>
                  <label class="btn btn-outline-secondary">
                    <input id="option3" type="radio" name="options" autocomplete="off"> Year
                  </label>
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
                <div class="card-header">Most BUY Volume Today</div>
                <div class="card-body">
                  <VerticalBarChart :height="mostBuyVolumneToday.height" :labels="mostBuyVolumneToday.labels" :datasets="mostBuyVolumneToday.datasets" />
                </div>
              </div>
          </div>
          <div class="col-md-6">
              <div class="card">
                <div class="card-header">Most SELL Volume Today</div>
                <div class="card-body">
                  <div class="chart-wrapper" style="height:350px;">
                    <canvas class="chart" id="foreignTradeVolumemost-sell-volume"></canvas>
                  </div>
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
              <div class="chart-wrapper" style="min-height:400px;">
                <canvas class="chart" id="most-buy-30"  style="min-height:400px;">></canvas>
              </div>
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
      mostBuyVolumneToday: {
        height: 350,
        labels: [],
        datasets: []
      }
    }
  },
  mounted: function() {
    self = this
    this.getTradeData(this.symbol)
    this.getMostBuyVolumeToday()
    this.showMostBuyVolume30Days();
  },
  methods: {
    getTradeData: function (symbol) {
      let url = config.api.trade + "?symbol=" + symbol;
      axios.get(url)
      .then(function (response) {
        self.handleForeignTradeVolumne(response.data)
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
        labels.push(element.traded_at)
        buyVolume.push(element.foreign_buy_volume)
        sellVolume.push(element.foreign_sell_volume)
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
        Vue.set(self.foreignTradeVolume, 'labels', labels)
        this.$set(self.foreignTradeVolume, 'datasets', datasets)
    },

    getMostBuyVolumeToday: function() {
      let labels = ['VNM', 'VCB', 'SHB', 'VNM', 'VCB', 'SHB', 'VNM', 'VCB', 'SHB', 'VNM', 'VCB', 'SHB', 'VNM', 'VCB', 'SHB', 'VNM', 'VCB', 'SHB', 'VNM', 'VCB', 'SHB', ]
      let datasets = [
        {
          label: 'Buy Volume',
          backgroundColor: 'blue',
          data: [10, 12, 30, 2, 10, 10, 12, 30, 2, 10,10, 12, 30, 2, 10,100, 12, 30, 2, 10,]
        },
        {
          label: 'Sell Volume',
          backgroundColor: 'red',
          data: [-3, -12, -90, -2, -10, -10, -12, -30, -2, -10,-10, -12, -30, -2, -10,-10, -12, -30, -2, -10,]
        }
      ]
      this.$set(self.mostBuyVolumneToday, 'labels', labels)
      this.$set(self.mostBuyVolumneToday, 'datasets', datasets)

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
