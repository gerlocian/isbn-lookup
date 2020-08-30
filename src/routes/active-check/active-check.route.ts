import { IncomingMessage, ServerResponse } from 'http';
import { BaseRoute } from '../base/base.route';
import { Route } from '../decorators/route.decorator';
import { HttpMethod, RouteInterface } from '../types';

@Route(HttpMethod.Get, '/check')
export class ActiveCheckRoute extends BaseRoute implements RouteInterface {
    handle(request: IncomingMessage, response: ServerResponse): ServerResponse {
        response.statusCode = 200;
        response.write('OK');
        return response;
    }
}