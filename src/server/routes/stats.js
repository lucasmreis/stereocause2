import R from 'ramda';
import Mongo from 'mongodb';
import config from '../config';

import {getDb, aggregate, closeDb} from '../mongo-wrapper';

const compose = R.compose;
const composeP = R.composeP;
const concat = R.concat;
const head = R.head;
const prop = R.prop;
const K = R.always;
const log = m => x => { console.log(m, x); return x; };

var MongoClient = Mongo.MongoClient;

const query = c => [
  {
    $match: { cause: c }
  },
  {
    $group: {
      _id: '$cause',
      sumArtist: { $sum: '$artist' },
      sumCharity: { $sum: '$charity' },
      sumStereoCause: { $sum: '$stereoCause' },
      count: { $sum: 1  }
    }
  }];

const buildQuery = compose(
  query,
  prop('cause'),
  prop('params'))

const handler = (request, reply) => {
  const respond = x =>
    x ? reply(x) : reply('Cause not found.').code(404);

  const response = composeP(
    respond,
    head,
    closeDb,
    aggregate(buildQuery(request))('contributions'),
    getDb(config.mongo.uri));

  return response(MongoClient);
};

export default {
  method: 'GET',
  path: '/api/stats/{cause}',
  handler: handler
}