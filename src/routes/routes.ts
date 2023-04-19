import { ActiveCheckRoutes } from './active-check/active-check.route';
import { RouteCollection } from '../types/route-collection.type';

export const routes: RouteCollection = new RouteCollection([
    ...ActiveCheckRoutes
]);
