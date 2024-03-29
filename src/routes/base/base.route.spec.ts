import { expect } from 'chai';
import { IncomingMessage, ServerResponse } from 'http';
import { HttpMethod } from '../../types/http-method.type';
import { Route } from '../../decorators/route.decorator';
import { BaseRoute } from './base.route';

describe('Base Route', () => {
    let testRoute: BaseRoute;

    beforeEach(() => {
        @Route(HttpMethod.Delete, '/path/for/endpoint/:id')
        class TestRoute extends BaseRoute {
            public handle(_: IncomingMessage, response: ServerResponse): ServerResponse {
                return response;
            }
        }

        testRoute = new TestRoute();
    });

    describe('matchesPath', () => {
        it('should exist', () => {
            expect(testRoute.matchesPath).to.exist;
        });

        it('should match a provided path against the provided route path', () => {
            const matchResult = testRoute.matchesPath('/path/for/endpoint/1234');
            expect(matchResult).to.be.a('boolean').and.equals(true);
        });

        it('should fail to match a provided path if it does not match the route path', () => {
            const matchResult = testRoute.matchesPath('/badPath');
            expect(matchResult).to.be.a('boolean').and.equals(false);
        });

        it('should fail to match on similar paths if they do not match', () => {
            const matchResult1 = testRoute.matchesPath('/path/for/endpoint');
            expect(matchResult1).to.be.a('boolean').and.equals(false);

            const matchResult2 = testRoute.matchesPath('/path/for/endpoint/1234/extra');
            expect(matchResult2).to.be.a('boolean').and.equals(false);
        });
    });

    describe('matchesHttpMethod', () => {
        it('should exist', () => {
            expect(testRoute.matchesHttpMethod).to.exist;
        });

        it('should match a provided http method against the provided route http method', () => {
            const matchResult = testRoute.matchesHttpMethod(HttpMethod.Delete);
            expect(matchResult).to.be.a('boolean').and.equals(true);
        });

        it('should fail to match a provided http method if it does not match the route http method', () => {
            const matchResult = testRoute.matchesHttpMethod(HttpMethod.Post);
            expect(matchResult).to.be.a('boolean').and.equals(false);
        });
    });
});
