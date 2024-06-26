const { models } = require("../model/m_model")


class CassandraDBHandler {
    
  DB_USERNAME = "admin"
  DB_PASSWORD = "Couchpw"
  DB_CONN_STR = "http://localhost:8091"
    
  scopes = []

  constructor() {
    const client = new cassandra.Client({ contactPoints: [this.DB_CONN_STR], localDataCenter: 'dc1' });
    client.connect()
      .then(function () {
        console.log('Connected to cluster with %d host(s): %j', client.hosts.length, client.hosts.keys());
        console.log('Keyspaces: %j', Object.keys(client.metadata.keyspaces));
        console.log('Shutting down');
      return client.shutdown();
  })
  .catch(function (err) {
    console.error('There was an error when connecting', err);
    return client.shutdown().then(() => { throw err; });
  });
  }



  async connectToDatabase() {

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