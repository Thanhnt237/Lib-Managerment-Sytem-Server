import * as common from '../common/common_function'
import {TABLE_NAME} from "../../config/tablename";
import {Sach, BasicReturn} from '../interfaces'
import * as logger from "winston";

export async function laySach(input: any): Promise<BasicReturn>{
    let {SACH = ''} = input;

    let expandCondition: string = ""

    if(SACH.trim()){
        expandCondition += ` and ID = '${SACH}'`
    }

    let sql = `
        select *
        from ${TABLE_NAME.SACH}
        where !KHOA and TRANG_THAI
            ${expandCondition}
        order by ID;
    `
    console.log(sql)

    try{
        let [result,] = await common.query(sql)
        return {status: "OK", result: result}
    }catch(error: any){
        logger.error(`laySach error : ${error.message}`)
        return {status: "KO", ...error}
    }
}

export async function themSach(input: Array<Sach>): Promise<BasicReturn>{
    let arrProps = Object.keys(input[0])

    let sql = common.genInsertQuery(TABLE_NAME.SACH, arrProps, input);
    console.log(sql)

    try{
        await common.query(sql)
        return {status: "OK", result: "OK"}
    }catch(error: any){
        logger.error(`themSach error : ${error.message}`)
        return {status: "KO", ...error, extension: error.message}
    }
}

export async function suaSach(input: any): Promise<BasicReturn>{
    let {data, condition} = input

    let sql = "";

    data.forEach((item: Sach) => {
        sql += common.genUpdateQuery(TABLE_NAME.SACH, item, condition);
    })

    console.log(sql)

    try{
        await common.query(sql)
        return {status: "OK", result: "OK"}
    }catch(error: any){
        logger.error(`suaSach error : ${error.message}`)
        return {status: "KO", ...error, extension: error.message}
    }
}

export async function addRefSachTacGia(input: any): Promise<BasicReturn>{
    let arrProps = Object.keys(input[0])

    let sql = common.genInsertQuery(TABLE_NAME.REF_SACH_TACGIA, arrProps, input);
    console.log(sql)

    try{
        await common.query(sql)
        return {status: "OK", result: "OK"}
    }catch(error: any){
        logger.error(`themSach error : ${error.message}`)
        return {status: "KO", ...error, extension: error.message}
    }
}