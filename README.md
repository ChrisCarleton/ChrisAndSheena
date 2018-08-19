# ChrisAndSheena.com

[![CircleCI](https://circleci.com/gh/ChrisCarleton/ChrisAndSheena/tree/master.svg?style=svg)](https://circleci.com/gh/ChrisCarleton/ChrisAndSheena/tree/master)

## Build Commands
Bundle development environment:

```
gulp package-dev
```

Bundle production environment:
```
gulp package-prod
```

Run tests:
```
gulp test
```

Run development server:
```
gulp
```

## Adding A New Diving Section

### Copy files to S3
1. Create a new S3 bucket for the pictures and videos.
2. Make sure all files are private, have a storage class of 'Standard-IA', and the bucket has a CORS policy set.
3. Make a CloudFront distribution.
	* Set it to accept HTTPS requests.
	* Make sure it accepts OPTION HTTP actions.
	* Make sure it caches/forwards the following headers (for CORS): `Access-Control-Request-Headers`, `Access-Control-Request-Method`, `Origin`.
	* Set it to respond on the following alternate domain name: `<bucket_name>.chrisandsheena.com`.
	* Set it to automatically compress responses.
4. In Route 53 create a the `<bucket_name>.chrisandsheena.com` sub domain and point it at the CloudFront distribution.

### Run Admin Utilities
Now that the files are being served we can generate thumbnails for the images, transcode the videos for streaming, and generate a manifest for the site.

In `admin/transcoder/` run `node index.js <bucket_name>`.

In `admin/imagethumbs/` run `node index.js <bucket_name>`.

Finally, in `admin/manifester/` run `node index.js <bucket_name> "<Section Title>" > manifest.js`.

The Manifester will generate a manifest file called `manifest.js`. Move that file to `/web/diving/manifests/<manifest_name>.js`. (Follow the naming scheme of the existing manifests.)

Once this is all done, invalidate the cache on the CloudFront distribution to cache the newly-generated files.

### Add The Section to the Nav
1. Edit `/web/diving/util/location.js` to include the manifest.
2. Edit the navbar to include a link to the new section.
