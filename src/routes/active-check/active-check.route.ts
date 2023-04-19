import { IncomingMessage, ServerResponse } from 'http';
import { BaseRoute } from '../base/base.route';
import { Route } from '../../decorators/route.decorator';
import { HttpMethod } from '../../types/http-method.type';
import { RouteInterface } from '../../types/route-interface.type';
import { RouteCollection } from '../../types/route-collection.type';

@Route(HttpMethod.Get, '/check')
class ActiveCheckRoute extends BaseRoute implements RouteInterface {
    handle(_: IncomingMessage, response: ServerResponse): ServerResponse {
        response.statusCode = 200;
        response.write('OK');
        return response;
    }
}

export const ActiveCheckRoutes: RouteCollection = new RouteCollection([
    new ActiveCheckRoute(),
]);
