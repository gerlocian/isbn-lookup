import { BaseRoute } from '../routes/base/base.route';
import { HttpMethod } from '../types/http-method.type';

export class RouteCollection extends Array {
    constructor(items?: BaseRoute[]) {
        super();
        items && this.addItems(items);
    }

    public serialize(items: BaseRoute[]): void {
        this.splice(0, this.length);
        this.addItems(items);
    }

    public findRoute(url: string, method: string | HttpMethod): BaseRoute {
        return this.find((route: BaseRoute) => route.matchesPath(url) && route.matchesHttpMethod(method as HttpMethod));
    }

    private addItems(items: BaseRoute[]): void {
        items.forEach((item: BaseRoute) => this.push(item));
    }
}
