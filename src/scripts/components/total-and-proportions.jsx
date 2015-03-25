import R from 'ramda';
import React from 'react';

import State from '../state';
import { money, valuesFromTotal } from '../lib/helpers';

import DividingOptions from './dividing-options';

var compose = R.compose;
var propEq = R.propEq;
var cond = R.cond;
var prop = R.prop;
var K = R.always;
var eq = R.eq;
var T = R.T;

var totalSelected = cond(
    [propEq('value', 500),  K(500)],
    [propEq('value', 1000), K(1000)],
    [propEq('value', 2000), K(2000)],
    [propEq('value', 5000), K(5000)],
    [T, K('customizing')]);

var isCustomValue = compose(eq('customizing'), totalSelected);

var isCustomizing = prop('customizing');

var TotalAndProportions = React.createClass({
  mixins: [State.mixin],
  cursor: ['total'],

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
        !isCustomizing(this.state.cursor) ?
        <button onClick={ this.onClickCustomize }
          type="button"
          className="btn-customize">
          { isCustomValue(this.state.cursor) ? money(this.state.cursor.value) : 'Customize' }
        </button> : null
      }
      {
        isCustomizing(this.state.cursor) ?
        <input onChange={ this.onChangeCustomize }
          onBlur={ this.onBlurCustomize }
          type="text"
          placeholder="type value here" /> : null
      }

      <DividingOptions />

      <p>
        <i className="fa fa-info-circle"></i>
        { money(valuesFromTotal(State.get()).artist) } to artists, { money(valuesFromTotal(State.get()).charity) } to charities and { money(valuesFromTotal(State.get()).stereoCause) } to Stereo Cause.
      </p>
    </div>
  }
});

export default TotalAndProportions;