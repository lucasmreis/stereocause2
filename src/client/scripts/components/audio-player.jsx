import React from '../react';

var AudioPlayer = React.createClass({
  getInitialState: function() {
    return {
      isLoading: true,
      isPlaying: false
    };
  },

  getIcon: function() {
    if (this.state.isLoading) {
      return <i className="fa fa-circle-o-notch fa-spin"></i>;
    } else if (this.state.isPlaying) {
      return <i className="fa fa-pause blue"></i>;
    } else {
      return <i className="fa fa-play"></i>;
    }
  },

  componentDidMount: function() {
    var playerElement = this.refs.player.getDOMNode();
    playerElement.load();
    playerElement.addEventListener('canplay', this.audioReady);
    playerElement.addEventListener('ended', this.audioEnded);
    playerElement.addEventListener('pause', this.audioPause);
  },

  audioReady: function() {
    this.setState({
      isLoading: false
    });
  },

  audioLoad: function() {
    this.refs.player.getDOMNode().load();
  },

  audioEnded: function() {
    this.setState({
      isPlaying: false
    });
  },

  togglePlayPause: function() {
    if (!this.state.isLoading) {
      if (this.state.isPlaying) {
        this.audioPause();
      } else {
        this.audioPlay();
      }
    }
  },

  audioPause: function() {
    this.refs.player.getDOMNode().pause();
    this.setState({
      isPlaying: false
    });
  },

  audioPlay: function() {
    try {
      // pause every other audio
      var audioElements = document.getElementsByTagName('audio');
      for (var i = 0; i < audioElements.length; i++) {
        audioElements[i].pause();
      }
    } catch(e) {}
    this.refs.player.getDOMNode().play();
    this.setState({
      isPlaying: true
    });
  },

  render: function() {
    return <div>
      <audio ref="player" src={ this.props.file } preload="none" />
      <div onClick={ this.togglePlayPause }>
        { this.getIcon() }
      </div>
    </div>
  }
});

export default AudioPlayer;