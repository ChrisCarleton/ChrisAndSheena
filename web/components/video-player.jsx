import bowser from 'bowser';
import React from 'react';

class VideoPlayer extends React.Component {

	renderDashPlayer() {
		return (
			<video data-dashjs-player autoPlay src="https://s3.amazonaws.com/2018-bahamas-trip/August1/11-TheWashingMachine/01-Washingmachinebriefing-dash.mpd" controls></video>
		);
	}

	renderNativePlayer() {
		return (
			<video autoPlay src="https://s3.amazonaws.com/2018-bahamas-trip/August1/11-TheWashingMachine/01-Washingmachinebriefing-dash.mpd" controls></video>
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

export default VideoPlayer;
