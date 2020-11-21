import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import Catlogo from '../../../assets/catlogo.png';
import { Clock } from '../Clock/Clock';
import Styles from './Header.scss';

const Header: React.FC = () => {
	return (
		<header>
			<div className={Styles.header}>
				<Link className={Styles.header__logo} to="/">
					<img src={Catlogo} />
				</Link>
				<nav className={Styles.header__nav}>
					<NavLink
						to="/"
						exact={true}
						className={Styles.header__nav_item}
						activeClassName={Styles['header__nav_item--active']}
					>
						Tasks
					</NavLink>
					<NavLink
						to="/todo"
						className={Styles.header__nav_item}
						activeClassName={Styles['header__nav_item--active']}
					>
						Todo
					</NavLink>
					<NavLink
						to="/counter"
						className={Styles.header__nav_item}
						activeClassName={Styles['header__nav_item--active']}
					>
						Counter
					</NavLink>
					<NavLink
						to="/form"
						className={Styles.header__nav_item}
						activeClassName={Styles['header__nav_item--active']}
					>
						Form
					</NavLink>
				</nav>
				<Clock />
			</div>
		</header>
	);
};

export { Header };
