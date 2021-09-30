"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __importDefault(require("./index"));
describe('Get all tasks request', function () {
    var mockRequest;
    var mockResponse;
    var responseObject = {};
    beforeEach(function () {
        mockRequest = {};
        mockResponse = {
            statusCode: 0,
            send: jest.fn().mockImplementation(function (result) {
                responseObject = result;
            })
        };
    });
    test('200 - tasks', function () {
        var expectedStatusCode = 200;
        var expectedResponse = {
            tasks: [
                {
                    id: '38a46a99-972f-453b-bbf5-c5ce74738a10',
                    title: 'deneme1',
                    updatedAt: '2021-09-30 10:03:24.064484+00'
                }
            ]
        };
        index_1.default.getTasks(mockRequest, mockResponse);
        expect(mockResponse.statusCode).toBe(expectedStatusCode);
        expect(responseObject).toEqual(expectedResponse);
    });
});
