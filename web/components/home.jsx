import React from 'react';

import {
	Carousel,
	Image
} from 'react-bootstrap';

import '../img/carousel_cenote.png';
import '../img/carousel_chris.png';
import '../img/carousel_sheena.png';
import '../img/ChrisAndSheenaResort.jpg';

class Home extends React.Component {
	render() {
		return (
			<div>
				<div className="container-fluid">
					<Carousel>
						<Carousel.Item>
							<Image src="carousel_sheena.png" responsive rounded />
							<Carousel.Caption>
								<h3>Welcome</h3>
								<p>to our website</p>
							</Carousel.Caption>
						</Carousel.Item>
						<Carousel.Item>
							<Image src="carousel_chris.png" responsive rounded />
							<Carousel.Caption>
								<h3>We Scuba Dive</h3>
								<p>(Sometimes with sharks!)</p>
							</Carousel.Caption>
						</Carousel.Item>
						<Carousel.Item>
							<Image src="carousel_cenote.png" responsive rounded />
							<Carousel.Caption>
								<h3>...and in Cenotes</h3>
								<p>They are delightful!</p>
							</Carousel.Caption>
						</Carousel.Item>
					</Carousel>
				</div>

				<div className="container">
					<h3>Hi! We&apos;re Chris and Sheena</h3>
					<p>
						This is a website we&apos;re building for the lulz. (And because we're really into diving!)
					</p>
					<p className="text-center">
						<Image src="/ChrisAndSheenaResort.jpg" rounded />
					</p>
				</div>

			</div>
		);
	}
}

export default Home;
