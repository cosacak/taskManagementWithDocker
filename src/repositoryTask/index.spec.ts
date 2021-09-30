import { Request, Response } from 'express'
import moment from 'moment';
import index from './index'
import { Client } from 'pg';


jest.mock('pg', () => {
    const mClient = {
        connect: jest.fn(),
        query: jest.fn(),
        end: jest.fn(),
    };
    return { Client: jest.fn(() => mClient) };
});



describe('Get all tasks request', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let responseObject = {};
    let client: Client;

    beforeEach(() => {
        client = new Client();
        mockRequest = {};
        mockResponse = {

            statusCode: 0,
            send: jest.fn().mockImplementation(result => {
                responseObject = result;
            })
        }
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('200 - tasks', async () => {


        const expectedStatusCode = 200;
        const expectedResponse = {
            tasks: [
                {
                    id: '38a46a99-972f-453b-bbf5-c5ce74738a10',
                    title: 'deneme1',
                    updatedAt: '2021-09-30 10:03:24.064484+00'
                }
            ]
        }


        // client.query.mockResolvedValueOnce({ rows: [], rowCount: 0 });


        await index.getTasks(mockRequest as Request, mockResponse as Response)
        expect(client.connect).toBeCalledTimes(1);

        // expect(mockResponse.statusCode).toBe(expectedStatusCode)
        // expect(responseObject).toEqual(expectedResponse)
    });
});