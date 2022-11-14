import os
from flask import Flask, jsonify
from api.config import config
from api.models import db
from api.blueprints import todos


app = Flask(__name__)

env_config = os.getenv('FLASK_CONFIG', 'dev')

app.config.from_object(config[env_config])
db.init_app(app)


with app.app_context():
    db.create_all()


@app.route('/api')
def hello():
    return jsonify({'response': "It's working"})


app.register_blueprint(todos)

if __name__ == '__main__':
    app.run()
