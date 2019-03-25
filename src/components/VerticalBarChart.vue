<template>
    <div class="chart-wrapper" :style="chartHeight">
        <canvas class="chart" ref="verticalBarChartCanvas" :height="height" :id="id"></canvas>
    </div>
</template>
<script>
import  Chart from 'chart.js';


export default {
  name: 'LineChart',
  props: {
    height: Number,
    labels: Array,
    datasets: Array,
    id: String,
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

  watch: {
    labels: function () {
      this.renderChart()
    }
  },

  methods: {
    renderChart: function () {
      let self = this
      let chart = new Chart(this.$refs.verticalBarChartCanvas, {
        type: self.type,
        options: self.options,
      });
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


