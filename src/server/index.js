import Hapi from 'hapi';

var server = new Hapi.Server();

server.connection({ port: 8080 });

server.start(function() {
    console.log('Hapi server started @', server.info.uri);
});

// STATIS FILES
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
