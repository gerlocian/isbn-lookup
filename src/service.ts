import { createServer, IncomingMessage, ServerResponse } from 'http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseRoute } from './routes/base/base.route';
import { HttpMethod } from './routes/types';
import { routes } from './routes/routes';

const doesRouteMatchPath = (route: BaseRoute, req: IncomingMessage) => route.matchesPath(req.url) && route.matchesHttpMethod(req.method as HttpMethod);
const findRoute = (routes: BaseRoute[], req: IncomingMessage) => routes.find((route: BaseRoute) => doesRouteMatchPath(route, req));

const subject$ = new Subject<{ req: IncomingMessage, res: ServerResponse }>();
const server = createServer();

server.on('request', (req: IncomingMessage, res: ServerResponse) => subject$.next({ req, res }));
server.listen(3000, 'localhost', () => { console.log('started...') });

subject$
    .pipe(
        map(({ req, res }: { req: IncomingMessage, res: ServerResponse }) => findRoute(routes, req)?.handle(req, res) || res)
    )
    .subscribe((res: ServerResponse) => res.end());
