# -*- coding: utf-8 -*-
import os
from flask import Flask, render_template
from flask.cli import load_dotenv

if os.environ['FLASK_ENV'] == 'production':
    dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
    load_dotenv(dotenv_path)


def create_app(config_filename):
    app = Flask(__name__)
    app.config.from_object(config_filename)
    register_errorhandlers(app)
    register_blueprints(app)
    app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 10
    return app


def register_errorhandlers(app):
    def render_error(error):
        # If a HTTPException, pull the `code` attribute; default to 500
        error_code = getattr(error, 'code', 500)
        return render_template("error/{0}.html".format(error_code)), error_code
    for errcode in [400, 401, 404, 500]:
        app.errorhandler(errcode)(render_error)
    return None


def register_blueprints(app):
    from application.blueprints.frontend.views import frontend
    app.register_blueprint(frontend)
    from application.blueprints.components.views import components
    app.register_blueprint(components)

