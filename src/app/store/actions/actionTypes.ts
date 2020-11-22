import { Action } from 'redux';
import { ITodoItem } from 'app/store';

export const ADD_ITEM = 'add_item';
export const CHECK_ITEM = 'check_item';
export const DELETE_CHECKED_ITEMS = 'delete_checked_items';
export const DELETE_ITEM = 'delete_item';
export const GET_INIT_DATA = 'get_init_data';
export const GET_INIT_LIST = 'get_init_list';
export const INPUT_VALUE_CHANGE = 'input_value_change';

export interface ActionInputValueChange extends Action<typeof INPUT_VALUE_CHANGE> {
	value: string;
}

export type ActionAddItem = Action<typeof ADD_ITEM>;

export interface ActionDeleteItem extends Action<typeof DELETE_ITEM> {
	index: number;
}

export interface ActionCheckItem extends Action<typeof CHECK_ITEM> {
	index: number;
}

export interface ActionDeleteCheckedItems extends Action<typeof DELETE_CHECKED_ITEMS> {
	checkedItems: ITodoItem[];
}

export interface ActionGetInitData extends Action<typeof GET_INIT_DATA> {
	value: ITodoItem[];
}

export type ActionGetInitList = Action<typeof GET_INIT_LIST>;

export type AllActions =
	| ActionAddItem
	| ActionCheckItem
	| ActionDeleteCheckedItems
	| ActionDeleteItem
	| ActionGetInitData
	| ActionGetInitList
	| ActionInputValueChange;
