import {TABLE_NAME} from "./tablename";

module.exports = `
-- DROP DATABASE IF EXISTS \`##database_name##\`;
-- CREATE DATABASE IF NOT EXISTS \`##database_name##\` character set UTF8 collate utf8_bin;

-- use \`##database_name##\`;

CREATE TABLE IF NOT EXISTS ${TABLE_NAME.NGUOI_DUNG}(
    ID varchar(20) not null,
    TEN_NGUOI_DUNG text charset utf8mb4,
    ROLE varchar(30) default 'MEMBER',
    USERNAME varchar(50),
    PASSWORD varchar(200),
    NGAY_KHOI_TAO bigint,
    KHOA boolean default false,
    TRANG_THAI boolean default true,
    primary key (ID)
);

CREATE TABLE IF NOT EXISTS ${TABLE_NAME.PHONG_DOC}(
    ID varchar(20) not null,
    TEN_PHONG_DOC text charset utf8mb4,
    NGAY_KHOI_TAO bigint,
    KHOA boolean default false,
    TRANG_THAI boolean default true,
    primary key (ID)
);

CREATE TABLE IF NOT EXISTS ${TABLE_NAME.KE_SACH}(
    ID varchar(20) not null,
    TEN_KE_SACH text charset utf8mb4,,
    PHONG_DOC_ID varchar(20),
    TEN_PHONG_DOC text charset utf8mb4,
    NGAY_KHOI_TAO bigint,
    KHOA boolean default false,
    TRANG_THAI boolean default true,
    primary key (ID)
);

CREATE TABLE IF NOT EXISTS ${TABLE_NAME.TAC_GIA}(
    ID varchar(20) not null,
    TEN_TAC_GIA text charset utf8mb4,
    NGAY_KHOI_TAO bigint,
    KHOA boolean default false,
    TRANG_THAI boolean default true,
    primary key (ID)
);

CREATE TABLE IF NOT EXISTS ${TABLE_NAME.DANH_MUC_SACH}(
    ID varchar(20) not null,
    TEN_DANH_MUC text charset utf8mb4,
    NGAY_KHOI_TAO bigint,
    KHOA boolean default false,
    TRANG_THAI boolean default true,
    primary key (ID)
);

CREATE TABLE IF NOT EXISTS ${TABLE_NAME.SACH}(
    ID varchar(20) not null,
    TEN_SACH text charset utf8mb4,
    KE_SACH_ID varchar(20),
    TEN_KE_SACH text charset utf8mb4,
    NGAY_KHOI_TAO bigint,
    KHOA boolean default false,
    TRANG_THAI boolean default true,
    primary key (ID)
);

CREATE TABLE IF NOT EXISTS ${TABLE_NAME.REF_SACH_TACGIA}(
    ID varchar(20) not null,
    SACH_ID varchar(20) not null,
    TAC_GIA_ID varchar(20) not null,
    TRANG_THAI boolean default true,
    primary key (ID)
);

CREATE TABLE IF NOT EXISTS ${TABLE_NAME.PHIEU}(
    ID varchar(20) not null,
    LOAI_PHIEU varchar(20) not null, -- PHIEU_MUON, PHIEU_TRA
    TEN_PHIEU varchar(20) not null,
    NGAY varchar(10) not null,
    GIO varchar(10) not null,
    NGUOI_MUON varchar(20) not null,
    NGUOI_TAO_PHIEU varchar(20) not null,
    NGAY_KHOI_TAO bigint,
    TRANG_THAI boolean default true,
    primary key (ID),
    CONSTRAINT FK_PHIEU_TO_NGUOI_DUNG FOREIGN KEY (NGUOI_MUON) REFERENCES ${TABLE_NAME.NGUOI_DUNG} (ID)
);
`;
