const BASE_URL = 'http://localhost:3004/tasks';

export const fetchTasks = () => {
	return fetch(BASE_URL)
		.then((response) => response.json())
		.catch((error) => {
			console.error('Ошибка:', error);
		});
};

export const addTask = (newTask) => {
	return fetch(BASE_URL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify({ title: newTask }),
	})
		.then((response) => response.json())
		.catch((error) => {
			console.error('Ошибка:', error);
		});
};

export const removeTask = (taskId) => {
	return fetch(`${BASE_URL}/${taskId}`, {
		method: 'DELETE',
	})
		.then((response) => response.json())
		.catch((error) => {
			console.error('Ошибка:', error);
		});
};
export const editTask = (editingTask) => {
	return fetch(`${BASE_URL}/${editingTask.id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify({ title: editingTask.title }),
	})
		.then((response) => response.json())
		.catch((error) => {
			console.error('Ошибка:', error);
		});
};
