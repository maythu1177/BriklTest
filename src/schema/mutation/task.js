const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLInt } = require("graphql");
const { TaskType } = require("../typedef/taskType");
const { MessageType } = require("../typedef/messageType");

const { addTask, getTaskById, updateTask } = require("../../db/task_appdb");

const ADD_TASK = {
    name: "AddTask",
    type: MessageType,
    args: {
        list_id: { type: new GraphQLNonNull(GraphQLInt) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        status: { type: new GraphQLNonNull(GraphQLString)}
    },
    resolve: async (parent, args) => {
        try {
            const { list_id, title, status } = args;
            if (!list_id || !title || !status) return { success: false, message: "list_id or title or status must not be null or empty" };
            const result = await addTask({ list_id, title, status });
            if (result[0]?.affectedRows > 0)
                return { success: true, message: "Insert Success" };
            else
                return { success: false, message: "Insert Failed" };

        }
        catch (error) {
            return { success: false, error: error.toString() };
        }
    }

};

const UPDATE_TASK = {
    name: "UpdateTask",
    type: MessageType,
    args: {
        id: { type: GraphQLInt },
        list_id: { type: GraphQLInt },
        title: { type: GraphQLString },
        status: { type: GraphQLString }
    },
    resolve: async (parent, args) => {
        try {
            const { id, list_id, title, status } = args;
            if (!list_id || !title || !status) return { success: false, message: "id or list_id or title or status must not be null or empty" };
            const task = await getTaskById({ id });
            if (task[0].length > 0 && task[0][0]?.id == id) {
                const result = await updateTask({ id, list_id, title, status });
                if (result[0]?.affectedRows > 0)
                    return { success: true, message: "Update Success" };
                else
                    return { success: false, message: "Update Failed" };
            }
            else
                return { success: false, message: "Task Do Not Exists" };
        }
        catch (error) {
            return { success: false, error: error.toString() };
        }
    }

};

module.exports = {
    ADD_TASK, UPDATE_TASK
}


