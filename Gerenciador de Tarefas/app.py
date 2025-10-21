# app.py (Atualizado com UUIDs)

from flask import Flask, request, jsonify
import json
import uuid # Importa a biblioteca para IDs únicos

app = Flask(__name__)

# --- Funções Auxiliares para Manipular o "Banco de Dados" JSON ---

def load_tasks():
    """Carrega as tarefas do arquivo tasks.json."""
    try:
        with open('tasks.json', 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        # Se o arquivo não existe, começamos com uma lista vazia.
        return []

def save_tasks(tasks):
    """Salva a lista de tarefas no arquivo tasks.json."""
    with open('tasks.json', 'w') as f:
        json.dump(tasks, f, indent=4)

# --- Endpoints da API ---

@app.route('/tasks', methods=['GET'])
def get_tasks():
    """Retorna a lista de todas as tarefas."""
    tasks = load_tasks()
    return jsonify(tasks)

@app.route('/tasks', methods=['POST'])
def add_task():
    """Adiciona uma nova tarefa à lista."""
    if not request.json or not 'title' in request.json:
        return jsonify({'error': 'O título é obrigatório'}), 400

    tasks = load_tasks()
    new_task = {
        'id': str(uuid.uuid4()),  # MELHORIA: Gera um ID único e universal
        'title': request.json['title'],
        'completed': False
    }
    tasks.append(new_task)
    save_tasks(tasks)
    return jsonify(new_task), 201

@app.route('/tasks/<string:task_id>', methods=['GET'])
def get_task(task_id):
    """Retorna uma única tarefa pelo seu ID."""
    tasks = load_tasks()
    task = next((task for task in tasks if task['id'] == task_id), None)
    if task is None:
        return jsonify({'error': 'Tarefa não encontrada'}), 404
    return jsonify(task)

@app.route('/tasks/<string:task_id>', methods=['PUT'])
def update_task(task_id):
    """Atualiza o título ou o status de uma tarefa."""
    tasks = load_tasks()
    task = next((task for task in tasks if task['id'] == task_id), None)
    if task is None:
        return jsonify({'error': 'Tarefa não encontrada'}), 404

    # Atualiza os campos se eles forem fornecidos no corpo da requisição
    task['title'] = request.json.get('title', task['title'])
    task['completed'] = request.json.get('completed', task['completed'])
    
    save_tasks(tasks)
    return jsonify(task)

@app.route('/tasks/<string:task_id>', methods=['DELETE'])
def delete_task(task_id):
    """Deleta uma tarefa pelo seu ID."""
    tasks = load_tasks()
    task = next((task for task in tasks if task['id'] == task_id), None)
    if task is None:
        return jsonify({'error': 'Tarefa não encontrada'}), 404

    tasks.remove(task)
    save_tasks(tasks)
    return jsonify({'result': 'Tarefa deletada com sucesso'})

if __name__ == '__main__':
    app.run(debug=True)