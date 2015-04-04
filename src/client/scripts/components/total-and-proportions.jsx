import React from '../react';

import State from '../state';
import { money, valuesFromTotal, totalSelected, isCustomValue, isCustomizing, isSelected } from '../lib/helpers';

import DividingOptions from './dividing-options';

var TotalAndProportions = React.createClass({
  mixins: [State.mixin],
  cursor: ['total'],

  onClickTotal: v => () => State.set('total', { customizing: false, value: v }),

  onClickCustomize: () => State.select('total').set('customizing', true),

  onChangeCustomize: e => State.select('total').set('value', e.target.value * 100),

  onBlurCustomize: () => State.select('total').set('customizing', false),

  btnClass: total => v => defaultClass => isSelected(v)(total) ? defaultClass + ' btn-selected' : defaultClass,

  render: function() {
    return <div>
      <div className="btn-value-container">
        <button onClick={ this.onClickTotal(500) }
          type="button"
          className={ this.btnClass(this.state.cursor)(500)('btn btn-value') }>
          $5
        </button>
        <button onClick={ this.onClickTotal(1000) }
          type="button"
          className={ this.btnClass(this.state.cursor)(1000)('btn btn-value') }>
          $10
        </button>
        <button onClick={ this.onClickTotal(2000) }
          type="button"
          className={ this.btnClass(this.state.cursor)(2000)('btn btn-value') }>
          $20
        </button>
        <button onClick={ this.onClickTotal(5000) }
          type="button"
          className={ this.btnClass(this.state.cursor)(5000)('btn btn-value') }>
          $50
        </button>

        {
          !isCustomizing(this.state.cursor) ?
          <button onClick={ this.onClickCustomize }
            type="button"
            className={ this.btnClass(this.state.cursor)('customizing')('btn btn-customize') }>
            { isCustomValue(this.state.cursor) ? money(this.state.cursor.value) : 'Customize' }
          </button> : null
        }
        {
          isCustomizing(this.state.cursor) ?
          <input onChange={ this.onChangeCustomize }
            onBlur={ this.onBlurCustomize }
            type="text"
            className="input-sc"
            placeholder="type value here" /> : null
        }

        <DividingOptions />
      </div>

      <p className="form-text">
        <i className="fa fa-info-circle"></i> { money(valuesFromTotal(State.get()).artist) } to artists, { money(valuesFromTotal(State.get()).charity) } to charities and { money(valuesFromTotal(State.get()).stereoCause) } to Stereo Cause.
      </p>
    </div>
  }
});

export default TotalAndProportions;