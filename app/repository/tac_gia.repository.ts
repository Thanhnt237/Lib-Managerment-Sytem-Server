import * as common from '../common/common_function'
import {TABLE_NAME} from "../../config/tablename";
import {BasicReturn, PhongDoc, TacGia} from "../interfaces";
import * as logger from "winston";

export async function layTacGia(input: any): Promise<BasicReturn>{
    let {TAC_GIA_ID = '', search_string = '', limit = 100000, page = 1} = input;

    let expandCondition: string = ""

    if(TAC_GIA_ID.trim()){
        expandCondition += ` and ID = '${TAC_GIA_ID}'`
    }

    let sql = `
        select * 
        from ${TABLE_NAME.TAC_GIA}
        where !KHOA and TRANG_THAI
        ${expandCondition}
        order by ID;
    `
    console.log(sql)

    try{
        let [result,] = await common.query(sql)
        return {status: "OK", result: result}
    }catch(error: any){
        logger.error(`layTacGia error : ${error.message}`)
        return {status: "KO", ...error}
    }
}

export async function themTacGia(input: Array<TacGia>): Promise<BasicReturn>{
    let arrProps = Object.keys(input[0])

    let sql = common.genInsertQuery(TABLE_NAME.TAC_GIA, arrProps, input);
    console.log(sql)

    try{
        await common.query(sql)
        return {status: "OK", result: "OK"}
    }catch(error: any){
        logger.error(`themTacGia error : ${error.message}`)
        return {status: "KO", ...error, extension: error.message}
    }
}

export async function suaTacGia(input: any): Promise<BasicReturn>{
    let {data, condition} = input

    let sql = "";

    data.forEach((item: TacGia) => {
        sql += common.genUpdateQuery(TABLE_NAME.TAC_GIA, item, condition);
    })

    console.log(sql)

    try{
        await common.query(sql)
        return {status: "OK", result: "OK"}
    }catch(error: any){
        logger.error(`suaTacGia error : ${error.message}`)
        return {status: "KO", ...error, extension: error.message}
    }
}