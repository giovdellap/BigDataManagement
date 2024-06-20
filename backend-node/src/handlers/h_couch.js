class CouchBaseHandler {
    DB_USERNAME = "admin"
    DB_PASSWORD = "Couchpw"
    DB_CONN_STR = "couchbases://127.0.0.1/8091"
    DB_BUCKET_NAME = "test"
    cached = {}

    constructor() {
        this.cached = global.couchbase
        if (!cached) {
            this.cached = global.couchbase = { conn: null }
        }
    }

    async createCouchbaseCluster() {
        if (this.cached.conn) {
          return this.cached.conn
        }
      
        // Use wan profile to avoid latency issues
        this.cached.conn = await couchbase.connect(DB_CONN_STR, {
          username: DB_USERNAME,
          password: DB_PASSWORD
        })
      
        return cached.conn
    }

    async connectToDatabase() {
        const cluster = await createCouchbaseCluster()
        const bucket = cluster.bucket(DB_BUCKET_NAME)
        const scope = bucket.scope('scope')
        const collection = bucket.scope('scope').collection('collection')
      
        let dbConnection = {
          cluster,
          bucket,
          scope,
          airlineCollection,
        }
      
        return dbConnection
      }
}

module.exports = {
    CouchBaseHandler
}