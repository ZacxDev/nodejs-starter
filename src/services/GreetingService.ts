export default class GreetingService {
  /**
   * @param {string} name The name of the person we would like to greet.
   */
  createGreeting(name?: string): string {
    const greeting = `Hello, ${name || 'there'}!`;
    return greeting;
  }
}
