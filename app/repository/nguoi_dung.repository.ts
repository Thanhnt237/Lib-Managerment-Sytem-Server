import * as common from '../common/common_function'
import {TABLE_NAME} from "../../config/tablename";
import {constants} from '../common/constants'
import {NguoiDung, BasicReturn, PhongDoc} from '../interfaces'
import * as logger from "winston";

export async function layChiTietNguoiDung(input: NguoiDung): Promise<BasicReturn>{

    let expandCondition = ""

    if(input.USERNAME){
        expandCondition = `and USERNAME = '${input.USERNAME}' and ROLE = '${constants.ADMIN_ROLE}'`
    }else{
        expandCondition = `and ID = '${input.ID}'`
    }

    let sql = `
        select * 
        from ${TABLE_NAME.NGUOI_DUNG}
        where TRANG_THAI and !KHOA ${expandCondition}
    `

    console.log(sql)

    try{
        if(input.USERNAME || input.USERNAME === ""){
            common.check_data(input, ["USERNAME"],constants.ERROR_CODE_EMPTY)
        }else{
            common.check_data(input, ["ID"],constants.ERROR_CODE_EMPTY)
        }

        let [result,]: Array<NguoiDung> = await common.query(sql)
        return {status: "OK", result: result}
    }catch(error: any){
        logger.error(`layChiTietNguoiDung error : ${error.message}`)
        return {status: "KO", ...error}
    }
}

export async function themNguoiDung(input: Array<NguoiDung>): Promise<BasicReturn>{
    let arrProps = Object.keys(input[0])

    let sql = common.genInsertQuery(TABLE_NAME.NGUOI_DUNG, arrProps, input);
    console.log(sql)

    try{
        await common.query(sql)
        return {status: "OK", result: "OK"}
    }catch(error: any){
        logger.error(`themPhongDoc error : ${error.message}`)
        return {status: "KO", ...error, extension: error.message}
    }
}

export async function suaNguoiDung(input: any): Promise<BasicReturn>{
    let {data, condition} = input

    let sql = common.genUpdateQuery(TABLE_NAME.NGUOI_DUNG, data, condition);
    console.log(sql)

    try{
        await common.query(sql)
        return {status: "OK", result: "OK"}
    }catch(error: any){
        logger.error(`themPhongDoc error : ${error.message}`)
        return {status: "KO", ...error, extension: error.message}
    }
}