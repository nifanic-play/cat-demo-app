import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../../../store/reducers/reducers';
import Todo from '../Todo';

const defaultConnectedProps = {
	inputValue: '',
	list: [],
	inputValueChange: jest.fn(),
	handleAddItem: jest.fn(),
	handleCheckItem: jest.fn(),
	handleDeleteItem: jest.fn(),
	handleDeleteCheckedItems: jest.fn(),
	getInitList: jest.fn()
};

const setupComponent = () => {
	const store = createStore(reducer);
	const wrapper = mount(
		<Provider store={store}>
			<Todo {...defaultConnectedProps} />
		</Provider>
	);

	return {
		getComponent: () => wrapper,
		getTodoFormValid: () => wrapper.find("[data-test='todo-form-valid-true']"),
		getTodoFormInvalid: () => wrapper.find("[data-test='todo-form-valid-false']"),
		getTodoInput: () => wrapper.find("[data-test='todo-input']"),
		getCheckbox: (index = 0) => wrapper.find(`[data-test='checkbox-${index}']`),
		getDeleteButton: (index = 0) => wrapper.find(`[data-test='delete-button-${index}']`),
		getButtonHideChecked: () => wrapper.find('[data-test="button-hide-checked"]'),
		getButtonRemoveChecked: () => wrapper.find('[data-test="button-remove-checked"]'),
		debug: () => wrapper.debug()
	};
};

describe('Todo Container', () => {
	const component = setupComponent();

	it('should render Todo', () => {
		expect(component.getComponent()).toHaveLength(1);
		expect(component.getTodoInput()).toHaveLength(1);
		expect(component.getTodoFormValid()).toHaveLength(1);
	});

	it('should show error with empty form', () => {
		component.getTodoInput().simulate('change', { target: { value: '' } });
		component.getTodoFormValid().simulate('submit');
		expect(component.getTodoInput()).toHaveLength(1);
	});

	it('should simulate text input change and submit valid', () => {
		component.getTodoInput().simulate('change', { target: { value: 'cereal' } });
		component.getTodoFormInvalid().simulate('submit');
		expect(component.getTodoInput()).toHaveLength(1);
	});

	it('should simulate a delete item', () => {
		expect(component.getCheckbox()).toHaveLength(1);
		component.getCheckbox().simulate('change');
		component.getDeleteButton().simulate('click');
		expect(component.getCheckbox()).toHaveLength(0);
	});

	it('should simulate hiding checked items', () => {
		component.getButtonHideChecked().simulate('click');
		expect(component.getCheckbox()).toHaveLength(0);
	});

	it('should simulate removing checked items', () => {
		component.getButtonRemoveChecked().simulate('click');
		expect(component.getCheckbox()).toHaveLength(0);
	});
});
