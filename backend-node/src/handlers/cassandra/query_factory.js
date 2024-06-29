const { SpecialRequest } = require("../../model/m_request");
const { getLogItemColumnsNames, getColumnsString, getQuestionMarks, requestTableColumns, specialRequestTableColumns } = require("./utils")
const cassandra = require('cassandra-driver');


class QueryFactory {
    createKeyspaceQuery(keyspace_name) {
        const start = "CREATE KEYSPACE IF NOT EXISTS "
        const end =  " WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '3' }"
        const query = start + keyspace_name + end
        return query
    }
    
    
    createLogItemTableQuery(keyspace, table_name) {
        //console.log('cassandra handler - log item table')
        let start = "CREATE TABLE IF NOT EXISTS " + keyspace + "." + table_name
        let ts_columns = " (ts timeuuid, "
        let customer_columns = "customer text, "
        let model_columns = "name text, version int, "
        let parameters_columns = "presence_penalty float, frequency_penalty float, temperature float, top_p float, "
        let relevation_columns = "generations int, satisfaction int, wli int, tokens int, "
        let primary_key = "PRIMARY KEY(ts))"
        const query = start + ts_columns + customer_columns + model_columns + parameters_columns + relevation_columns + primary_key
        return query
    }
    
    insertLogItemQuery(keyspace, table, item) {
        //console.log("cassandra handler - insert log item")

        let columns_names = getLogItemColumnsNames(item)

        let start = "INSERT INTO " + keyspace + "." + table + " ("
        let columns = getColumnsString(columns_names)
        let mid_query = " VALUES ("
        let end = getQuestionMarks(columns_names)
        const query = start + columns + mid_query + end
        console.log('query: ', query)

        return query
    }

    insertLogItemValues(item) {
        let values = [
            cassandra.types.TimeUuid.fromDate(item.timestamp),
            item.customer,
            item.model.name, item.model.version,
            item.relevations.generations, item.relevations.satisfaction,
            item.relevations.wli, item.relevations.tokens
        ]
        let parameters = Object.values(item.parameters)
        return values.concat(parameters)
    }

    createRequestTableQuery(keyspace, table_name) {
        //console.log('cassandra handler - log item table')
        let start = "CREATE TABLE IF NOT EXISTS " + keyspace + "." + table_name
        let ts_columns = " (ts timeuuid, "
        let request_columns = "input_tokens int, total_tokens int, stream_messages int, loading_time int, input_dimension int, "
        let primary_key = "PRIMARY KEY(ts))"
        const query = start + ts_columns + request_columns + primary_key
        return query
    }

    insertRequestQuery(keyspace, table, item) {
        //console.log("cassandra handler - insert log item")

        let columns_names = getColumnsNames(item)

        let start = "INSERT INTO " + keyspace + "." + table + " ("
        let columns = []
        if(item instanceof SpecialRequest) {
            columns = getColumnsString(specialRequestTableColumns)
        } else {
            columns = getColumnsString(requestTableColumns)
        }
        let mid_query = " VALUES ("
        let end = getQuestionMarks(requestTableColumns)
        const query = start + columns + mid_query + end
        //console.log('query: ', query)

        const ts = cassandra.types.TimeUuid.fromDate(item.timestamp)
        //console.log('time: ', ts)
        return query
    }

    insertRequestValues(item) {
        let values = [
            cassandra.types.TimeUuid.fromDate(item.timestamp),
            item.input_tokens,
            item.total_tokens,
            item.stream_messages,
            item.loading_time
        ]
        if (item instanceof SpecialRequest) {
            values.push(item.input_dimension)
        }
        return values
    }

}



module.exports = {
    QueryFactory
}