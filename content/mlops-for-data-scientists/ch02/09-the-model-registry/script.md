A run answers, what happened when we trained with these settings? It does not answer what a production system asks: which model should the API serve right now, what was serving last week, and can we go back? Those questions need the model registry.

A registered model is a name, here cancel risk model. Each time you register a run's model under that name, MLflow creates the next version: one, two, three. Each version points back to the run that produced it, so you can trace it to its parameters and git commit. We registered two runs from lesson 8 and tagged each with its test ROC AUC and a validation status of pending.

Beware the word latest. It only means most recently registered, not best. Never serve whatever was registered last.

Instead, use aliases. An alias is a movable pointer to one version. We pointed champion at version one and challenger at version two, and the serving code loads models, cancel risk model, at champion. Promotion is one line that moves the alias. Rollback is the same line, pointing back.

You may see older tutorials use stages, like Staging and Production. In our version they still work, but MLflow warns they are deprecated and will be removed in a future major release. Use aliases and tags in new work.

Now a trap we actually hit. We deleted version one while champion still pointed at it. MLflow allowed it, and the alias vanished with the version. Loading champion then failed with alias not found. A restarted API would have had nothing to serve.

So retire safely. Move the alias first. Tag the old version as deprecated and keep it. Delete only when nothing references it.

Next, lesson 10 builds a prediction API.
