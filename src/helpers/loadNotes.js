import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';

export const loadNotes = async (uid) => {
	const notesQuery = query(collection(db, `${uid}/journal/notes`));
	const querySnapshot = await getDocs(notesQuery);

	const notes = [];

	querySnapshot.forEach((doc) => {
		notes.push({
			id: doc.id,
			...doc.data(),
		});
	});

	return notes;
};
