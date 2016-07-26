var http = require("http");
var Promise = require("bluebird");

const DEFAULT_PORT = 6814;

var port = NaN;

if (process.argv.length === 3) {
    port = parseInt(process.argv[2]);
}

if (isNaN(port)) {
    port = DEFAULT_PORT
}

http.createServer(function(request, httpresponse) {
    console.log(request.method + " " + request.url);
    
    var body = "";
    request.on("data", function(chunk) {
        body += chunk;
    });

    request.on("end", Promise.coroutine(function*() {
        httpresponse.end();
    }));
}).listen(port);

console.log("Listening on port %d", port);
