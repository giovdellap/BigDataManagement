const { models } = require("../model/m_model")
const async = require('async');
const cassandra = require('cassandra-driver');
const { connect, createKeyspace, insert, createTable, createLogItemTable, insertLogItem } = require("./h_cassandra_utils");


class CassandraDBHandler {
    
  DB_USERNAME = "admin"
  DB_PASSWORD = "admin"
  DB_CONN_STR = "cassandra"
    
  client = {}


  constructor() {
    this.client = new cassandra.Client({ 
      contactPoints: [this.DB_CONN_STR], 
      localDataCenter: 'datacenter1'
      //credentials: { username: this.DB_USERNAME, password: this.DB_PASSWORD }
 
    });
  }

  async initializeDB() {
    const id = cassandra.types.Uuid.random();

    await connect(this.client)
    await createKeyspace(this.client)
    await createTable(this.client)
    await insert(this.client, id)
  }

  async testDB(item) {
    await connect(this.client)
    await createKeyspace(this.client)
    await createLogItemTable(this.client)
    await insertLogItem(this.client, item)
  }
}


module.exports = {
  CassandraDBHandler
}