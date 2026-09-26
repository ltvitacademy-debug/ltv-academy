Print statements are a poor memory. Two weeks from now you will not remember whether the run with a learning rate of point zero three beat the one with point one. Experiment tracking fixes that, and in Azure Machine Learning the tool is MLflow.

MLflow organizes work into experiments, and each attempt is a run. Azure ML calls a run a job. A run records four things. Parameters, the settings you chose. Metrics, the numeric results. Artifacts, any file you produce. And models, a packaged folder you can later register and deploy.

Logging is a few lines in your script. Log the parameters, log the metrics, and log the model. Notice there is no start run call. Inside an Azure ML job, a run is already started for you, and the tracking address is configured automatically.

We ran this script three times locally, with three learning rates, and queried the results with search runs. This output is real. The lowest learning rate had the best area under the curve, while the middle one had the best accuracy. Tracking makes trade-offs like that visible.

A warning about autolog. It records every parameter automatically, but read the metric names. These are scores on the training data, not held-out test data. Training accuracy was point eight five four, while test accuracy was about point seven five. Log your test metrics deliberately.

In the studio, open the job and choose the Metrics tab. Logged metrics appear as charts and tiles you can customize and share. This screenshot is from Microsoft's documentation.

Only when your code runs outside Azure, such as on your laptop, do you point MLflow at the workspace. You read the tracking URI from the workspace, and pass it to set tracking URI. This is illustrative and not run here.

Next lesson: Automated ML, where Azure tries many models for you and tracks all of them.
