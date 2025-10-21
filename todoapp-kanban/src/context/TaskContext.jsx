import React, { createContext, useContext, useState, useCallback } from 'react';
import { useFirestore } from '../hooks/useFirestore';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [boards, setBoards, loading] = useFirestore();
    const [theme, setTheme] = useState('dark');

    // --- CRUD de Tarefas ---
    const addTask = useCallback((boardId, title) => {
        if (!title.trim()) return;
        const newTask = { id: uuidv4(), title, priority: 'Média' };
        setBoards(prev => prev.map(b => b.id === boardId ? { ...b, tasks: [newTask, ...b.tasks] } : b));
        toast.success("Tarefa adicionada!");
    }, [setBoards]);

    const editTask = useCallback((boardId, taskId, newTitle, newPriority) => {
        setBoards(prev => prev.map(b => b.id === boardId ? { ...b, tasks: b.tasks.map(t => t.id === taskId ? { ...t, title: newTitle, priority: newPriority } : t) } : b));
        toast.success("Tarefa atualizada!");
    }, [setBoards]);

    const deleteTask = useCallback((boardId, taskId) => {
        setBoards(prev => prev.map(b => b.id === boardId ? { ...b, tasks: b.tasks.filter(t => t.id !== taskId) } : b));
        toast.error("Tarefa excluída.");
    }, [setBoards]);
    
    // --- CRUD de Colunas (Boards) ---
    const addBoard = () => {
        const name = prompt("Nome da nova coluna:");
        if (name && name.trim()) {
            const newBoard = { id: uuidv4(), name: name.trim(), tasks: [] };
            setBoards(prev => [...prev, newBoard]);
            toast.success(`Coluna "${name.trim()}" criada!`);
        }
    };

    const editBoardName = (boardId, newName) => {
        if (!newName || !newName.trim()) return;
        setBoards(prev => prev.map(b => b.id === boardId ? { ...b, name: newName.trim() } : b));
        toast.success("Coluna renomeada!");
    };

    const deleteBoard = (boardId) => {
        if (window.confirm("Tem certeza que deseja excluir esta coluna e todas as suas tarefas?")) {
            setBoards(prev => prev.filter(b => b.id !== boardId));
            toast.error("Coluna excluída.");
        }
    };

    const toggleTheme = useCallback(() => {
    setTheme(prev => {
        const newTheme = prev === 'dark' ? 'light' : 'dark';
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        return newTheme;
    });
}, []);

    return (
        <TaskContext.Provider value={{
            boards, theme, loading,
            setBoards,
            addTask, editTask, deleteTask,
            addBoard, editBoardName, deleteBoard,
            toggleTheme
        }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = () => useContext(TaskContext);