const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const { ADD_LIST } = require("./mutation/list");
const { GET_ALL_LISTS } = require("./query/list");
const { ADD_TASK,UPDATE_TASK } = require("./mutation/task");

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: () => ({
        getAllLists: GET_ALL_LISTS
    })
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addList: ADD_LIST,
        addTask: ADD_TASK,
        updateTask: UPDATE_TASK
    }
});

module.exports.schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});