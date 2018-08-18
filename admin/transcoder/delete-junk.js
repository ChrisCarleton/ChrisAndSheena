import _ from 'lodash';
import AWS from 'aws-sdk';
import Bluebird from 'bluebird';

const s3 = new AWS.S3();

const BUCKET_NAME = '2018-bahamas-trip';

Bluebird.promisifyAll(s3);

s3.listObjectsV2Async({
		Bucket: BUCKET_NAME,
		MaxKeys: 1000
	})
	.then(data => {
		const justJunk = _.map(
				_.filter(data.Contents, item => {
					return /(dash-audio\.MP4$|\.m3u8$|\.ts$|hls-\d\d\d\d\d\.png$)/i.test(item.Key);
				}), item => {
					return _.pick(item, 'Key');
				});

		const params = {
			Bucket: BUCKET_NAME,
			Delete: {
				Objects: justJunk
			}
		};

		return s3.deleteObjectsAsync(params);
	})
	.then(() => {
		console.log('Woohoo! Check S3.');
	})
	.catch(err => {
		console.error('Error trying to enumerate objects:', err);	
	});
