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
    cvc: ['cvc'],
    errors: ['errors'],
    numberError: ['errors', 'number'],
    expMonthError: ['errors', 'exp_month'],
    expYearError: ['errors', 'exp_year'],
    cvcError: ['errors', 'cvc'],
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

  expOrCvcErrors: function(e) {
    return this.cursors.expMonthError.get() ||
      this.cursors.expYearError.get() ||
      this.cursors.cvcError.get();
  },

  errorClass: function(classes, firstError, secondError) {
    return [classes,
      firstError ? " input-error" : "",
      secondError ? " input-error" : ""].join("");
  },

  render: function() {
    return <div className="btn-value-container">
      <span className="input-container">
        <input defaultValue={ formatNumber(this.cursors.number.get()) }
          onBlur={ this.updateNumber }
          value={ this.state.number }
          onChange={ this.changeNumber }
          className={ this.errorClass("input-sc input-large input-with-icon input-card",
            this.cursors.numberError.get()) }
          placeholder="Your Credit Card Number" />
        <i className="fa fa-credit-card fa-lg icon-input-with-padding"></i>
      </span>

      { this.cursors.numberError.get() ?
        <p className="message-error">{ this.cursors.numberError.get() }</p> :
        undefined }

      <span className="input-container">
        <input defaultValue={ formatExpiry(this.cursors.expiry.get()) }
          onBlur={ this.updateExpiry }
          value={ this.state.expiry }
          onChange={ this.changeExpiry }
          className={ this.errorClass("input-sc input-with-icon input-expiry",
            this.cursors.expMonthError.get(),
            this.cursors.expYearError.get()) }
          placeholder="Expiration" />
        <i className="fa fa-calendar-o fa-lg icon-input-with-padding"></i>
      </span>

      <span className="input-container">
        <input defaultValue={ this.cursors.cvc.get() }
          onBlur={ this.updateCvc }
          onChange={ this.clearErrors }
          className={ this.errorClass("input-sc input-with-icon input-cvc",
            this.cursors.cvcError.get()) }
          placeholder="Security Code" />
        <i className="fa fa-lock fa-lg icon-input-with-padding"></i>
      </span>

      { this.expOrCvcErrors(this.cursors.errors.get()) ?
        <p className="message-error">{ this.expOrCvcErrors() }</p> :
        undefined }
    </div>
  }
});

export default CreditCard;