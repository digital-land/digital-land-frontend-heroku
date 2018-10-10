Digital Land Frontend
=====================

Digital Land Frontend contains the code used to build user interfaces for the projects that MHCLG's digital land team are working on.

It builds on the [GOVUK Design System](https://github.com/alphagov/govuk-frontend) code, making the majority of it work with Flask applications.

Requirements

- [Python 3](https://www.python.org/)
- [Node](https://nodejs.org/en/) and [Npm](https://www.npmjs.com/)
- [Gulp](https://gulpjs.com/)

Getting Started
===============

Install Flask and python dependencies

    pip install -r requirements.txt

Install front end build tool (gulp)

    npm install && gulp scss

Run the app

    flask run


To do list
===============

* alter script to also fetch compiled govuk-frontend js [see repo](https://github.com/alphagov/govuk-frontend/tree/master/dist)