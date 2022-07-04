import * as keSachRepository from "../repository/ke_sach.repository";
import * as common from '../common/common_function'
import {constants} from '../common/constants'
import {KeSach, BasicReturn} from '../interfaces'
import * as logger from "winston";

export async function layDSKeSach(input: any): Promise<BasicReturn>{
    return await keSachRepository.layKeSach(input)
}

export async function layChiTietKeSach(input: any): Promise<BasicReturn>{
    try{
        common.check_data(input, ["KE_SACH_ID"], constants.ERROR_CODE_EMPTY)
    }catch(error: any){
        logger.error(`layChiTietKeSach error : ${error.message}`)
        return {status: "KO", ...error}
    }

    return await keSachRepository.layKeSach(input)
}

export async function themKeSach(input: any): Promise<BasicReturn>{
    let {data} = input;

    try{
        common.check_data(input, ["data"], constants.ERROR_CODE_EMPTY)
    }catch(error: any){
        return {status: "KO", ...error}
    }

    let keSachInputStandard: KeSach = {
        ID: "*",
        TEN_KE_SACH: "*",
        PHONG_DOC_ID: "*",
        NGAY_KHOI_TAO: 0
    }

    data = data.map((c: any) => {
        return {
            ...c,
            ID: common.genID("KS", 20),
            NGAY_KHOI_TAO: (new Date()).getTime()
        }
    })

    try{
        let standardData: Array<KeSach> = await common.validFragment(data, keSachInputStandard)
        return await keSachRepository.themKeSach(standardData);
    }catch(error: any){
        logger.error(`themKeSach error : ${error.message}`)
        return {status: "KO", ...error}
    }
}

export async function suaKeSach(input: KeSach): Promise<BasicReturn>{
    let keSachcInputStandard: KeSach = {
        ID: "* removeAfterValid",
        TEN_KE_SACH: "",
        PHONG_DOC_ID: "",
        TRANG_THAI: true
    }

    try{
        let standardData: Array<KeSach> = await common.validFragment([input], keSachcInputStandard)
        return await keSachRepository.suaKeSach({data: standardData, condition: {ID: input.ID}})
    }catch(error: any){
        logger.error(`suaKeSach error : ${error.message}`)
        return {status: "KO", ...error}
    }
}