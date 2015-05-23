import React from '../react';
import State from '../state';

import FormHeaderThankYou from './form-header-thank-you';
import DownloadForm from './download-form';

var JustBought = React.createClass({
  mixins: [State.mixin],
  cursor: ['bought'],

  render: function() {
    return <div>
      <FormHeaderThankYou />
      <DownloadForm />
      <p className="form-text">
        <i className="fa fa-info-circle"></i> Your receipt and music download links will also be sent to { this.state.cursor.email }
      </p>
    </div>;
  }
});

export default JustBought;