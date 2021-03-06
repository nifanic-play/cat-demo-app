import {
	INPUT_VALUE_CHANGE,
	ADD_ITEM,
	DELETE_ITEM,
	CHECK_ITEM,
	GET_INIT_DATA,
	DELETE_CHECKED_ITEMS,
	AllActions
} from 'app/store/actions/actionTypes';
import { randomId } from 'app/utils';
import { ITodoItem } from 'app/store';

export interface IState {
	inputValue: string;
	list: ITodoItem[];
}

const defaultState: IState = {
	inputValue: '',
	list: []
};

export default (state = defaultState, action: AllActions): IState => {
	const newState = JSON.parse(JSON.stringify(state));

	switch (action.type) {
		case INPUT_VALUE_CHANGE: {
			newState.inputValue = action.value;
			return newState;
		}
		case ADD_ITEM: {
			const newItem: ITodoItem = {
				id: randomId(),
				name: state.inputValue,
				isChecked: false
			};
			newState.list = [...state.list, newItem];
			newState.inputValue = '';
			return newState;
		}
		case DELETE_ITEM: {
			newState.list.splice(action.index, 1);
			return newState;
		}
		case DELETE_CHECKED_ITEMS: {
			const { checkedItems } = action;
			const { list } = newState;

			if (checkedItems.length) {
				checkedItems.forEach((item) => {
					const itemIndex = list.findIndex((i: ITodoItem) => i.id === item.id);
					if (itemIndex > -1) {
						list.splice(itemIndex, 1);
					}
				});
			}
			return newState;
		}
		case CHECK_ITEM: {
			const { index } = action;
			newState.list[index].isChecked = !newState.list[index].isChecked;
			return newState;
		}
		case GET_INIT_DATA: {
			newState.list = action.value;
			return newState;
		}
	}

	return newState;
};
