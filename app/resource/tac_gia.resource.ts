import {iRequest, iResponse} from "../interfaces";
import * as tacGiaService from "../service/tac_gia.service"

export async function layDSTacGia(req: iRequest, res: iResponse){
    res.json(await tacGiaService.layDSTacGia(req.body))
}

export async function layChiTietTacGia(req: iRequest, res: iResponse){
    res.json(await tacGiaService.layChiTietTacGia(req.body))
}

export async function themTacGia(req: iRequest, res: iResponse){
    res.json(await tacGiaService.themTacGia(req.body))
}

export async function suaTacGia(req: iRequest, res: iResponse){
    res.json(await tacGiaService.suaTacGia(req.body))
}