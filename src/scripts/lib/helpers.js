export var valuesFromTotal = state => {
  var artist =
    Math.floor(state.total.value * state.dividing.artist);
  var stereoCause =
    Math.floor(state.total.value * state.dividing.stereoCause);
  var charity =
    state.total.value - artist - stereoCause;
  return {artist, charity, stereoCause};
};

export var money = x => {
  const m = x / 100;
  return '$' + m.toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, '$&,');
};

export const targetValue = f => x => f(x.target.value);

export const requestStripe = state => {
  return {
    number: state.number.replace(' ', ''),
    cvc: state.cvc,
    exp_month: state.expiry.split('/')[0],
    exp_year: state.expiry.split('/')[1]
  };
};

export const formatNumber = n => n.replace(/[^0-9]/g, '').replace(/(\d{4}\s*)/g, x => x.match(/\s/) ? x : x + ' ');

export const formatExpiry = e => e.replace(/[^0-9]/g, '').replace(/(\d{2}\s*)/g, x => x.match(/\s/) ? x : x + '/').substring(0, 5);