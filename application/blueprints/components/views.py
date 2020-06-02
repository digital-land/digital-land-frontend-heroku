from flask import (
    Blueprint,
    render_template,
    request,
    json)

components = Blueprint('components', __name__, template_folder='templates', url_prefix='/component')

dl_component_template_dir = 'dl-component-examples/'

@components.route('/buttons')
def buttons():
    return render_template(f'{dl_component_template_dir}buttons.html')

@components.route('/contribution-bars')
def contribution_bars():
    return render_template(f'{dl_component_template_dir}contribution-bars.html')

@components.route('/collection-summary-card')
def collection_summary_card():
    return render_template(f'{dl_component_template_dir}collection-summary-card/index.html')

@components.route('/collection-summary-card/example')
def collection_summary_card_example():
    return render_template(f'{dl_component_template_dir}collection-summary-card/example.html')

@components.route('/collection-summary-card/example-full')
def collection_summary_card_example_full():
    return render_template(f'{dl_component_template_dir}collection-summary-card/example-full.html')

@components.route('/data-tables')
def data_tables():
    return render_template(f'{dl_component_template_dir}data-tables.html')

@components.route('/filter-group')
def filter_group():
    return render_template(f'{dl_component_template_dir}filter-group.html')

@components.route('/hero')
def hero():
    return render_template(f'{dl_component_template_dir}hero/index.html')

@components.route('/hero/example')
def hero_example():
    return render_template(f'{dl_component_template_dir}hero/example.html')

@components.route('/highlight-box')
def highlight_box():
    return render_template(f'{dl_component_template_dir}highlight-box.html')

@components.route('/highlight-box/double-example')
def highlight_box_double_example():
    return render_template(f'{dl_component_template_dir}highlight-box/double-example.html')

@components.route('/hub')
def hub():
    return render_template(f'{dl_component_template_dir}hub.html')

@components.route('/header')
def header():
    return render_template(f'{dl_component_template_dir}header/index.html')

@components.route('/header/example')
def header_example():
    return render_template(f'{dl_component_template_dir}header/example.html')

@components.route('/info-text')
def info_text():
    return render_template(f'{dl_component_template_dir}info-text.html')

@components.route('/input-copy')
def input_copy():
    return render_template(f'{dl_component_template_dir}input-copy/index.html')

@components.route('/input-copy/example')
def input_copy_example():
    return render_template(f'{dl_component_template_dir}input-copy/example.html')

@components.route('/contents-section')
def contents_section():
    return render_template(f'{dl_component_template_dir}contents.html')

@components.route('/lists')
def lists():
    return render_template(f'{dl_component_template_dir}lists.html')

@components.route('/lists/organisation-example')
def organisation_list_example():
    return render_template('organisation-list-example.html')

@components.route('/lists/organisation-example-full')
def organisation_list_example_full():
    return render_template('organisation-list-example-full.html')

@components.route('/page-feedback')
def page_feedback():
    return render_template(f'{dl_component_template_dir}/page-feedback/index.html')

@components.route('/page-feedback/example')
def page_feedback_example():
    return render_template(f'{dl_component_template_dir}/page-feedback/example.html')

@components.route('/pagination')
def pagination():
    return render_template('publishing-components/pagination.html')

@components.route('/panels')
def panels():
    return render_template(f'{dl_component_template_dir}panels.html')

@components.route('/related-items')
def related_items():
    return render_template(f'{dl_component_template_dir}related-items.html')

@components.route('/search')
def search():
    return render_template(f'{dl_component_template_dir}search.html')

@components.route('/tabs')
def tabs():
    return render_template(f'{dl_component_template_dir}tabs.html')

@components.route('/tags')
def tags():
    return render_template(f'{dl_component_template_dir}tags.html')

@components.route('/task-list')
def task_list():
    return render_template(f'{dl_component_template_dir}task-list.html')

@components.route('/timeline')
def timeline():
    return render_template(f'{dl_component_template_dir}timeline/index.html')

@components.route('/timeline/example')
def timeline_example():
    return render_template(f'{dl_component_template_dir}timeline/example.html', partial_str="dl-component-examples/timeline/partial.html")

@components.route('/timeline/collections-example')
def timeline_collections_example():
    return render_template(f'{dl_component_template_dir}timeline/example.html', partial_str="dl-component-examples/timeline/collector-partial.html")

@components.route('/visualising-data')
def visualising_data():
    return render_template(f'{dl_component_template_dir}visualising-data.html')

@components.route('/tags/example')
def tags_example():
    return render_template('iframe-base.html', partial_name='partials/tags.html')
