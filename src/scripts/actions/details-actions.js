import State from '../state';

export const showDetails = id => {
  State.select('artistDetails').set('showing', true);
  State.select('artistDetails').set('current', id);
};