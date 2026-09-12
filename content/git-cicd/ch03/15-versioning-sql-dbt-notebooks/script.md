# Script — Versioning SQL, dbt Projects & Notebooks

## Segment 1 (title)

This lesson pulls Lessons 12 through 14 together into one real project layout. Everything under models, tests, and macros in a dbt project is hand-written source — it belongs in Git, no different from any other code.

## Segment 2 (code: what's ignored)

target, dbt_packages, and logs are all regenerated automatically every time dbt runs. Committing them creates merge conflicts on files nobody hand-edits and adds nothing useful to history — the same .gitignore reasoning from Lesson 12, applied to dbt specifically.

## Segment 3 (steps: notebooks alongside dbt)

A repository mixing notebooks with a dbt project applies Lesson 13's guidance directly — ipynb_checkpoints ignored, cleared outputs before committing. Keep notebooks in their own top-level folder rather than scattered through models, so exploration stays visually separate from production.

## Segment 4 (steps: raw SQL outside dbt)

Raw SQL files outside of dbt — ad hoc analysis, migrations, reporting queries — version exactly like any other text file. The only real decision is organizing them by purpose instead of one flat folder of hundreds of undifferentiated files.

## Segment 5 (outro)

Next lesson: what CI/CD actually is — the concept this whole course has been building toward.
