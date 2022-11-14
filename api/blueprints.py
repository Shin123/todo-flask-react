from flask import Blueprint, jsonify, request
from api.models import Todo, db
from api.utils import todo_to_dict


todos = Blueprint('todos', __name__)


@todos.route('/todos', methods=['GET'])
def list_all_todos():
    return jsonify([*map(todo_to_dict, Todo.query.all())])


@todos.route('/todos/<int:todo_id>', methods=['GET'])
def list_todo(todo_id):
    todo = Todo.query.filter_by(id=todo_id).first()
    return jsonify(todo_to_dict(todo))


@todos.route('/todos/', methods=['POST'])
def add_todo():
    post_data = request.get_json()
    print(post_data)
    if not post_data:
        response = {'code': 400, 'message': 'Invalid payload.'}
        return jsonify(response), response.get('code')

    task = post_data.get('task')
    todo = Todo(task=task)
    db.session.add(todo)
    db.session.commit()

    response = {'code': 201, 'message': 'Task added.'}
    return jsonify(response), response.get('code')


@todos.route('/todos/<int:todo_id>', methods=['PATCH'])
def update_todo():
    pass


@todos.route('/todos/<int:todo_id>', methods=['DELETE'])
def delete_todo():
    pass
