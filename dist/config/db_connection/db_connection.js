"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
let database_info = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.DATABASE_NAME,
    multipleStatements: true,
    supportBigNumbers: true,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};
// // xử lý call back với await
const pool = mysql2_1.default.createPool(database_info);
const mySql_connection = pool.promise();
// // without caching
module.exports = mySql_connection;
