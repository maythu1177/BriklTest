const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLNonNull, GraphQLBoolean } = require("graphql");


module.exports.MessageType = new GraphQLObjectType({
    name: "Message",
    description: "Message",
    fields: () => ({
        success: { type: GraphQLBoolean },
        message: { type: GraphQLString },
        error: { type: GraphQLString }
    })
})