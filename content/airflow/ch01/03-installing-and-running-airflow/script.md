# Script — Installing & Running Airflow

## Segment 1 (title)

Airflow's own docs are explicit: install it with pip, and always pin both the Airflow version and a constraints file — a tested, version-matched list of every dependency, so pip doesn't pull in combinations that were never tested together.

## Segment 2 (code: pip install)

Here's the real command — apache-airflow, pinned to a version, with a constraints URL matched to that version and your Python version. Need specific integrations, like talking to a database? Add an extra in brackets, like apache-airflow bracket celery bracket — provider packages get their own lesson later.

## Segment 3 (code: airflow standalone)

Once it's installed, one command does the rest — airflow standalone. It initializes the metadata database, creates an admin user, and starts the scheduler, webserver, and triggerer, all in one process. That's the fastest path from nothing installed to a working Airflow instance with a real UI.

## Segment 4 (steps: after standalone)

The UI is at localhost 8080. In current Airflow versions the admin password isn't always printed to the terminal — it's saved to a generated file inside dollar AIRFLOW_HOME, by default a folder called airflow in your home directory. Cat that file, log in as admin, and you're in.

## Segment 5 (outro)

Next lesson: a real tour of that UI — the DAGs list, the Grid view, the Graph view, and more.
