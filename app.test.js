const request = require('supertest');
const { app } = require("./app");


test("add list test", async () => {
    const query = `mutation {addList(title: "") {
        message
        success
        error
       }
     }`;
    const req = request(app)
        .post('/graphql')
        .send({ query });
    const res = await req;
    expect(res.text).toMatch("Insert Success");
});

test("add to list return error message when title is null or empty", async () => {
    const query = `mutation {addList(title: "") {
        message
        success
        error
       }
     }`;
    const req = request(app)
        .post('/graphql')
        .send({ query });
    const res = await req;
    expect(res.text).toMatch("title must not be null or empty");
});


test("add task test", async () => {
    const query = `mutation {addTask(list_id: , title: "dal", status: " ") {
         message
         success
         error
        }
      }`;
    const req = request(app)
        .post('/graphql')
        .send({ query });
    const res = await req;
    expect(res.text).toMatch("Insert Success");
});


test("update task test", async () => {
    const query = `mutation {updateTask(id:,list_id: , title: "", status: "") {
         message
         success
         error
        }
      }`;
    const req = request(app)
        .post('/graphql')
        .send({ query });
    const res = await req;
    expect(res.text).toMatch("Update Success")
});



test("add to task return erorr message when title or list_id or status is null or empty", async () => {
    const query = `mutation {addTask(list_id: 7, title: "", status: "in progress") {
         message
         success
         error
        }
      }`;
    const req = request(app)
        .post('/graphql')
        .send({ query });
    const res = await req;
    expect(res.text).toMatch("list_id or title or status must not be null or empty");
});


test("update task return erorr message when id or title or list_id or status is null or empty", async () => {
    const query = `mutation {updateTask(id:6,list_id: 7, title: "dcl", status: "") {
         message
         success
         error
        }
      }`;
    const req = request(app)
        .post('/graphql')
        .send({ query });
    const res = await req;
    expect(res.text).toMatch("id or list_id or title or status must not be null or empty");
});

test("get all list and tasks test", async () => {
    const query = `query { getAllLists{id,title,tasks{id,title,status}} }`;
    const req = request(app)
        .get('/graphql')
        .send({ query });
    const res = await req;
    expect(res.statusCode).toBe(200);
});







