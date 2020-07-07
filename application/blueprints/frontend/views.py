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

####################
# Javascripts
####################

@frontend.route('/javascripts')
def javascripts():
    return render_template('javascripts.html')

@frontend.route('/js/dl-frontend')
def dl_frontend():
    return render_template('js-docs/dl-frontend.html')

@frontend.route('/js/helpers')
def js_helpers():
    return render_template('js-docs/js-helpers.html')

@frontend.route('/js/mhclg-maps')
def mhclg_maps():
    return render_template('js-docs/mhclg-maps.html')

@frontend.route('/js/accessible-autocomplete')
def accessible_autocomplete():
    return render_template('js-docs/accessible-autocomplete.html')

@frontend.route('/js/back-to-top')
def back_to_top():
    return render_template('js-docs/back-to-top.html')

@frontend.route('/js/back-to-top/example')
def back_to_top_example():
    return render_template('js-docs/examples/back-to-top-example.html')

@frontend.route('/js/back-to-top/banner-example')
def back_to_top_banner_example():
    return render_template('js-docs/examples/back-to-top-banner-example.html')

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

@frontend.route('/guide/which-frontend-assets-to-use')
def frontend_fit_together():
    return render_template('guides/how-frontends-fit-together.html')

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

@frontend.route('/jinja/govuk-components/accordion')
def accordion():
    return render_template('govuk-jinja-component-examples/accordion.html')

@frontend.route('/jinja/govuk-components/back-link')
def back_link():
    return render_template('govuk-jinja-component-examples/back-link.html')

@frontend.route('/jinja/govuk-components/breadcrumbs')
def breadcrumbs():
    return render_template('govuk-jinja-component-examples/breadcrumbs.html')

@frontend.route('/jinja/govuk-components/button')
def button():
    return render_template('govuk-jinja-component-examples/button.html')

@frontend.route('/jinja/govuk-components/character-count')
def character_count():
    return render_template('govuk-jinja-component-examples/char-count.html')

@frontend.route('/jinja/govuk-components/checkboxes')
def checkboxes():
    return render_template('govuk-jinja-component-examples/checkboxes.html')

@frontend.route('/jinja/govuk-components/date-input')
def date_input():
    return render_template('govuk-jinja-component-examples/date-input.html')

@frontend.route('/jinja/govuk-components/details')
def details():
    return render_template('govuk-jinja-component-examples/details.html')

@frontend.route('/jinja/govuk-components/error-summary')
def error_summary():
    return render_template('govuk-jinja-component-examples/error-summary.html')

@frontend.route('/jinja/govuk-components/error-message')
def error_message():
    return render_template('govuk-jinja-component-examples/error-message.html')

@frontend.route('/jinja/govuk-components/fieldset')
def fieldset():
    return render_template('govuk-jinja-component-examples/fieldset.html')

@frontend.route('/jinja/govuk-components/file-upload')
def file_upload():
    return render_template('govuk-jinja-component-examples/file-upload.html')

@frontend.route('/jinja/govuk-components/footer')
def footer():
    return render_template('govuk-jinja-component-examples/footer.html')

@frontend.route('/jinja/govuk-components/header')
def header():
    return render_template('govuk-jinja-component-examples/header.html')

@frontend.route('/jinja/govuk-components/inset-text')
def inset_text():
    return render_template('govuk-jinja-component-examples/inset-text.html')

@frontend.route('/jinja/govuk-components/panel')
def panel():
    return render_template('govuk-jinja-component-examples/panel.html')

@frontend.route('/jinja/govuk-components/phase-banner')
def phase_banner():
    return render_template('govuk-jinja-component-examples/phase-banner.html')

@frontend.route('/jinja/govuk-components/radios')
def radios():
    return render_template('govuk-jinja-component-examples/radios.html')

@frontend.route('/jinja/govuk-components/select')
def select():
    return render_template('govuk-jinja-component-examples/select.html')

@frontend.route('/jinja/govuk-components/summary-list')
def summary_list():
    return render_template('govuk-jinja-component-examples/summary-list.html')

@frontend.route('/jinja/govuk-components/tabs')
def tabs():
    return render_template('govuk-jinja-component-examples/tabs.html')

@frontend.route('/jinja/govuk-components/table')
def table():
    return render_template('govuk-jinja-component-examples/table.html')

@frontend.route('/jinja/govuk-components/tag')
def tag():
    return render_template('govuk-jinja-component-examples/tag.html')

@frontend.route('/jinja/govuk-components/textarea')
def textarea():
    return render_template('govuk-jinja-component-examples/textarea.html')

@frontend.route('/jinja/govuk-components/text-input')
def text_input():
    return render_template('govuk-jinja-component-examples/text-input.html')

@frontend.route('/jinja/govuk-components/warning-text')
def warning_text():
    return render_template('govuk-jinja-component-examples/warning-text.html')
