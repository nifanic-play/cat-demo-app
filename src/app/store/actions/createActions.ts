import {
	ActionAddItem,
	ActionCheckItem,
	ActionDeleteCheckedItems,
	ActionDeleteItem,
	ActionGetInitData,
	ActionGetInitList,
	ActionInputValueChange,
	ADD_ITEM,
	CHECK_ITEM,
	DELETE_CHECKED_ITEMS,
	DELETE_ITEM,
	GET_INIT_DATA,
	GET_INIT_LIST,
	INPUT_VALUE_CHANGE
} from './actionTypes';
import { ActionCreator } from 'redux';

const getInputValueChangeAction: ActionCreator<ActionInputValueChange> = (value) => ({
	type: INPUT_VALUE_CHANGE,
	value
});

const getAddItemAction: ActionCreator<ActionAddItem> = () => ({
	type: ADD_ITEM
});

const getCheckItemAction: ActionCreator<ActionCheckItem> = (index) => ({
	type: CHECK_ITEM,
	index
});

const getDeleteItemAction: ActionCreator<ActionDeleteItem> = (index) => ({
	type: DELETE_ITEM,
	index
});

const getDeleteCheckedItemsAction: ActionCreator<ActionDeleteCheckedItems> = (checkedItems) => ({
	type: DELETE_CHECKED_ITEMS,
	checkedItems
});

const getInitDataAction: ActionCreator<ActionGetInitData> = (value) => ({
	type: GET_INIT_DATA,
	value
});

const getInitListAction: ActionCreator<ActionGetInitList> = () => ({
	type: GET_INIT_LIST
});

export {
	getInputValueChangeAction,
	getAddItemAction,
	getDeleteItemAction,
	getDeleteCheckedItemsAction,
	getCheckItemAction,
	getInitDataAction,
	getInitListAction
};
