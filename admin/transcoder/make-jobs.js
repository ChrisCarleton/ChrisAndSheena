import _ from 'lodash';
import AWS from 'aws-sdk';
import Bluebird from 'bluebird';
import path from 'path';

const s3 = new AWS.S3();
const transcoder = new AWS.ElasticTranscoder({region: 'us-east-1'});

const BUCKET_NAME = '2018-bahamas-trip';
const PIPELINE_ID = '1533869371429-4c0hs6';
const HLS_PRESET_ID = '1351620000001-200010'; // HLS 2M
const DASH_VIDEO_PRESET_ID = '1351620000001-500030'; // MPEG-Dash 2.4M
const DASH_AUDIO_PRESET_ID = '1351620000001-500060'; // MPEG-Dash Audio 128k

Bluebird.promisifyAll(s3);
Bluebird.promisifyAll(transcoder);

s3.listObjectsV2Async({
		Bucket: BUCKET_NAME,
		MaxKeys: 1000
	})
	.then(data => {
		const justVideos = _.filter(data.Contents, item => {
			return !(/hls\.MP4/i.test(item.Key)) && /(\.MP4$|\.MOV$)/i.test(item.Key);
		});

		const promises = [];

		for (var i = 0; i < 1 /*justVideos.length*/; i++) {
			const parsed = path.parse(justVideos[i].Key);
			const shortened = `${parsed.dir}/${parsed.name}-hls`.replace(/ /g, '');

			const params = {
				PipelineId: PIPELINE_ID,
				Inputs: [
					{
						Key: justVideos[i].Key
					}
				],
				Outputs: [
					// {
					// 	Key: `${parsed.dir}/${parsed.name}-hls${parsed.ext}`.replace(/ /g, ''),
					// 	ThumbnailPattern: `${parsed.dir}/${parsed.name}-hls-{count}`.replace(/ /g, ''),
					// 	PresetId: HLS_PRESET_ID,
					// }//,
					{
						Key: `${parsed.dir}/${parsed.name}-dash-vid${parsed.ext}`.replace(/ /g, ''),
						ThumbnailPattern: `${parsed.dir}/${parsed.name}-{count}`.replace(/ /g, ''),
						PresetId: DASH_VIDEO_PRESET_ID,
						SegmentDuration: '5'
					},
					{
						Key: `${parsed.dir}/${parsed.name}-dash-audio${parsed.ext}`.replace(/ /g, ''),
						PresetId: DASH_AUDIO_PRESET_ID,
						SegmentDuration: '5'
					}
				],
				Playlists: [
					{
						Format: 'MPEG-DASH',
						Name: `${parsed.dir}/${parsed.name}-dash`.replace(/ /g, ''),
						OutputKeys: [
							`${parsed.dir}/${parsed.name}-dash-vid${parsed.ext}`.replace(/ /g, ''),
							`${parsed.dir}/${parsed.name}-dash-audio${parsed.ext}`.replace(/ /g, '')
						]
					}
					// {
					// 	Format: 'HLSv4',
					// 	Name: `${parsed.dir}/${parsed.name}-hls`.replace(/ /g, ''),
					// 	OutputKeys: [`${parsed.dir}/${parsed.name}-hls${parsed.ext}`.replace(/ /g, '')]
					// }
				]
			};

			console.log('doing: ', justVideos[i].Key);
			promises.push(transcoder.createJobAsync(params));
		}

		return Bluebird.all(promises);
	})
	.then(() => {
		console.log('Woohoo! Check S3.');
	})
	.catch(err => {
		console.error('Error trying to enumerate objects:', err);	
	});
