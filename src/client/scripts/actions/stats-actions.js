import R from 'ramda';
import State from '../state';

import {send} from '../lib/api-service';
import {requestStats} from '../lib/requests';
import {change} from '../lib/state-helpers';

const composeP = R.composeP;
const prop = R.prop;

export const getStats = composeP(
  change('stats')(State),
  send,
  requestStats,
  prop('causeId'));
