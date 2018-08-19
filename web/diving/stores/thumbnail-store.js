import alt from '../../alt';
import ThumbnailActions from '../actions/thumbnail-actions';

class ThumbnailStore {
	constructor() {
		this.tabIndex = 0;
		this.bindListeners({
			handleChangeTab: ThumbnailActions.CHANGE_TAB
		})
	}

	handleChangeTab(newTabIndex) {
		this.tabIndex = newTabIndex;
	}
}

export default alt.createStore(ThumbnailStore, 'ThumbnailStore');
