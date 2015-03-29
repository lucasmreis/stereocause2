import React from 'react';
import State from '../state';

import cause from '../../cause';

var LightboxBody = React.createClass({
  render: function() {
    return <div className="lightbox-body">
      <img src="assets/images/artist1.jpg" className="lightbox-artist-img" />
    </div>
  }
});

export default LightboxBody;