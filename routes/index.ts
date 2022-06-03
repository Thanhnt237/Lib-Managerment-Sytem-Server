import express from "express";
const router = express.Router();

import * as phongDocResource  from '../app/resource/phong_doc.resource';

//DATABASE
router.post("/api/public/phongDoc/layPhongDoc", phongDocResource.layPhongDoc);

module.exports = router;
