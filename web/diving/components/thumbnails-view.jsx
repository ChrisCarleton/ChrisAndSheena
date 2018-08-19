import PropTypes from 'prop-types';
import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import {
	Col,
	Image,
	Media,
	Tab,
	Tabs
} from 'react-bootstrap';

class ThumbnailsView extends React.Component {
	render() {
		const videoThumbnails = [];
		const imageThumbnails = [];
		const contents = this.props.folderContents;

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
							<a href={`${this.props.match.url}/${item.Slug}`}>
								<Media.Heading>{split[split.length - 1]}</Media.Heading>
							</a>
						</Media.Body>
					</Media.ListItem>);
			}
			
			else if (item.Type === 'image/jpeg') {
				imageThumbnails.push(
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

				<h1>{this.props.currentKey}</h1>

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
						<p>
							Here are some pictures!
						</p>
						<Media.List>
							{ imageThumbnails }
						</Media.List>
					</Tab>
				</Tabs>
			</Col>);
	}
}

ThumbnailsView.propTypes = {
	currentKey: PropTypes.string.isRequired,
	folderContents: PropTypes.object.isRequired,
	match: PropTypes.object.isRequired
};

export default withRouter(ThumbnailsView);
