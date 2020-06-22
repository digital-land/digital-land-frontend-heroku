import os
from flask import current_app as app


def get_jinja_template_raw(path):
	if path:
		template_file_path = os.path.join(app.root_path, app.template_folder, path)
		if os.path.exists(template_file_path):
			file = open(template_file_path, 'r') 
			return file.read()
	return None


def reduce_url_to_parent(url):
	if url.count("/") > 1:
		return url.rsplit('/',1)[0]
	return url


def extract_day(date_str):
    if date_str:
        return int(date_str.split("-")[2])
    return None


def extract_month(date_str):
    if date_str:
        return date_str.split("-")[1]
    return None


def map_month(num):
    month_map = {
        "01": "Jan",
        "02": "Feb",
        "03": "Mar",
        "04": "Apr",
        "05": "May",
        "06": "Jun",
        "07": "Jul",
        "08": "Aug",
        "09": "Sep",
        "10": "Oct",
        "11": "Nov",
        "12": "Dec",
    }
    if num and num in month_map.keys():
        return month_map[num]
    return None
