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

const getTasks = async (request: Request, response: Response) => {
    const results = await pool.query('SELECT * FROM tasks')

    response.statusCode = 200
    return response.status(200).json(results.rows)
}

const createTask = (request: Request, response: Response) => {
    const { title } = request.body
    const insertText: string = 'INSERT INTO tasks (id, title) VALUES ($1, $2)'
    const itemId: string = uuidv4();
    pool.query(insertText, [itemId, title], (error, result: any) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Task added with ID: ${itemId}`)
    })
}



const updateTask = (request: Request, response: Response) => {
    const id: string = request.params.id
    const { title } = request.body
    const dateString = moment.utc().format("yyyy-MM-DD HH:mm:ss")

    pool.query(
        'UPDATE tasks SET title = $1, updatedAt = $2 WHERE id = $3',
        [title, dateString, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Task modified with ID: ${id}`)
        }
    )
}

const deleteTask = (request: Request, response: Response) => {
    const id = request.params.id

    pool.query('DELETE FROM tasks WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Task deleted with ID: ${id}`)
    })
}

const getTaskLists = (request: Request, response: Response) => {
    pool.query('SELECT * FROM task_lists', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}


const createTaskList = (request: Request, response: Response) => {
    const { title } = request.body
    const insertText = 'INSERT INTO task_lists (id, title) VALUES ($1, $2)'
    const itemId: string = uuidv4();
    pool.query(insertText, [itemId, title], (error, result: any) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Task List added with ID: ${itemId}`)
    })
}


export default {
    getTasks: getTasks,
    getTaskLists: getTaskLists,
    createTask: createTask,
    createTaskList: createTaskList,
    updateTask: updateTask,
    deleteTask: deleteTask
}
