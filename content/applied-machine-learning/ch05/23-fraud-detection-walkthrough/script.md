Fraud is the hard case of imbalanced classification. In our illustrative data, fewer than one transaction in a hundred is fraudulent. Accuracy is useless, investigators can only review so many alerts, and a model's value depends on what it finds within that budget.

Start with why accuracy fails. Of fifty thousand simulated transactions, only three hundred thirty-four are fraud, point six seven percent. A model that says legitimate every time is ninety-nine percent accurate and catches nothing. So use average precision, the area under the precision-recall curve, and stratify every split so each part keeps the same fraud rate.

Compare three candidates with stratified five-fold cross-validation. Because sample weights should come from each fold's own training labels, we loop by hand: compute the weights from the training fold, fit, then score the held-out fold with average precision.

A useless model would score near the base rate, about zero point zero zero seven, so all three are learning something real. Gradient boosting with weights leads at zero point two three seven, barely ahead of plain logistic regression. And class weight balanced actually lowered ranking quality for logistic regression, from zero point two three one to zero point one six seven. Weights mostly move the operating point. Test, don't assume.

The precision-recall curves on the test set tell the same story. Every curve sits far above the dashed base rate line, and the boosted model is highest overall.

Now report it as a review budget. Investigators can review two percent of transactions, two hundred fifty alerts. Of those, forty-four are real fraud: seventeen point six percent precision, about twenty-seven times the base rate, and fifty-three percent of all fraud caught. And be honest: the test set has only eighty-three fraud cases, so this estimate is noisy.

Up next, documenting a modeling project, so someone else can trust and reproduce your work.
