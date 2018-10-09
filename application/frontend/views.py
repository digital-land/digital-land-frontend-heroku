from flask import (
    Blueprint,
    render_template,
    request,
    json)

frontend = Blueprint('frontend', __name__, template_folder='templates')

@frontend.route('/')
def index():
    return render_template('index.html')

@frontend.route('/buttons')
def buttons():
    return render_template('buttons.html')

@frontend.route('/hero')
def hero():
    return render_template('hero.html')

# set the assetPath variable for use in 
# jinja templates
@frontend.context_processor
def asset_path_context_processor():
    return {'assetPath': '/static/govuk-frontend/assets'}
