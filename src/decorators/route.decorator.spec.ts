import { expect } from 'chai';
import { Route } from './route.decorator';
import { HttpMethod } from '../types/http-method.type';

describe('@Route decorator', () => {
    let decoratedObject;

    beforeEach(() => {
        decoratedObject = new TestRoute();
    });

    describe('decorated class httpMethod', () => {
        it('should exist', () => {
            expect(decoratedObject.getHttpMethod()).to.exist;
        });

        it('should have the value provided by the decorator', () => {
            expect(decoratedObject.getHttpMethod()).to.equal(HttpMethod.Get);
        });
    });

    describe('decorated class path', () => {
        it('should exist', () => {
            expect(decoratedObject.getPath()).to.exist;
        });

        it('should have the value provided by the decorator', () => {
            expect(decoratedObject.getPath()).to.equal('/path/to/examine');
        });
    });
});

abstract class TestBaseRoute {
    public getHttpMethod(): HttpMethod {
        return this['httpMethod'] as HttpMethod;
    }

    public getPath(): string {
        return this['path'] as string;
    }
}

@Route(HttpMethod.Get, '/path/to/examine')
class TestRoute extends TestBaseRoute { }
