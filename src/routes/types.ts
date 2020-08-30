import { IncomingMessage, ServerResponse } from 'http';

export enum HttpMethod {
    Delete = 'DELETE',
    Get = 'GET',
    Post = 'POST',
    Put = 'PUT',
}

export interface RouteInterface {
    matchesPath: (path: string) => boolean;
    matchesHttpMethod: (httpMethod: HttpMethod) => boolean;
    handle: (request: IncomingMessage, response: ServerResponse) => ServerResponse;
}