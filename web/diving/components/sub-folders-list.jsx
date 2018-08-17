import PropTypes from 'prop-types';
import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import {
	Col,
	Glyphicon,
	Media
} from 'react-bootstrap';

class SubFoldersList extends React.Component {
	render() {
		if (!this.props.folderContents || this.props.folderContents.length === 0) {
			return null;
		}

		const subFolders = [];

		Object.keys(this.props.folderContents).forEach(key => {
			if (!this.props.folderContents[key].Type) {
				subFolders.push(
					<Media.ListItem>
						<Media.Left>
							<Glyphicon glyph="folder-open" />
						</Media.Left>
						<Media.Body>
							<Link to={`${this.props.match.url}/${this.props.folderContents[key].Slug}`}>
								{key}
							</Link>
						</Media.Body>
					</Media.ListItem>);
			}
		});

		return (
			<Col xs={3}>
				<h3>Sub Folders</h3>
				{ subFolders.length === 0
					? <p>Nothing to show.</p>
					: <Media.List>{ subFolders }</Media.List> }
			</Col>);

	}
}

SubFoldersList.propTypes = {
	folderContents: PropTypes.object.isRequired,
	match: PropTypes.object.isRequired
};

export default withRouter(SubFoldersList);
