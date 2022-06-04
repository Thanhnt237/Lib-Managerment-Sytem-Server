import * as nguoiDungRepository from "../repository/nguoi_dung.repository";
import * as common from '../common/common_function'
import {constants} from '../common/constants'
import {NguoiDung, BasicReturn} from '../interfaces'
import * as auth from '../../middlewares/auth';
import * as logger from "winston";

export async function layChiTietNguoiDung(input: NguoiDung): Promise<BasicReturn>{
    return await nguoiDungRepository.layChiTietNguoiDung(input)
}

export async function dangNhap(input: NguoiDung): Promise<BasicReturn> {
    try{
        common.check_data(input, ["USERNAME", "PASSWORD"], constants.ERROR_CODE_EMPTY)
    }catch(error:any){
        logger.error(`dangNhap error : ${error.message}`)
        return {status: "KO", ...error}
    }

    let nguoiDungResults: BasicReturn = await layChiTietNguoiDung(input);
    if(nguoiDungResults.status === "KO") return nguoiDungResults;

    if(!nguoiDungResults.result.length){
        return {status: "KO", message: "User not exist!", error_code: constants.ERROR_CODE_NOT_EXIST}
    }

    let nguoiDung: NguoiDung = nguoiDungResults.result[0]
    console.log(nguoiDungResults)

    if(nguoiDung.PASSWORD !== input.PASSWORD){
        return {status: "KO", message: "Password not match!", error_code: constants.ERROR_CODE_NOT_MATCH}
    }

    let result: Array<string> = auth.createToken(nguoiDung)

    return {status: "OK", result: {token: result[0], refresh_token: result[1]}}
}

export async function refreshToken(input: any): Promise<BasicReturn> {
    let {refresh_token} = input;

    try{
        common.check_data(input, ["refresh_token"], constants.ERROR_CODE_EMPTY)
        let token = await auth.refreshToken(refresh_token)
        return {status: "OK", result: {token: token}}
    }catch(error: any){
        logger.error(`refreshToken error : ${error.message}`)
        return {status: "KO", ...error}
    }
}

export async function themNguoiDung(input: any): Promise<BasicReturn>{
    let {data} = input

    try{
        common.check_data(input, ["data"], constants.ERROR_CODE_EMPTY)
    }catch(error: any){
        return {status: "KO", ...error}
    }

    let nguoiDungInputStandard: NguoiDung = {
        ID: "*",
        TEN_NGUOI_DUNG: "*",
        ROLE: "",
        USERNAME: "",
        PASSWORD: ""
    }

    data = data.map((c: any) => {
        return {
            ...c,
            ID: common.genID("", 20),
            NGAY_KHOI_TAO: (new Date()).getTime()
        }
    })

    try{
        let standardData: Array<NguoiDung> = await common.validFragment(data, nguoiDungInputStandard)
        return await nguoiDungRepository.themNguoiDung(standardData)
    }catch(error: any){
        logger.error(`themNguoiDung error : ${error.message}`)
        return {status: "KO", ...error}
    }
}

export async function suaNguoiDung(input: NguoiDung): Promise<BasicReturn>{
    let nguoiDungInputStandard: NguoiDung = {
        ID: "* removeAfterValid",
        TEN_NGUOI_DUNG: "*",
        ROLE: "",
        USERNAME: "",
        PASSWORD: ""
    }

    try{
        let standardData: Array<NguoiDung> = await common.validFragment([input], nguoiDungInputStandard)
        return await nguoiDungRepository.suaNguoiDung({data: standardData, condition: {ID: input.ID}})
    }catch(error: any){
        logger.error(`themPhongDoc error : ${error.message}`)
        return {status: "KO", ...error}
    }
}