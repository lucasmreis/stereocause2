export default {
  method: 'GET',

  path: '/api/stats/{cause}',

  handler: function (request, reply) {
    reply('Hello, world! Cause: ' + request.params.cause);
  }
}