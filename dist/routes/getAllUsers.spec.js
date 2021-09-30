"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var getAllUsers_1 = __importDefault(require("./getAllUsers"));
describe('Get all users request', function () {
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
    test('200 - users', function () {
        var expectedStatusCode = 200;
        var expectedResponse = {
            users: [
                {
                    name: 'John',
                    age: 30
                },
                {
                    name: 'Peter',
                    age: 40
                }
            ]
        };
        (0, getAllUsers_1.default)(mockRequest, mockResponse);
        expect(mockResponse.statusCode).toBe(expectedStatusCode);
        expect(responseObject).toEqual(expectedResponse);
    });
});
