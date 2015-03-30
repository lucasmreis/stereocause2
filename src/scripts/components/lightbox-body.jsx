import React from 'react';
import State from '../state';

import {artistFromState, renderComposers} from '../lib/helpers';

import cause from '../../cause';


var LightboxBody = React.createClass({
  mixins: [State.mixin],
  cursor: ['artistDetails'],

  listTracks: function(a) {
    return a.tracks.map(t => { return <div key={ t.number } className="track-line">
      <p>
        <div className="track-player"><i className="fa fa-play"></i></div>
        <div className="track-number">{ t.number }</div>
        <div className="track-title">{ t.title }</div>
      </p>
      <p>
        <div className="track-space">&nbsp;</div>
        <div className="track-composers">{ renderComposers(t.composers) }</div>
      </p>
    </div>});
  },

  currentArtist: function() { return artistFromState(this.state.cursor)(cause); },

  artistImage: function(a) { return 'assets/images/' + a.artistImage; },

  render: function() {
    const a = this.currentArtist();

    return <div className="lightbox-body">
      <img src={ this.artistImage(a) } className="lightbox-artist-img" />
      <p className="lightbox-artist-description">
        { this.currentArtist().bigDescription }
      </p>
      <div className="lightbox-album-title">Album Title</div>
      { this.listTracks(a) }
    </div>
  }
});

export default LightboxBody;