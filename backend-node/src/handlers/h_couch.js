const { models } = require("../model/m_model")
const couchbase = require('couchbase')


class CouchBaseHandler {
    
  DB_USERNAME = "admin"
  DB_PASSWORD = "Couchpw"
  DB_CONN_STR = "couchbases://127.0.0.1/8091"
  DB_BUCKET_NAME = "test"
    
  scopes = []

  constructor() {

  }



  async connectToDatabase() {
    console.log('handler - connect 1')
    const cluster = await couchbase.connect(this.DB_CONN_STR, {
      username: this.DB_USERNAME,
      password: this.DB_PASSWORD
    })
    console.log('dentro 2')
    this.bucket = cluster.bucket(this.DB_BUCKET_NAME)
    for (model of models) {
      this.scopes.push(bucket.scope(model.name))
    }      
  }


  async writeItem(item) {
    console.log('write')
    scope = this.bucket.scope(item.model.name)
    console.log('scope: ', scope)
  }
}

module.exports = {
    CouchBaseHandler
}