import React from 'react';
import State from '../state';

var CreditCard = React.createClass({
  mixins: [State.mixin],
  cursors: {
    number: ['number'],
    expiry: ['expiry'],
    cvc: ['cvc']
  },

  updateNumber: x => State.set('number', x.target.value),
  updateExpiry: x => State.set('expiry', x.target.value),
  updateCvc:    x => State.set('cvc', x.target.value),

  render: function() {
    return <div>
      <span className="input-container">
        <input value={ this.cursors.number.get() }
          onChange={ this.updateNumber }
          className="input-card"
          placeholder="Your Credit Card Number" />
        <i className="fa fa-credit-card fa-lg input-icon"></i>
      </span>

      <span className="input-container">
        <input value={ this.cursors.expiry.get() }
          onChange={ this.updateExpiry }
          className="input-expiry"
          placeholder="Expiration" />
        <i className="fa fa-calendar-o fa-lg input-icon"></i>
      </span>

      <span className="input-container">
        <input value={ this.cursors.cvc.get() }
          onChange={ this.updateCvc }
          className="input-cvc"
          placeholder="Security Code" />
        <i className="fa fa-lock fa-lg input-icon"></i>
      </span>
    </div>
  }
});

export default CreditCard;