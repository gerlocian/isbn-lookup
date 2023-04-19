import { IncomingMessage, ServerResponse } from 'http';
import { BaseRoute } from '../base/base.route';
import { Route } from '../../decorators/route.decorator';
import { HttpMethod } from '../../types/http-method.type';
import { RouteInterface } from '../../types/route-interface.type';

// @Route(HttpMethod.Get, '/isbn')
// export class IsbnRoute
