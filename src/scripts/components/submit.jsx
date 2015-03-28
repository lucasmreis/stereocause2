import React from 'react';
import State from '../state';

import * as SubmitActions from '../actions/submit-actions';

import {requestStripe, isLoading} from '../lib/helpers';

var Submit = React.createClass({
  mixins: [State.mixin],
  cursor: ['submitCaption'],

  contribute: SubmitActions.contribute,

  submitClass: s => isLoading(s) ? "btn btn-submit btn-loading" : "btn btn-submit",

  isLoading: s => isLoading(s) ? <i className="fa fa-circle-o-notch fa-spin"></i> : null,

  render: function() {
    return <button className={ this.submitClass(this.state.cursor) }
      onClick={ this.contribute }>
      { this.state.cursor } { this.isLoading(this.state.cursor) }
    </button>
  }
});

export default Submit;