"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
var getTasks = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, pool.query('SELECT * FROM tasks')];
            case 1:
                results = _a.sent();
                response.statusCode = 200;
                return [2 /*return*/, response.status(200).json(results.rows)
                    // let tasks = {
                    //     tasks: [
                    //         {
                    //             id: '38a46a99-972f-453b-bbf5-c5ce74738a10',
                    //             title: 'deneme1',
                    //             updatedAt: '2021-09-30 10:03:24.064484+00'
                    //         }
                    //     ]
                    // }
                    // response.statusCode = 200;
                    // response.send(tasks)
                ];
        }
    });
}); };
var createTask = function (request, response) {
    var title = request.body.title;
    var insertText = 'INSERT INTO tasks (id, title) VALUES ($1, $2)';
    var itemId = (0, uuid_1.v4)();
    pool.query(insertText, [itemId, title], function (error, result) {
        if (error) {
            throw error;
        }
        response.status(201).send("Task added with ID: " + itemId);
    });
};
var updateTask = function (request, response) {
    var id = request.params.id;
    var title = request.body.title;
    var dateString = moment_1.default.utc().format("yyyy-MM-DD HH:mm:ss");
    pool.query('UPDATE tasks SET title = $1, updatedAt = $2 WHERE id = $3', [title, dateString, id], function (error, results) {
        if (error) {
            throw error;
        }
        response.status(200).send("Task modified with ID: " + id);
    });
};
var deleteTask = function (request, response) {
    var id = request.params.id;
    pool.query('DELETE FROM tasks WHERE id = $1', [id], function (error, results) {
        if (error) {
            throw error;
        }
        response.status(200).send("Task deleted with ID: " + id);
    });
};
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
exports.default = {
    getTasks: getTasks,
    getTaskLists: getTaskLists,
    createTask: createTask,
    createTaskList: createTaskList,
    updateTask: updateTask,
    deleteTask: deleteTask
};
