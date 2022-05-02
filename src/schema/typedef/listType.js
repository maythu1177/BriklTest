const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLNonNull } = require("graphql");
const { TaskType } = require("./taskType");

const { getAllTask } = require("../../db/task_appdb");

module.exports.ListType = new GraphQLObjectType({
    name: "List",
    description: " List ",
    fields: () => ({
        id: { type: GraphQLInt },
        title: { type: GraphQLString },
        tasks: {
            type: new GraphQLList(TaskType),
            resolve: async (list) => {
                try {
                    const result = await getAllTask();
                    if (result[0].length > 0) {
                        return result[0].filter(r => r.list_id == list.id)
                    }
                }
                catch (error) {
                    throw error;
                }
            }
        }
    })
})

