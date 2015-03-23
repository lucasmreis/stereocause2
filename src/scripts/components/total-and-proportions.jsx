import R from 'ramda';
import React from 'react';

import State from '../state';
import { money, valuesFromTotal } from '../lib/helpers';

var compose = R.compose;
var ifElse = R.ifElse;
var propEq = R.propEq;
var cond = R.cond;
var prop = R.prop;
var K = R.always;
var eq = R.eq;
var T = R.T;

// TOTAL HELPERS

var totalSelected = cond(
    [propEq('value', 500),  K(500)],
    [propEq('value', 1000), K(1000)],
    [propEq('value', 2000), K(2000)],
    [propEq('value', 5000), K(5000)],
    [T, K('customizing')]);

var isCustomValue = compose(eq('customizing'), totalSelected);

var isCustomizing = prop('customizing');

// PROPORTION HELPERS

var isArtist      = d => d.artist === 0.6 && d.stereoCause === 0.2;
var isCharity     = d => d.artist === 0.2 && d.stereoCause === 0.2;
var isStereoCause = d => d.artist === 0.2 && d.stereoCause === 0.6;

var proportionSelected = cond(
  [isArtist, K('artist')],
  [isCharity, K('charity')],
  [isStereoCause, K('stereoCause')],
  [T, K('equal')]);

var setControlFreak = () => {
  State.set('values', valuesFromTotal(State.get()));
  State.set('showing', 'controlFreak');
};

var setDividing = compose(
  x => State.set('dividing', x),
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

// REACT CLASS

var TotalAndProportions = React.createClass({
  mixins: [State.mixin],
  cursors: {
    total: ['total'],
    dividing: ['dividing']},

  onChangeProportions: setProportions,

  onClickTotal: v => () => State.set('total', { customizing: false, value: v }),

  onClickCustomize: () => State.select('total').set('customizing', true),

  onChangeCustomize: e => State.select('total').set('value', e.target.value * 100),

  onBlurCustomize: () => State.select('total').set('customizing', false),

  render: function() {
    return <div>
      <button onClick={ this.onClickTotal(500) }
        type="button"
        className="btn-value">
        $5
      </button>
      <button onClick={ this.onClickTotal(1000) }
        type="button"
        className="btn-value">
        $10
      </button>
      <button onClick={ this.onClickTotal(2000) }
        type="button"
        className="btn-value">
        $20
      </button>
      <button onClick={ this.onClickTotal(5000) }
        type="button"
        className="btn-value">
        $50
      </button>

      {
        !isCustomizing(this.cursors.total.get()) ?
        <button onClick={ this.onClickCustomize }
          type="button"
          className="btn-customize">
          { isCustomValue(this.cursors.total.get()) ? money(this.cursors.total.get().value) : 'Customize' }
        </button> : null
      }
      {
        isCustomizing(this.cursors.total.get()) ?
        <input onChange={ this.onChangeCustomize }
          onBlur={ this.onBlurCustomize }
          type="text"
          placeholder="type value here" /> : null
      }

      <span className="select-container">
        <select className="select-proportion"
                value={ proportionSelected(this.cursors.dividing.get()) }
                onChange={ this.onChangeProportions }>
          <option value="equal">In equal parts</option>
          <option value="artist">Giving more to Artists</option>
          <option value="charity">Giving more to Charities</option>
          <option value="stereoCause">Giving more to StereoCause</option>
          <option value="controlFreak">{ "I'm a Control Freak!" }</option>
        </select>
        <i className="fa fa-chevron-down fa-lg select-icon"></i>
      </span>

      <p>
        <i className="fa fa-info-circle"></i>
        { money(valuesFromTotal(State.get()).artist) } to artists, { money(valuesFromTotal(State.get()).charity) } to charities and { money(valuesFromTotal(State.get()).stereoCause) } to Stereo Cause.
      </p>
    </div>
  }
});

export default TotalAndProportions;