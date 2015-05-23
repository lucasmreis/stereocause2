import State from '../state';
import R from 'ramda';

import {requestStripe, requestContribution} from '../lib/requests';
import {apiSend} from '../lib/api-service';

import {getStats} from './stats-actions';

const {tap, composeP, compose, prop} = R;

const cb = x => console.log(JSON.stringify(x, null, '  '));

const setValidating = () => State.set('submitCaption', 'Validating Card...');

const setDone = () => State.set('submitCaption', 'Contribute!');

const createToken = () => new Promise((resolve, reject) =>
  Stripe.card.createToken(
    requestStripe(State.get()),
    (status, response) =>
      status === 200 ? resolve(response) : reject(response)));

export const contribute = () => composeP(
  setDone,
  tap(compose(
    getStats,
    x => ({ causeId: x }),
    prop('cause'))),
  x => { console.log('CONTRIBUTION RESPONSE', JSON.stringify(x, null, '  ')); return x; },
  apiSend,
  requestContribution(State.get()),
  createToken,
  setValidating)();
