import express, { Request, Response } from "express";
import db from 'db'
import bodyParser from 'body-parser'
import repositoryTask from "repositoryTask";
import repositoryTaskList from "repositoryTaskList";
import repositoryTaskListRel from "repositoryTaskListRel";

const PORT = process.env.PORT || 3001

const app = express();

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (req: Request, res: Response) => {
  res.send("ok");
})

app.get('/tasks', repositoryTask.getTasks);

app.post('/tasks', repositoryTask.createTask);

app.put('/tasks/:id', repositoryTask.updateTask);

app.delete('/tasks/:id', repositoryTask.deleteTask);


app.get('/task-lists', repositoryTaskList.getTaskLists);

app.post('/task-lists', repositoryTaskList.createTaskList);

app.put('/task-lists/:id', repositoryTaskList.updateTaskList);

app.delete('/task-lists/:id', repositoryTaskList.deleteTaskList);



app.post('/task-lists/:id/add', repositoryTaskListRel.addTask);

app.delete('/task-lists/:id/remove/:taskId', repositoryTaskListRel.removeTask);

app.listen(PORT, () => {
  console.log(`started ${PORT}`);
  db.runMigrations()
})