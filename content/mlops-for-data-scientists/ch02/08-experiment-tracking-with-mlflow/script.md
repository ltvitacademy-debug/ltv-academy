You already know the basics of MLflow: runs, parameters, metrics, artifacts. This lesson is about discipline. A run that logs only a score is nearly useless six weeks later. A run that records which data, which code and which settings produced the score can be reproduced and trusted.

Here is the tracked training function for our cancel risk experiment. Parameters record the inputs you chose. Metrics are named train or test, so nobody guesses which split a number came from. Tags label the git commit and the data version, and the settings file is saved as an artifact. Parameters cannot be changed once logged, and that is a feature.

We ran six values of the regularization strength C, plus one deliberately broken run. The broken run raised an error, and because we used a with block, MLflow saved it with status failed instead of losing it. Then search runs returned a data frame, and the results were clear. Test ROC AUC climbed from point seven two seven to point seven four four, then stopped improving.

Here is the same experiment as a chart. Beyond C equals one, nothing improves, so we keep C equals one, the simplest setting that ties for best, and tag that run as the candidate. Tags can be edited later, which makes them the right place for a status.

Now the caveat about autolog. On our pipeline it recorded fifty parameters, including every default. But every metric it logged was on the training data. Its training accuracy was point eight eight nine, which sounds great until you remember that only eleven percent of customers cancel, so predicting nobody cancels scores the same. Log your own test metrics.

The habits: one experiment per problem, meaningful run names, code and data tags on every run, and never delete failed runs.

Next, lesson 9 registers the winning run as a versioned model.
