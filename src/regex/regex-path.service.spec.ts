import { expect } from 'chai';
import { RegexPathService } from './regex-path.service';

describe('RegexPathService', () => {
    let service: RegexPathService;

    afterEach(() => { service = undefined; });

    it('should exist', () => {
        service = new RegexPathService('/path');
        expect(service).to.exist;
    });

    describe('getRegexPath', () => {
        it('should exist', () => {
            service = new RegexPathService('/path');
            expect(service.getPathRegex).to.be.a('function');
        });

        describe('should return the regex for the provided paths', () => {
            it('/path', () => {
                service = new RegexPathService('/path');
                expect(service.getPathRegex()).to.eql(/\/path/);
            });

            it('/test/multinode', () => {
                service = new RegexPathService('/test/multinode');
                expect(service.getPathRegex()).to.eql(/\/test\/multinode/);
            });

            it('/param/:id', () => {
                service = new RegexPathService('/param/:id');
                expect(service.getPathRegex()).to.eql(/\/param\/(?<id>[a-z0-9-_]+)/);
            });

            it('/one/:one/two/:two', () => {
                service = new RegexPathService('/one/:one/two/:two');
                expect(service.getPathRegex()).to.eql(/\/one\/(?<one>[a-z0-9-_]+)\/two\/(?<two>[a-z0-9-_]+)/);
            });
        });
    });
});