import { IncomingMessage, ServerResponse } from 'http';
import { HttpMethod } from './http-method.type';

export interface RouteInterface {
    matchesPath: (path: string) => boolean;
    matchesHttpMethod: (httpMethod: HttpMethod) => boolean;
    handle: (request: IncomingMessage, response: ServerResponse) => ServerResponse;
}
