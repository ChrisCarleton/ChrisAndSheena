import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

import {
	Col,
	Glyphicon,
	Nav,
	NavItem
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
					<LinkContainer key={key} to={`${this.props.match.url}/${this.props.folderContents[key].Slug}`}>
						<NavItem>
							<Glyphicon glyph="folder-open" />
							&nbsp;&nbsp;&nbsp;
							{key}
						</NavItem>
					</LinkContainer>);
			}
		});

		if (subFolders.length === 0) return null;

		return (
			<Col xs={12} md={4} lg={3}>
				<p><strong>Sub Folders</strong></p>
				<Nav bsStyle="pills">{ subFolders }</Nav>
			</Col>);

	}
}

SubFoldersList.propTypes = {
	folderContents: PropTypes.object.isRequired,
	match: PropTypes.object.isRequired
};

export default withRouter(SubFoldersList);
