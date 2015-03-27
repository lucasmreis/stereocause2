import React from 'react';
import State from '../state';

import {requestStripe} from '../lib/helpers';

var contribute = (x, y) => console.log('STRIPE TOKEN', x, y);

var Submit = React.createClass({
  mixins: [State.mixin],
  cursor: ['submitCaption'],

  contribute: () => Stripe.card.createToken(requestStripe(State.get()), contribute),

  render: function() {
    return <a className="submit-btn"
              onClick={ this.contribute }>{ this.state.cursor }</a>
  }
});

export default Submit;