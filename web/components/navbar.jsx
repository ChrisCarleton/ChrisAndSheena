import React from 'react';

import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';	
import { LinkContainer } from 'react-router-bootstrap';

class SiteNavbar extends React.Component {
	render() {
		return (
			<Navbar inverse>
				<Navbar.Header>
					<Navbar.Brand>
						<Link to="/">ChrisAndSheena.ca</Link>
					</Navbar.Brand>
					<Navbar.Toggle />
				</Navbar.Header>
				<Navbar.Collapse>
					<Nav>
						<LinkContainer to="/diving/cozumel2017">
							<NavItem>2017 Cozumel Trip</NavItem>
						</LinkContainer>
						<LinkContainer to="/diving/bahamas2018">
							<NavItem>2018 Bahamas Trip</NavItem>
						</LinkContainer>
					</Nav>
				</Navbar.Collapse>
			</Navbar>);
	}
}

export default SiteNavbar;
