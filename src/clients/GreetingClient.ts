import fetch, { RequestInit, Response } from 'node-fetch';

const {
  GREETING_API_ENDPOINT
} = process.env;

type GreetingResponse = { greeting: string }
export default class GreetingClient {
  private baseUrl: string = GREETING_API_ENDPOINT as string;

  async getGreeting(): Promise<string> {
    const greetingResponse: GreetingResponse  = await this.makeAuthenticatedRequest('/random-greeting').then(res => res.json());
    const { greeting } = greetingResponse;
    return greeting;
  }

  private async makeAuthenticatedRequest(endpoint: string, options?: RequestInit): Promise<Response> {
    return fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        ...options?.headers,
        'authorization': 'my-secret'
      }
    });
  }
}
