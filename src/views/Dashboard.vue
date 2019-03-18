<template>
  <div class="container-fluid">
    <div id="ui-view">
      <div class="animated fadeIn">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-sm-5">
                <h4 class="card-title mb-0">Traffic</h4>
                <span class="small text-muted">November 2017</span>
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
            <div class="chart-wrapper" style="height:300px;margin-top:40px;">
              <canvas class="chart" id="main-chart" height="300"></canvas>
            </div>
          </div>
        </div>
        <!-- /.card-->
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
    var mainChart = new Chart($('#main-chart'), {
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
        borderColor: 'green',
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
            maxTicksLimit: 5,
            stepSize: Math.ceil(660 / 5),
            max: 660
          }
        }]
      },
      elements: {
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3
        }
      }
    }
  });
  }
}
</script>
