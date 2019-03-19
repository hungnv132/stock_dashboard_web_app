<template>
  <div class="container-fluid">
    <div id="ui-view">
      <div class="animated fadeIn">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-sm-5">
                <h4 class="card-title mb-0">VNINDEX - Volume of Foreign</h4>
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
            <div class="chart-wrapper" style="height:350px;">
              <canvas class="chart" id="vnindex-foreign-volume" height="350"></canvas>
            </div>
          </div>
        </div>
        <!-- /.card-->
        <div class="row">
          <div class="col-md-6">
              <div class="card">
                <div class="card-header">Most BUY Volume Today</div>
                <div class="card-body">
                  <div class="chart-wrapper" style="height:350px;">
                    <canvas class="chart" id="most-buy-volume"></canvas>
                  </div>
                </div>
              </div>
          </div>
          <div class="col-md-6">
              <div class="card">
                <div class="card-header">Most SELL Volume Today</div>
                <div class="card-body">
                  <div class="chart-wrapper" style="height:350px;">
                    <canvas class="chart" id="most-sell-volume"></canvas>
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
// import HelloWorld from '@/components/HelloWorld.vue'
import  Chart from 'chart.js';
import  $ from 'jquery';

export default {
  name: 'Dashboard',
  data: function () {
    return {
      'name': 'Hello'
    }
  },
  mounted: function() {
    this.showVNINDEXForeignVolume();
    this.showMostBuyVolume();
    this.showMostBuyVolume30Days();
  },
  methods: {
    showVNINDEXForeignVolume: function () {
      var mainChart = new Chart($('#vnindex-foreign-volume'), {
        type: 'line',
        data: {
          labels: ['12/03', 'T', 'W', 'T', 'F', 'S', 'S', 'M', 'T', 'W', 'T', 'F', 'S', 'S', 'M', 'T', 'W', 'T', 'F', 'S', 'S', 'M', 'T', 'W', 'T', 'F', 'S', 'S'],
          datasets: [{
            label: 'Sell Volume',
            backgroundColor: 'transparent',
            borderColor: 'red',
            pointHoverBackgroundColor: '#fff',
            borderWidth: 2,
            data: [165, 180, 70, 69, 77, 57, 423, 600, 172, 91, 173, 232, 155, 89, 50, 161, 65, 457, 160, 103, 114, 185, 125, 234, 183, 64, 321, 95, 112, 175]
          }, {
            label: 'Buy Volume',
            backgroundColor: 'transparent',
            borderColor: 'blue',
            pointHoverBackgroundColor: '#fff',
            borderWidth: 2,
            data: [92, 97, 80, 100, 86, 97, 83, 98, 87, 98, 93, 83, 87, 98, 96, 84, 91, 97, 88, 423, 94, 86, 95, 91, 98, 91, 92, 80, 83, 82]
          }]
        },
        options: {
          maintainAspectRatio: false,
          legend: {
            display: true
          },
          scales: {
            xAxes: [{
              gridLines: {
                drawOnChartArea: false
              }
            }],
            yAxes: [{
              ticks: {
                beginAtZero: true,
              }
            }]
          },
          elements: {
            line: {
              tension: 0,
              borderWidth: 1
            },
            point: {
              radius: 2,
              hitRadius: 4,
              hoverRadius: 2,
              hoverBorderWidth: 4
            }
          }
        }
      });
    },

    showMostBuyVolume: function () {
      var barChartData = {
        labels: ['VNM', 'VCB', 'SHB', 'VNM', 'VCB', 'SHB', 'VNM', 'VCB', 'SHB', 'VNM', 'VCB', 'SHB', 'VNM', 'VCB', 'SHB', 'VNM', 'VCB', 'SHB', 'VNM', 'VCB', 'SHB', ],
        datasets: [{
          label: 'Buy Volume',
          backgroundColor: 'blue',
          data: [
            10, 12, 30, 2, 10, 10, 12, 30, 2, 10,10, 12, 30, 2, 10,100, 12, 30, 2, 10,
          ]
        }, {
          label: 'Sell Volume',
          backgroundColor: 'red',
          data: [
            -3, -12, -90, -2, -10, -10, -12, -30, -2, -10,-10, -12, -30, -2, -10,-10, -12, -30, -2, -10,
          ] 
        }]
      };

      var mostBuy = new Chart($('#most-buy-volume'), {
        type: 'bar',
        data: barChartData,
        options: {
          
          tooltips: {
            mode: 'index',
            intersect: false
          },
          responsive: true,
          scales: {
            xAxes: [{
              stacked: true,
            }],
            yAxes: [{
              stacked: true
            }]
          }
        }
      });
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
              position: "right",
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
