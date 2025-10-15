import React, { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useTasks } from '../context/TaskContext';
import { TaskCard } from './TaskCard';
import { ActionButton } from './ActionButton';

export const Board = ({ board }) => {
    const { addTask, editTask, deleteTask, editBoardName, deleteBoard } = useTasks();
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [isEditingName, setIsEditingName] = useState(false);
    const [boardName, setBoardName] = useState(board.name);

    const { setNodeRef, isOver } = useDroppable({ id: board.id });

    const handleNameSave = () => {
        editBoardName(board.id, boardName);
        setIsEditingName(false);
    };

    return (
        <div className="w-[300px] p-3 rounded-xl bg-gray-700 shadow-xl flex-shrink-0 flex flex-col">
            <div className="flex justify-between items-center mb-3">
                {isEditingName ? (
                    <input
                        value={boardName}
                        onChange={e => setBoardName(e.target.value)}
                        onBlur={handleNameSave}
                        onKeyDown={e => e.key === 'Enter' && handleNameSave()}
                        className="text-xl font-bold bg-gray-600 text-white rounded px-2 py-1 w-full"
                        autoFocus
                    />
                ) : (
                    <h2 onClick={() => setIsEditingName(true)} className="text-violet-400 text-xl font-extrabold cursor-pointer">
                        {board.name} ({board.tasks.length})
                    </h2>
                )}
                <ActionButton onClick={() => deleteBoard(board.id)} colorClass="bg-transparent hover:bg-red-500/50" title="Excluir Coluna">
                    &#x2715;
                </ActionButton>
            </div>

            <div className="mb-3 flex gap-2">
                <input
                    value={newTaskTitle}
                    onChange={e => setNewTaskTitle(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && (addTask(board.id, newTaskTitle), setNewTaskTitle(''))}
                    placeholder="Nova tarefa..."
                    className="flex-grow p-2 rounded text-sm bg-gray-600 text-white border-gray-500 focus:ring-violet-500"
                />
                <ActionButton onClick={() => { addTask(board.id, newTaskTitle); setNewTaskTitle(''); }} colorClass="bg-violet-600" disabled={!newTaskTitle.trim()}>
                    +
                </ActionButton>
            </div>

            <SortableContext id={board.id} items={board.tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
                <div ref={setNodeRef} className={`flex-grow min-h-[100px] rounded-lg transition-colors ${isOver ? 'bg-violet-900/20' : ''} overflow-y-auto pr-1`}>
                    {board.tasks.map(task => (
                        <TaskCard key={task.id} boardId={board.id} task={task} onEdit={editTask} onDelete={deleteTask} />
                    ))}
                </div>
            </SortableContext>
        </div>
    );
};