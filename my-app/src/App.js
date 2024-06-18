import styles from './app.module.css';
import { useSearch } from './hooks/useSearch';
import { useTasks } from './hooks/useTasks';

export const App = () => {
	const {
		tasks,
		newTask,
		setNewTask,
		editingTask,
		setEditingTask,
		handleAddTask,
		handleEditClick,
		handleEditTask,
		handleDeleteTask,
		handleSortTask,
	} = useTasks();
	const { searchTerm, searchResults, handleChange } = useSearch(tasks);

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
				></input>
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
				{searchResults.map((task) => (
					<li key={task.id}>
						{editingTask.id === task.id ? (
							<div className={styles.taskContainer}>
								<input
									type="text"
									value={editingTask.title}
									onChange={(e) =>
										setEditingTask({
											...editingTask,
											title: e.target.value,
										})
									}
								/>
								<div className={styles.buttonContainer}>
									<button onClick={handleEditTask}>Сохранить</button>
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
								<span>{task.title}</span>
								<div className={styles.buttonContainer}>
									<button
										onClick={() =>
											handleEditClick(task.id, task.title)
										}
									>
										Изменить
									</button>
									<button onClick={() => handleDeleteTask(task.id)}>
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
