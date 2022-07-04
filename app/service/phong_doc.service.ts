import * as phongDocRepository from "../repository/phong_doc.repository";
import * as common from "../common/common_function"
import {BasicReturn, PhongDoc} from "../interfaces";
import {constants} from "../common/constants";
import * as logger from "winston";

export async function layPhongDSDoc(input: any): Promise<BasicReturn>{
    return await phongDocRepository.layPhongDoc(input)
}

export async function layPhongDocTheoKeSach(input: any): Promise<BasicReturn>{
    return await phongDocRepository.layPhongDocTheoKeSach(input);
}

export async function layChiTietPhongDoc(input: any): Promise<BasicReturn>{
    try{
        common.check_data(input, ["PHONG_DOC_ID"], constants.ERROR_CODE_EMPTY)
    }catch(error: any){
        logger.error(`layChiTietPhongDoc error : ${error.message}`)
        return {status: "KO", ...error}
    }

    return await phongDocRepository.layPhongDoc(input)
}

export async function themPhongDoc(input: any): Promise<BasicReturn>{
    let {data} = input

    try{
        common.check_data(input, ["data"], constants.ERROR_CODE_EMPTY)
    }catch(error: any){
        return {status: "KO", ...error}
    }

    let phongDocInputStandard: PhongDoc = {
        ID: "*",
        TEN_PHONG_DOC: "*",
        NGAY_KHOI_TAO: 0
    }

    data = data.map((c: any) => {
        return {
            ...c,
            ID: common.genID("P", 20),
            NGAY_KHOI_TAO: (new Date()).getTime()
        }
    })

    try{
        let standardData: Array<PhongDoc> = await common.validFragment(data, phongDocInputStandard)
        return await phongDocRepository.themPhongDoc(standardData)
    }catch(error: any){
        logger.error(`themPhongDoc error : ${error.message}`)
        return {status: "KO", ...error}
    }
}

export async function suaPhongDoc(input: PhongDoc): Promise<BasicReturn>{
    let phongDocInputStandard: PhongDoc = {
        ID: "* removeAfterValid",
        TEN_PHONG_DOC: "",
        TRANG_THAI: true
    }

    try{
        let standardData: Array<PhongDoc> = await common.validFragment([input], phongDocInputStandard)
        return await phongDocRepository.suaPhongDoc({data: standardData, condition: {ID: input.ID}})
    }catch(error: any){
        logger.error(`suaPhongDoc error : ${error.message}`)
        return {status: "KO", ...error}
    }
}