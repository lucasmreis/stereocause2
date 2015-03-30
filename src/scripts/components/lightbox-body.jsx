import React from 'react';
import State from '../state';

import cause from '../../cause';

var LightboxBody = React.createClass({
  listTracks: function(a) {
    return a.tracks.map(() => { return <div className="track-line">
      <p>
        <div className="track-player"><i className="fa fa-play"></i></div>
        <div className="track-number">12.</div>
        <div className="track-title">Lkjh lkjhj khjjkh</div>
      </p>
      <p>
        <div className="track-player">&nbsp;</div>
        <div className="track-composers">(Pedro Mann / Antonia Adnet)</div>
      </p>
    </div>});
  },

  render: function() {
    return <div className="lightbox-body">
      <img src="assets/images/artist1.jpg" className="lightbox-artist-img" />
      <p className="lightbox-artist-description">
        khlkjhlkjhkjhlk jhlkjh lkjh lkjhl kjhlk jhlkj hlkjhkl jhlkj hlkjh lkjhl kjhlkjhlkjhlkjhlkjh lkjh lkjh lkjh lkjh lkjh lkjhlkjhlkjhlkjhlkjhlkj hlkjhl kjhkl jh lkjhlkjhlkjhlkj hlkjhlkjhlkjhlkj hlkjhlkj hlk jh klj hlk jhlkjh lkjhlk jh lk jhlkjh lkjh kjhlk jhlk jh lkj hkljh <br /> kjgjhjhg h hjg jhg jkh gkjhgjkh g h gkjghkj hg kjhg kj gh kjhg jh gkj hg kjh gkjh g jh gk jhg kjhg kjhgkjghkj hgkj hg kjhg kjhg
      </p>
      <div className="lightbox-album-title">Album Title</div>
      { this.listTracks({ tracks: [1, 2, 3] }) }
    </div>
  }
});

export default LightboxBody;