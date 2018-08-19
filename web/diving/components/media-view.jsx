import PropTypes from 'prop-types';
import React from 'react';
import getLocationInfo from '../util/location';

import {
	Button,
	Glyphicon,
	Image
} from 'react-bootstrap';
import Breadcrumbs from './breadcrumbs';
import VideoPlayer from '../../components/video-player';

class MediaView extends React.Component {
	constructor(props) {
		super(props);
		this.state = getLocationInfo(this.props.match.url);
	}

	render() {
		const mediaItem = this.state.currentFolder.Contents[this.state.currentKey];
		var mediaNode = null;

		if (mediaItem.Type === 'image/jpeg') {
			mediaNode = <Image rounded src={ mediaItem.Url } alt={ mediaItem.Key } responsive />;
		}

		else if (mediaItem.Type === 'video/mp4') {
			mediaNode = <VideoPlayer
				autoPlay
				controls
				dashUrl={ mediaItem.DashUrl }
				hlsUrl={ mediaItem.HlsUrl } />;
		}

		return (
			<div className="container">
				<Breadcrumbs
					currentKey={ this.state.currentKey }
					slugMap={ this.state.slugMap }
					tripName={ this.state.tripName } />
				<h1>{ this.state.currentKey }&nbsp;&nbsp;
					<a href={ mediaItem.Url } alt="download" download>
						<Button>
							<Glyphicon glyph="download-alt" /> Download
						</Button>
					</a>
				</h1>
				{ mediaNode }
			</div>);
	}
}

MediaView.propTypes = {
	match: PropTypes.object.isRequired
};

export default MediaView;
