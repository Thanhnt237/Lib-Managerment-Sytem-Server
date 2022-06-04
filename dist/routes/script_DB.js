"use strict";
const constants = require("../app/common/constants");
const const_env = require("./const_env");
const TABLE_NAME = require("./tablename").TABLE_NAME;
module.exports = `
// -- DROP DATABASE IF EXISTS \`##database_name##\`;
// -- CREATE DATABASE IF NOT EXISTS \`##database_name##\` character set UTF8 collate utf8_bin;
//
// -- use \`##database_name##\`;
`;
