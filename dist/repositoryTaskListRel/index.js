"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
var uuid_1 = require("uuid");
var poolConfig = {
    database: process.env.DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    post: Number(process.env.PORT),
    max: Number(process.env.DB_POOL_SIZE),
    idleTimeoutMillis: Number(process.env.DB_POOL_CLIENT_IDLE_TIMEOUT),
    connectionTimeoutMillis: Number(process.env.DB_POOL_CLIENT_CONNECTION_TIMEOUT)
};
var pool = new pg_1.Pool(poolConfig);
var addTask = function (request, response) {
    //task-lists/:id/add  , body = taskId
    var listId = request.params.id;
    var taskId = request.body.taskId;
    var insertText = 'INSERT INTO task_list_rels (id, task_id, list_id) VALUES ($1, $2, $3)';
    var itemId = (0, uuid_1.v4)();
    pool.query(insertText, [itemId, taskId, listId], function (error, result) {
        if (error) {
            throw error;
        }
        response.status(201).send("Task " + taskId + " added to list: " + listId);
    });
};
var removeTask = function (request, response) {
    ///task-lists/:id/remove/:taskId 
    var listId = request.params.id;
    var taskId = request.params.taskId;
    var insertText = 'DELETE FROM task_list_rels WHERE list_id = $1 and task_id = $2';
    var itemId = (0, uuid_1.v4)();
    pool.query(insertText, [listId, taskId], function (error, result) {
        if (error) {
            throw error;
        }
        response.status(201).send("Task " + taskId + " removed from list: " + listId);
    });
};
exports.default = {
    addTask: addTask,
    removeTask: removeTask
};
