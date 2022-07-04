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
exports.suaSach = exports.themSach = exports.layChiTietSach = exports.layDSSach = void 0;
const sachRepository = __importStar(require("../repository/sach.repository"));
const common = __importStar(require("../common/common_function"));
const constants_1 = require("../common/constants");
const logger = __importStar(require("winston"));
function layDSSach(input) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield sachRepository.laySach(input);
    });
}
exports.layDSSach = layDSSach;
function layChiTietSach(input) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            common.check_data(input, ["SACH_ID"], constants_1.constants.ERROR_CODE_EMPTY);
        }
        catch (error) {
            logger.error(`layChiTietKeSach error : ${error.message}`);
            return Object.assign({ status: "KO" }, error);
        }
        return yield sachRepository.laySach(input);
    });
}
exports.layChiTietSach = layChiTietSach;
function themSach(input) {
    return __awaiter(this, void 0, void 0, function* () {
        let { data } = input;
        try {
            common.check_data(input, ["data"], constants_1.constants.ERROR_CODE_EMPTY);
        }
        catch (error) {
            return Object.assign({ status: "KO" }, error);
        }
        let sachInputStandard = {
            ID: "*",
            TEN_SACH: "*",
            KE_SACH_ID: "*",
            NGAY_KHOI_TAO: 0
        };
        data = data.map((c) => {
            return Object.assign(Object.assign({}, c), { ID: common.genID("S", 20), NGAY_KHOI_TAO: (new Date()).getTime() });
        });
        try {
            let standardData = yield common.validFragment(data, sachInputStandard);
            return yield sachRepository.themSach(standardData);
        }
        catch (error) {
            logger.error(`themSach error : ${error.message}`);
            return Object.assign({ status: "KO" }, error);
        }
    });
}
exports.themSach = themSach;
function suaSach(input) {
    return __awaiter(this, void 0, void 0, function* () {
        let sachInputStandard = {
            ID: "* removeAfterValid",
            TEN_SACH: "*",
            KE_SACH_ID: "*",
            TRANG_THAI: true
        };
        try {
            let standardData = yield common.validFragment([input], sachInputStandard);
            return yield sachRepository.suaSach({ data: standardData, condition: { ID: input.ID } });
        }
        catch (error) {
            logger.error(`suaSach error : ${error.message}`);
            return Object.assign({ status: "KO" }, error);
        }
    });
}
exports.suaSach = suaSach;
