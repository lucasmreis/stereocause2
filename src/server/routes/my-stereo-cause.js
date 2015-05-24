export default {
  method: 'GET',
  path: '/my-stereo-cause/{email}/{id}',
  handler: (request, reply) => {
    return reply(`My Stereo Cause: ${request.params.email} and ${request.params.id}.`);
  }
};