import R from 'ramda';
import React from '../react';

import State from '../state';
import { money, valuesFromTotal } from '../lib/helpers';

var ifElse = R.ifElse;
var compose = R.compose;
var cond = R.cond;
var prop = R.prop;
var K = R.always;
var eq = R.eq;
var T = R.T;

var isControlFreak = s => s.showing.get() === 'controlFreak';
var isArtist       = s => { const d = s.dividing.get(); return d.artist === 0.6 && d.stereoCause === 0.2; };
var isCharity      = s => { const d = s.dividing.get(); return d.artist === 0.2 && d.stereoCause === 0.2; };
var isStereoCause  = s => { const d = s.dividing.get(); return d.artist === 0.2 && d.stereoCause === 0.6; };

var proportionSelected = cond(
  [isControlFreak, K('controlFreak')],
  [isArtist,       K('artist')],
  [isCharity,      K('charity')],
  [isStereoCause,  K('stereoCause')],
  [T,              K('equal')]);

var setControlFreak = () => {
  State.set('values', valuesFromTotal(State.get()));
  State.set('showing', 'controlFreak');
};

var setDividing = compose(
  () => State.set('showing', 'regular'),
  x  => State.set('dividing', x),
  cond(
    [eq('artist'),      K({ artist: 0.6, stereoCause: 0.2})],
    [eq('charity'),     K({ artist: 0.2, stereoCause: 0.2})],
    [eq('stereoCause'), K({ artist: 0.2, stereoCause: 0.6})],
    [eq('equal'),       K({ artist: 1/3, stereoCause: 1/3})]));

var setProportions = compose(
  ifElse(
    eq('controlFreak'),
      setControlFreak,
      setDividing),
  prop('value'),
  prop('target'));

var DividingOptions = React.createClass({
  mixins: [State.mixin],
  cursors: {
    showing: ['showing'],
    dividing: ['dividing'],
  },

  onChangeProportions: setProportions,

  render: function() {
    return <span className="select-container">
      <select className="select-form"
              value={ proportionSelected(this.cursors) }
              onChange={ this.onChangeProportions }>
        <option value="equal">In equal parts</option>
        <option value="artist">Giving more to Artists</option>
        <option value="charity">Giving more to Charities</option>
        <option value="stereoCause">Giving more to StereoCause</option>
        <option value="controlFreak">{ "I'm a Control Freak!" }</option>
      </select>
      <i className="fa fa-chevron-down fa-lg icon-select"></i>
    </span>
  }
});

export default DividingOptions;