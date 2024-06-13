import { useState, useEffect } from 'react';

export const App = () => {
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/todos')
			.then((loadedData) => loadedData.json())
			.then((loadedTasks) => {
				const firstFiveTasks = loadedTasks.slice(0, 10);
				setTasks(firstFiveTasks);
			})
			.catch((error) => {
				console.error('Error fetching tasks:', error);
			});
	}, []);

	return (
		<div className="todo-container">
			<h1 className="todo-title">My To-Do List</h1>
			<ul className="todo-list">
				{tasks.map((task) => (
					<li key={task.id}>{task.title}</li>
				))}
			</ul>
		</div>
	);
};
