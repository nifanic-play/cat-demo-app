import Styles from './Todo.scss';
import React, { useEffect, useState } from 'react';
import {
	getInputValueChangeAction,
	getAddItemAction,
	getDeleteItemAction,
	getInitListAction,
	getCheckItemAction,
	getDeleteCheckedItemsAction
} from 'app/store/actions/createActions';
import { IState, ITodoItem } from 'app/store';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';

interface IDispatchProps {
	getInitList: () => void;
	handleAddItem: () => void;
	handleCheckItem: (index: number) => void;
	handleDeleteCheckedItems: (checkedItems: ITodoItem[]) => void;
	handleDeleteItem: (index: number) => void;
	inputValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface IAppProps extends IDispatchProps {
	inputValue: string;
	list: Array<ITodoItem>;
}

const TodoIsolate = ({
	inputValue,
	list,
	inputValueChange,
	handleAddItem,
	handleDeleteItem,
	handleCheckItem,
	handleDeleteCheckedItems,
	getInitList
}: IAppProps) => {
	useEffect(() => {
		getInitList();
	}, []);
	const [validForm, setFormValidity] = useState<boolean>(true);
	const [showChecked, setShowChecked] = useState<boolean>(true);

	const checkedItemsNum = list.filter((todoItem) => todoItem.isChecked).length;

	return (
		<div className={Styles.todo}>
			<h1>📝 Todo List</h1>
			<form
				data-test={`todo-form-valid-${validForm}`}
				className={Styles.todo__form}
				onSubmit={(e) => {
					e.preventDefault();
					if (!inputValue) return setFormValidity(false);
					setFormValidity(true);
					return handleAddItem();
				}}
			>
				<label className="sr-only" htmlFor="addToListInputName">
					Add To List
				</label>

				<input
					data-test={`todo-input`}
					className={`${Styles.todo__input} ${
						!validForm ? Styles['todo__input--error'] : ''
					}`}
					type="text"
					placeholder="Grocery items to grab..."
					id="addToListInputName"
					value={inputValue}
					onChange={inputValueChange}
				/>
				<input className={Styles.todo__submit_button} type="submit" value="Add Item" />
			</form>

			<ul className={Styles.todo__list_items}>
				{list.map((item: ITodoItem, index: number) => (
					<li
						key={item.id + index}
						className={Styles.todo__list_item}
						style={!showChecked && item.isChecked ? { display: 'none' } : {}}
					>
						<span>
							<input
								data-test={`checkbox-${index}`}
								onChange={() => handleCheckItem(index)}
								type="checkbox"
								className={Styles.todo__list_checkbox}
								id={`checkbox-${index}`}
								checked={item.isChecked}
							/>
							<label htmlFor={`checkbox-${index}`}>{item.name}</label>
						</span>
						<button
							data-test={`delete-button-${index}`}
							onClick={() => handleDeleteItem(index)}
						>
							x
						</button>
					</li>
				))}
			</ul>

			<div className={Styles.todo__actions}>
				<button
					data-test="button-hide-checked"
					onClick={() => setShowChecked(!showChecked)}
					disabled={checkedItemsNum === 0}
				>
					{showChecked ? 'Hide' : 'Show'} Checked
				</button>

				<button
					data-test="button-remove-checked"
					onClick={() =>
						handleDeleteCheckedItems(list.filter((todoItem) => todoItem.isChecked))
					}
					disabled={checkedItemsNum === 0}
				>
					Remove Checked
				</button>
			</div>
		</div>
	);
};

const mapStateToProps: MapStateToProps<IState, undefined, IState> = ({ inputValue, list }) => ({
	inputValue,
	list
});

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, undefined> = (dispatch) => {
	return {
		getInitList() {
			const action = getInitListAction();
			dispatch(action);
		},
		handleAddItem() {
			const action = getAddItemAction();
			dispatch(action);
		},
		handleCheckItem(index) {
			const action = getCheckItemAction(index);
			dispatch(action);
		},
		handleDeleteCheckedItems(checkedItems) {
			const action = getDeleteCheckedItemsAction(checkedItems);
			dispatch(action);
		},
		handleDeleteItem(index) {
			const action = getDeleteItemAction(index);
			dispatch(action);
		},
		inputValueChange(e) {
			const action = getInputValueChangeAction(e.target.value);
			dispatch(action);
		}
	};
};

const Todo = connect(mapStateToProps, mapDispatchToProps)(TodoIsolate);

export default Todo;
