import React, { useEffect, useRef, useState } from 'react';
import Styles from './Form.scss';

const Form: React.FC = () => {
	const initVal = 'nothing yet...';
	const inputRef = useRef<HTMLInputElement>(null);
	const [inputVal, setInputVal] = useState(initVal);
	const [reset, setReset] = useState(false);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setInputVal(e.target.value);

	const onReset = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setInputVal(initVal);
		setReset(true);
	};

	useEffect(() => {
		if (inputVal === initVal && reset) {
			setReset(false);
			inputRef.current?.select();
		}
	}, [inputVal]);

	return (
		<div className={Styles.form}>
			<h1>📙 Input Form</h1>
			<form onSubmit={onReset}>
				<input
					className={Styles.form__input}
					id="input_form"
					onChange={onChange}
					value={inputVal}
					ref={inputRef}
				/>
				<input
					className={Styles.form__submit_button}
					type="submit"
					value="Reset"
					disabled={initVal === inputVal}
				/>
			</form>
			<p>
				Input contains, <strong>{inputVal}</strong>
			</p>
		</div>
	);
};

export default Form;
