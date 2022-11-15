from flask import jsonify


def generate_response(code, message):
    return jsonify({'code': code, 'message': message}), code
