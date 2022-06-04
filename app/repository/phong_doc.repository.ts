import * as common from '../common/common_function'
import {TABLE_NAME} from "../../config/tablename";
import {constants} from '../common/constants'
import {BasicReturn, PhongDoc} from "../interfaces";
import * as logger from "winston";

export async function layPhongDoc(input:Object): Promise<Object>{
    let sql = `
        select * 
        from ${TABLE_NAME.PHONG_DOC}
        where !KHOA and TRANG_THAI;
    `
    console.log(sql)

    try{
        let [result,] = await common.query(sql)
        return {status: "OK", result: result}
    }catch(error: any){
        logger.error(`layPhongDoc error : ${error.message}`)
        return {status: "KO", ...error}
    }
}

export async function themPhongDoc(input: Array<PhongDoc>): Promise<BasicReturn>{
    let arrProps = Object.keys(input[0])

    let sql = common.genInsertQuery(TABLE_NAME.PHONG_DOC, arrProps, input);
    console.log(sql)

    try{
        await common.query(sql)
        return {status: "OK", result: "OK"}
    }catch(error: any){
        logger.error(`themPhongDoc error : ${error.message}`)
        return {status: "KO", ...error, extension: error.message}
    }
}

export async function suaPhongDoc(input: any): Promise<BasicReturn>{
    let {data, condition} = input

    let sql = common.genUpdateQuery(TABLE_NAME.PHONG_DOC, data, condition);
    console.log(sql)

    try{
        await common.query(sql)
        return {status: "OK", result: "OK"}
    }catch(error: any){
        logger.error(`themPhongDoc error : ${error.message}`)
        return {status: "KO", ...error, extension: error.message}
    }
}