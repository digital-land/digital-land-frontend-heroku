import validators

from application.filter.raw_template import get_jinja_template_raw
from application.filter.organisation_mapper import map_organisation_id_filter


def slash_to_dash(text):
    """
    Given a string replace / with -
    useful for making urls from strings with /s
    e.g. 2020/06/04 becomes 2020-06-04
    """
    return text.replace("/", "-")


def reduce_url_to_parent(url):
	if url.count("/") > 1:
		return url.rsplit('/',1)[0]
	return url


def float_to_int(v):
    """
    Returns integer from float
    """
    if v:
        return int(float(v))
    return None


def is_valid_uri(uri):
    """
    Check whether uri is valid, useful for links
    """
    if validators.url(uri):
        return True
    return False


def pluralise(str, count, str_on='s', str_off=""):
    """
    Return string with plural suffix if count is not 1.
    By default use 's' as the suffix.

    * If count is 0, vote{{ "resource"|pluralise(count) }} display "resources".
    * If count is 1, vote{{ "resource"|pluralise(count) }} display "resource".
    * If count is 2, vote{{ "resource"|pluralise(count) }} display "resources".

    Can provide args to customise plural suffix

    * If count is 0, vote{{ "country"|pluralise(count, "ies", "y") }} display "countries".
    * If count is 1, vote{{ "country"|pluralise(count, "ies", "y") }} display "country".
    * If count is 2, vote{{ "country"|pluralise(count, "ies", "y") }} display "countries".
    """
    if not count == 1:
        strip_count = -1*len(str_off) if len(str_off) > 0 else len(str)
        return str[:strip_count]+str_on
    else:
        return str


###################
# Heatmap         #
###################

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
