import * as phongDocService from '../service/phong_doc.service'

export async function layPhongDoc(req:any, res:any){
    res.json(await phongDocService.layPhongDoc(req.body))
}