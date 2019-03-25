<template>
    <div class="chart-wrapper" :style="chartHeight">
        <canvas class="chart" ref="barChartCanvas" :height="height"></canvas>
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
      type: 'bar',
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
    }
  },

  computed: {
    chartHeight: function() {
      return "height:" + this.height + "px;"
    },
  },

  mounted: function () {
    self = this
    chart = new Chart(this.$refs.barChartCanvas, {
      type: self.type,
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


