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
    const insertText: string = 'INSERT INTO task_lists (id, title) VALUES ($1, $2)'
    const itemId: string = uuidv4();
    pool.query(insertText, [itemId, title], (error, result: any) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Task List added with ID: ${itemId}`)
    })
}



const updateTaskList = (request: Request, response: Response) => {
    const id: string = request.params.id
    const { title } = request.body
    const dateString = moment.utc().format("yyyy-MM-DD HH:mm:ss")

    pool.query(
        'UPDATE task_lists SET title = $1, updatedAt = $2 WHERE id = $3',
        [title, dateString, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Task List modified with ID: ${id}`)
        }
    )
}

const deleteTaskList = (request: Request, response: Response) => {
    const id = request.params.id

    pool.query('DELETE FROM task_lists WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Task List deleted with ID: ${id}`)
    })
}


export default {
    getTaskLists: getTaskLists,
    createTaskList: createTaskList,
    updateTaskList: updateTaskList,
    deleteTaskList: deleteTaskList
}
