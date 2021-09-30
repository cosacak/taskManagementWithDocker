import { Request, response, Response } from 'express'

export default function getAllUsers(req: Request, res: Response) {

    const users = [
        {
            name: 'John',
            age: 30
        },
        {
            name: 'Peter',
            age: 40
        }
    ]

    res.statusCode = 200;
    res.send({ users });
}