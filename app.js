const express = require('express')
const expressGraphQL = require('express-graphql').graphqlHTTP
const { schema } = require('./src/schema')

const app = express();

app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true,
    customFormatErrorFn: err => { 
        try { 
            err.details = JSON.parse(err.message);
            err.message = err.details.error;
            return err;
        } catch {
            return err;
        }
    }
}))


module.exports = { app }