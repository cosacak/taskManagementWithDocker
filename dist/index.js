"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var db_1 = __importDefault(require("./db"));
var body_parser_1 = __importDefault(require("body-parser"));
var getAllUsers_1 = __importDefault(require("./routes/getAllUsers"));
var repositoryTask_1 = __importDefault(require("./repositoryTask"));
var repositoryTaskList_1 = __importDefault(require("./repositoryTaskList"));
var repositoryTaskListRel_1 = __importDefault(require("./repositoryTaskListRel"));
var PORT = process.env.PORT || 3001;
var app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true,
}));
app.get('/', function (req, res) {
    res.send("ok");
});
app.get('/tasks', repositoryTask_1.default.getTasks);
app.post('/tasks', repositoryTask_1.default.createTask);
app.put('/tasks/:id', repositoryTask_1.default.updateTask);
app.delete('/tasks/:id', repositoryTask_1.default.deleteTask);
app.get('/task-lists', repositoryTaskList_1.default.getTaskLists);
app.post('/task-lists', repositoryTaskList_1.default.createTaskList);
app.put('/task-lists/:id', repositoryTaskList_1.default.updateTaskList);
app.delete('/task-lists/:id', repositoryTaskList_1.default.deleteTaskList);
app.post('/task-lists/:id/add', repositoryTaskListRel_1.default.addTask);
app.delete('/task-lists/:id/remove/:taskId', repositoryTaskListRel_1.default.removeTask);
app.listen(PORT, function () {
    console.log("started " + PORT);
    db_1.default.runMigrations();
});
