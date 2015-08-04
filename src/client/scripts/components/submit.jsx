import React from '../react';
import State from '../state';

import * as SubmitActions from '../actions/submit-actions';

import {requestStripe, isLoading} from '../lib/helpers';

var Submit = React.createClass({
  mixins: [State.mixin],
  cursors: {
    submitCaption: ['submitCaption']
  },

  contribute: SubmitActions.contribute,

  submitClass: s => isLoading(s) ? "btn btn-submit btn-loading" : "btn btn-submit",

  isLoading: s => isLoading(s) ? <i className="fa fa-circle-o-notch fa-spin"></i> : null,

  render: function() {
    return <div>
      <button className={ this.submitClass(this.cursors.submitCaption.get()) }
        onClick={ this.contribute }>
        { this.cursors.submitCaption.get() } { this.isLoading(this.cursors.submitCaption.get()) }
      </button>
    </div>
  }
});

export default Submit;