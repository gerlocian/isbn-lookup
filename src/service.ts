import { createServer, IncomingMessage, ServerResponse } from 'http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { routes } from './routes/routes'; //TODO: Work with routes.

const subject$ = new Subject<{req: IncomingMessage, res: ServerResponse}>();
const server = createServer();

server.on('request', (req: IncomingMessage, res: ServerResponse) => subject$.next({req, res}));
server.listen(4200, 'localhost', () => {console.log('started...')});

subject$
    .pipe(map(({ req, res }: { req: IncomingMessage, res: ServerResponse }) => res))
    .subscribe((res: ServerResponse) => res.end());