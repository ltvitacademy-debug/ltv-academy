# Script — dbt Project Structure

## Segment 1 (title)

Whether you're using dbt Cloud or dbt Core, every dbt project shares the same skeleton of folders and one required config file.

## Segment 2 (screenshot: real project folder structure)

This is the real folder structure dbt init generates: models, macros, tests, a data folder for seeds, an analysis folder, and dbt_project.yml open showing its actual YAML configuration.

## Segment 3 (steps: what each folder holds)

Models hold your transformation SQL. Macros hold reusable Jinja snippets. Tests hold one-off SQL assertions. Data holds small static CSV files loaded as seeds. Each top-level folder tells you exactly what kind of file lives inside it.

## Segment 4 (steps: what dbt_project.yml does)

dbt_project.yml is the file that makes a folder an actual dbt project — it sets the project name, points at a connection profile by name only, and can set model-level defaults like which folder builds as a view.

## Segment 5 (outro)

Next lesson: Connecting dbt to Snowflake — the actual profile and credentials dbt_project.yml's profile line points at.
