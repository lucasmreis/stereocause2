import React from '../react';

import State from '../state';

import LightboxHeader from './lightbox-header';
import LightboxBody from './lightbox-body';
import LightboxFooter from './lightbox-footer';

var ArtistDetails = React.createClass({
  mixins: [State.mixin],
  cursor: ['artistDetails'],

  hideLightbox: function(c) {
    return c.showing ? 'lightbox-bg lightbox-show' : 'lightbox-bg lightbox-hide';
  },

  render: function() {
    return <div className={ this.hideLightbox(this.state.cursor) }>
      <div className="lightbox">
        <LightboxHeader />
        <LightboxBody />
        <LightboxFooter />
      </div>
    </div>
  }
});

export default ArtistDetails;

