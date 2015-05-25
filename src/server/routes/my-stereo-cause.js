import R from 'ramda';
import Mongo from 'mongodb';
import config from '../config';

import {getDb, findOne, closeDb} from '../mongo-wrapper';

const {composeP, head} = R;

var MongoClient = Mongo.MongoClient;
var ObjectId = Mongo.ObjectId;

const log = m => x => { console.log(m, x); return x; };

const buildQuery = req => ({
  '_id': new ObjectId(req.params.id),
  'email': req.params.email
});

const handler = (request, reply) => {
  const respond = x =>
    !x ?
      reply('Contribution not found.').code(404) :
      reply.file(config.file);

  const response = composeP(
    respond,
    closeDb,
    findOne(buildQuery(request))('contributions'),
    getDb(config.mongo.uri));

  return response(MongoClient);
};

export default {
  method: 'GET',
  path: '/my-stereo-cause/{email}/{id}/stereoCause.zip',
  handler: handler
};