const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLNonNull } = require("graphql");


module.exports.TaskType = new GraphQLObjectType({
    name: "Task",
    description: "Task",
    fields: () => ({
        id: { type: GraphQLInt },
        list_id: { type: GraphQLInt },
        title: { type: GraphQLString },
        status: { type: GraphQLString }
    })
})