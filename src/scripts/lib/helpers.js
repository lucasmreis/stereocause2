var valuesFromTotal = state => {
  var artist =
    Math.floor(state.total.value * state.dividing.artist);
  var stereoCause =
    Math.floor(state.total.value * state.dividing.stereoCause);
  var charity =
    state.total.value - artist - stereoCause;
  return {artist, charity, stereoCause};
};

var money = x => {
  const m = x / 100;
  return '$' + m.toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, '$&,');
};

export { money, valuesFromTotal };