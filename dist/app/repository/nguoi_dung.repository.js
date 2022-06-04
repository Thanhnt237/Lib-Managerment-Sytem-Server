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
exports.suaNguoiDung = exports.themNguoiDung = exports.layChiTietNguoiDung = void 0;
const common = __importStar(require("../common/common_function"));
const tablename_1 = require("../../config/tablename");
const constants_1 = require("../common/constants");
const logger = __importStar(require("winston"));
function layChiTietNguoiDung(input) {
    return __awaiter(this, void 0, void 0, function* () {
        let expandCondition = "";
        if (input.USERNAME) {
            expandCondition = `and USERNAME = '${input.USERNAME}' and ROLE = '${constants_1.constants.ADMIN_ROLE}'`;
        }
        else {
            expandCondition = `and ID = '${input.ID}'`;
        }
        let sql = `
        select * 
        from ${tablename_1.TABLE_NAME.NGUOI_DUNG}
        where TRANG_THAI and !KHOA ${expandCondition}
    `;
        console.log(sql);
        try {
            if (input.USERNAME || input.USERNAME === "") {
                common.check_data(input, ["USERNAME"], constants_1.constants.ERROR_CODE_EMPTY);
            }
            else {
                common.check_data(input, ["ID"], constants_1.constants.ERROR_CODE_EMPTY);
            }
            let [result,] = yield common.query(sql);
            return { status: "OK", result: result };
        }
        catch (error) {
            logger.error(`layChiTietNguoiDung error : ${error.message}`);
            return Object.assign({ status: "KO" }, error);
        }
    });
}
exports.layChiTietNguoiDung = layChiTietNguoiDung;
function themNguoiDung(input) {
    return __awaiter(this, void 0, void 0, function* () {
        let arrProps = Object.keys(input[0]);
        let sql = common.genInsertQuery(tablename_1.TABLE_NAME.NGUOI_DUNG, arrProps, input);
        console.log(sql);
        try {
            yield common.query(sql);
            return { status: "OK", result: "OK" };
        }
        catch (error) {
            logger.error(`themPhongDoc error : ${error.message}`);
            return Object.assign(Object.assign({ status: "KO" }, error), { extension: error.message });
        }
    });
}
exports.themNguoiDung = themNguoiDung;
function suaNguoiDung(input) {
    return __awaiter(this, void 0, void 0, function* () {
        let { data, condition } = input;
        let sql = common.genUpdateQuery(tablename_1.TABLE_NAME.NGUOI_DUNG, data, condition);
        console.log(sql);
        try {
            yield common.query(sql);
            return { status: "OK", result: "OK" };
        }
        catch (error) {
            logger.error(`themPhongDoc error : ${error.message}`);
            return Object.assign(Object.assign({ status: "KO" }, error), { extension: error.message });
        }
    });
}
exports.suaNguoiDung = suaNguoiDung;
