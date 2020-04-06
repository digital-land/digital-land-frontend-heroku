from flask import (
    Blueprint,
    render_template,
    request,
    json)

components = Blueprint('components', __name__, template_folder='templates', url_prefix='/component')

@components.route('/buttons')
def buttons():
    return render_template('buttons.html')

@components.route('/contribution-bars')
def contribution_bars():
    return render_template('contribution-bars.html')

@components.route('/data-tables')
def data_tables():
    return render_template('data-tables.html')

@components.route('/filter-group')
def filter_group():
    return render_template('filter-group.html')

@components.route('/hero')
def hero():
    return render_template('hero.html')

@components.route('/highlight-box')
def highlight_box():
    return render_template('highlight-box.html')

@components.route('/hub')
def hub():
    return render_template('hub.html')

@components.route('/info-text')
def info_text():
    return render_template('info-text.html')

@components.route('/contents-section')
def contents_section():
    return render_template('contents.html')

@components.route('/lists')
def lists():
    return render_template('lists.html')

@components.route('/pagination')
def pagination():
    return render_template('publishing-components/pagination.html')

@components.route('/panels')
def panels():
    return render_template('panels.html')

@components.route('/related-items')
def related_items():
    return render_template('related-items.html')

@components.route('/search')
def search():
    return render_template('search.html')

@components.route('/tabs')
def tabs():
    return render_template('tabs.html')

@components.route('/tags')
def tags():
    return render_template('tags.html')

@components.route('/task-list')
def task_list():
    return render_template('task-list.html')

@components.route('/visualising-data')
def visualising_data():
    return render_template('visualising-data.html')
