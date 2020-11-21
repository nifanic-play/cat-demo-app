import React from 'react';
import { CountProvider, useCounter } from 'app/utils';
import Styles from './Counter.scss';

const Count: React.FC = () => {
	const { count, setCount } = useCounter()!;

	const handleDecrease = () => setCount(count - 1);

	const handleIncrease = () => setCount(count + 1);

	return (
		<div className={Styles.counter}>
			<small>current:</small>
			<span className={Styles.counter__number}>{count}</span>
			<button onClick={handleDecrease}>-</button>
			<button onClick={handleIncrease}>+</button>
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
