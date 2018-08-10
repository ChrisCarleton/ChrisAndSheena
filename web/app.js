import React from 'react';
import ReactDOM from 'react-dom';

import Home from './components/home';

require('./alt');
require('./styles/style.css');

ReactDOM.render(<Home />, document.getElementById('app'));
