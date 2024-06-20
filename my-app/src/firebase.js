import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
	apiKey: 'AIzaSyCOJs-sa5GSvDyjM1mMVnFJT-J2ZR7yWiE',
	authDomain: 'todolist-17ab7.firebaseapp.com',
	projectId: 'todolist-17ab7',
	storageBucket: 'todolist-17ab7.appspot.com',
	messagingSenderId: '1088496781588',
	appId: '1:1088496781588:web:10aa52c9ae0bf8cd869a01',
	databaseURL: 'https://todolist-17ab7-default-rtdb.europe-west1.firebasedatabase.app/',
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
