import R from 'ramda';
import {valuesFromState} from './helpers';

const {concat} = R;

export const requestStats = id => ({
  method: 'GET',
  url: concat('api/stats/', id)
});

export const requestStripe = state => ({
  number: state.number.replace(/ /g, ''),
  cvc: state.cvc,
  exp_month: state.expiry.split('/')[0],
  exp_year: state.expiry.split('/')[1]
});

export const requestContribution = state => stripeResponse => ({
  method: 'POST',
  url: 'api/contribute',
  body: {
    email: state.email,
    cause: '1',
    artist: valuesFromState(state).artist,
    charity: valuesFromState(state).charity,
    stereoCause: valuesFromState(state).stereoCause,
    notifyMe: state.notifyMe,
    shareMyEmail: state.shareMyEmail,
    stripeToken: stripeResponse.id
  }
});