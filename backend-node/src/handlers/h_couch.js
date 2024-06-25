const { models } = require("../model/m_model")
const couchbase = require('couchbase')
const axios = require('axios')


class CouchBaseHandler {
    
  DB_USERNAME = "admin"
  DB_PASSWORD = "Couchpw"
  DB_CONN_STR = "http://localhost:8091"
  DB_BUCKET_NAME = "test"
    
  scopes = []

  constructor() {

  }



  async connectToDatabase() {
    const data = {
      hostname: this.DB_CONN_STR,
      username: 'admin',
      password: 'Couchpw'
    };
    const url = this.DB_CONN_STR + '/clusterInit'
    return axios.post(url, data)
      .then(response => {
        console.log('Response:', response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
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