import { IncomingMessage, ServerResponse } from 'http';
import { HttpMethod, RouteInterface } from '../types';
import { RegexPathService } from '../../regex/regex-path.service';

export abstract class BaseRoute implements RouteInterface {
    private regexPathService: RegexPathService;

    constructor(path?: string) {
        this.regexPathService = new RegexPathService(path || this['path']);
    }

    public matchesPath(path: string): boolean {
        return !!path.match(this.regexPathService.getPathRegex());
    }

    public matchesHttpMethod(httpMethod: HttpMethod): boolean {
        return httpMethod === this['httpMethod'];
    }

    public abstract handle(request: IncomingMessage, response: ServerResponse): ServerResponse;
}