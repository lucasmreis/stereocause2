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

const handler = (request, reply) => {
  const id = compose(
    prop('cause'),
    prop('params'));

  const q = compose(
    query,
    id);

  const onlyRequested = head;

  let response = composeP(
    reply,
    onlyRequested,
    closeDb,
    aggregate(q(request))('contributions'),
    getDb(config.mongo.uri));

  response(MongoClient);
};

export default {
  method: 'GET',
  path: '/api/stats/{cause}',
  handler: handler
}