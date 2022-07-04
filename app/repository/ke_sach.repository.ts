import * as common from '../common/common_function'
import {TABLE_NAME} from "../../config/tablename";
import {KeSach, BasicReturn, PhongDoc} from '../interfaces'
import * as logger from "winston";
import { filter } from 'lodash';

export async function layKeSach(input: any): Promise<BasicReturn>{
    let {
        KE_SACH_ID = '',
        search_string = "",
        filter_phong_doc = ""
    } = input;

    let expandCondition: string = ""

    if(KE_SACH_ID.trim()){
        expandCondition += ` and ks.ID = '${KE_SACH_ID}'`
    }

    if (search_string.trim()) {
        expandCondition += ` and lower(ks.TEN_KE_SACH) like '%${search_string.trim().toLowerCase()}%'`
    }

    if (filter_phong_doc.trim()) {
        expandCondition += ` and ks.PHONG_DOC_ID = '${filter_phong_doc}'`
    }

    let sql = `
        select ks.*, pd.TEN_PHONG_DOC 
        from ${TABLE_NAME.KE_SACH} as ks
        left join ${TABLE_NAME.PHONG_DOC} as pd on ks.PHONG_DOC_ID = pd.ID
        where !ks.KHOA and ks.TRANG_THAI
        ${expandCondition}
        order by ks.ID;
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

export async function themKeSach(input: Array<KeSach>): Promise<BasicReturn>{
    let arrProps = Object.keys(input[0])

    let sql = common.genInsertQuery(TABLE_NAME.KE_SACH, arrProps, input);
    console.log(sql)

    try{
        await common.query(sql)
        return {status: "OK", result: "OK"}
    }catch(error: any){
        logger.error(`themKeSach error : ${error.message}`)
        return {status: "KO", ...error, extension: error.message}
    }
}

export async function suaKeSach(input: any): Promise<BasicReturn>{
    let {data, condition} = input

    console.log(data)
    let sql = "";

    data.forEach((item: PhongDoc) => {
        sql += common.genUpdateQuery(TABLE_NAME.KE_SACH, item, condition);
    })

    console.log(sql)

    try{
        await common.query(sql)
        return {status: "OK", result: "OK"}
    }catch(error: any){
        logger.error(`suaKeSach error : ${error.message}`)
        return {status: "KO", ...error, extension: error.message}
    }
}