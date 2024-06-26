const cassandra = require('cassandra-driver');

async function connect(client) {
    console.log('cassandra handler - connect')
    return await client.connect();
}

async function createKeyspace(client) {
    console.log('cassandra handler - createKeySpace')
    const query = "CREATE KEYSPACE IF NOT EXISTS example WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '3' }";
    return await client.execute(query);
}

async function createTable(client) {
    console.log('cassandra handler - createTable')
    const query = "CREATE TABLE IF NOT EXISTS example.basic (id uuid, txt text, val int, PRIMARY KEY(id))";
    return await client.execute(query);
}

async function createLogItemTable(client) {
    console.log('cassandra handler - log item table')
    let start = "CREATE TABLE IF NOT EXISTS example.log3 "
    let ts_columns = "(ts timeuuid, "
    let customer_columns = "customer text, "
    let model_columns = "name text, version int, "
    let parameters_columns = "presence_penalty float, frequence_penalty float, temperature float, top_p float, "
    let relevation_columns = "generations int, satisfaction int, wli int, tokens int, "
    let primary_key = "PRIMARY KEY(ts))"
    const query = start + ts_columns + customer_columns + model_columns + parameters_columns + relevation_columns + primary_key
    return await client.execute(query)
}

async function insertLogItem(client, item) {
    console.log("cassandra handler - insert log item")
    let start = "INSERT INTO example.log3"
    let ts_columns = "(ts,"
    let customer_columns = " customer,"
    let model_columns = " name, version,"
    let parameters_columns = " presence_penalty,"
    let relevation_columns = " generations, satisfaction, wli, tokens"
    let close = ") VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
    const query = start + ts_columns + customer_columns + model_columns + parameters_columns + relevation_columns + close
    const ts = cassandra.types.TimeUuid.fromDate(item.timestamp)
    console.log('time: ', ts)
    let values = [
        ts,
        item.customer,
        item.model.name, item.model.version,
        0.5,
        item.relevations.generations, item.relevations.satisfaction,
        item.relevations.wli, item.relevations.tokens
    ]
    return await client.execute(query, values, {prepare: true})
}

async function insert(client, id) {
    console.log('cassandra handler - insert')
    const query = 'INSERT INTO example.basic (id, txt, val) VALUES (?, ?, ?)'
    return await client.execute(query, [ id, 'Hello!', 100 ], { prepare: true})
}

module.exports = {
    connect,
    createKeyspace,
    createTable,
    insert,
    createLogItemTable,
    insertLogItem
}