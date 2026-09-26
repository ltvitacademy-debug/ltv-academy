You have baselines and an ambition target. Now the temptation is to throw powerful models at the problem and pick the biggest number. The skill is doing the comparison fairly.

Fair means the same pipeline, the same folds, and more than one metric. We compare four candidates: the churn rate dummy, logistic regression, a random forest, and histogram gradient boosting. We use five-fold cross-validation repeated three times, because with only four hundred fifty-four churners in training, one run is jumpy. Fifteen scores per model, on identical splits.

Here are the results. Logistic regression averages point three two five average precision, and point three nine two precision in the top ten percent. The random forest gets point three two eight and point four oh two. Boosting, often the favorite, gets point three one four and point three six eight. All three clear the ambition target of point three two, and all clear the break-even.

Now read the differences, not just the means. The forest leads by three thousandths of average precision, but the fold to fold spread is about three hundredths. A paired comparison on the same folds shows the forest ahead in nine of fifteen, and boosting ahead in six. Those gaps sit inside the noise. Fold scores are not independent, so treat this as a description, not a proof.

The chart shows it: the boxes overlap heavily. That is common when the signal in behavioral data is modest and the features are already good. Extra flexibility has little left to find.

So we choose finalists on more than one number. Logistic regression is fast, about a second versus eleven for the forest, explainable, and easy to deploy. The forest is the one serious challenger. We carry both into tuning, and boosting drops out for now. The test set is still sealed.
