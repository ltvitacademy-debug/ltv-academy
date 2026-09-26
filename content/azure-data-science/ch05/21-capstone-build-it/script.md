Time to build. Five moves: track several runs, pick the winner, register it, wrap it in a scoring script, and check for drift. Everything that runs locally, I actually ran.

I logged three candidates with M L flow, each with parameters, metrics, and the full pipeline as an M L flow model. The two logistic regressions scored an A U C near point seven nine three, and gradient boosting scored point seven eight seven. The simple model wins, which is easier to explain and monitor. I registered it as churn model, version one.

The saved folder holds the M L model file, the conda environment, and the pickled pipeline. In Azure ML you register that same folder as an M L flow model asset, and the studio review page lists these same files.

Azure offers no-code deployment for M L flow models, but look at what it returns. Predicting on two customers gave the labels one and zero, not risk scores. So I wrote a custom scoring script that returns probabilities. Tested locally, it gave point nine one one and point zero four two, and rejected a request without the input data key.

Deployment in the SDK creates a managed online endpoint, then a deployment with the model, an environment, the scoring script, and an instance type, then routes all traffic to it. This is illustrative code, adapted from Microsoft Learn. Delete the endpoint when you finish so compute stops billing.

When you deploy in the studio with no custom script, the wizard tells you the scoring script and environment are generated for you. That is the path to take when labels or default predictions are enough.

Last, a drift check. Week two's inputs shifted sharply, with P S I of point eight three for spend, and average predicted risk jumped from point three five to point four four. But A U C did not fall. Drift is a prompt to investigate, not proof the model broke. Confirm with labels.

Next: wrap up and present the project.
