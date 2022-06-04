import * as phongDocService from '../service/phong_doc.service'
import {iRequest, iResponse} from "../interfaces";

export async function layPhongDoc(req: iRequest, res: iResponse){
    res.json(await phongDocService.layPhongDoc(req.body))
}

export async function themPhongDoc(req: iRequest, res: iResponse){
    res.json(await phongDocService.themPhongDoc(req.body))
}

export async function suaPhongDoc(req: iRequest, res: iResponse){
    res.json(await phongDocService.suaPhongDoc(req.body))
}