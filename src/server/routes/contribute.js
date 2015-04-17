import Joi from 'joi';

function handler(request, reply) {
  return reply('oi');
}

export default {
  method: 'POST',
  path: '/api/contribute',
  config: {
    handler: handler,
    validate: {
      payload: {
        email: Joi.string().email().required(),
        cause: Joi.string().required(),
        artist: Joi.number().min(100).required(),
        charity: Joi.number().min(100).required(),
        stereoCause: Joi.number().min(100).required(),
        notifyMe: Joi.boolean(),
        shareMyEmail: Joi.boolean(),
        stripeToken: Joi.any().required()
      }
    }
  }
};