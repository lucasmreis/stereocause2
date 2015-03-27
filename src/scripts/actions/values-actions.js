import R from 'ramda';

const max = R.max;

const values = state => state.select('values').get();

export const updateArtist = state => x => {
  const newValue = Math.floor(x * 100);
  const oldValues = state.select('values').get();
  state.select('values').set('artist', newValue);
  state.select('total').set('value', newValue + oldValues.charity + oldValues.stereoCause);
  return (newValue / 100).toFixed(2).toString();
}

export const updateCharity = state => x => {
  const newValue = Math.floor(x * 100);
  const oldValues = state.select('values').get();
  state.select('values').set('charity', newValue);
  state.select('total').set('value', newValue + oldValues.artist + oldValues.stereoCause);
  return newValue / 100;
}

export const updateStereoCause = state => x => {
  const newValue = Math.floor(x * 100);
  const oldValues = state.select('values').get();
  state.select('values').set('stereoCause', newValue);
  state.select('total').set('value', newValue + oldValues.artist + oldValues.charity);
  return newValue / 100;
}