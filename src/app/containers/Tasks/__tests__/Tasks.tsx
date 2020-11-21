import { mount } from 'enzyme';
import React from 'react';
import Tasks from '../Tasks';

describe('Tasks Container', () => {
	const wrapper = mount(<Tasks />);

	it('should render Tasks', () => {
		expect(wrapper.exists()).toBeDefined();
	});
});
