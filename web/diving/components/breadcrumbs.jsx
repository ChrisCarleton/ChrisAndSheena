import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';

import { Breadcrumb } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class Breadcrumbs extends React.Component {
	render() {
		const split = this.props.match.url.split('/');
		const items = [];

		items.push(
			<LinkContainer key="home" to="/">
				<Breadcrumb.Item>Home</Breadcrumb.Item>
			</LinkContainer>);
		
		if (split.length <= 3) {
			items.push(
				<Breadcrumb.Item key={this.props.currentKey}>
					{ this.props.currentKey }
				</Breadcrumb.Item>);
		} else {
			items.push(
				<LinkContainer key={split[2]} to={`/diving/${split[2]}`}>
					<Breadcrumb.Item>
						{ this.props.tripName }
					</Breadcrumb.Item>
				</LinkContainer>);

			var path = `/diving/${split[2]}`;
			var slugMap = this.props.slugMap;
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
}

Breadcrumbs.propTypes = {
	currentKey: PropTypes.string.isRequired,
	match: PropTypes.object.isRequired,
	slugMap: PropTypes.object.isRequired,
	tripName: PropTypes.string.isRequired
};

export default withRouter(Breadcrumbs);
