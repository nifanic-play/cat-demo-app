import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { Header, Footer } from 'app/components';
import { configureStore } from 'app/store';
import { Routes } from './Routes';

import './app/styles/global.scss';

ReactDOM.render(
	<Provider store={configureStore}>
		<Router>
			<Header />
			<Routes />
			<Footer />
		</Router>
	</Provider>,
	document.getElementById('root')
);
