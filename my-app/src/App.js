import styles from './app.module.css';
import { useTasks } from './hooks/useTasks';
import { useState } from 'react';

export const App = () => {
	const {
		tasks,
		newTask,
		setNewTask,
		editingTask,
		handleEditClick,
		setEditingTask,
		handleAddTask,
		handleEditTask,
		handleDeleteTask,
		handleSortTask,
	} = useTasks();

	const [searchTerm, setSearchTerm] = useState(''); // что ищем

	const searchResults = {};
	Object.keys(tasks).forEach((taskId) => {
		if (tasks[taskId].title.toLowerCase().includes(searchTerm.toLowerCase())) {
			searchResults[taskId] = tasks[taskId];
		}
	});

	const handleChange = (event) => {
		setSearchTerm(event.target.value);
	};

	return (
		<div className={styles.todoContainer}>
			<input
				className={styles.inputSearch}
				type="text"
				placeholder="Поиск"
				value={searchTerm}
				onChange={handleChange}
			/>
			<h1 className={styles.todoTitle}>My To Do List</h1>
			<div className={styles.inputContainer}>
				<input
					type="text"
					placeholder="Введите задачу"
					value={newTask}
					onChange={(e) => setNewTask(e.target.value)}
				/>
				<button
					type="button"
					onClick={handleAddTask}
					disabled={newTask.trim() === ''}
				>
					Добавить
				</button>
			</div>
			<button type="button" className={styles.sortButton} onClick={handleSortTask}>
				А Я
			</button>
			<ul className={styles.todoList}>
				{Object.keys(searchResults).map((taskId) => (
					<li key={taskId}>
						{editingTask.id === taskId ? (
							<div className={styles.taskContainer}>
								<input
									type="text"
									value={editingTask.title}
									onChange={
										(e) =>
											setEditingTask({
												...editingTask,
												title: e.target.value,
											}) // обновляет состояние editingTask при каждом изменении input
									}
								/>
								<div className={styles.buttonContainer}>
									<button
										onClick={
											() =>
												handleEditTask(taskId, editingTask.title) // обновить сотояние editingTask?
										}
									>
										Сохранить
									</button>
									<button
										onClick={() =>
											setEditingTask({
												id: null,
												title: '',
											})
										}
									>
										Отмена
									</button>
								</div>
							</div>
						) : (
							<div className={styles.taskContainer}>
								<span>{tasks[taskId].title}</span>
								<div className={styles.buttonContainer}>
									<button
										onClick={() =>
											handleEditClick(taskId, tasks[taskId].title)
										}
									>
										Изменить
									</button>
									<button onClick={() => handleDeleteTask(taskId)}>
										Удалить
									</button>
								</div>
							</div>
						)}
					</li>
				))}
			</ul>
		</div>
	);
};
