import os
from flask import current_app as app


def get_jinja_template_raw(path):
	if path:
		template_file_path = os.path.join(app.root_path, app.template_folder, path)
		if os.path.exists(template_file_path):
			file = open(template_file_path, 'r') 
			return file.read()
	return None

