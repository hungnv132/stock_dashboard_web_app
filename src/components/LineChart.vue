<template>
    <div class="chart-wrapper" :style="chartHeight">
        <canvas class="chart" ref="lineChartCanvas" :height="height"></canvas>
    </div>
</template>
<script>
import  Chart from 'chart.js';
var chart;
var self;

export default {
  name: 'LineChart',
  props: {
    height: Number,
    labels: Array,
    datasets: Array,
  },

  data: function () {
    return {
      chartType: 'line',
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
              borderWidth: 2,
              backgroundColor: 'transparent',
              pointHoverBackgroundColor: '#fff'
            },
            point: {
              radius: 2,
              hitRadius: 4,
              hoverRadius: 2,
              hoverBorderWidth: 4
            }
          }
        }
    }
  },

  computed: {
    chartHeight: function() {
      return "height:" + this.height + "px;"
    },
  },

  mounted: function () {
    self = this
    chart = new Chart(this.$refs.lineChartCanvas, {
      type: self.chartType,
      options: self.options,
    });
  },

  watch: {
    labels: function () {
      this.renderChart()
    }
  },

  methods: {
    renderChart: function () {
      // apply data, labels to the chart
      chart.data.labels = this.labels;
      this.datasets.forEach(element => {
        chart.data.datasets.push(element);
      });
      chart.update();
    },
  }
}
</script>


