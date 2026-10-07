# Script — Lineage: From Data to Deployed Model

## Segment 1 (title)

When a production model starts behaving strangely, the first question is almost never what's wrong with the model — it's what fed this model, and what is this model feeding right now. Answering that requires lineage: a traceable chain connecting raw data all the way through to a deployed model instance.

## Segment 2 (steps)

The chain has five links, each a pointer to the one before it. Raw source data. The engineered feature snapshot actually used for training. The tracked training run, with its parameters, metrics, code, and environment. The registered model version that run produced. And the deployed instance actually serving traffic right now. If any one link is missing, the chain breaks.

## Segment 3 (code)

MLflow closes the data-to-run link with log_input — it attaches a dataset's schema, row count, and source URI to the run as structured metadata, not just a path string that might point somewhere different tomorrow. Combined with the git commit MLflow autologs automatically, a single run now carries both which code and which data.

## Segment 4 (code)

The run-to-model-version link is closed by the registry itself. Every version stores the run ID of the run that produced it, so you can always walk backward — from version, to run, to the dataset and code behind it — without a human maintaining a spreadsheet of any of it.

## Segment 5 (steps)

Two links sit outside MLflow entirely. A feature store, like Feast, owns the connection between raw data and engineered features, and can tell you every model that depends on a feature when its definition changes. And deployment metadata — tagging a serving endpoint with the version it's running — closes the final link: which version is actually live right now.

## Segment 6 (outro)

Most days nobody queries any of this — the payoff shows up during an incident, when a few lineage queries replace hours of guessing. Next, lesson fourteen uses this same traceability to compare model versions that are already running in production.
