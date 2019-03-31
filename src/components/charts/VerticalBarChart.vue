<template>
    <div class="chart-wrapper" :style="chartHeight">
        <canvas class="chart" ref="verticalBarChartCanvas" :height="height" :id="'verticalBarChartCanvas' + id"></canvas>
    </div>
</template>
<script>
import Chart from 'chart.js';
import $ from 'jquery'

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
      chart: '',
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
      // let element = this.$refs['verticalBarChartCanvas' + this.id]
      console.log("vertical " + this.id)
      let name = '#verticalBarChartCanvas' + this.id;
      console.log(name)
      this.chart = new Chart(this.refs.verticalBarChartCanvas, {
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


