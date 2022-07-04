import * as common from '../common/common_function'
import {constants} from '../common/constants'
import {BasicReturn, TacGia} from '../interfaces'
import * as logger from "winston";
import * as tacGiaRepository from '../repository/tac_gia.repository'

export async function layDSTacGia(input: any): Promise<BasicReturn>{
    return await tacGiaRepository.layTacGia(input)
}

export async function themTacGia(input: any): Promise<BasicReturn>{
    let {data} = input;

    try{
        common.check_data(input, ["data"], constants.ERROR_CODE_EMPTY)
    }catch(error: any){
        return {status: "KO", ...error}
    }

    let tacGiaInputStandard: TacGia = {
        ID: "*",
        TEN_TAC_GIA: "*",
        NGAY_KHOI_TAO: 0,
        KHOA: false,
        TRANG_THAI: true
    }

    data = data.map((c: any) => {
        return {
            ...c,
            ID: common.genID("S", 20),
            NGAY_KHOI_TAO: (new Date()).getTime()
        }
    })

    try{
        let standardData: Array<TacGia> = await common.validFragment(data, tacGiaInputStandard)
        return await tacGiaRepository.themTacGia(standardData);
    }catch(error: any){
        logger.error(`themTacGia error : ${error.message}`)
        return {status: "KO", ...error}
    }
}

export async function suaTacGia(input: TacGia): Promise<BasicReturn>{
    let sachInputStandard: TacGia = {
        ID: "*",
        TEN_TAC_GIA: "",
        NGAY_KHOI_TAO: 0,
        KHOA: false,
        TRANG_THAI: true
    }

    try{
        let standardData: Array<TacGia> = await common.validFragment([input], sachInputStandard)
        return await tacGiaRepository.suaTacGia({data: standardData, condition: {ID: input.ID}})
    }catch(error: any){
        logger.error(`suaTacGia error : ${error.message}`)
        return {status: "KO", ...error}
    }
}