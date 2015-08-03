import React from '../react';
import State from '../state';

import Input from './input';

import * as CreditCardActions from '../actions/credit-card-actions';

import {formatNumber, formatExpiry} from '../lib/helpers';

const targetValue = f => x => f(x.target.value);

var CreditCard = React.createClass({
  mixins: [State.mixin],
  cursors: {
    number: ['number'],
    expiry: ['expiry'],
    cvc: ['cvc']
  },

  clearErrors: () => State.set('errors', {}),

  updateNumber: targetValue(CreditCardActions.updateNumber(State)),
  updateExpiry: targetValue(CreditCardActions.updateExpiry(State)),
  updateCvc:    targetValue(CreditCardActions.updateCvc(State)),

  changeNumber: function(x) {
    this.setState({ number: formatNumber(x.target.value) });
    this.clearErrors();
  },
  changeExpiry: function(x) {
    this.setState({ expiry: formatExpiry(x.target.value) });
    this.clearErrors();
  },

  render: function() {
    return <div className="btn-value-container">
      <span className="input-container">
        <input defaultValue={ formatNumber(this.cursors.number.get()) }
          onBlur={ this.updateNumber }
          value={ this.state.number }
          onChange={ this.changeNumber }
          className="input-sc input-large input-with-icon input-card"
          placeholder="Your Credit Card Number" />
        <i className="fa fa-credit-card fa-lg icon-input-with-padding"></i>
      </span>

      <span className="input-container">
        <input defaultValue={ formatExpiry(this.cursors.expiry.get()) }
          onBlur={ this.updateExpiry }
          value={ this.state.expiry }
          onChange={ this.changeExpiry }
          className="input-sc input-with-icon input-expiry"
          placeholder="Expiration" />
        <i className="fa fa-calendar-o fa-lg icon-input-with-padding"></i>
      </span>

      <span className="input-container">
        <input defaultValue={ this.cursors.cvc.get() }
          onBlur={ this.updateCvc }
          onChange={ this.clearErrors }
          className="input-sc input-with-icon input-cvc"
          placeholder="Security Code" />
        <i className="fa fa-lock fa-lg icon-input-with-padding"></i>
      </span>
    </div>
  }
});

export default CreditCard;