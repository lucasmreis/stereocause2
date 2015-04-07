import config from './config';
import Hapi from 'hapi';
import Good from 'good';
import GoodConsole from 'good-console';

import statsRoute from './routes/stats';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var server = new Hapi.Server();

server.connection({ port: config.port });

// ROUTES
server.route(statsRoute);

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
}, err => {
  if (err) {
    throw err;
  }

  if (!module.parent) {
    server.start(function () {
      server.log('info', 'Server running at: ' + server.info.uri);
    });
  }
});

export default server;