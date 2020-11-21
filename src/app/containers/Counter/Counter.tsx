import React from 'react';
import { CountProvider } from 'app/utils';
import Styles from './Counter.scss';

const Count: React.FC = () => {
	return (
		<div className={Styles.counter}>
			<small>current:</small>
			<span className={Styles.counter__number}>0</span>
			<button>-</button>
			<button>+</button>
		</div>
	);
};

const Counter: React.FC = () => (
	<CountProvider>
		<h1>🧮 Counter</h1>
		<Count />
	</CountProvider>
);

export default Counter;
