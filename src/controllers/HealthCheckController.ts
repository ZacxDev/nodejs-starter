import { Request, Response } from 'express';

export default class HealthCheckController {
  static async handle(req: Request, res: Response): Promise<void> {
    res.json({
      api: process.env.APP_NAME,
      health: 'healthy'
    });
  }
}
