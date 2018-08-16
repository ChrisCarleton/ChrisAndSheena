import React from 'react';

import {
	Carousel
} from 'react-bootstrap';

import '../img/carousel_cenote.png';
import '../img/carousel_chris.png';
import '../img/carousel_sheena.png';

class Home extends React.Component {
	render() {
		return (
			<div>
				<div>
					<Carousel>
						<Carousel.Item>
							<img width={1100} height={450} src="carousel_sheena.png" />
							<Carousel.Caption>
								<h3>Welcome to Our New Website</h3>
								<p>Yup. It&apos;s a website.</p>
							</Carousel.Caption>
						</Carousel.Item>
						<Carousel.Item>
							<img width={1100} height={450} src="carousel_chris.png" />
							<Carousel.Caption>
								<h3>Sometimes we dive with sharks!</h3>
								<p>Oooo weee!</p>
							</Carousel.Caption>
						</Carousel.Item>
						<Carousel.Item>
							<img width={1100} height={450} src="carousel_cenote.png" />
							<Carousel.Caption>
								<h3>...And Cenotes Too!</h3>
								<p>They are delightful!</p>
							</Carousel.Caption>
						</Carousel.Item>
					</Carousel>
				</div>

				<div className="container">
					<h3>Hi! We&apos;re Chris and Sheena</h3>
					<p>
						This is a website we&apos;re building for the lulz.
					</p>
				</div>

			</div>
		);
	}
}

export default Home;
