import { createServer, IncomingMessage, ServerResponse } from 'http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { routes } from './routes/routes';

const subject$ = new Subject<{ req: IncomingMessage, res: ServerResponse }>();
const server = createServer();

server.on('request', (req: IncomingMessage, res: ServerResponse) => subject$.next({ req, res }));
server.listen(3000, 'localhost', () => { console.log('started...') });

subject$
    .pipe(map(({ req, res }: { req: IncomingMessage, res: ServerResponse }) => routes.findRoute(req.url, req.method)?.handle(req, res) || res))
    .subscribe((res: ServerResponse) => res.end());
