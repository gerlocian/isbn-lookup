import { IncomingMessage, ServerResponse } from 'http';
import { HttpMethod } from '../../types/http-method.type';
import { RouteInterface } from '../../types/route-interface.type';
import { URLPattern } from '../../types/url-pattern.type';

export abstract class BaseRoute implements RouteInterface {
    public matchesPath(path: string): boolean {
        const urlPattern = new URLPattern(new URL(this['path'], 'http://fulldomain'));
        return urlPattern.test(new URL(path, 'http://fulldomain'));
    }

    public matchesHttpMethod(httpMethod: HttpMethod): boolean {
        return httpMethod === this['httpMethod'];
    }

    public abstract handle(request: IncomingMessage, response: ServerResponse): ServerResponse;
}
