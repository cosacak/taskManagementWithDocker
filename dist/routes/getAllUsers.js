"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getAllUsers(req, res) {
    var users = [
        {
            name: 'John',
            age: 30
        },
        {
            name: 'Peter',
            age: 40
        }
    ];
    res.statusCode = 200;
    res.send({ users: users });
}
exports.default = getAllUsers;
