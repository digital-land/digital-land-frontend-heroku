# -*- coding: utf-8 -*-

import sys
import glob
import os
import shutil
from tempfile import TemporaryDirectory
from urllib.request import urlopen, URLError, HTTPError
import zipfile
import pprint

def move_dir(src, to):
    for f in glob.glob(src):

        if not os.path.isdir(to):
            os.makedirs(to)

        shutil.move(f, to)

def rmdir(path):
    if os.path.isdir(path):
        shutil.rmtree(path)


class GovUkFrontend(object):

    url = (
        'https://github.com/alphagov/govuk-frontend/archive/'
        'master.zip')

    def __init__(self, app_dir):
        self.dest_dir = '{}/govuk-frontend'.format(app_dir)

    def clean(self):
        rmdir(self.dest_dir)

    def build(self, unzip_dir):
        print("Extracting src files....")
        move_dir(
            '{}/govuk-frontend-master/src/*'.format(unzip_dir),
            to=self.dest_dir)


def install(app_dir="src"):
    """
    Download and extract Govuk-frontend zip file into tempdir, then build
    """

    package = GovUkFrontend(app_dir)
    print("Downloading....", package.url)

    package.clean()

    with TemporaryDirectory() as download_dir:
        #dest_zip = '{}/{}.zip'.format(download_dir, "govuk-frontend")
        dest_zip = '{}/{}.zip'.format(download_dir, "govuk-frontend")
        unzip_dir = '{}/unzipped'.format(download_dir)

        #a, b = urllib.request.urlretrieve(package.url, dest_zip)
        try:
            zip_file = urlopen(package.url)
            open(dest_zip, "wb").write(zip_file.read())

        except HTTPError as e:
            print("HTTP Error:", e.code, package.url)
        except URLError as e:
            print("URL Error:", e.reason, package.url)

        with zipfile.ZipFile(dest_zip) as zf:
            zf.extractall(unzip_dir)

        package.build(unzip_dir)


if __name__ == "__main__":
    if len(sys.argv) > 1:
        install(sys.argv[1])
    else:
        install()
    