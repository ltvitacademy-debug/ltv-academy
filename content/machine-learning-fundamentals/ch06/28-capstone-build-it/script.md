Time to build. In the kickoff you framed the churn problem, sealed the test set, and set a baseline of zero point five AUC. Today: a leakage-safe pipeline, three models compared with cross-validation, one round of tuning, and a look at what the winner learned.

Our columns need different treatment, so a ColumnTransformer handles it. Numeric columns get a median imputer and a standard scaler. Categorical columns get one-hot encoding. Wrapped in a Pipeline with the model, every cross-validation fold learns its imputer and scaler from that fold's training rows only. That is how you avoid leakage.

Compare logistic regression, a depth-four decision tree, and a three hundred tree random forest. Each goes into the same pipeline and is scored with five-fold stratified cross-validation on the training set, using ROC AUC.

Logistic regression wins with zero point seven seven six. The tree and the untuned forest sit near zero point seven. Tuning the forest lifts it to zero point seven four nine, with depth three, but it still trails. The simple model wins because our synthetic signal is roughly linear, which is what logistic regression assumes. That is why you compare rather than assume.

On the left, the cross-validated AUC for each model, with the dashed baseline at zero point five. On the right, what logistic regression learned. Output of the code above.

Read the coefficients. Longer tenure lowers churn odds. So do longer contracts, with two-year the strongest, and autopay. Higher charges and more support calls raise the odds. That matches the patterns from exploration, a good sanity check. The forest's importances tell the same story, with tenure first.

The test set is still sealed. In the final lesson, you evaluate the winner on it once, choose a decision threshold, add a segmentation lens with k-means, and package the project for your portfolio.
