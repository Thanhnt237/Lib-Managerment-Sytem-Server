import {conn} from '../../config/db_connection'
import _ from "lodash";
import * as logger from "winston";
import {constants} from './constants'

export async function query(str_sql: String): Promise<any> {
    try {
        const [rows, fields] = await conn.query<any>(str_sql.toString())
        return [rows, fields];
    } catch (error: any) {
        throw {  message : `${error.message}. ${error.sqlMessage}` }
    }
}

export async function genInsertQuery (tableName: String, arrProps: Array<String>, data: Array<any>, is_IGNORE:boolean): Promise<string> {
    let data_insert = [];
    let sql = "";

    for (let item of data) {
        let str_val_item = "(";
        for (let key in item) {
            if (item.hasOwnProperty(key)) {
                let data_type = typeof item[key];
                switch (data_type) {
                    case "string":
                        str_val_item += "'" + item[key] + "',";
                        break;
                    case "number": case "boolean":
                        str_val_item += item[key] + ",";
                        break;
                    default:
                        str_val_item += "null,";
                        break;
                }

            }
        };
        str_val_item = str_val_item.substring(0, str_val_item.length - 1);
        str_val_item += ")";
        data_insert.push(str_val_item)
    }

    if (data_insert.length > 0) {
        sql = `INSERT ${is_IGNORE ? 'IGNORE':''} INTO ${tableName} (${arrProps.join()}) VALUES ${data_insert.join()};`;
        // console.log(sql)
    }
    return sql;
}

export function check_data (data:any, check_field:any, rule:any, line:any){

    let result:any = {status : "OK"};
    rule = !rule ? constants.ERROR_CODE_EMPTY : rule;
    switch (rule) {
        case constants.ERROR_CODE_EMPTY:
            if(Array.isArray(data) && data.length > 1){
                // các bản ghi bị lỗi
                let error_index = [];
                for(let i = 0; i< data.length; i++){
                    let ob = data[i];
                    for(let field of check_field){
                        if(!ob[`${field}`] && ob[`${field}`] != 0){
                            error_index.push(i)
                            break ;
                        } else {
                            // kiểm tra các số phải >= 0
                            if(!isNaN(Number(ob[`${field}`])) && typeof Number(ob[`${field}`]) == "number"){
                                if(Number(ob[`${field}`]) < 0){
                                    error_index.push(i)
                                    break ;
                                }
                            }

                            // Check mảng
                            if(ob[`${field}`] && Array.isArray(ob[`${field}`]) && !ob[`${field}`].length){
                                result = {status : "KO", field , error_code : constants.ERROR_CODE_INVALID_VALUE , message : `${field} has no data` } ;
                                break ;
                            }
                        }
                    }
                }
                if(error_index.length){
                    result = {status : "KO", error_code : constants.ERROR_CODE_EMPTY , error_index } ;
                }
            } else {
                if(Array.isArray(data) && data.length == 1){
                    data = data[0]
                }
                for(let field of check_field){
                    if(!data[`${field}`] && data[`${field}`] != 0){
                        result = {status : "KO", field , error_code : constants.ERROR_CODE_EMPTY , message : `${field} is empty` } ;
                        break ;
                    } else {
                        // kiểm tra các số phải >= 0
                        if(!isNaN(Number(data[`${field}`])) && typeof Number(data[`${field}`]) == "number"){
                            if(Number(data[`${field}`]) < 0){
                                result = {status : "KO", field , error_code : constants.ERROR_CODE_INVALID_VALUE , message : `${field} is INVALID` } ;
                                break ;
                            }
                        }

                        // Check mảng
                        if(data[`${field}`] && Array.isArray(data[`${field}`]) && !data[`${field}`].length){
                            result = {status : "KO", field , error_code : constants.ERROR_CODE_INVALID_VALUE , message : `${field} has no data` } ;
                            break ;
                        }
                    }
                }
            }

            break;

        default:
            result = {status : "OK"};
            break;
    }
    if(result.status == "KO"){
        if(line >= 0){result.error_index = [line]}
        throw result;
    }
}

/**
 *
 * @param {*} data array [Object]
 * @param {*} columnStandard Object {"NHANSU_ID": "* removeAfterValid"}
 * param {* required require} {removeAfterValid}
 */

export async function validFragment(data: Array<any>, columnStandard: Array<Object>): Promise<Object>{
    try {
        let columnRequired = [];
        let columnOmit = [];
        for (let [keys, values] of Object.entries(columnStandard)){
            if(values){
                if(values.toString().includes('required') || values.toString().includes('require') || values.toString().includes('*')) {
                    columnRequired.push(keys)
                }
                if(values.toString().includes('removeAfterValid')){
                    columnOmit.push(keys)
                }
            }
        }

        check_data(data, columnRequired, constants.ERROR_CODE_EMPTY, null)

        for (let i=0;i<data.length;i++){
            data[i] = _.pick(data[i], Object.keys(columnStandard))
            if(columnOmit.length){
                data[i] = _.omit(data[i], columnOmit)
            }
        }

        return data
    }catch (error: any) {
        logger.error(`${arguments.callee.name} error : ${error.message}`)
        throw {status : "KO", ...error, message : error.message}
    }
}