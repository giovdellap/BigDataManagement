const { models } = require("../model/m_model")
const async = require('async');
const cassandra = require('cassandra-driver');
const { QueryFactory, LogQueryFactory, RequestQueryFactory } = require("./cassandra/queryfactory");
const { DBHandler } = require("./h_dbhandler");


class CassandraDBHandler extends DBHandler{
    
  DB_USERNAME = "admin"
  DB_PASSWORD = "admin"
  DB_CONN_STR = "cassandra"
  DB_KEYSPACE = "ai_company"
  LOGS_TABLE = "logs"
  REQUEST_TABLE = "requests"

  constructor() {
    super()
    this.client = new cassandra.Client({ 
      contactPoints: [this.DB_CONN_STR], 
      localDataCenter: 'datacenter1'
      //credentials: { username: this.DB_USERNAME, password: this.DB_PASSWORD }
    });
  }

  async insertMultipleItems(type, items) {
    let factory = new QueryFactory(this.DB_KEYSPACE, "")
    if (type === "LOGS") {
      factory = new LogQueryFactory(this.DB_KEYSPACE, this.LOGS_TABLE)
    } else {
      factory = new RequestQueryFactory(this.DB_KEYSPACE, this.REQUEST_TABLE)
    }
    await this.createTable(factory)
    for (let i = 0; i < items.length; i++) {
      await this.insertItemOnly(factory, items[i])
    }
  }

  async insertLogItem(item) {
    const factory = new LogQueryFactory(this.DB_KEYSPACE, this.LOGS_TABLE)
    await this.insertItem(factory, item)
  }

  async insertRequestItem(item) {
    const factory = new RequestQueryFactory(this.DB_KEYSPACE, this.REQUEST_TABLE)
    await this.insertItem(factory, item)
  }

  async insertItem(factory, item) {
    await this.client.connect()
    await this.client.execute(factory.createKeyspaceQuery())
    console.log('TABLE QUERY: ', factory.createTableQuery())
    await this.client.execute(factory.createTableQuery())
    
    const query = factory.insertItemQuery(item)
    const values = factory.insertItemValues(item)
    await this.client.execute(query, values, {prepare: true})
  }

  async createTable(factory) {
    await this.client.connect()
    await this.client.execute(factory.createKeyspaceQuery())
    console.log('TABLE QUERY: ', factory.createTableQuery())
    await this.client.execute(factory.createTableQuery())
  }

  async insertItemOnly(factory, item) {
    const query = factory.insertItemQuery(item)
    const values = factory.insertItemValues(item)
    await this.client.execute(query, values, {prepare: true})
  }
}



module.exports = {
  CassandraDBHandler
}