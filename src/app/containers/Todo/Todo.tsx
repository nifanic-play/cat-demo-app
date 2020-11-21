import React, { useEffect, useState } from 'react';
import {
	getInputValueChangeAction,
	getAddItemAction,
	getDeleteItemAction,
	getInitListAction,
	getCheckItemAction,
	ActionReturnType
} from 'app/store/actions/createActions';
import { ITodoItem } from 'app/store';
import { connect } from 'react-redux';
import Styles from './Todo.scss';

interface IAppProps {
	inputValue: string;
	list: Array<ITodoItem>;
	inputValueChange: () => void;
	handleAddItem: () => void;
	handleDeleteItem: (i: number) => void;
	handleCheckItem: (i: number) => void;
	handleDeleteCheckedItems: () => void;
	getInitList: () => void;
}

const TodoIsolate = ({
	inputValue,
	list,
	inputValueChange,
	handleAddItem,
	handleDeleteItem,
	handleCheckItem,
	getInitList
}: IAppProps) => {
	useEffect(() => {
		getInitList();
	}, []);
	const [validForm, setFormValidity] = useState<boolean>(true);
	const [showChecked, setShowChecked] = useState<boolean>(true);

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
				>
					{showChecked ? 'Hide' : 'Show'} Checked
				</button>

				<button data-test="button-remove-checked">Remove Checked</button>
			</div>
		</div>
	);
};

const mapStateToProps = (state: any) => {
	return {
		inputValue: state.inputValue,
		list: state.list
	};
};

const mapDispatchToProps = (dispatch: (a: ActionReturnType) => void) => {
	return {
		inputValueChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
			const action = getInputValueChangeAction(e.target.value);
			dispatch(action);
		},
		handleAddItem() {
			const action = getAddItemAction();
			dispatch(action);
		},
		handleDeleteItem(index: number) {
			const action = getDeleteItemAction(index);
			dispatch(action);
		},
		handleCheckItem(index: number) {
			const action = getCheckItemAction(index);
			dispatch(action);
		},
		getInitList() {
			const action = getInitListAction();
			dispatch(action);
		}
	};
};

const Todo = connect(mapStateToProps, mapDispatchToProps)(TodoIsolate);

export default Todo;
