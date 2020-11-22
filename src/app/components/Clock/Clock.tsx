import React, { useEffect, useState } from 'react';

export const Clock: React.FC = () => {
	const [date, setDate] = useState<Date>(new Date());

	const tick = () => setDate(new Date());

	useEffect(() => {
		const timerId = window.setInterval(() => tick(), 1000);
		return () => clearInterval(timerId);
	}, []);

	return <span>{date.toLocaleTimeString()}</span>;
};
