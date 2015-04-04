import React from '../react';
import State from '../state';

import cause from '../../../cause';

var LightboxFooter = React.createClass({
  mixins: [State.mixin],
  cursor: ['artistDetails'],

  closeLightbox: function() { State.select('artistDetails').set('showing', false); },

  render: function() {
    return <div className="lightbox-footer">
      <i className="fa fa-times fa-2x lightbox-close-footer" onClick={ this.closeLightbox }></i>
    </div>
  }
});

export default LightboxFooter;