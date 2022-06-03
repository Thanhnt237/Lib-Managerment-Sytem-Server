const TABLE_NAME = require("./tablename").TABLE_NAME

module.exports = `
-- DROP DATABASE IF EXISTS \`##database_name##\`;
-- CREATE DATABASE IF NOT EXISTS \`##database_name##\` character set UTF8 collate utf8_bin;

-- use \`##database_name##\`;


`;
