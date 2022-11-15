import os
from flask import Flask, jsonify
from dotenv import load_dotenv
from flask_cors import CORS
from api.config import config
from api.models import db
from api.blueprints import todos, generate_response

load_dotenv(dotenv_path="./.env.local")

app = Flask(__name__)
CORS(app)

env_config = os.getenv('FLASK_CONFIG', 'dev')

app.config.from_object(config[env_config])
db.init_app(app)


with app.app_context():
    db.create_all()


@app.route('/api')
def hello():
    return jsonify({'response': "It's working"})


@app.errorhandler(404)
def not_found(e):
    return generate_response(404, 'Resource not found.')


@app.errorhandler(400)
def bad_request(e):
    return generate_response(400, 'Bad request.')


app.register_blueprint(todos)

if __name__ == '__main__':
    app.run()
