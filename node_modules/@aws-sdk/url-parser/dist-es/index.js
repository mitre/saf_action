import { parseQueryString } from "@aws-sdk/querystring-parser";
export var parseUrl = function (url) {
    if (typeof url === 'string') {
        return parseUrl(new URL(url));
    }
    var _a = url, hostname = _a.hostname, pathname = _a.pathname, port = _a.port, protocol = _a.protocol, search = _a.search;
    var query;
    if (search) {
        query = parseQueryString(search);
    }
    return {
        hostname: hostname,
        port: port ? parseInt(port) : undefined,
        protocol: protocol,
        path: pathname,
        query: query,
    };
};
