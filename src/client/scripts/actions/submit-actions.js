import State from '../state';
import R from 'ramda';
import {requestStripe} from '../lib/helpers';

const composeP = R.composeP;

const cb = x => console.log(JSON.stringify(x, null, '  '));

const setValidating = () => State.set('submitCaption', 'Validating Card...');

const setDone = () => State.set('submitCaption', 'Contribute!');

const createToken = () => new Promise((resolve, reject) =>
  Stripe.card.createToken(
    requestStripe(State.get()),
    (err, ok) => resolve(err || ok)));

export const contribute = composeP(
  setDone,
  x => console.log('STRIPE', x),
  createToken,
  setValidating);
