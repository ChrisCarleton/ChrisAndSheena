import PropTypes from 'prop-types';
import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import {
	Col,
	Clearfix,
	Row,
	Tab,
	Tabs,
	Thumbnail
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class ThumbnailsView extends React.Component {
	getClearfix(index) {
		return <Clearfix key={`cf_${index}`} visibleXsBlock />;
	}

	render() {
		const videoThumbnails = [];
		const imageThumbnails = [];
		const contents = this.props.folderContents;

		var videoIndex = 0;
		var imageIndex = 0;

		Object.keys(contents).forEach(key => {
			const item = contents[key];
			const split = key.split('/');

			if (item.Type === 'video/mp4') {
				videoThumbnails.push(
					<Col key={key} xs={12} sm={6} md={3}>
						<a href={`${this.props.match.url}/${item.Slug}`}>
							<Thumbnail src={item.ThumbnailUrl} alt={split[split.length - 1]} rounded="true" responsive="true">
								<h5 className="text-center">{split[split.length - 1]}</h5>
							</Thumbnail>
						</a>
					</Col>);
				videoThumbnails.push(this.getClearfix(videoIndex++));
			}
			
			else if (item.Type === 'image/jpeg') {
				imageThumbnails.push(
					<Col key={key} xs={12} sm={6} md={3}>
						<LinkContainer key={key} to={`${this.props.match.url}/${item.Slug}`}>
							<Thumbnail rounded src={item.ThumbnailUrl} alt={split[split.length - 1]} rounded="true" responsive="true">
								<h5 className="text-center">{split[split.length - 1]}</h5>
							</Thumbnail>
						</LinkContainer>
					</Col>);
				imageThumbnails.push(this.getClearfix(imageIndex++));
			}

		});

		return (
			<Col xs={12} md={8} lg={9}>

				<h3>{this.props.currentKey}</h3>

				<Tabs defaultActiveKey={0} animation id="folder-contents">
					<Tab eventKey={0} title="Videos">
						<p>
							Showing <strong>{videoThumbnails.length}</strong> video(s).
						</p>
						<Row>
							{ videoThumbnails }
						</Row>
					</Tab>
					<Tab eventKey={1} title="Pictures">
						<p>
							Showing <strong>{imageThumbnails.length}</strong> image(s).
						</p>
						<Row>
							{ imageThumbnails }
						</Row>
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
