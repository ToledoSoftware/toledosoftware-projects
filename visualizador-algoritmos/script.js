document.addEventListener('DOMContentLoaded', () => {

    const GRID_WIDTH = 40; // 40 cÃ©lulas de largura
    const GRID_HEIGHT = 20; // 20 cÃ©lulas de altura

    // PosiÃ§Ãµes fixas para InÃ­cio e Fim (poderia ser dinÃ¢mico)
    const START_NODE_ROW = 10;
    const START_NODE_COL = 5;
    const FINISH_NODE_ROW = 10;
    const FINISH_NODE_COL = 35;

    const gridContainer = document.getElementById('grid-container');
    const startBtn = document.getElementById('start-btn');
    const resetBtn = document.getElementById('reset-btn');

    let grid = []; // O nosso modelo de dados (Array 2D)
    let isMouseDown = false; // Flag para saber se estamos desenhando paredes
    let isRunning = false;   // Flag para evitar cliques durante a animaÃ§Ã£o


    /**
     * Inicializa a grade.
     * Cria o modelo de dados (grid) e os elementos do DOM (divs).
     */
    function createGrid() {
        grid = []; // Limpa o modelo de dados
        gridContainer.innerHTML = ''; // Limpa o HTML
        
        // Ajusta o CSS do grid-container para ter o tamanho correto
        gridContainer.style.setProperty('--cols', GRID_WIDTH);
        gridContainer.style.gridTemplateColumns = `repeat(${GRID_WIDTH}, 25px)`;

        for (let row = 0; row < GRID_HEIGHT; row++) {
            const currentRow = [];
            for (let col = 0; col < GRID_WIDTH; col++) {
                const node = createNode(row, col);
                currentRow.push(node);

                const nodeElement = document.createElement('div');
                nodeElement.className = 'node';
                nodeElement.id = `node-${row}-${col}`;
                
                // Adiciona os estados especiais (InÃ­cio, Fim)
                if (row === START_NODE_ROW && col === START_NODE_COL) {
                    node.isStart = true;
                    nodeElement.classList.add('node-start');
                } else if (row === FINISH_NODE_ROW && col === FINISH_NODE_COL) {
                    node.isFinish = true;
                    nodeElement.classList.add('node-finish');
                }

                nodeElement.addEventListener('mousedown', () => handleMouseDown(row, col));
                nodeElement.addEventListener('mouseenter', () => handleMouseEnter(row, col));
                nodeElement.addEventListener('mouseup', () => handleMouseUp());
                
                gridContainer.appendChild(nodeElement);
            }
            grid.push(currentRow);
        }
    }

    /**
     * Objeto "NÃ³" (cÃ©lula). ContÃ©m o estado de cada cÃ©lula.
     */
    function createNode(row, col) {
        return {
            row,
            col,
            isStart: false,
            isFinish: false,
            isWall: false,
            distance: Infinity, // DistÃ¢ncia de Dijkstra
            isVisited: false,   // Para o algoritmo
            previousNode: null, // Para reconstruir o caminho
        };
    }


    function handleMouseDown(row, col) {
        if (isRunning || grid[row][col].isStart || grid[row][col].isFinish) return;
        isMouseDown = true;
        toggleWall(row, col);
    }

    function handleMouseEnter(row, col) {
        if (isRunning || !isMouseDown || grid[row][col].isStart || grid[row][col].isFinish) return;
        toggleWall(row, col);
    }

    function handleMouseUp() {
        isMouseDown = false;
    }

    /**
     * Ativa ou desativa uma parede no modelo de dados e no DOM.
     */
    function toggleWall(row, col) {
        const node = grid[row][col];
        const nodeElement = document.getElementById(`node-${row}-${col}`);
        
        node.isWall = !node.isWall;
        nodeElement.classList.toggle('node-wall');
    }


    startBtn.addEventListener('click', () => {
        if (isRunning) return;
        clearPath(); // Limpa animaÃ§Ãµes antigas
        visualizeDijkstra();
    });

    resetBtn.addEventListener('click', () => {
        if (isRunning) return;
        createGrid(); // Recria a grade do zero
    });

    /**
     * Limpa apenas as animaÃ§Ãµes (visited/path), mantendo as paredes.
     */
    function clearPath() {
        for (let row = 0; row < GRID_HEIGHT; row++) {
            for (let col = 0; col < GRID_WIDTH; col++) {
                const node = grid[row][col];
                const nodeElement = document.getElementById(`node-${row}-${col}`);
                
                node.distance = Infinity;
                node.isVisited = false;
                node.previousNode = null;
                
                // Remove apenas classes de animaÃ§Ã£o
                if (!node.isStart && !node.isFinish && !node.isWall) {
                    nodeElement.classList.remove('node-visited', 'node-path');
                }
            }
        }
        // Reseta o nÃ³ inicial
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        startNode.distance = 0;
    }



    /**
     * Executa a lÃ³gica de Dijkstra e dispara as animaÃ§Ãµes.
     */
    async function visualizeDijkstra() {
        isRunning = true;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        
        // Lista de todos os nÃ³s que ainda nÃ£o visitamos.
        // No Dijkstra real, isso seria uma Fila de Prioridade (Priority Queue).
        // Para simplificar, usaremos um array.
        const unvisitedNodes = getAllNodes(grid);
        startNode.distance = 0;

        const visitedNodesInOrder = []; // Para a animaÃ§Ã£o de visita

        while (!!unvisitedNodes.length) {
            sortNodesByDistance(unvisitedNodes);
            const closestNode = unvisitedNodes.shift(); // .shift() remove o primeiro (menor)

            // Se encontrarmos uma parede, pulamos
            if (closestNode.isWall) continue;

            // Se o nÃ³ mais prÃ³ximo for Infinito, estamos presos (sem caminho)
            if (closestNode.distance === Infinity) {
                alert("NÃ£o hÃ¡ caminho possÃ­vel!");
                isRunning = false;
                return;
            }

            closestNode.isVisited = true;
            visitedNodesInOrder.push(closestNode); // Guarda para animar

            if (closestNode === finishNode) {
                await animateSearch(visitedNodesInOrder); // Espera a animaÃ§Ã£o de busca
                await animatePath(finishNode); // Anima o caminho
                isRunning = false;
                return;
            }

            updateUnvisitedNeighbors(closestNode, grid);
        }
    }

    /**
     * Retorna um array simples (1D) de todos os nÃ³s na grade.
     */
    function getAllNodes(grid) {
        const nodes = [];
        for (const row of grid) {
            for (const node of row) {
                nodes.push(node);
            }
        }
        return nodes;
    }

    /**
     * Ordena os nÃ³s pela distÃ¢ncia (simulando a fila de prioridade).
     */
    function sortNodesByDistance(nodes) {
        nodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
    }

    /**
     * Para um nÃ³, encontra seus vizinhos e atualiza suas distÃ¢ncias.
     */
    function updateUnvisitedNeighbors(node, grid) {
        const neighbors = getNeighbors(node, grid);
        for (const neighbor of neighbors) {
            // A distÃ¢ncia para o vizinho Ã© a distÃ¢ncia do nÃ³ atual + 1
            neighbor.distance = node.distance + 1;
            neighbor.previousNode = node; // Guarda de onde viemos
        }
    }

    /**
     * Encontra os vizinhos vÃ¡lidos (cima, baixo, esquerda, direita).
     */
    function getNeighbors(node, grid) {
        const neighbors = [];
        const { row, col } = node;

        if (row > 0) neighbors.push(grid[row - 1][col]); // Cima
        if (row < GRID_HEIGHT - 1) neighbors.push(grid[row + 1][col]); // Baixo
        if (col > 0) neighbors.push(grid[row][col - 1]); // Esquerda
        if (col < GRID_WIDTH - 1) neighbors.push(grid[row][col + 1]); // Direita

        // Filtra os que jÃ¡ foram visitados ou sÃ£o paredes
        return neighbors.filter(neighbor => !neighbor.isVisited && !neighbor.isWall);
    }

    
    /**
     * Anima as cÃ©lulas visitadas (ciano) uma por uma.
     */
    function animateSearch(visitedNodesInOrder) {
        return new Promise(resolve => {
            for (let i = 0; i < visitedNodesInOrder.length; i++) {
                // Se for o nÃ³ final, termina a animaÃ§Ã£o de busca
                if (i === visitedNodesInOrder.length - 1) {
                    setTimeout(() => resolve(), i * 15);
                }

                setTimeout(() => {
                    const node = visitedNodesInOrder[i];
                    if (!node.isStart && !node.isFinish) {
                        document.getElementById(`node-${node.row}-${node.col}`).classList.add('node-visited');
                    }
                }, i * 15); // Atraso de 15ms por nÃ³
            }
        });
    }

    /**
     * Anima o caminho mais curto (amarelo)
     */
    function animatePath(finishNode) {
        const path = getShortestPath(finishNode);
        return new Promise(resolve => {
            for (let i = 0; i < path.length; i++) {
                setTimeout(() => {
                    const node = path[i];
                    if (!node.isStart && !node.isFinish) {
                        document.getElementById(`node-${node.row}-${node.col}`).classList.add('node-path');
                    }
                    if (i === path.length - 1) {
                        resolve();
                    }
                }, i * 40); // Atraso de 40ms por nÃ³ (mais lento)
            }
        });
    }

    /**
     * ReconstrÃ³i o caminho do Fim atÃ© o ComeÃ§o, seguindo os 'previousNode'.
     */
    function getShortestPath(finishNode) {
        const path = [];
        let currentNode = finishNode;
        while (currentNode !== null) {
            path.unshift(currentNode); // Adiciona no inÃ­cio do array
            currentNode = currentNode.previousNode;
        }
        return path;
    }

    createGrid();
});
