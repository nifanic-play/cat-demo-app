import React, { createContext, useContext, useState, useEffect } from 'react';

type CountContextType = {
	count: number;
	setCount: (value: number) => void;
};

const CountContext = createContext<CountContextType | undefined>(undefined);

type Props = {
	children: React.ReactNode;
};

export const CountProvider = ({ children }: Props): JSX.Element => {
	const [count, setCount] = useState<number>(0);

	useEffect(() => {
		setCount(0);
	}, []);

	return <CountContext.Provider value={{ count, setCount }}>{children}</CountContext.Provider>;
};

export const useCounter = () => useContext(CountContext);
