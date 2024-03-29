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
exports.suaNguoiDung = exports.themNguoiDung = exports.refreshToken = exports.dangNhap = exports.layDSNguoiDung = exports.layChiTietNguoiDung = void 0;
const nguoiDungRepository = __importStar(require("../repository/nguoi_dung.repository"));
const common = __importStar(require("../common/common_function"));
const constants_1 = require("../common/constants");
const auth = __importStar(require("../../middlewares/auth"));
const logger = __importStar(require("winston"));
function layChiTietNguoiDung(input) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield nguoiDungRepository.layChiTietNguoiDung(input);
    });
}
exports.layChiTietNguoiDung = layChiTietNguoiDung;
function layDSNguoiDung(input) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield nguoiDungRepository.layDSNguoiDung(input);
    });
}
exports.layDSNguoiDung = layDSNguoiDung;
function dangNhap(input) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            common.check_data(input, ["USERNAME", "PASSWORD"], constants_1.constants.ERROR_CODE_EMPTY);
        }
        catch (error) {
            logger.error(`dangNhap error : ${error.message}`);
            return Object.assign({ status: "KO" }, error);
        }
        let nguoiDungResults = yield layChiTietNguoiDung(input);
        if (nguoiDungResults.status === "KO")
            return nguoiDungResults;
        if (!nguoiDungResults.result.length) {
            return { status: "KO", message: "User not exist!", error_code: constants_1.constants.ERROR_CODE_NOT_EXIST };
        }
        let nguoiDung = nguoiDungResults.result[0];
        console.log(nguoiDungResults);
        if (nguoiDung.PASSWORD !== input.PASSWORD) {
            return { status: "KO", message: "Password not match!", error_code: constants_1.constants.ERROR_CODE_NOT_MATCH };
        }
        let result = auth.createToken(nguoiDung);
        return { status: "OK", result: { token: result[0], refresh_token: result[1] } };
    });
}
exports.dangNhap = dangNhap;
function refreshToken(input) {
    return __awaiter(this, void 0, void 0, function* () {
        let { refresh_token } = input;
        // console.log(input)
        try {
            common.check_data(input, ["refresh_token"], constants_1.constants.ERROR_CODE_EMPTY);
            let token = yield auth.refreshToken(refresh_token);
            return { status: "OK", result: { token: token } };
        }
        catch (error) {
            logger.error(`refreshToken error : ${error.message}`);
            return Object.assign({ status: "KO" }, error);
        }
    });
}
exports.refreshToken = refreshToken;
function themNguoiDung(input) {
    return __awaiter(this, void 0, void 0, function* () {
        let { data } = input;
        try {
            common.check_data(input, ["data"], constants_1.constants.ERROR_CODE_EMPTY);
        }
        catch (error) {
            return Object.assign({ status: "KO" }, error);
        }
        let nguoiDungInputStandard = {
            ID: "*",
            TEN_NGUOI_DUNG: "*",
            ROLE: "",
            USERNAME: "",
            PASSWORD: "",
            NGAY_KHOI_TAO: 0
        };
        data = data.map((c) => {
            return Object.assign(Object.assign({}, c), { ID: common.genID("", 20), NGAY_KHOI_TAO: (new Date()).getTime() });
        });
        try {
            let standardData = yield common.validFragment(data, nguoiDungInputStandard);
            return yield nguoiDungRepository.themNguoiDung(standardData);
        }
        catch (error) {
            logger.error(`themNguoiDung error : ${error.message}`);
            return Object.assign({ status: "KO" }, error);
        }
    });
}
exports.themNguoiDung = themNguoiDung;
function suaNguoiDung(input) {
    return __awaiter(this, void 0, void 0, function* () {
        let nguoiDungInputStandard = {
            ID: "* removeAfterValid",
            TEN_NGUOI_DUNG: "*",
            ROLE: "",
            USERNAME: "",
            PASSWORD: "",
            TRANG_THAI: true
        };
        try {
            let standardData = yield common.validFragment([input], nguoiDungInputStandard);
            return yield nguoiDungRepository.suaNguoiDung({ data: standardData, condition: { ID: input.ID } });
        }
        catch (error) {
            logger.error(`themPhongDoc error : ${error.message}`);
            return Object.assign({ status: "KO" }, error);
        }
    });
}
exports.suaNguoiDung = suaNguoiDung;
