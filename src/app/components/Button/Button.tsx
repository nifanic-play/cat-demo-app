import React from 'react';
import Styles from './Button.scss';

export interface ButtonProps {
	/**
	 * Is this the principal call to action on the page?
	 */
	primary?: boolean;
	/**
	 * What background color to use
	 */
	backgroundColor?: string;
	/**
	 * How large should the button be?
	 */
	size?: 'small' | 'medium' | 'large';
	/**
	 * Button contents
	 */
	label: string;
	/**
	 * Optional click handler
	 */
	onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
	primary = false,
	size = 'medium',
	backgroundColor,
	label,
	...props
}: ButtonProps) => {
	const mode = primary ? Styles['button--primary'] : Styles['button--secondary'];

	return (
		<button
			type="button"
			className={[Styles.button, Styles[`button--${size}`], mode].join(' ')}
			style={{ backgroundColor }}
			{...props}
		>
			{label}
		</button>
	);
};
