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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const phongDocResource = __importStar(require("../app/resource/phong_doc.resource"));
const nguoiDungResource = __importStar(require("../app/resource/nguoi_dung.resource"));
const keSachResource = __importStar(require("../app/resource/ke_sach.resource"));
const sachResource = __importStar(require("../app/resource/sach.resource"));
//DATABASE
router.post("/api/resources/phongDoc/layDSPhongDoc", phongDocResource.layDSPhongDoc);
router.post("/api/resources/phongDoc/layChiTietPhongDoc", phongDocResource.layChiTietPhongDoc);
router.post("/api/resources/phongDoc/themPhongDoc", phongDocResource.themPhongDoc);
router.post("/api/resources/phongDoc/suaPhongDoc", phongDocResource.suaPhongDoc);
router.post("/api/resources/nguoiDung/layDSNguoiDung", nguoiDungResource.layDSNguoiDung);
router.post("/api/resources/nguoiDung/layChiTietNguoiDung", nguoiDungResource.layChiTietNguoiDung);
router.post("/api/resources/nguoiDung/themNguoiDung", nguoiDungResource.themNguoiDung);
router.post("/api/resources/nguoiDung/suaNguoiDung", nguoiDungResource.suaNguoiDung);
router.post("/api/resources/keSach/layDSKeSach", keSachResource.layDSKeSach);
router.post("/api/resources/keSach/layChiTietKeSach", keSachResource.layChiTietKeSach);
router.post("/api/resources/keSach/themKeSach", keSachResource.themKeSach);
router.post("/api/resources/keSach/suaKeSach", keSachResource.suaKeSach);
router.post("/api/resources/keSach/layDSSach", sachResource.layDSSach);
router.post("/api/resources/keSach/layChiTietSach", sachResource.layChiTietSach);
router.post("/api/resources/keSach/themSach", sachResource.themSach);
router.post("/api/resources/keSach/suaSach", sachResource.suaSach);
router.post("/api/public/nguoiDung/dangNhap", nguoiDungResource.dangNhap);
router.post("/api/public/token/refreshToken", nguoiDungResource.refreshToken);
module.exports = router;
