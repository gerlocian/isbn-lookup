import { IncomingMessage, ServerResponse } from 'http';
import { HttpMethod } from '../types';
import { ActiveCheckRoute } from './active-check.route';
import chai from 'chai';
import sinon from 'sinon';
import sinonchai from 'sinon-chai';
const expect = chai.expect;
chai.use(sinonchai);

describe('ActiveCheckRoute', () => {
    let route: ActiveCheckRoute;
    let mockIncomingMessage: IncomingMessage;
    let mockServerResponse: ServerResponse;

    beforeEach(() => {
        route = new ActiveCheckRoute();
        mockIncomingMessage = Object.assign({}, IncomingMessage.prototype);
        mockServerResponse = Object.assign({}, ServerResponse.prototype, { write: sinon.spy() });
    });

    it('should exist', () => {
        expect(route).to.exist;
    });

    it('should be selected if the path and method are provided', () => {
        const hasPath = route.matchesPath('/check');
        const hasHttpMethod = route.matchesHttpMethod(HttpMethod.Get);
        expect(hasPath && hasHttpMethod).to.equal(true);
    });

    it('should not be selected if the httpmethod is not correct', () => {
        const hasPath = route.matchesPath('/check');
        const hasHttpMethod = route.matchesHttpMethod(HttpMethod.Delete);
        expect(hasPath && hasHttpMethod).to.equal(false);
    });

    it('should not be selected if the path is not correct', () => {
        const hasPath = route.matchesPath('/wrong');
        const hasHttpMethod = route.matchesHttpMethod(HttpMethod.Get);
        expect(hasPath && hasHttpMethod).to.equal(false);
    });

    it('should set the proper http response code when handled', () => {
        route.handle(mockIncomingMessage, mockServerResponse);
        expect(mockServerResponse.statusCode).to.be.a('number').and.equal(200);
    });

    it('should call the write method on the ServerResponse', () => {
        route.handle(mockIncomingMessage, mockServerResponse);
        expect(mockServerResponse.write).to.have.been.calledWith('OK');
    });
});