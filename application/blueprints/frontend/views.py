from flask import (
    Blueprint,
    render_template,
    request,
    json)

frontend = Blueprint('frontend', __name__, template_folder='templates')

@frontend.route('/')
def index():
    return render_template('index.html')

@frontend.route('/component')
def components():
    return render_template('components.html')

@frontend.route('/javascripts')
def javascripts():
    return render_template('javascripts.html')

@frontend.route('/js/mhclg-maps')
def mhclg_maps():
    return render_template('js-docs/mhclg-maps.html')

@frontend.route('/js/accessible-autocomplete')
def accessible_autocomplete():
    return render_template('js-docs/accessible-autocomplete.html')

# set the assetPath variable for use in 
# jinja templates
@frontend.context_processor
def asset_path_context_processor():
    return {'assetPath': '/static/govuk-frontend/assets'}

# test and example pages
@frontend.route('/local-plans')
def local_plans():
    return render_template('local-plans.html')

####################
# Guides
####################

@frontend.route('/guide/how-to-use-own-projects')
def include_in_projects():
    return render_template('guides/include-dl-frontend.html')


@frontend.route('/guide/difference-between-digital-land-frontend-and-govuk-design-system')
def difference_between_dlf_gds():
    return render_template('guides/difference-between-dlf-govuk-ds.html')

####################
# Publishing components
####################

@frontend.route('/publishing')
def publishing_components():
    return render_template('guidance-components.html')

####################
# Govuk jinja components
####################

@frontend.route('/jinja')
def jinja():
    return render_template('jinja.html')

@frontend.route('/jinja/port-nunjucks-macro-to-jinja')
def port_to_jinja():
    return render_template('guides/nunjucks-to-jinja.html')

@frontend.route('/jinja/govuk-components/date-input')
def date_input():
    return render_template('govuk-jinja-component-examples/date-input.html')
