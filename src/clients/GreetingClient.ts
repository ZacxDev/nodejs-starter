import fetch from 'node-fetch';

export class GreetingClient {
  async getGreeting(): Promise<string> {
    const { greeting } = await fetch('https://greeter.bold.ninja/random-greeting').then(response => response.json());
    return greeting;
  }
}
