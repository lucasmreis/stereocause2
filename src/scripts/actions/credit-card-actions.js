const set = prop => state => v => state.set(prop, v);

export const updateNumber = set('number');
export const updateExpiry = set('expiry');
export const updateCvc    = set('cvc');