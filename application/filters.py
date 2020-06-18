def reduce_url_to_parent(url):
	if url.count("/") > 1:
		return url.rsplit('/',1)[0]
	return url


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
