import path from 'path'
import { Pool } from 'pg'
import { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid';

import moment from 'moment';

const poolConfig = {
    database: process.env.DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    post: Number(process.env.PORT),
    max: Number(process.env.DB_POOL_SIZE),
    idleTimeoutMillis: Number(process.env.DB_POOL_CLIENT_IDLE_TIMEOUT),
    connectionTimeoutMillis: Number(process.env.DB_POOL_CLIENT_CONNECTION_TIMEOUT)
}

const pool = new Pool(poolConfig);

const addTask = (request: Request, response: Response) => {

    //task-lists/:id/add  , body = taskId
    const listId: string = request.params.id
    const { taskId } = request.body
    const insertText: string = 'INSERT INTO task_list_rels (id, task_id, list_id) VALUES ($1, $2, $3)'
    const itemId: string = uuidv4();
    pool.query(insertText, [itemId, taskId, listId], (error, result: any) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Task ${taskId} added to list: ${listId}`)
    })
}

const removeTask = (request: Request, response: Response) => {
    ///task-lists/:id/remove/:taskId 
    const listId: string = request.params.id
    const taskId: string = request.params.taskId

    const insertText: string = 'DELETE FROM task_list_rels WHERE list_id = $1 and task_id = $2'
    const itemId: string = uuidv4();
    pool.query(insertText, [listId, taskId], (error, result: any) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Task ${taskId} removed from list: ${listId}`)
    })
}



export default {
    addTask: addTask,
    removeTask: removeTask
}
