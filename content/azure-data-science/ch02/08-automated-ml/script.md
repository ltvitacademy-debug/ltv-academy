Which algorithm should you try, and with which settings? On a new problem you might test logistic regression, then forests, then boosting, tuning each by hand. Automated ML in Azure Machine Learning runs that loop for you and hands back a ranked list.

Microsoft's diagram shows the flow. Your data, a target metric and constraints go in. Many iterations run, each combining features, an algorithm and parameters. A leaderboard ranks the results.

Here is a hand-built miniature on our illustrative churn data. Five candidates, scored by three-fold cross-validated area under the curve. The output is real. Notice that plain logistic regression won. The fanciest algorithm is not automatically the best, and a systematic comparison finds out cheaply.

The real service goes further. It applies automatic featurization, tries many algorithms for your task type, varies hyperparameters trial by trial, and ranks everything by your primary metric. That is a lot of trials you would not want to write by hand.

In the SDK you describe the job. Data goes in as an M L Table, with the target column named. You choose the primary metric, the number of cross-validation folds, and whether to explain the best model. Then set limits, and submit it like any job. This is illustrative and not run here.

Some decisions stay yours. What are you predicting? Which primary metric? Microsoft suggests A U C weighted can beat accuracy on small or imbalanced data, like churn. Set limits so trials and time cannot run away. And validate the winner before you trust it.

The studio offers a no-code wizard for the same job. You pick the task and data, the target column, limits, and validation. Results appear on the Models and child jobs tab, ordered by score, and the best model can be explained and deployed. The screenshot is from Microsoft's documentation.

Next lesson: hyperparameter tuning at scale, for when you want to control the search yourself.
