import { Request, Response, NextFunction } from 'express';

interface DebugReplayOptions {
    endpoint: string;
    projectKey?: string;
}
declare function debugReplay(options: DebugReplayOptions): (req: Request, res: Response, next: NextFunction) => void;

export { debugReplay as default };
