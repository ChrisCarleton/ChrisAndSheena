import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Home from './home';
import Navbar from './navbar';
import Footer from './footer';
import NotFound from './not-found';

class App extends React.Component {
	render() {
		return (
			<div>
				<Navbar />
				<Switch>
					<Route path="/" exact component={ Home } />
					<Route path="*" component={ NotFound } />
				</Switch>
				<Footer />
			</div>);
	}
}

export default App;
