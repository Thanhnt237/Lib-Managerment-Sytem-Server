import {iRequest, iResponse} from "../interfaces";
import * as sachService from "../service/sach.service"

export async function layDSSach(req: iRequest, res: iResponse){
    res.json(await sachService.layDSSach(req.body))
}

export async function layChiTietSach(req: iRequest, res: iResponse){
    res.json(await sachService.layChiTietSach(req.body))
}

export async function themSach(req: iRequest, res: iResponse){
    res.json(await sachService.themSach(req.body))
}

export async function suaSach(req: iRequest, res: iResponse){
    res.json(await sachService.suaSach(req.body))
}