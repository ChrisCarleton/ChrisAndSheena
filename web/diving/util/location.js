export default url => {
	const split = url.split('/');

	var manifest;
	var currentPosition;
	var currentKey;
	var slugMap;

	switch (split[2]) {
		case 'cozumel2017':
			manifest = require('../manifests/cozumel2017');
			break;

		case 'bahamas2018':
			manifest = require('../manifests/bahamas2018');
			break;

		default:
			throw `Unknown vacation: ${split[2]}`;
	}

	slugMap = manifest.Info.Slugs;
	currentPosition = manifest;
	currentKey = manifest.Info.Name;

	for (var i = 3; i < split.length; i++) {
		slugMap = slugMap[split[i]];
		currentKey = slugMap._Key;
		if (!currentPosition.Contents[currentKey].Contents) break;

		currentPosition = currentPosition.Contents[currentKey];
	}

	return {
		tripName: manifest.Info.Name,
		slugMap: manifest.Info.Slugs,
		currentFolder: currentPosition,
		currentKey: currentKey
	};
};
