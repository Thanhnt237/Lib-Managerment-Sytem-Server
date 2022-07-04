import express from "express";
const router = express.Router();

import * as phongDocResource  from '../app/resource/phong_doc.resource';
import * as nguoiDungResource from '../app/resource/nguoi_dung.resource';
import * as keSachResource from '../app/resource/ke_sach.resource';
import * as sachResource from '../app/resource/sach.resource'
import * as tacGiaResource from '../app/resource/tac_gia.resource'
//DATABASE
router.post("/api/resources/phongDoc/layDSPhongDoc", phongDocResource.layDSPhongDoc);
router.post("/api/resources/phongDoc/layChiTietPhongDoc", phongDocResource.layChiTietPhongDoc)
router.post("/api/resources/phongDoc/themPhongDoc", phongDocResource.themPhongDoc);
router.post("/api/resources/phongDoc/suaPhongDoc", phongDocResource.suaPhongDoc);
router.post("/api/resource/phongDoc/layPhongDocTheoKeSach", phongDocResource.layPhongDocTheoKeSach)

router.post("/api/resources/nguoiDung/layDSNguoiDung", nguoiDungResource.layDSNguoiDung)
router.post("/api/resources/nguoiDung/layChiTietNguoiDung", nguoiDungResource.layChiTietNguoiDung);
router.post("/api/resources/nguoiDung/themNguoiDung", nguoiDungResource.themNguoiDung);
router.post("/api/resources/nguoiDung/suaNguoiDung", nguoiDungResource.suaNguoiDung);

router.post("/api/resources/keSach/layDSKeSach", keSachResource.layDSKeSach)
router.post("/api/resources/keSach/layChiTietKeSach", keSachResource.layChiTietKeSach);
router.post("/api/resources/keSach/themKeSach", keSachResource.themKeSach);
router.post("/api/resources/keSach/suaKeSach", keSachResource.suaKeSach);

router.post("/api/resources/keSach/layDSSach", sachResource.layDSSach)
router.post("/api/resources/keSach/layChiTietSach", sachResource.layChiTietSach);
router.post("/api/resources/keSach/themSach", sachResource.themSach);
router.post("/api/resources/keSach/suaSach", sachResource.suaSach);

router.post("/api/public/nguoiDung/dangNhap", nguoiDungResource.dangNhap);
router.post("/api/public/token/refreshToken", nguoiDungResource.refreshToken);

router.post("/api/resources/tacGia/layDSTacGia", tacGiaResource.layDSTacGia)
router.post("/api/resources/tacGia/themTacGia", tacGiaResource.themTacGia)
router.post("/api/resources/tacGia/suaTacGia", tacGiaResource.suaTacGia)
module.exports = router;
