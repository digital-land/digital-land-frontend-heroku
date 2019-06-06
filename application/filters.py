def reduce_url_to_parent(url):
	if url.count("/") > 1:
		return url.rsplit('/',1)[0]
	return url
