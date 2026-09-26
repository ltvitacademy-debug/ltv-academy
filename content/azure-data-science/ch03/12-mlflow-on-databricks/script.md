You have used MLflow to track runs. On Databricks it is built in, and it connects to the model registry in Unity Catalog. This lesson shows how the pieces fit together.

Four terms to keep straight. A run is one execution of model code, where you log parameters and metrics. An experiment is a collection of related runs. A model is the set of artifacts for a trained model. And on Databricks, a hosted tracking server stores all of it in your workspace with no setup.

Hyperparameter tuning fits naturally here. In the Databricks quickstart, Optuna proposes values, each trial logs itself as a nested run, and a Spark-aware study can spread trials across workers. I ran the same pattern locally, with twelve trials. One caution: the quickstart tunes on the test set for simplicity. In real projects, use a separate validation set.

Because every trial is logged, finding the winner is a query. Search runs returns a pandas data frame, sorted by the metric you choose. Locally, the best of my twelve trials reached an AUC of about zero point nine seven. Illustrative data, so do not read anything into the number.

To register a model, log it with a registered model name. In Unity Catalog, that name has three parts: catalog, schema and model. New versions need a model signature, and passing an input example lets MLflow infer one. I ran this locally with a simple local registry; on Databricks you need real catalog privileges.

Aliases are movable labels for versions. You might give version two the Champion alias, and have jobs load the model by that alias. Promoting a new version is then just moving the alias. Unity Catalog does not use the old stages.

In Catalog Explorer, a registered model shows its versions, aliases, tags, and any active serving endpoints, all under Unity Catalog access control.

Next, lesson thirteen covers feature engineering at scale with Spark.
