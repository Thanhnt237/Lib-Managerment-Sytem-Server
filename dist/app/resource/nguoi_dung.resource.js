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
exports.suaNguoiDung = exports.themNguoiDung = exports.refreshToken = exports.dangNhap = exports.layChiTietNguoiDung = void 0;
const nguoiDungService = __importStar(require("../service/nguoi_dung.service"));
function layChiTietNguoiDung(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.json(yield nguoiDungService.layChiTietNguoiDung(req.body));
    });
}
exports.layChiTietNguoiDung = layChiTietNguoiDung;
function dangNhap(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.json(yield nguoiDungService.dangNhap(req.body));
    });
}
exports.dangNhap = dangNhap;
function refreshToken(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.json(yield nguoiDungService.refreshToken(req.body));
    });
}
exports.refreshToken = refreshToken;
function themNguoiDung(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.json(yield nguoiDungService.themNguoiDung(req.body));
    });
}
exports.themNguoiDung = themNguoiDung;
function suaNguoiDung(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.json(yield nguoiDungService.suaNguoiDung(req.body));
    });
}
exports.suaNguoiDung = suaNguoiDung;
