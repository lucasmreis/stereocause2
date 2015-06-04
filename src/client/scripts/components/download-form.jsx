import React from '../react';
import State from '../state';

const buildLink = bought => window.location.origin + '/my-stereo-cause/' + bought.email + '/' + bought._id + '/stereoCause.zip';

import {getMyStereoCause} from '../actions/download-actions';

var DownloadForm = React.createClass({
  getInitialState: function() {
    return {dropboxLoading: false};
  },

  downloadMyStereoCause: function(bought) {
    return () => window.location.href = buildLink(bought);
  },

  dropboxMyStereoCause: function(bought) {
    var self = this;
    return () => {
      const options = {
        success: function () {
          self.setState({dropboxLoading: false});
          alert('Success! Files saved to your Dropbox.');
        },
        progress: function (progress) {
          self.setState({dropboxLoading: true});
        },
        cancel: function () {
          self.setState({dropboxLoading: false});
        },
        error: function (errorMessage) {
          self.setState({dropboxLoading: false});
          alert('Dropbox error:\n\n' + errorMessage);
        }
      };

      var dropboxSubmit = Dropbox.createSaveButton(buildLink(bought), options); // 'stereoCause.zip'
      dropboxSubmit.click();
      self.setState({dropboxLoading: true});
    };
  },

  isLoadingDropbox: function() {
    console.log('+++++ STATE', this.state.dropboxLoading);
    return this.state.dropboxLoading ? <i className="fa fa-circle-o-notch fa-spin"></i> : null;
  },

  render: function() {
    return <div>
      <button onClick={ this.downloadMyStereoCause(State.select('bought').get()) }
          type="button"
          className="btn btn-download btn-download-main">
          <i className="fa fa-lg fa-download"></i> Download
      </button>

      <button onClick={ this.dropboxMyStereoCause(State.select('bought').get()) }
          type="button"
          className="btn btn-download">
          <i className="fa fa-lg fa-dropbox"></i> Dropbox { this.isLoadingDropbox() }
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