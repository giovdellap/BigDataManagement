const { models } = require("../model/m_model")
const async = require('async');
const cassandra = require('cassandra-driver');
const { QueryFactory, LogQueryFactory, RequestQueryFactory } = require("./cassandra/queryfactory");


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

  async insertLogItem(item) {

    const keyspace = "ai_company"
    const table = "logs"
    const factory = new LogQueryFactory(keyspace, table)

    await this.insertItem(factory, item)

  }

  async insertRequestItem(item) {

    const keyspace = "ai_company"
    const table = "requests"
    const factory = new RequestQueryFactory(keyspace, table)

    await this.insertItem(factory, item)
  }

  async insertItem(factory, item) {
    await this.client.connect()
    await this.client.execute(factory.createKeyspaceQuery())
    //console.log('TABLE QUERY: ', factory.createTableQuery())
    await this.client.execute(factory.createTableQuery())
    
    const query = factory.insertItemQuery(item)
    const values = factory.insertItemValues(item)
    await this.client.execute(query, values, {prepare: true})
  }
}



module.exports = {
  CassandraDBHandler
}