Digital Land Frontend
=====================

Digital Land Frontend contains the code used to build user interfaces for the projects that MHCLG's digital land team are working on.

It builds on the [GOVUK Design System](https://github.com/alphagov/govuk-frontend) code, making the majority of it work with Flask applications.

Requirements

- [Python 3](https://www.python.org/)
- [Node](https://nodejs.org/en/) and [Npm](https://www.npmjs.com/)
- [Gulp](https://gulpjs.com/)

Getting started
===============

Install Flask and python dependencies

    pip install -r requirements.txt

Install front end build tool (gulp)

    npm install && gulp scss

Run the app

    flask run

Environment variables
===============

Create a `.flaskenv` file and put these environment variables in it

    FLASK_ENV=development
    FLASK_CONFIG=config.DevelopmentConfig
    FLASK_APP=application.wsgi:app
    SECRET_KEY=doesnotmatter
    MAPBOX_TOKEN=<<your-mapbox-token>>


To do list
===============

* alter script to also fetch compiled govuk-frontend js [see repo](https://github.com/alphagov/govuk-frontend/tree/master/dist)