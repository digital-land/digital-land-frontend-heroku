import os
from application.factory import create_app

app = create_app(os.getenv('FLASK_CONFIG') or 'config.DevelopmentConfig')

@app.shell_context_processor
def make_shell_context():
    return dict(app=app)
