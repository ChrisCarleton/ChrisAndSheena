import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';

import {
	Col,
	Clearfix,
	Row,
	Tab,
	Tabs,
	Thumbnail,
	Well
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import ThumbnailActions from '../actions/thumbnail-actions';
import ThumbnailStore from '../stores/thumbnail-store';

class ThumbnailsView extends React.Component {
	constructor(props) {
		super(props);
		this.state = ThumbnailStore.getState();

		this.onTabChange = this.onTabChange.bind(this);
		ThumbnailStore.listen(this.onTabChange);
	}

	componentWillUnmount() {
		ThumbnailStore.unlisten(this.onTabChange);
	}

	onTabChange() {
		this.setState(ThumbnailStore.getState());
	}

	onTabClick(index) {
		ThumbnailActions.changeTab(index);
	}

	getClearfix(index) {
		return <Clearfix
			key={`cf_${index}`}
			visibleXsBlock
			visibleSmBlock={index % 2 === 0}
			visibleMdBlock={index % 3 === 0}
			visibleLgBlock={index % 4 === 0} />;
	}

	render() {
		const videoThumbnails = [];
		const imageThumbnails = [];
		const contents = this.props.folderContents;

		var videoIndex = 0;
		var imageIndex = 0;

		var videoCount = 0;
		var imageCount = 0;

		Object.keys(contents).forEach(key => {
			const item = contents[key];
			const split = key.split('/');

			if (item.Type === 'video/mp4') {
				videoCount++
				videoThumbnails.push(this.getClearfix(videoIndex++));
				videoThumbnails.push(
					<Col key={key} xs={12} sm={6} md={3}>
						<a href={`${this.props.match.url}/${item.Slug}`}>
							<Thumbnail src={item.ThumbnailUrl} alt={split[split.length - 1]} rounded="true" responsive="true">
								<h5 className="text-center">{split[split.length - 1]}</h5>
							</Thumbnail>
						</a>
					</Col>);
			}
			
			else if (item.Type === 'image/jpeg') {
				imageCount++;
				imageThumbnails.push(this.getClearfix(imageIndex++));
				imageThumbnails.push(
					<Col key={key} xs={12} sm={6} md={3}>
						<LinkContainer key={key} to={`${this.props.match.url}/${item.Slug}`}>
							<Thumbnail src={item.ThumbnailUrl} alt={split[split.length - 1]} rounded="true" responsive="true">
								<h5 className="text-center">{split[split.length - 1]}</h5>
							</Thumbnail>
						</LinkContainer>
					</Col>);
			}

		});

		return (
			<Col xs={12} md={8} lg={9}>

				<h3>{this.props.currentKey}</h3>

				<Tabs activeKey={this.state.tabIndex} onSelect={this.onTabClick} animation id="folder-contents">
					<Tab eventKey={0} title="Videos">
						<Well bsSize="small">
							Showing <strong>{videoCount}</strong> video(s).
						</Well>
						<Row>
							{ videoThumbnails }
						</Row>
					</Tab>
					<Tab eventKey={1} title="Pictures">
						<Well bsSize="small">
							Showing <strong>{imageCount}</strong> image(s).
						</Well>
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
