import * as nguoiDungService from '../service/nguoi_dung.service'
import {iRequest, iResponse} from '../interfaces'

export async function layChiTietNguoiDung(req:iRequest, res:iResponse){
    res.json(await nguoiDungService.layChiTietNguoiDung(req.body))
}

export async function dangNhap(req: iRequest, res: iResponse){
    res.json(await nguoiDungService.dangNhap(req.body))
}

export async function refreshToken(req: iRequest, res: iResponse){
    res.json(await nguoiDungService.refreshToken(req.body))
}

export async function themNguoiDung(req: iRequest, res: iResponse){
    res.json(await nguoiDungService.themNguoiDung(req.body))
}

export async function suaNguoiDung(req: iRequest, res: iResponse){
    res.json(await nguoiDungService.suaNguoiDung(req.body))
}