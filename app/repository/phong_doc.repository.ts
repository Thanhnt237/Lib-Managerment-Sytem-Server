import * as common from '../common/common_function'
import {TABLE_NAME} from "../../config/tablename";
import {constants} from '../common/constants'
import {BasicReturn, PhongDoc} from "../interfaces";
import * as logger from "winston";
import { table } from 'console';

export async function layPhongDoc(input: any): Promise<BasicReturn>{
    let {PHONG_DOC_ID = '', search_string = '', limit = 15, offset = 1} = input;

    let expandCondition: string = ""

    if(PHONG_DOC_ID.trim()){
        expandCondition += ` and ID = '${PHONG_DOC_ID}'`
    }
    
    if (search_string.trim()) {
        console.log(search_string);

        expandCondition += ` and lower(TEN_PHONG_DOC) like '%${search_string.trim().toLowerCase()}%' `
    }

    let sql = `
        select * 
        from ${TABLE_NAME.PHONG_DOC}
        where !KHOA and TRANG_THAI
        ${expandCondition}
        order by ID;
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

export async function layPhongDocTheoKeSach(input: any): Promise<BasicReturn>{
    let { KE_SACH_ID = '' } = input
    let expandCondition = ""

    if (KE_SACH_ID.trim()) {
        expandCondition += ` and ks.ID = '${KE_SACH_ID}' `
    }

    let sql = `
        select pd.*
        from ${TABLE_NAME.KE_SACH} as ks
        left join ${TABLE_NAME.PHONG_DOC} as pd on ks.PHONG_DOC_ID = pd.ID
        where !pd.KHOA and pd.TRANG_THAI ${expandCondition}
    `

    try {
        let [result,] = await common.query(sql)
        return {status: "OK", result: result}
    } catch (error: any) {
        logger.error(`layPhongDocTheoKeSach error : ${error.message}`)
        return {status: "KO", ...error}
    }
    return { status: "OK", message: "OK"}
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

    let sql = "";

    data.forEach((item: PhongDoc) => {
        sql += common.genUpdateQuery(TABLE_NAME.PHONG_DOC, item, condition);
    })

    console.log(sql)

    try{
        await common.query(sql)
        return {status: "OK", result: "OK"}
    }catch(error: any){
        logger.error(`suaPhongDoc error : ${error.message}`)
        return {status: "KO", ...error, extension: error.message}
    }
}