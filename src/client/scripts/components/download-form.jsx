import React from '../react';
import State from '../state';

import {getMyStereoCause} from '../actions/download-actions';

var DownloadForm = React.createClass({
  downloadMyStereoCause: function(bought) {
    return () => window.location.href = 'my-stereo-cause/' + bought.email + '/' + bought._id + '/stereoCause.zip';
  },

  render: function() {
    return <div>
      <button onClick={ this.downloadMyStereoCause(State.select('bought').get()) }
          type="button"
          className="btn btn-download btn-download-main">
          <i className="fa fa-lg fa-download"></i> Download
      </button>

      <button
          type="button"
          className="btn btn-download">
          <i className="fa fa-lg fa-dropbox"></i> Dropbox
      </button>

      <button
          type="button"
          className="btn btn-download">
          <i className="fa fa-lg fa-google"></i> Google Drive
      </button>

    </div>;
  }
});

export default DownloadForm;