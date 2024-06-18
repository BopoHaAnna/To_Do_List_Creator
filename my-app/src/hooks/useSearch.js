import { useState, useEffect } from 'react';

export const useSearch = (tasks) => {
	const [searchTerm, setSearchTerm] = useState('');
	const [searchResults, setSearchResults] = useState([]);

	useEffect(() => {
		const filteredTasks = tasks.filter((task) =>
			task.title.toLowerCase().includes(searchTerm.toLowerCase()),
		);
		setSearchResults(filteredTasks);
	}, [searchTerm, tasks]);

	const handleChange = (event) => {
		setSearchTerm(event.target.value);
	};

	return {
		searchTerm,
		searchResults,
		handleChange,
	};
};
