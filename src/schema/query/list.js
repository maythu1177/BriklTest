const { GraphQLList } = require("graphql");
const { ListType } = require("../typedef/listType");

const { getAllList } = require("../../db/task_appdb");


const GET_ALL_LISTS = {
    name: "GetAllList",
    type: new GraphQLList(ListType),
    resolve: async () => {
        try {
            const result = await getAllList();
            return result[0];
        }
        catch (error) {
            throw new Error(error.toString());
        }
    }

};


module.exports = {
    GET_ALL_LISTS
}