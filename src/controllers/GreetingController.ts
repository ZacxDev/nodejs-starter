import { Request, Response } from 'express';
import GreetingService from 'Services/GreetingService';

export default class GreetingController {
  /**
   * @param {Request} req The request object containing all of the data sent to us by the client.
   * @param {Response} res The response object used for sending data back to the client.
   */
  static async greeting(req: Request, res: Response): Promise<Response> {
    const { name } = req.query;
    const greetingService = new GreetingService;
    const message = await greetingService.createGreeting(name);
    return res.status(200).send(message);
  }
}
