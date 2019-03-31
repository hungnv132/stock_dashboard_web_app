<template>
  <div class="container-fluid">
    <div id="ui-view">
      <div class="animated fadeIn">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-sm-5">
                <h4 class="card-title mb-0">{{foreignTradeVolume.symbol}} - Volume of Foreign</h4>
              </div>
              <div class="col-sm-7 d-none d-md-block">
                <div class="btn-group btn-group-toggle float-right mr-3" data-toggle="buttons">
                  <form action="#" @submit="findForeignTradeVolume">
                    <input  v-model="foreignTradeVolume.symbol"  type="text" class="form-control" autocomplete="off"/>
                  </form>
                </div>
              </div>
            </div>
            <ForeignTradeVolume :symbol="foreignTradeVolume.symbol" :height="foreignTradeVolume.height" />
          </div>
        </div>
        <!-- /.card-->
        <div class="row">
          <div class="col-md-6">
              <div class="card">
                <div class="card-body">
                  <div class="row">
                    <div class="col-sm-5">
                      <h4 class="card-title mb-0">{{mostBuyVolumeToday.title}}</h4>
                      <span class="small text-muted">{{mostBuyVolumeToday.startDate}}</span>
                    </div>
                    <div class="col-sm-7 d-none d-md-block">
                      <div class="btn-group btn-group-toggle float-right mr-3" data-toggle="buttons">
                        <form action="#">
                          <input type="text" id="datepicker-buy-volume-today" class="form-control" autocomplete="off" />
                        </form>
                      </div>
                    </div>
                  </div>
                  <div class="chart-wrapper">
                    <BarChart :chart-data="mostBuyVolumeToday.chartData"></BarChart>
                  </div>
                </div>
              </div>
          </div>
          <div class="col-md-6">
              <div class="card">
                <div class="card-body">
                  <div class="row">
                    <div class="col-sm-5">
                      <h4 class="card-title mb-0">{{mostSellVolumeToday.title}}</h4>
                      <span class="small text-muted">{{mostSellVolumeToday.startDate}}</span>
                    </div>
                    <div class="col-sm-7 d-none d-md-block">
                      <div class="btn-group btn-group-toggle float-right mr-3" data-toggle="buttons">
                        <form action="#">
                          <input type="text" id="datepicker-sell-volume-today" class="form-control" autocomplete="off" />
                        </form>
                      </div>
                    </div>
                  </div>
                  <div class="chart-wrapper">
                    <BarChart :chart-data="mostSellVolumeToday.chartData"></BarChart>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col-sm-5">
                  <h4 class="card-title mb-0">{{totalBuyVolume.title}}</h4>
                  <span class="small text-muted">{{totalBuyVolume.startDate}} - {{totalBuyVolume.endDate}}</span>
                </div>
                <div class="col-sm-7 d-none d-md-block">
                  <div class="btn-group btn-group-toggle float-right mr-3" data-toggle="buttons">
                    <form action="#">
                      <input type="text" id="datepicker-total-buy-volume" class="form-control" autocomplete="off" />
                    </form>
                  </div>
                </div>
              </div>
              <div class="chart-wrapper">
                <BarChart :chart-data="totalBuyVolume.chartData"></BarChart>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col-sm-5">
                  <h4 class="card-title mb-0">{{totalSellVolume.title}}</h4>
                  <span class="small text-muted">{{totalSellVolume.startDate}} - {{totalSellVolume.endDate}}</span>
                </div>
                <div class="col-sm-7 d-none d-md-block">
                  <div class="btn-group btn-group-toggle float-right mr-3" data-toggle="buttons">
                    <form action="#">
                      <input type="text" id="datepicker-total-sell-volume" class="form-control" autocomplete="off" />
                    </form>
                  </div>
                </div>
              </div>
              <div class="chart-wrapper">
                <BarChart :chart-data="totalSellVolume.chartData"></BarChart>
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
import $ from 'jquery';
import moment from 'moment'
import 'bootstrap-daterangepicker'
import ForeignTradeVolume from '@/components/ForeignTradeVolume'
import BarChart from '@/components/charts/BarChart'
import StatisticVolumeMixins from '@/mixins/StatisticVolumeMixins.js'

let self;

export default {
  name: 'Dashboard',
  components: {
    ForeignTradeVolume,
    BarChart,
  },
  mixins: [StatisticVolumeMixins],
  data: function () {
    return {
      foreignTradeVolume: {
        height:500,
        symbol: 'VNINDEX',
      },
      mostBuyVolumeToday: {
        title: 'Most Buy Volume Today',
        height: 350,
        order: '-total_buy_volume',
        startDate: '',
        endDate: '',
        chartData: [],
      },
      mostSellVolumeToday: {
        title: 'Most Sell Volume Today',
        height: 350,
        order: '-total_sell_volume',
        startDate: '',
        endDate: '',
        chartData: [],
      },
      totalBuyVolume: {
        title: 'Total Buy Volume 30 days',
        height: 350,
        order: '-total_buy_volume',
        startDate: '',
        endDate: '',
        chartData: [],
      },
      totalSellVolume: {
        title: 'Total Sell Volume 30 days',
        height: 350,
        order: '-total_sell_volume',
        startDate: '',
        endDate: '',
        chartData: [],
      },
    }
  },
  mounted: function() {
    self = this
    let dateFormat = 'DD/MM/YYYY';

    $('#datepicker-buy-volume-today').daterangepicker({
      singleDatePicker: true,
      locale: {
        format: dateFormat
      }
    }, this.updateMostBuyVolumeByDate);

    $('#datepicker-sell-volume-today').daterangepicker({
      singleDatePicker: true,
      locale: {
        format: dateFormat
      }
    }, this.updateMostSellVolumeByDate);

    $('#datepicker-total-buy-volume').daterangepicker({
      autoApply: true,
      locale: {
        format: dateFormat
      }
    }, this.updateTotalBuyVolumeByDate);

    $('#datepicker-total-sell-volume').daterangepicker({
      autoApply: true,
      locale: {
        format: dateFormat
      }
    }, this.updateTotalSellVolumeByDate);

    self.initDateRange();

  },
  methods: {

    initDateRange: function () {
      let today = moment();
      this.updateMostBuyVolumeByDate(today)
      this.updateMostSellVolumeByDate(today)

      let last30Days =  moment().add(-30, 'days');
      this.updateTotalBuyVolumeByDate(last30Days, today)
      this.updateTotalSellVolumeByDate(last30Days, today)

    },

    updateMostBuyVolumeByDate: function (startDate) {
      let d = moment(startDate).format('DD/MM/YYYY')
      this.$set(this.mostBuyVolumeToday, 'startDate', d);
      this.$set(this.mostBuyVolumeToday, 'endDate', d);
      this.statisticizeVolume(this.mostBuyVolumeToday);
    },

    updateMostSellVolumeByDate: function (startDate) {
      let d = moment(startDate).format('DD/MM/YYYY')
      this.$set(this.mostSellVolumeToday, 'startDate', d);
      this.$set(this.mostSellVolumeToday, 'endDate', d);
      this.statisticizeVolume(this.mostSellVolumeToday);
    },

    updateTotalBuyVolumeByDate: function (startDate, endDate) {
      let sd = moment(startDate).format('DD/MM/YYYY')
      let ed = moment(endDate).format('DD/MM/YYYY')
      this.$set(this.totalBuyVolume, 'startDate', sd);
      this.$set(this.totalBuyVolume, 'endDate', ed);
      this.statisticizeVolume(this.totalBuyVolume);
    },

    updateTotalSellVolumeByDate: function (startDate, endDate) {
      let sd = moment(startDate).format('DD/MM/YYYY')
      let ed = moment(endDate).format('DD/MM/YYYY')
      this.$set(this.totalSellVolume, 'startDate', sd);
      this.$set(this.totalSellVolume, 'endDate', ed);
      this.statisticizeVolume(this.totalSellVolume);
    },
    findForeignTradeVolume: function (event) {
      event.preventDefault()
      this.getForeignTradeVolume(this.symbol)
    },
    
  }

}
</script>
<style lang="scss" scoped>
@import '../../node_modules/bootstrap-daterangepicker/daterangepicker.css'
</style>

