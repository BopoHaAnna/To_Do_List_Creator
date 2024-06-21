import { useState, useEffect } from 'react';
import { ref, onValue, push, remove, update } from 'firebase/database';
import { db } from '../firebase';

const taskDbref = ref(db, 'tasks');

export const useTasks = () => {
	const [tasks, setTasks] = useState({});
	const [newTask, setNewTask] = useState('');
	const [editingTask, setEditingTask] = useState({ id: null, title: '' });
	const [sortMode, setSortMode] = useState(false); // Состояние для режима сортировки

	useEffect(() => {
		return onValue(taskDbref, (snapshot) => {
			const loadedTasks = snapshot.val() || {};
			setTasks(loadedTasks);
		});
	}, []);

	const handleAddTask = () => {
		push(taskDbref, { title: newTask })
			.then((addedTask) => {
				setNewTask(''); // Сбросить поле ввода после добавления задачи
			})
			.catch((error) => {
				console.error('Ошибка при добавлении задачи:', error);
			});
	};

	const handleEditClick = (taskId, taskTitle) => {
		setEditingTask({ id: taskId, title: taskTitle });
	};

	const handleEditTask = (taskId, newTitle) => {
		const taskRef = ref(db, `tasks/${taskId}`);
		update(taskRef, { title: newTitle })
			.then(() => {
				setEditingTask({ id: null, title: '' }); // Сбрасываем editingTask после обновления
			})
			.catch((error) => {
				console.error('Ошибка при изменении задачи:', error);
			});
	};

	const handleDeleteTask = (taskId) => {
		console.log(taskId); // Выводим текущее значение taskId в консоль
		const taskRef = ref(db, `tasks/${taskId}`);
		remove(taskRef)
			.then(() => {
				console.log('Задача успешно удалена');
			})
			.catch((error) => {
				console.error('Ошибка при удалении задачи:', error);
			});
	};

	const handleSortTask = () => {
		setSortMode(!sortMode); // Переключаем режим сортировки
	};

	const getSortedTasks = () => {
		const taskIds = Object.keys(tasks);
		if (sortMode) {
			// Сортировка по алфавиту
			taskIds.sort((a, b) => {
				const taskA = tasks[a].title.toLowerCase();
				const taskB = tasks[b].title.toLowerCase();
				if (taskA < taskB) return -1;
				if (taskA > taskB) return 1;
				return 0;
			});
		}
		const sortedTasks = {};
		taskIds.forEach((taskId) => {
			sortedTasks[taskId] = tasks[taskId];
		});
		return sortedTasks;
	};

	return {
		tasks: sortMode ? getSortedTasks() : tasks,
		newTask,
		setNewTask,
		editingTask,
		setEditingTask,
		handleAddTask,
		handleEditClick,
		handleEditTask,
		handleDeleteTask,
		handleSortTask,
		sortMode,
	};
};
