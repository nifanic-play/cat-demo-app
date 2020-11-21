import {
	INPUT_VALUE_CHANGE,
	ADD_ITEM,
	DELETE_ITEM,
	GET_INIT_DATA,
	GET_INIT_LIST,
	CHECK_ITEM,
	ActionDeleteCheckedItems,
	DELETE_CHECKED_ITEMS
} from './actionTypes';
import { ITodoItem } from 'app/store';
import { ActionCreator } from 'redux';

export type ActionReturnType = {
	type: string;
	value?: string;
	index?: number;
};

const getInputValueChangeAction = (value: string): ActionReturnType => ({
	type: INPUT_VALUE_CHANGE,
	value
});

const getAddItemAction = (): ActionReturnType => ({
	type: ADD_ITEM
});

const getCheckItemAction = (index: number): ActionReturnType => ({
	type: CHECK_ITEM,
	index
});

const getDeleteItemAction = (index: number): ActionReturnType => ({
	type: DELETE_ITEM,
	index
});

const getDeleteCheckedItemsAction: ActionCreator<ActionDeleteCheckedItems> = (
	checkedItems: ITodoItem[]
) => ({
	type: DELETE_CHECKED_ITEMS,
	checkedItems
});

const getInitDataAction = (value: string): ActionReturnType => ({
	type: GET_INIT_DATA,
	value
});

const getInitListAction = (): ActionReturnType => ({
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
