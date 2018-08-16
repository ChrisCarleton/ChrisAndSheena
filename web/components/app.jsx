import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Home from './home';
import Navbar from './navbar';
import Footer from './footer';
import NotFound from './not-found';
import DivePage from '../diving/components/dive-page';

class App extends React.Component {
	render() {
		return (
			<div>
				<Navbar />
				<div className="container">
					<Switch>
						<Route path="/" exact component={ Home } />
						<Route path="/diving/" component={ DivePage } />
						<Route path="*" component={ NotFound } />
					</Switch>
				</div>
				<Footer />
			</div>);
	}
}

export default App;
