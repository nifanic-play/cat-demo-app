import React from 'react';
import ReactMarkdown from 'react-markdown';
import TasksMD from './Tasks.md';
import Styles from './Tasks.scss';

const Tasks: React.FC = () => (
	<div className={Styles.home}>
		<ReactMarkdown source={TasksMD} />
	</div>
);

export default Tasks;
