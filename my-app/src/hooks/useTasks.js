import { useState, useEffect } from 'react';
import { fetchTasks, addTask, removeTask, editTask } from '../api';

export const useTasks = () => {
	const [tasks, setTasks] = useState([]);
	const [newTask, setNewTask] = useState('');
	const [editingTask, setEditingTask] = useState({ id: null, title: '' });

	useEffect(() => {
		fetchTasks().then((loadedTasks) => {
			setTasks(loadedTasks);
		});
	}, []);

	const handleAddTask = () => {
		addTask(newTask).then((addedTask) => {
			setTasks((prevTasks) => [...prevTasks, addedTask]);
			setNewTask(''); // Сбросить поле ввода после добавления задачи
		});
	};
	const handleEditClick = (taskId, taskTitle) => {
		setEditingTask({ id: taskId, title: taskTitle });
	};

	const handleEditTask = () => {
		editTask(editingTask).then((changedTask) => {
			setTasks(
				tasks.map((task) => (task.id === editingTask.id ? changedTask : task)),
			);
			setEditingTask({ id: null, title: '' });
		});
	};
	const handleDeleteTask = (taskId) => {
		removeTask(taskId).then((removedTask) => {
			console.log('Задача удалена', removedTask);
			setTasks(tasks.filter((task) => task.id !== taskId));
			setNewTask('');
		});
	};
	const handleSortTask = () => {
		const sortedTasks = [...tasks];

		sortedTasks.sort((a, b) => {
			if (a.title < b.title) {
				return -1;
			}
			if (a.title > b.title) {
				return 1;
			}
			return 0;
		});

		setTasks(sortedTasks);
	};
	return {
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
	};
};
