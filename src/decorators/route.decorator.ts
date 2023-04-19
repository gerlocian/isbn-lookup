import { HttpMethod } from '../types/http-method.type';

export function Route(httpMethod: HttpMethod, path: string): (target: Function) => void {
    return function(target: Function): void {
        Object.defineProperty(target.prototype, 'httpMethod', { value: httpMethod, configurable: false, writable: false });
        Object.defineProperty(target.prototype, 'path', { value: path, configurable: false, writable: false });
    }
}
