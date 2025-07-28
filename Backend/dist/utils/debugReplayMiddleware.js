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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const debugReplay = (options) => {
    const { endpoint, projectKey } = options;
    return (req, res, next) => {
        const startTime = Date.now();
        res.on('finish', () => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            const log = {
                method: req.method,
                url: req.originalUrl,
                statusCode: req.statusCode,
                requestBody: req.body || {},
                responseBody: ((_a = res.locals) === null || _a === void 0 ? void 0 : _a.responseData) || {},
                headers: req.headers,
                // duration ,
            };
            try {
                yield axios_1.default.post(endpoint, log, {
                    headers: Object.assign(Object.assign({}, (projectKey && { Authorization: `Bearer ${projectKey}` })), { "Content-Type": "application/json" })
                });
            }
            catch (error) {
                console.error("DebugReplay logging failed:", error);
            }
        }));
        next();
    };
};
exports.default = debugReplay;
