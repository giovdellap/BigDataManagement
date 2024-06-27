const { models } = require("../model/m_model")
const async = require('async');
const cassandra = require('cassandra-driver');
const { QueryFactory } = require("./cassandra/query_factory");


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



  async insertItem(item) {

    const factory = new QueryFactory()
    const keyspace = "logs"
    const table = "table2"

    await this.client.connect()
    await this.client.execute(factory.createKeyspaceQuery(keyspace))
    await this.client.execute(factory.createLogItemTableQuery(keyspace, table))
    
    const query = factory.insertLogItemQuery(keyspace, table, item)
    const values = factory.insertLogItemValues(item)
    await this.client.execute(query, values, {prepare: true})
  }
}


module.exports = {
  CassandraDBHandler
}