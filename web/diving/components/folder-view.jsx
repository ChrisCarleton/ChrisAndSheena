import React from 'react';
import PropTypes from 'prop-types';

import {
	Breadcrumb,
	Col,
	Glyphicon,
	Grid,
	Image,
	Media,
	Row,
	Tab,
	Tabs
} from 'react-bootstrap';

import { LinkContainer } from 'react-router-bootstrap';

import { Link, withRouter } from 'react-router-dom';

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

	renderBreadcrumbs() {
		const split = this.props.match.url.split('/');
		const items = [];

		items.push(
			<LinkContainer key="home" to="/">
				<Breadcrumb.Item>Home</Breadcrumb.Item>
			</LinkContainer>);
		
		if (split.length <= 3) {
			items.push(
				<Breadcrumb.Item key={this.state.currentKey}>
					{ this.state.currentKey }
				</Breadcrumb.Item>);
		} else {
			items.push(
				<LinkContainer key={split[2]} to={`/diving/${split[2]}`}>
					<Breadcrumb.Item>
						{ this.state.tripName }
					</Breadcrumb.Item>
				</LinkContainer>);

			var path = `/diving/${split[2]}`;
			var slugMap = this.state.slugMap;
			for (var i = 3; i < split.length; i++) {
				path = `${path}/${split[i]}`;
				slugMap = slugMap[split[i]];

				if (i === (split.length - 1)) {
					items.push(
						<Breadcrumb.Item key={slugMap._Key}>
							{slugMap._Key}
						</Breadcrumb.Item>);
				} else {
				items.push(
					<LinkContainer key={slugMap._Key} to={path}>
						<Breadcrumb.Item>
							{slugMap._Key}
						</Breadcrumb.Item>
					</LinkContainer>);
				}
			}
		}

		return <Breadcrumb>{ items }</Breadcrumb>;
	}

	renderSubFolders() {
		if (!this.state.currentFolder.Contents || this.state.currentFolder.Contents.length === 0) {
			return null;
		}

		const subFolders = [];

		Object.keys(this.state.currentFolder.Contents).forEach(key => {
			if (!this.state.currentFolder.Contents[key].Type) {
				subFolders.push(
					<Media.ListItem>
						<Media.Left>
							<Glyphicon glyph="folder-open" />
						</Media.Left>
						<Media.Body>
							<Link to={`${this.props.match.url}/${this.state.currentFolder.Contents[key].Slug}`}>
								{key}
							</Link>
						</Media.Body>
					</Media.ListItem>);
			}
		});

		return <Media.List>{ subFolders }</Media.List>;
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
			<div>

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
			</div>);
	}

	render() {
		return (
			<div>
				{ this.renderBreadcrumbs() }
				<Grid>
					<Row>
						<Col xs={3}>
							{ this.renderSubFolders() }
						</Col>
						<Col xs={9}>
							{ this.renderDefaultView() }
						</Col>
					</Row>
				</Grid>
			</div>);
	}
}

FolderView.propTypes = {
	match: PropTypes.object.isRequired
};

export default withRouter(FolderView);
