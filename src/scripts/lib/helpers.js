var valuesFromTotal = state => {
  var artist = 
    Math.floor(state.total.value * state.dividing.artist);
  var stereoCause = 
    Math.floor(state.total.value * state.dividing.stereoCause);
  var charity =
    state.total.value - artist - stereoCause;
  return {artist, charity, stereoCause};
};

export { valuesFromTotal };