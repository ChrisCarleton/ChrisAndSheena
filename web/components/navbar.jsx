import React from 'react';

import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class SiteNavbar extends React.Component {
	render() {
		return (
			<Navbar>
				<Navbar.Header>
					<Navbar.Brand>
						<Link to="/">ChrisAndSheena.ca</Link>
					</Navbar.Brand>
				</Navbar.Header>
			</Navbar>);
	}
}

export default SiteNavbar;
