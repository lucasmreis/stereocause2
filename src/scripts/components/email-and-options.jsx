import R from 'ramda';
import React from 'react';
import State from '../state';

const not = R.not;

var EmailAndOptions = React.createClass({
  mixins: [State.mixin],
  cursors: {
    email: ['email'],
    notifyMe: ['notifyMe'],
    shareMyEmail: ['shareMyEmail']
  },

  updateEmail:        e => State.set('email', e.target.value),
  updateNotifyMe:     e => State.select('notifyMe').apply(not),
  updateShareMyEmail: e => State.select('shareMyEmail').apply(not),

  render: function() {
    return <div>
      <span className="input-container">
        <input value={ this.cursors.email.get() }
          onChange={ this.updateEmail }
          type="email" 
          className="input-email"
          placeholder="Your Email Address" />
        <i className="fa fa-envelope-o fa-lg input-icon"></i>
      </span>

      <p>
        <input checked={ this.cursors.notifyMe.get() }
          onChange={ this.updateNotifyMe }
          type="checkbox" 
          className="input-checkbox" />
        Yes, notify me of new artists and causes.
      </p>

      <p>
        <input checked={ this.cursors.shareMyEmail.get() }
          onChange={ this.updateShareMyEmail }
          type="checkbox" 
          className="input-checkbox" />
        Yes, share my email with artists and causes.
      </p>
    </div>
  }
});

export default EmailAndOptions;