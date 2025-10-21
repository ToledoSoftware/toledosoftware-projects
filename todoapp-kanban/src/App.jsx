import { Toaster } from 'react-hot-toast';
import { DndContext, closestCorners } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { TaskProvider, useTasks } from './context/TaskContext.jsx';
import { Header } from './components/Header'; // Corrigido
import { Board } from './components/Board'; // Corrigido

const AppContent = () => {
    const { boards, setBoards, theme, loading } = useTasks();

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const findBoard = (itemId) => boards.find(b => b.id === itemId || b.tasks.some(t => t.id === itemId));
        
        const activeBoard = findBoard(activeId);
        const overBoard = findBoard(overId);

        if (!activeBoard) return;

        // Movendo uma tarefa
        if (activeBoard) {
            const activeTaskIndex = activeBoard.tasks.findIndex(t => t.id === activeId);
            
            // Reordenando na mesma coluna
            if (activeBoard.id === overBoard.id) {
                const overTaskIndex = overBoard.tasks.findIndex(t => t.id === overId);
                setBoards(prev => prev.map(b => b.id === activeBoard.id ? { ...b, tasks: arrayMove(b.tasks, activeTaskIndex, overTaskIndex) } : b));
            } 
            // Movendo para outra coluna
            else {
                const overTaskIndex = overBoard.tasks.findIndex(t => t.id === overId);
                const movedTask = activeBoard.tasks[activeTaskIndex];
                
                setBoards(prev => {
                    const nextBoards = [...prev];
                    const sourceBoardIndex = nextBoards.findIndex(b => b.id === activeBoard.id);
                    const destBoardIndex = nextBoards.findIndex(b => b.id === overBoard.id);
                    
                    // Remove da origem
                    nextBoards[sourceBoardIndex].tasks.splice(activeTaskIndex, 1);
                    // Adiciona ao destino
                    nextBoards[destBoardIndex].tasks.splice(overTaskIndex >= 0 ? overTaskIndex : overBoard.tasks.length, 0, movedTask);
                    
                    return nextBoards;
                });
            }
        }
    };
    
    if (loading) {
        return <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>Sincronizando...</div>;
    }

    return (
        <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
            <Toaster position="bottom-right" />
            <Header />
            <main className="flex gap-4 overflow-x-auto p-4">
                <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
                    {boards.map(board => <Board key={board.id} board={board} />)}
                </DndContext>
            </main>
        </div>
    );
};

const App = () => (
    <TaskProvider>
        <AppContent />
    </TaskProvider>
);

export default App;