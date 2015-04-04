import R from 'ramda';

const not = R.not;

export const updateEmail        = state => v => state.set('email', v);
export const updateNotifyMe     = state => () => state.select('notifyMe').apply(not);
export const updateShareMyEmail = state => () => state.select('shareMyEmail').apply(not);