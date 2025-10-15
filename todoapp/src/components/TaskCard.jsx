import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ActionButton } from './ActionButton';

export const TaskCard = React.memo(({ boardId, task, onDelete, onEdit }) => {
    const [editing, setEditing] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [priority, setPriority] = useState(task.priority);

    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    const save = () => {
        onEdit(boardId, task.id, title, priority);
        setEditing(false);
    };
    
    const getPriorityColor = (p) => ({
        'Alta': 'border-red-500', 'Média': 'border-yellow-500', 'Baixa': 'border-green-500'
    }[p] || 'border-gray-500');

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}
            className={`p-3 mb-2 rounded-lg shadow-md bg-gray-800 hover:bg-gray-700 cursor-grab touch-none border-l-4 ${getPriorityColor(task.priority)}`}>
            {editing ? (
                <div className="space-y-2">
                    <input value={title} onChange={e => setTitle(e.target.value)} className="w-full p-1 rounded text-gray-900"/>
                    <select value={priority} onChange={e => setPriority(e.target.value)} className="w-full p-1 rounded text-gray-900 text-sm">
                        <option>Alta</option><option>Média</option><option>Baixa</option>
                    </select>
                </div>
            ) : (
                <h3 className="text-base font-semibold text-white">{task.title}</h3>
            )}
            <div className="flex justify-end gap-2 mt-3">
                <ActionButton onClick={editing ? save : () => setEditing(true)} colorClass={editing ? "bg-violet-600" : "bg-blue-600"}>
                    {editing ? 'Salvar' : 'Editar'}
                </ActionButton>
                <ActionButton onClick={() => onDelete(boardId, task.id)} colorClass="bg-red-600">Excluir</ActionButton>
            </div>
        </div>
    );
});