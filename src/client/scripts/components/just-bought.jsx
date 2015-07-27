import React from '../react';
import State from '../state';

import FormHeaderThankYou from './form-header-thank-you';
import DownloadForm from './download-form';

import {pageView} from '../lib/analytics';

var JustBought = React.createClass({
  mixins: [State.mixin],
  cursor: ['bought'],

  componentDidMount: function() {
    window.history.pushState({}, null, 'just-bought');
    pageView('/just-bought');
  },

  render: function() {
    return <div>
      <FormHeaderThankYou />
      <div className="form-container">
        <DownloadForm />
        <p className="form-text">
          <i className="fa fa-info-circle"></i> Your receipt and music download links will also be sent to { this.state.cursor.email }
        </p>
      </div>
    </div>;
  }
});

export default JustBought;