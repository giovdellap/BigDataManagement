const { models } = require("../model/m_model")
const async = require('async');
const cassandra = require('cassandra-driver');
const { QueryFactory, LogQueryFactory, RequestQueryFactory } = require("./cassandra/queryfactory");
const { DBHandler } = require("./h_dbhandler");
const { insertItem, insertItemOnly, createTable, createSecondaryIndex } = require("./cassandra/cassandra_utils") 

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

  async initialize() {
    const logFactory = new LogQueryFactory(this.DB_KEYSPACE, this.LOGS_TABLE)
    const requestFactory = new RequestQueryFactory(this.DB_KEYSPACE, this.REQUEST_TABLE)

    // LOG TABLE
    await createTable(this.client, logFactory)
    await createSecondaryIndex(this.client, logFactory, "tokens")
    await createSecondaryIndex(this.client, logFactory, "temperature")
    await createSecondaryIndex(this.client, logFactory, "wli")
    await createSecondaryIndex(this.client, logFactory, "presence_penalty")

    //REQUEST TABLE
    await createTable(this.client, requestFactory)
  }

  async insertMultipleItems(type, items) {
    let factory = new QueryFactory(this.DB_KEYSPACE, "")
    if (type === "LOGS") {
      factory = new LogQueryFactory(this.DB_KEYSPACE, this.LOGS_TABLE)
    } else {
      factory = new RequestQueryFactory(this.DB_KEYSPACE, this.REQUEST_TABLE)
    }
    //await createTable(this.client, factory)
    for (let i = 0; i < items.length; i++) {
      await insertItemOnly(this.client, factory, items[i])
    }
  }

  async insertLogItem(item) {
    const factory = new LogQueryFactory(this.DB_KEYSPACE, this.LOGS_TABLE)
    await insertItem(this.client, factory, item)
  }

  async insertRequestItem(item) {
    const factory = new RequestQueryFactory(this.DB_KEYSPACE, this.REQUEST_TABLE)
    await insertItem(this.client, factory, item)
  }

  async basicQuery(field1, field2, model) {
    const factory = new LogQueryFactory(this.DB_KEYSPACE, this.LOGS_TABLE)
    
    let query = factory.basicquery(field1, field2, model)
    //console.log('QUERY: ', query)
    let result = []
    await this.client.eachRow(query, [], [], (n, row) => {
      console.log(row)
      result.push(row)
    })
    //let result = await this.client.execute(query)
    //console.log('QUERY RESULT: ', result)
    return result
  }
}

module.exports = {
  CassandraDBHandler
}