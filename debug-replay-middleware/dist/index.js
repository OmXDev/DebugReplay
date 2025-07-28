import axios from 'axios';
export default function debugReplay(options) {
    const { endpoint, projectKey } = options;
    return (req, res, next) => {
        const startTime = Date.now();
        const originalSend = res.send;
        res.send = function (body) {
            try {
                const parsed = typeof body === 'string' ? JSON.parse(body) : body;
                res.locals.responseData = parsed;
            }
            catch (error) {
                res.locals.responseData = body;
            }
            return originalSend.call(this, body);
        };
        res.on('finish', async () => {
            const log = {
                method: req.method,
                url: req.originalUrl,
                statusCode: req.statusCode || 200,
                requestBody: req.body || {},
                responseBody: res.locals?.responseData || {},
                headers: req.headers,
                duration: Date.now() - startTime,
            };
            try {
                await axios.post(endpoint, log, {
                    headers: {
                        ...(projectKey && { Authorization: `Bearer ${projectKey}` }),
                        "Content-Type": "application/json",
                    }
                });
            }
            catch (error) {
                console.error("DebugReplay logging failed:", error);
            }
        });
        next();
    };
}
