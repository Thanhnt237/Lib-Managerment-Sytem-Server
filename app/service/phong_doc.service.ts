import * as phongDocRepository from "../repository/phong_doc.repository";

export async function layPhongDoc(input: Object): Promise<Object>{
    return await phongDocRepository.layPhongDoc(input)
}