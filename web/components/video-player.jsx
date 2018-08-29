import PropTypes from 'prop-types';
import React from 'react';

class VideoPlayer extends React.Component {

	render() {
		return (
			<div>
				<video
					data-dashjs-player
					autoPlay={this.props.autoPlay}
					src={this.props.dashUrl}
					controls={this.props.controls}>
					{this.props.children}
				</video>
			</div>
		);
	}
}

VideoPlayer.propTypes = {
	children: PropTypes.node,
	dashUrl: PropTypes.string,
	autoPlay: PropTypes.bool,
	controls: PropTypes.bool
};

export default VideoPlayer;
