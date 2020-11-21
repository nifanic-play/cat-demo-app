import React from 'react';
import Styles from './Footer.scss';

const Footer = (): JSX.Element => {
	return (
		<footer className={Styles.footer}>
			<span className={Styles.footer__rights}>
				© {new Date().getFullYear()} Caterpillar. All Rights Reserved.
			</span>
			<span className={Styles.footer__confidential}>Confidential Green</span>
		</footer>
	);
};

export { Footer };
