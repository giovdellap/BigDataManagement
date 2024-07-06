async function insertItem(client, factory, item) {
    await client.connect()
    await client.execute(factory.createKeyspaceQuery())
    //console.log('TABLE QUERY: ', factory.createTableQuery())
    await client.execute(factory.createTableQuery())
    
    const query = factory.insertItemQuery(item)
    const values = factory.insertItemValues(item)
    await client.execute(query, values, {prepare: true})
}

async function createTable(client, factory) {
    await client.connect()
    await client.execute(factory.createKeyspaceQuery())
    //console.log('TABLE QUERY: ', factory.createTableQuery())
    await client.execute(factory.createTableQuery())
}

async function insertItemOnly(client, factory, item) {
    const query = factory.insertItemQuery(item)
    const values = factory.insertItemValues(item)
    await client.execute(query, values, {prepare: true})
}

module.exports = {
    insertItem,
    insertItemOnly, 
    createTable
}