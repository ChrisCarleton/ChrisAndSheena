import React from 'react';

require('../img/suzy_on_laptop.jpg');

class NotFound extends React.Component {
	render() {
		return (
			<div className="container">
				<h1>Well, this can&apos;t be what you&apos;re looking for!</h1>
				<p>
					Sorry, there&apos;s no page at this URL. Try navigating using the nav bar above!
				</p>

				<p>
					<img src="/suzy_on_laptop.jpg" />
				</p>
			</div>);
	}
}

export default NotFound;
