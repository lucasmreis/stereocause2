import Hapi from 'hapi';
import Good from 'good';
import GoodConsole from 'good-console';

var server = new Hapi.Server();

server.connection({ port: 8080 });

// STATIC FILES
server.route({
    path: '/{path*}',
    method: 'GET',
    handler: {
      directory: {
        path: "../client",
        listing: false,
        index: true
      }
    }
});

server.register({
    register: Good,
    options: {
        reporters: [{
            reporter: GoodConsole,
            args:[{ log: '*', response: '*' }]
        }]
    }
}, function (err) {
    if (err) {
        throw err; // something bad happened loading the plugin
    }

    server.start(function () {
        server.log('info', 'Server running at: ' + server.info.uri);
    });
});