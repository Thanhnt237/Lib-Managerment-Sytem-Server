import * as common from '../common/common_function'
import {TABLE_NAME} from "../../config/tablename";
import {constants} from '../common/constants'

export async function layPhongDoc(input:Object): Promise<Object>{
    let sql = `
        select * from ${TABLE_NAME.PHONG_DOC};
    `

    try{
        common.check_data(input, ["Z"],constants.ERROR_CODE_EMPTY,null)
        let [result,] = await common.query(sql)
        return {status: "OK", result: result}
    }catch(error: any){
        console.log(error)
        return {status: "KO", ...error}
    }
}