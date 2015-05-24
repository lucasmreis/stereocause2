import config from './config';
import Hapi from 'hapi';
import Good from 'good';
import GoodConsole from 'good-console';

import statsRoute from './routes/stats';
import contributeRoute from './routes/contribute';
import myStereoCauseRoute from './routes/my-stereo-cause';

var server = new Hapi.Server();

server.connection({ port: config.port });

// ROUTES
server.route(statsRoute);
server.route(contributeRoute);
server.route(myStereoCauseRoute);

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
      server.log('info', 'Environment: ' + config.env);
    });
  }
});

export default server;