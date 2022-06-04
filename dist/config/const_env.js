"use strict";
global.define = function (name, value, exportsObject) {
    if (!exportsObject) {
        if (exports.exportsObject)
            exportsObject = exports.exportsObject;
        else
            exportsObject = exports;
    }
    Object.defineProperty(exportsObject, name, {
        value: value,
        enumerable: true,
        writable: false
    });
};
define("Env_Var", "localhost");
define("mysql_host", "localhost");
define("mysql_user", "root");
define("database_name", "his_deepcare_catalog");
// define("mysql_password", "root");
// define("mysql_password", "huyhuyhuy");
define("mysql_password", "1");
define("PROXY_HOST", "");
define("PROXY_PORT", "");
define("kafkaHost", "localhost:9092");
define("INTERNAL_CIS_BS_WS_URL", "http://cis-bs-ws:8181");
exports.exportObject = null;
