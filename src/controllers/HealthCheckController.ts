import { Request, Response } from 'express';

export default class HealthCheckController {
  /**
   * @param {Request} req The request object containing all of the data sent to us by the client.
   * @param {Response} res The response object used for sending data back to the client.
   */
  static index(req: Request, res: Response): Response {
    return res.json({
      api: process.env.APP_NAME,
      health: 'healthy'
    }).send();
  }
}
