import { GreetingClient } from 'Clients/GreetingClient';

export default class GreetingService {
  /**
   * @param {string} name The name of the person we would like to greet.
   */
  async createGreeting(name?: string): Promise<string> {
    const greetingClient = new GreetingClient;
    const greeting = await greetingClient.getGreeting();
    const greetingMessage = `${greeting}, ${name || 'there'}!`;
    return greetingMessage;
  }
}
