import {iNext, iRequest, iResponse} from "../app/interfaces";
import {verifyToken} from "../middlewares/auth";
import jwt from "jsonwebtoken";

module.exports = async function (req: iRequest, res: iResponse, next: iNext){
    //if(req.method == 'OPTIONS') next();

    let token =
        (req.body && req.body.access_token) ||
        (req.query && req.query.access_token) ||
        req.headers['x-access-token'] || "";

    if(!token){
        res.status(400).json({status: "KO", message: "Invalid Token"})
    }else{
        try{
            req.headers.userId = await verifyToken(token);
            next()
        }catch(error: any){
            res.status(400).json(error)
        }
    }

}