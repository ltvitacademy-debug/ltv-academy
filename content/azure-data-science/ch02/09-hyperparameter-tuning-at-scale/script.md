Training one model is easy. Training two hundred variants to find the best settings is where the cloud earns its keep. This lesson is about hyperparameter tuning at scale in Azure Machine Learning.

Azure ML runs tuning as a sweep job, and you supply four things. A search space, which lists the values each setting may take. A sampling method, which decides which combinations to try. An objective, meaning the name of the metric to watch and whether to maximize or minimize it. And limits, the budget for total trials and how many run at once. Each trial is an ordinary training job on your compute cluster.

Here is the illustrative code, not run here. You take your existing command job, replace fixed inputs with distributions like Uniform and Choice, then call sweep. The primary metric must match, exactly, the name your script logs with MLflow.

The same idea runs on your laptop. I ran eight random trials, each logged as a nested MLflow run, and the best reached about eighty three percent accuracy.

For sampling, random is the usual starting point. Grid tries every combination, but only works with choice values. Bayesian uses earlier results to pick the next trial, and needs a generous budget; the docs suggest at least twenty trials per hyperparameter. On top of any of these, an early termination policy such as bandit, median stopping or truncation selection cancels trials that are clearly losing.

Studio then charts every child run. Each line is one trial, and its metric at each reporting interval. Weak trials sit visibly lower, which is exactly what early termination exploits.

The parallel coordinates chart shows which value ranges lead to the best score. Follow the darkest lines, the highest accuracy, back across the axes. One warning: every trial restarts training from scratch, so do your data preparation beforehand.

Doing that preparation once, and reusing it, is what pipelines are for. That is next, in lesson ten.
