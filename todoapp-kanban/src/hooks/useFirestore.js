import { useState, useEffect } from 'react';
import { db, auth } from '../firebase/config';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';

const appId = window.__app_id || 'default-app-id';

export const useFirestore = () => {
    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserId(user.uid);
            } else {
                signInAnonymously(auth).catch(e => toast.error("Falha na autenticação."));
            }
        });
        return () => unsubscribe();
    }, []);

    const saveBoardsToFirestore = (currentBoards) => {
        if (!db || !userId) return;
        const docRef = doc(db, 'artifacts', appId, 'users', userId, 'boards', 'kanban_state');
        setDoc(docRef, { boards: currentBoards, lastUpdated: new Date().toISOString() })
            .then(() => console.log("Boards saved."))
            .catch(e => toast.error("Erro ao salvar alterações."));
    };

    useEffect(() => {
        if (!db || !userId) return;
        const docRef = doc(db, 'artifacts', appId, 'users', userId, 'boards', 'kanban_state');

        const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
                setBoards(docSnapshot.data().boards || []);
            } else {
                const initialBoards = [
                    { id: uuidv4(), name: 'To Do', tasks: [{ id: uuidv4(), title: 'Implementar dnd-kit', priority: 'Alta' }] },
                    { id: uuidv4(), name: 'In Progress', tasks: [{ id: uuidv4(), title: 'Adicionar CRUD de colunas', priority: 'Média' }] },
                    { id: uuidv4(), name: 'Done', tasks: [] },
                ];
                setBoards(initialBoards);
                saveBoardsToFirestore(initialBoards);
            }
            setLoading(false);
        }, (error) => {
            toast.error("Falha ao sincronizar dados.");
            console.error("Firestore Listener Error:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [userId]);

    const setPersistedBoards = (newBoardsOrFn) => {
        setBoards(prevBoards => {
            const newBoards = typeof newBoardsOrFn === 'function' ? newBoardsOrFn(prevBoards) : newBoardsOrFn;
            saveBoardsToFirestore(newBoards);
            return newBoards;
        });
    };

    return [boards, setPersistedBoards, loading];
};