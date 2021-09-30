"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
var uuid_1 = require("uuid");
var moment_1 = __importDefault(require("moment"));
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
var getTaskLists = function (request, response) {
    pool.query('SELECT * FROM task_lists', function (error, results) {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};
var createTaskList = function (request, response) {
    var title = request.body.title;
    var insertText = 'INSERT INTO task_lists (id, title) VALUES ($1, $2)';
    var itemId = (0, uuid_1.v4)();
    pool.query(insertText, [itemId, title], function (error, result) {
        if (error) {
            throw error;
        }
        response.status(201).send("Task List added with ID: " + itemId);
    });
};
var updateTaskList = function (request, response) {
    var id = request.params.id;
    var title = request.body.title;
    var dateString = moment_1.default.utc().format("yyyy-MM-DD HH:mm:ss");
    pool.query('UPDATE task_lists SET title = $1, updatedAt = $2 WHERE id = $3', [title, dateString, id], function (error, results) {
        if (error) {
            throw error;
        }
        response.status(200).send("Task List modified with ID: " + id);
    });
};
var deleteTaskList = function (request, response) {
    var id = request.params.id;
    pool.query('DELETE FROM task_lists WHERE id = $1', [id], function (error, results) {
        if (error) {
            throw error;
        }
        response.status(200).send("Task List deleted with ID: " + id);
    });
};
exports.default = {
    getTaskLists: getTaskLists,
    createTaskList: createTaskList,
    updateTaskList: updateTaskList,
    deleteTaskList: deleteTaskList
};
