"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.suaSach = exports.themSach = exports.laySach = void 0;
const common = __importStar(require("../common/common_function"));
const tablename_1 = require("../../config/tablename");
const logger = __importStar(require("winston"));
function laySach(input) {
    return __awaiter(this, void 0, void 0, function* () {
        let { SACH = '' } = input;
        let expandCondition = "";
        if (SACH.trim()) {
            expandCondition += ` and ID = '${SACH}'`;
        }
        let sql = `
        select * 
        from ${tablename_1.TABLE_NAME.SACH}
        where !KHOA and TRANG_THAI
        ${expandCondition}
        order by ID;
    `;
        console.log(sql);
        try {
            let [result,] = yield common.query(sql);
            return { status: "OK", result: result };
        }
        catch (error) {
            logger.error(`laySach error : ${error.message}`);
            return Object.assign({ status: "KO" }, error);
        }
    });
}
exports.laySach = laySach;
function themSach(input) {
    return __awaiter(this, void 0, void 0, function* () {
        let arrProps = Object.keys(input[0]);
        let sql = common.genInsertQuery(tablename_1.TABLE_NAME.SACH, arrProps, input);
        console.log(sql);
        try {
            yield common.query(sql);
            return { status: "OK", result: "OK" };
        }
        catch (error) {
            logger.error(`themSach error : ${error.message}`);
            return Object.assign(Object.assign({ status: "KO" }, error), { extension: error.message });
        }
    });
}
exports.themSach = themSach;
function suaSach(input) {
    return __awaiter(this, void 0, void 0, function* () {
        let { data, condition } = input;
        let sql = "";
        data.forEach((item) => {
            sql += common.genUpdateQuery(tablename_1.TABLE_NAME.SACH, item, condition);
        });
        console.log(sql);
        try {
            yield common.query(sql);
            return { status: "OK", result: "OK" };
        }
        catch (error) {
            logger.error(`suaSach error : ${error.message}`);
            return Object.assign(Object.assign({ status: "KO" }, error), { extension: error.message });
        }
    });
}
exports.suaSach = suaSach;
