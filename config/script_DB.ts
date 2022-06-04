import {TABLE_NAME} from "./tablename";

module.exports = `
-- DROP DATABASE IF EXISTS \`##database_name##\`;
-- CREATE DATABASE IF NOT EXISTS \`##database_name##\` character set UTF8 collate utf8_bin;

-- use \`##database_name##\`;

CREATE TABLE IF NOT EXISTS ${TABLE_NAME.NGUOI_DUNG}(
    ID varchar(20),
    TEN_NGUOI_DUNG text charset utf8mb4,
    ROLE text charset utf8mb4 default 'MEMBER',
    USERNAME varchar(50),
    PASSWORD varchar(200),
    NGAY_KHOI_TAO bigint,
    KHOA boolean default false,
    TRANG_THAI boolean default true,
    primary key (ID)
);

CREATE TABLE IF NOT EXISTS ${TABLE_NAME.PHONG_DOC}(
    ID varchar(20),
    TEN_PHONG_DOC text charset utf8mb4,
    NGAY_KHOI_TAO bigint,
    KHOA boolean default false,
    TRANG_THAI boolean default true,
    primary key (ID)
);

`;
