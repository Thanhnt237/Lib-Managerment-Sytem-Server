import * as sachRepository from "../repository/sach.repository";
import * as common from '../common/common_function'
import {constants} from '../common/constants'
import {BasicReturn, Sach} from '../interfaces'
import * as logger from "winston";

export async function layDSSach(input: any): Promise<BasicReturn>{
    return await sachRepository.laySach(input)
}

export async function layChiTietSach(input: any): Promise<BasicReturn>{
    try{
        common.check_data(input, ["SACH_ID"], constants.ERROR_CODE_EMPTY)
    }catch(error: any){
        logger.error(`layChiTietKeSach error : ${error.message}`)
        return {status: "KO", ...error}
    }

    return await sachRepository.laySach(input)
}

export async function themSach(input: any): Promise<BasicReturn>{
    let {data} = input;

    try{
        common.check_data(input, ["data"], constants.ERROR_CODE_EMPTY)
    }catch(error: any){
        return {status: "KO", ...error}
    }

    let sachInputStandard: Sach = {
        ID: "*",
        TEN_SACH: "*",
        KE_SACH_ID: "*",
        NGAY_KHOI_TAO: 0
    }

    data = data.map((c: any) => {
        return {
            ...c,
            ID: common.genID("S", 20),
            NGAY_KHOI_TAO: (new Date()).getTime()
        }
    })

    try{
        let standardData: Array<Sach> = await common.validFragment(data, sachInputStandard)
        return await sachRepository.themSach(standardData);
    }catch(error: any){
        logger.error(`themSach error : ${error.message}`)
        return {status: "KO", ...error}
    }
}

export async function addRefSachTacGia(input: any): Promise<BasicReturn>{
    let { data } = input;

    let refStandardInput = {
        ID: "*",
        SACH_ID: "",
        TAC_GIA_ID: "",
        TRANG_THAI: ""
    }



    try {
        
    } catch (error: any) {
        logger.error(`addRefSachTacGia error: ${error.message}`)
        return {status: "KO", ...error}
    }

    return {status: "OK", message: "OK"}
}

export async function suaSach(input: Sach): Promise<BasicReturn>{
    let sachInputStandard: Sach = {
        ID: "* removeAfterValid",
        TEN_SACH: "",
        KE_SACH_ID: "",
        TRANG_THAI: true
    }

    try{
        let standardData: Array<Sach> = await common.validFragment([input], sachInputStandard)
        return await sachRepository.suaSach({data: standardData, condition: {ID: input.ID}})
    }catch(error: any){
        logger.error(`suaSach error : ${error.message}`)
        return {status: "KO", ...error}
    }
}

export async function addRefSachTacGia(input: any): Promise<BasicReturn>{
    let {SACH_ID, TAC_GIA_ID} = input;

    let standardBody = {
        ID: SACH_ID + TAC_GIA_ID,
        SACH_ID: SACH_ID,
        TAC_GIA_ID: TAC_GIA_ID
    }

    try{
        return await sachRepository.addRefSachTacGia(standardBody)
    }catch(error: any){
        logger.error(`suaSach error : ${error.message}`)
        return {status: "KO", ...error}
    }
}