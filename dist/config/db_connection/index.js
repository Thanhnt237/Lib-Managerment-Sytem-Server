"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const root_connection = require("./root_connection");
const deepcare_DB_connection = require("./deepcare_DB_connection");
const hos01_DB_connection = require("./hos01_DB_connection");
const connectionPool = require("../globalConnectionPool");
// const test = require("./test");
// const connection = {
//     ROOT: root_connection,
//     DEEPCARE : deepcare_DB_connection, // deepcare
//     HOSPITAL_ID : hos01_DB_connection, // viện test 01
//     // PARTNER_CODE12 : test
// }
// const connection = connectionPool.getGlobalPool()
const connection = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield connectionPool.getGlobalPool();
});
module.exports = connection;
