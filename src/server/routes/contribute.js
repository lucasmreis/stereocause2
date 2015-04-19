import R from 'ramda';
import Mongo from 'mongodb';

import config from '../config';
import Stripe from 'stripe';

import Joi from 'joi';

const {compose, composeP, prop, assoc} = R;
import {getDb, insertObj, closeDb} from '../mongo-wrapper';

var MongoClient = Mongo.MongoClient;

const logIt = m => x => { console.log(m, x); return x; };

var Charges = Stripe(config.stripe.secretKey).charges;

const chargeStripe = payload => r => config.isTest ?
  Promise.resolve(assoc('stripeResult', 'STRIPE_TEST_OK', payload)) :
  new Promise((resolve, reject) =>
    Charges.create(r, (err, charge) =>
      err ?
        reject(err) :
        resolve(assoc('stripeResult', charge, payload))));

const createStripeRequest = p => ({
  amount: p.artist + p.charity + p.stereoCause,
  currency: 'usd',
  source: p.stripeToken,
  description: p.email
});

const insertMongo = r => composeP(
  //x => assoc('mongoResponse', x, r),
  closeDb,
  insertObj(r)('contributions'),
  getDb(config.mongo.uri)
  )(MongoClient);

const handler = (request, reply) => {
  const initial = compose(
    assoc('time', new Date()),
    prop('payload')
    )(request);

  const contribute = composeP(
    a => Promise.reject('bad'),
    logIt('CONTRIBUTION RESPONSE'),
    insertMongo,
    chargeStripe(initial),
    createStripeRequest);

  return contribute(initial)
    .then(x  => reply(x))
    .catch(e => reply(e).code(500));
};

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