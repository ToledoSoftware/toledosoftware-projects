import React from 'react';
import { useTasks } from '../context/TaskContext';
import { ActionButton } from './ActionButton';

export const Header = () => {
    const { theme, toggleTheme, addBoard } = useTasks();

    return (
        <header className="flex justify-between items-center mb-6 px-4 pt-4">
            <h1 className={`text-3xl sm:text-4xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Kanban Colaborativo
            </h1>
            <div className="flex gap-2">
                <ActionButton onClick={addBoard} colorClass="bg-green-600">+ Nova Coluna</ActionButton>
                <ActionButton onClick={toggleTheme} colorClass="bg-gray-500">
                    {theme === 'dark' ? 'Modo Claro' : 'Modo Escuro'}
                </ActionButton>
            </div>
        </header>
    );
};