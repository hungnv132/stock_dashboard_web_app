var host = 'http://0.0.0.0:9999'
if (process.env.NODE_ENV == 'production'){
    host = 'http://www.makeq.net'
}
export default {
    api: {
        company: host + '/api/v1/companies/',
        trade: host + '/api/v1/companies/{symbol}/trades/',
        statistic: {
            foreignTradeVolume: host + '/api/v1/statistics/foreign-trade-volume/',
        }
    }
}