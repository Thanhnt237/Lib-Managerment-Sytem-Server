import {iRequest, iResponse} from "../interfaces";
import * as keSachService from "../service/ke_sach.service"

export async function layDSKeSach(req: iRequest, res: iResponse){
    res.json(await keSachService.layDSKeSach(req.body))
}

export async function layChiTietKeSach(req: iRequest, res: iResponse){
    res.json(await keSachService.layChiTietKeSach(req.body))
}

export async function themKeSach(req: iRequest, res: iResponse){
    res.json(await keSachService.themKeSach(req.body))
}

export async function suaKeSach(req: iRequest, res: iResponse){
    res.json(await keSachService.suaKeSach(req.body))
}