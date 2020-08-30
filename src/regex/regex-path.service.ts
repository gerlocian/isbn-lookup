const REPLACEMENT_REGEX = '(?<tag>[a-z0-9-_]+)';
const ROUTE_PARAM_REGEX = /\:([a-z0-9-_]+)/g;

export class RegexPathService {
    private pathRegex: RegExp;

    public constructor(path: string) {
        this.pathRegex = this.convertSearchPathToRegex(path);
    }

    public getPathRegex(): RegExp {
        return this.pathRegex;
    }

    private convertSearchPathToRegex(path: string): RegExp {
        let regexPath = path.replace(/\//g, '\\/');
        const matches = path.match(ROUTE_PARAM_REGEX);

        if (Array.isArray(matches)) {
            matches.forEach((match: string) => {
                const replacement = REPLACEMENT_REGEX.replace('tag', match.substr(1));
                regexPath = regexPath.replace(match, replacement);
            });
        }

        return RegExp(regexPath);
    }
}