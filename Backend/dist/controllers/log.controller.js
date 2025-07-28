"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllLogs = exports.createLog = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createLog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { method, url, statusCode, requestBody, responseBody, headers, duration } = req.body;
        const log = yield prisma.log.create({
            data: {
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
    }
    catch (error) {
        console.error("error creating log:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.createLog = createLog;
const getAllLogs = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const logs = yield prisma.log.findMany({
            orderBy: { createdAt: "desc" }
        });
        res.json(logs);
    }
    catch (error) {
        console.log("Error fetching logs:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getAllLogs = getAllLogs;
