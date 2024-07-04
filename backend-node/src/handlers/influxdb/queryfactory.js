class InfluxQueryFactory {


    getSatisfactionQuery(bucket, ) {
        const query = 'from(bucket:"my-bucket") |> range(start: -1d) |> filter(fn: (r) => r._measurement == "temperature")'

    }

}

module.exports = {
    InfluxQueryFactory
}