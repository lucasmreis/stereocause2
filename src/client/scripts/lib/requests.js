import R from 'ramda';

const concat = R.concat;

export const requestStats = id => ({
  method: 'GET',
  url: concat('api/stats/', id)
});