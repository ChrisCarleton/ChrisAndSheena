import _ from 'lodash';
import React from 'react';
import { withRouter } from 'react-router-dom';

import { Switch, Route } from 'react-router-dom';

//import DivePhoto from './dive-photo';
import FolderView from './folder-view';
import NotFound from '../../components/not-found';

const cozumel = require('../manifests/cozumel2017');
const bahamas = require('../manifests/bahamas2018');

class DivePage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cozumelRoutes: this.renderSection(
				'/diving/cozumel2017',
				'/diving/cozumel2017',
				cozumel),
			bahamasRoutes: this.renderSection(
				'/diving/bahamas2018',
				'/diving/bahamas2018',
				bahamas)
		};
	}

	renderSection(root, path, section) {
		var routes = [];

		routes.push(<Route key={path} path={path} exact strict component={ FolderView } />);
		
		const keys = Object.keys(section.Contents);
		keys.forEach(key => {
			if (key === 'Info') {
				return;
			}

			else if (!section.Contents[key].Type) {
				routes = _.concat(
					routes,
					this.renderSection(
						root,
						`${path}/${section.Contents[key].Slug}`,
						section.Contents[key]));
			}

			// else if (section[key].type === 'image/jpeg') {
			// 	const imageSlug = getSlug(`${path}/${section[key].key}`);
			// 	routes.push(<Route key={imageSlug} path={imageSlug} exact component={ DivePhoto } />);
			// }
		});

		return routes;
	}

	render() {

		return (
			<Switch>
				{ this.state.cozumelRoutes }
				{ this.state.bahamasRoutes }
				<Route path="*" component={ NotFound } />
			</Switch>
		);
	}
}

export default withRouter(DivePage);
