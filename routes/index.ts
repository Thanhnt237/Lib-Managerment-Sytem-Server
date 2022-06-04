import express from "express";
const router = express.Router();

import * as phongDocResource  from '../app/resource/phong_doc.resource';
import * as nguoiDungResource from '../app/resource/nguoi_dung.resource'
//DATABASE
router.post("/api/resources/phongDoc/layPhongDoc", phongDocResource.layPhongDoc);
router.post("/api/resources/phongDoc/themPhongDoc", phongDocResource.themPhongDoc);
router.post("/api/resources/phongDoc/suaPhongDoc", phongDocResource.suaPhongDoc);

router.post("/api/resources/nguoiDung/layChiTietNguoiDung", nguoiDungResource.layChiTietNguoiDung);
router.post("/api/resources/nguoiDung/themNguoiDung", nguoiDungResource.themNguoiDung);
router.post("/api/resources/nguoiDung/suaNguoiDung", nguoiDungResource.suaNguoiDung);

router.post("/api/public/nguoiDung/dangNhap", nguoiDungResource.dangNhap);
router.post("/api/public/token/refreshToken", nguoiDungResource.refreshToken);
module.exports = router;
