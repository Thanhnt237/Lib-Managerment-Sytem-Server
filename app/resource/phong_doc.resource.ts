import * as phongDocService from '../service/phong_doc.service'
import {iRequest, iResponse} from "../interfaces";

export async function layDSPhongDoc(req: iRequest, res: iResponse){
    res.json(await phongDocService.layPhongDSDoc(req.body))
}

export async function layChiTietPhongDoc(req: iRequest, res: iResponse){
    res.json(await phongDocService.layChiTietPhongDoc(req.body))
}

export async function themPhongDoc(req: iRequest, res: iResponse){
    res.json(await phongDocService.themPhongDoc(req.body))
}

export async function suaPhongDoc(req: iRequest, res: iResponse){
    res.json(await phongDocService.suaPhongDoc(req.body))
}

export async function layPhongDocTheoKeSach(req: iRequest, res:iResponse) {
   res.json(await phongDocService.layPhongDocTheoKeSach(req.body)) 
}