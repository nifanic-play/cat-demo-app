import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { BrowserRouter as Router } from 'react-router-dom';

import { Header } from './Header';

export default {
	title: 'Component/Header',
	component: Header
} as Meta;

const Template: Story = (args) => (
	<Router>
		<Header {...args} />
	</Router>
);

export const Default = Template.bind({});
