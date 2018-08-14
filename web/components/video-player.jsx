import bowser from 'bowser';
import PropTypes from 'prop-types';
import React from 'react';

class VideoPlayer extends React.Component {

	renderDashPlayer() {
		return (
			<video
				data-dashjs-player
				autoPlay={this.props.autoPlay}
				src={this.props.dashUrl}
				controls={this.props.controls}>
				{this.props.children}
			</video>
		);
	}

	renderNativePlayer() {
		return (
			<video
				autoPlay={this.props.autoPlay}
				src={this.props.hlsUrl}
				controls>
				{this.props.children}
			</video>
		);
	}

	render() {
		const browserInfo = bowser.getParser(window.navigator.userAgent).parsedResult;
		if (browserInfo.platform.type === 'desktop' && /(Chrome|Firefox)/i.test(browserInfo.browser.name)) {
			return this.renderDashPlayer();
		}

		return this.renderNativePlayer();
	}
}

VideoPlayer.propTypes = {
	children: PropTypes.node,
	hlsUrl: PropTypes.string,
	dashUrl: PropTypes.string,
	autoPlay: PropTypes.bool,
	controls: PropTypes.bool
};

export default VideoPlayer;
