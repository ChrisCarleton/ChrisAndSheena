import React from 'react';
import PropTypes from 'prop-types';

import {
	Col,
	Grid,
	Image,
	Media,
	Row,
	Tab,
	Tabs
} from 'react-bootstrap';

import { Link, withRouter } from 'react-router-dom';
import Breadcrumbs from './breadcrumbs';
import SubFoldersList from './sub-folders-list';
import ThumbnailsView from './thumbnails-view';

class FolderView extends React.Component {
	constructor(props) {
		super(props);
		const split = this.props.match.url.split('/');

		var manifest;
		var currentPosition;
		var currentKey;
		var slugMap;

		switch (split[2]) {
			case 'cozumel2017':
				manifest = require('../manifests/cozumel2017');
				break;

			case 'bahamas2018':
				manifest = require('../manifests/bahamas2018');
				break;

			default:
				throw `Unknown vacation: ${split[2]}`;
		}

		slugMap = manifest.Info.Slugs;
		currentPosition = manifest;
		currentKey = manifest.Info.Name;

		for (var i = 3; i < split.length; i++) {
			slugMap = slugMap[split[i]];
			currentPosition = currentPosition.Contents[slugMap._Key];
			currentKey = slugMap._Key;
		}

		this.state = {
			tripName: manifest.Info.Name,
			slugMap: manifest.Info.Slugs,
			currentFolder: currentPosition,
			currentKey: currentKey
		};
	}

	renderDefaultView() {
		const videoThumbnails = [];
		const contents = this.state.currentFolder.Contents;

		Object.keys(contents).forEach(key => {
			const item = contents[key];
			const split = key.split('/');

			if (item.Type === 'video/mp4') {
				videoThumbnails.push(
					<Media.ListItem key={key}>
						<Media.Left>
							<Image rounded src={item.ThumbnailUrl} alt={split[split.length - 1]} />
						</Media.Left>
						<Media.Body align="middle">
							<Link to={`${this.props.match.url}/${item.Slug}`}>
								<Media.Heading>{split[split.length - 1]}</Media.Heading>
							</Link>
						</Media.Body>
					</Media.ListItem>);
			}
		});

		return (
			<Col xs={9}>

				<h1>{this.state.currentKey}</h1>

				<Tabs defaultActiveKey={0} animation id="folder-contents">
					<Tab eventKey={0} title="Videos">
						<p>
							Here are some videos.
						</p>
						<Media.List>
							{ videoThumbnails }
						</Media.List>
					</Tab>
					<Tab eventKey={1} title="Pictures">

					</Tab>
				</Tabs>
			</Col>);
	}

	render() {
		return (
			<div>
				<Breadcrumbs
					currentKey={ this.state.currentKey }
					tripName={ this.state.tripName }
					slugMap={ this.state.slugMap } />
				<Grid>
					<Row>
						<SubFoldersList folderContents={ this.state.currentFolder.Contents } />
						<ThumbnailsView
							currentKey={ this.state.currentKey }
							folderContents={ this.state.currentFolder.Contents } />
					</Row>
				</Grid>
			</div>);
	}
}

FolderView.propTypes = {
	match: PropTypes.object.isRequired
};

export default withRouter(FolderView);
