// function test() {
//     return function (
//         target,
//         // propertyKey,
//         // descriptor,
//     ) {
//         console.log('target', target);
//         // console.log('propertyKey', propertyKey);
//         // console.log('descriptor', descriptor);
//         // return { method, path, handler: target };
//     }
// }
//
// @test()
// class HandleRoute {}




// import { IncomingMessage, ServerResponse } from 'http';
//
// type HttpCallback = (request: IncomingMessage, response: ServerResponse) => ServerResponse;
//
// interface Route {
//     path: RegExp;
//     params?: string[];
//     method?: (routeParams?: string[]) => HttpCallback;
// }
//
// const routes: Route[] = [
//     {
//         path: /^\/$/,
//         method: () => (request: IncomingMessage, response: ServerResponse) => {
//             response.end('home');
//             return response;
//         }
//     },
//     {
//         path: /^\/hello\/?$/,
//         method: () => (request: IncomingMessage, response: ServerResponse) => {
//             response.end('hello');
//             return response;
//         }
//     },
//     {
//         path: /^\/routeParam\/?$/,
//         method: () => (request: IncomingMessage, response: ServerResponse) => {
//             response.end('routeParam');
//             return response;
//         }
//     },
//     {
//         path: /^\/routeParam\/([^/]+?)\/?$/,
//         method: ([ id ]) => (request: IncomingMessage, response: ServerResponse) => {
//             response.end(`id was ${id}`);
//             return response;
//         }
//     }
// ];
//
// function response404(req: IncomingMessage, res: ServerResponse) {
//     res.statusCode = 404;
//     res.write('Not Found');
//     return res;
// }
//
// function createRouter(routes: Route[]): (path: string) => (req: IncomingMessage, res: ServerResponse) => ServerResponse {
//     return (path: string) => {
//         const foundRoute = routes.find((route: Route) => {
//             const found = path.match(route.path);
//             if (found) route.params = found.slice(1);
//             return found;
//         });
//
//         return foundRoute ? foundRoute.method(foundRoute.params) : response404;
//     };
// }
//
// const router = createRouter(routes);
// // router('/routeParam/1234');
// console.log(router('/'));
// console.log(router('/hello'));
// console.log(router('/goodbye'));
// console.log(router('/routeParam/:id'));
// console.log(router('/routeParam/1234'));
