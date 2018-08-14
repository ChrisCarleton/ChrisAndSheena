import React from 'react';

import {
	Carousel
} from 'react-bootstrap';

import VideoPlayer from './video-player';

import '../img/carousel_cenote.png';
import '../img/carousel_chris.png';
import '../img/carousel_sheena.png';

class Home extends React.Component {
	render() {
		return (
			<div>
				<div className="container">
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
					<p>
						Here is our new fancy video player:
					</p>
					<p>
						<VideoPlayer
							dashUrl="https://s3.amazonaws.com/2018-bahamas-trip/August1/11-TheWashingMachine/01-Washingmachinebriefing-dash.mpd"
							hlsUrl="https://s3.amazonaws.com/2018-bahamas-trip/August+1/11+-+The+Washing+Machine/01+-+Washing+machine+briefing-hls.MP4"
							controls
							autoPlay />
					</p>
				</div>

			</div>
		);
	}
}

export default Home;
