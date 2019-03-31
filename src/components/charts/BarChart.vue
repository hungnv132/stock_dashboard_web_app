<script>
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  props: [
    'chartData',
    'height'
  ],
  data: function () {
    return {
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
  mounted () {
    this.renderChart(this.chartData, this.options)
  },
  watch: {
    chartData: function () {
      this.renderChart(this.chartData, this.options)
    }
  }
}
</script>
