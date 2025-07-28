import axios from "axios";
import { NextFunction,Request,Response } from "express";

interface DebugReplayOptions{
    endpoint: string;
    projectKey?:string;
}

const debugReplay = (options: DebugReplayOptions) =>{
    const {endpoint,projectKey}= options;

    return(req:Request, res:Response, next:NextFunction): void =>{
        const startTime = Date.now();

        res.on('finish',async()=>{
            const log = {
                method: req.method,
                url:req.originalUrl,
                statusCode: req.statusCode,
                requestBody: req.body || {},
                responseBody: (res as any).locals?.responseData || {},
                headers: req.headers,
                // duration ,
            }

            try {
                await axios.post(endpoint, log, {
                    headers:{
                        ...(projectKey && {Authorization:`Bearer ${projectKey}`}),
                        "Content-Type": "application/json",
                    }
                })
            } catch (error) {
                console.error("DebugReplay logging failed:",error)
            }
        })
        next();
    }
}

export default debugReplay;