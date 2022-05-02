const { GraphQLString, GraphQLNonNull } = require("graphql");
const { MessageType } = require("../typedef/messageType");
const { addList } = require("../../db/task_appdb");


const ADD_LIST = {
    name: "AddList",
    type: MessageType,
    args: {
        title: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve: async (parent, args) => {
        try {
            const { title } = args;
            if (!title) return { success: false, message: "title must not be empty" };
            const result = await addList({ title });
            if (result[0]?.affectedRows > 0)
                return { success: true, message: "Insert Success" };
            else
                return { success: false, message: "Insert Failed" };
        }
        catch (error) {
            return { success: false, error:error.toString() };
        }

    }

};

module.exports = {
    ADD_LIST,
}

