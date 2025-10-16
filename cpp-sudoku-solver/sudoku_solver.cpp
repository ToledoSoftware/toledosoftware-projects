// sudoku_solver.cpp
#include <iostream>

// Define o tamanho do nosso tabuleiro
#define N 9

// Função para imprimir o tabuleiro de forma legível
void printBoard(int grid[N][N]) {
    std::cout << "-------------------------" << std::endl;
    for (int row = 0; row < N; row++) {
        std::cout << "| ";
        for (int col = 0; col < N; col++) {
            std::cout << grid[row][col] << " ";
            if ((col + 1) % 3 == 0) {
                std::cout << "| ";
            }
        }
        std::cout << std::endl;
        if ((row + 1) % 3 == 0) {
            std::cout << "-------------------------" << std::endl;
        }
    }
}

// Verifica se é seguro colocar um número em uma determinada posição (linha, coluna)
bool isSafe(int grid[N][N], int row, int col, int num) {
    // 1. Verifica se o número já existe na linha
    for (int x = 0; x < N; x++) {
        if (grid[row][x] == num) {
            return false;
        }
    }

    // 2. Verifica se o número já existe na coluna
    for (int x = 0; x < N; x++) {
        if (grid[x][col] == num) {
            return false;
        }
    }

    // 3. Verifica se o número já existe no sub-grid 3x3
    int startRow = row - row % 3;
    int startCol = col - col % 3;
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            if (grid[i + startRow][j + startCol] == num) {
                return false;
            }
        }
    }

    return true; // Se passou em todas as verificações, é seguro
}

// Função principal que resolve o Sudoku usando backtracking
bool solveSudoku(int grid[N][N]) {
    int row, col;
    bool isEmpty = false;

    // Encontra a primeira célula vazia (com valor 0)
    for (row = 0; row < N; row++) {
        for (col = 0; col < N; col++) {
            if (grid[row][col] == 0) {
                isEmpty = true;
                break;
            }
        }
        if (isEmpty) {
            break;
        }
    }

    // Se não há mais células vazias, o Sudoku está resolvido! (Caso base da recursão)
    if (!isEmpty) {
        return true;
    }

    // Tenta colocar números de 1 a 9 na célula vazia
    for (int num = 1; num <= 9; num++) {
        // Verifica se é seguro colocar o número 'num' na posição [row][col]
        if (isSafe(grid, row, col, num)) {
            // Se for seguro, faz a tentativa
            grid[row][col] = num;

            // Chama a função recursivamente para o resto do tabuleiro
            if (solveSudoku(grid)) {
                return true; // Se a chamada recursiva encontrou uma solução, retorna true
            }

            // Se não levou a uma solução, desfaz a tentativa (BACKTRACK)
            grid[row][col] = 0;
        }
    }
    
    // Se nenhum número de 1 a 9 funcionou nesta célula, retorna false para acionar o backtrack na chamada anterior
    return false;
}

int main() {
    // Tabuleiro de exemplo (0 representa uma casa vazia)
    int grid[N][N] = {
        {5, 3, 0, 0, 7, 0, 0, 0, 0},
        {6, 0, 0, 1, 9, 5, 0, 0, 0},
        {0, 9, 8, 0, 0, 0, 0, 6, 0},
        {8, 0, 0, 0, 6, 0, 0, 0, 3},
        {4, 0, 0, 8, 0, 3, 0, 0, 1},
        {7, 0, 0, 0, 2, 0, 0, 0, 6},
        {0, 6, 0, 0, 0, 0, 2, 8, 0},
        {0, 0, 0, 4, 1, 9, 0, 0, 5},
        {0, 0, 0, 0, 8, 0, 0, 7, 9}
    };

    std::cout << "Tabuleiro inicial:" << std::endl;
    printBoard(grid);

    if (solveSudoku(grid)) {
        std::cout << "\nSolucao encontrada:" << std::endl;
        printBoard(grid);
    } else {
        std::cout << "\nNao existe solucao para este tabuleiro." << std::endl;
    }

    return 0;
}