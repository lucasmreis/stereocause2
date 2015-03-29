import React from 'react';
import State from '../state';

import cause from '../../cause';

var LightboxHeader = React.createClass({
  mixins: [State.mixin],
  cursor: ['artistDetails'],

  closeLightbox: function() { State.select('artistDetails').set('showing', false); },

  render: function() {
    return <div className="lightbox-header">
      <div className="lightbox-header-title">
        Artist Name
      </div>
      <i className="fa fa-times fa-2x lightbox-close" onClick={ this.closeLightbox }></i>
    </div>
  }
});

export default LightboxHeader;