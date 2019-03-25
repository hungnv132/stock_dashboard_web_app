var host = 'http://0.0.0.0:9999'
if (process.env.NODE_ENV == 'production'){
    host = 'http://www.makeq.net'
}
export default {
    api: {
        trade: host + '/api/v1/trades/'
    }
}