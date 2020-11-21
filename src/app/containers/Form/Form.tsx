import React from 'react';
import Styles from './Form.scss';

const Form: React.FC = () => {
	const inputVal = '';

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log(e.target.value);
	};

	return (
		<div className={Styles.form}>
			<h1>📙 Input Form</h1>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					document.getElementById('input_form')?.focus();
				}}
			>
				<input className={Styles.form__input} id="input_form" onChange={onChange} />
				<input className={Styles.form__submit_button} type="submit" value="Reset" />
			</form>
			<p>
				Input contains, <strong>{inputVal || 'nothing yet...'}</strong>
			</p>
		</div>
	);
};

export default Form;
