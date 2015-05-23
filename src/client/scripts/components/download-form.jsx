import React from '../react';

var DownloadForm = React.createClass({
  render: function() {
    return <div>
      <button
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