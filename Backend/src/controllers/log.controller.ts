import {Request, Response} from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createLog = async(req: Request, res:Response)=>{
    try {
        const{method, url, statusCode, requestBody, responseBody, headers ,duration} = req.body;
      
        const log = await prisma.log.create({
            data:{
                method,
                url,
                statusCode,
                requestBody,
                responseBody,
                headers,
                duration,
            },
        });

        res.status(201).json(log);
    } catch (error) {
        console.error("error creating log:",error);
        res.status(500).json({error:"Internal Server Error"})
    }
};

export const getAllLogs = async (_req: Request, res: Response)=>{
    try {
        const logs = await prisma.log.findMany({
            orderBy:{createdAt: "desc"}
        });

        res.json(logs);
    } catch (error) {
        console.log("Error fetching logs:", error);
        res.status(500).json({error: "Internal Server Error"})
    }
};