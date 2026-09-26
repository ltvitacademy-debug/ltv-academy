Time to build. Today: one leakage-safe pipeline, five models compared with cross-validation, a look at class weights, one round of tuning, and a saved winner.

Our columns need different treatment, so a ColumnTransformer handles it. Numeric columns get a median imputer and a scaler. Categorical columns get one-hot encoding. Wrapped in a Pipeline with the model, every cross-validation fold learns from its own training rows only. That is how you avoid leakage.

We compare a dummy, logistic regression with and without class weights, a balanced random forest, and histogram gradient boosting. Same pipeline, same stratified five-fold splits, two metrics: average precision and ROC AUC.

Logistic regression leads with an average precision of zero point two five eight. The forest and boosting trail, and every real model beats the dummy's zero point one one one. The signal is modest, ROC AUC about zero point seven, and the fold-to-fold spread is large, so treat small gaps with caution.

Class weights barely changed the scores, because those metrics depend on ranking. What changed is the decision at zero point five. The plain model flags almost nobody, but its probabilities are honest. The balanced model catches sixty-six percent of cancellers, but flags thirty-nine percent of customers, and its probabilities are inflated. Since we will choose the threshold from costs, we keep the plain model.

On the left, cross-validated average precision, with the dashed baseline. Tuning lifted the forest to zero point two four seven, still below logistic regression, and the error bars overlap. On the right, what the winner learned. Output of the code above.

Read the coefficients as a sanity check. Longer tenure lowers risk. More idle days, failed payments, and support tickets raise it, and so do the basic plan and paid acquisition. That matches exploration. We fit the final pipeline on training data only, and save it with joblib.

The test set is still sealed. In the final lesson, you evaluate once, choose a cost-based threshold, write a model card, and present the project.
