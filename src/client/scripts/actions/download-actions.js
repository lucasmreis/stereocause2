import R from 'ramda';
import State from '../state';

import {apiSend} from '../lib/api-service';
import {requestMyStereoCause} from '../lib/requests';

const {prop, composeP} = R;

export const getMyStereoCause = composeP(
  apiSend,
  requestMyStereoCause);
