A model that works is meaningless until you say what working means. In a job, you propose the metric, get agreement, and write it down before you see a single score.

Start by putting a price on the decision. These numbers are illustrative assumptions, not company data. Contacting a customer costs fifteen. An offer saves thirty percent of would-be cancellers, and a saved customer is worth two hundred forty. So a contacted churner is worth seventy two in expectation, and the break-even precision is fifteen divided by seventy two, about twenty point eight percent.

Now read the table. Only fifteen point four percent of active customers churn, below break-even. So contacting everyone loses about fourteen thousand four hundred fifty four. Contacting a random ten percent, three hundred sixty nine customers, also loses money. A model creates value only by finding a group churning well above twenty point eight percent.

That drives the metrics. Average precision as the main score. Precision, recall, and lift at the top ten percent, which mirrors how the team will use the list. ROC AUC as a familiar secondary. And calibration, because the value math treats scores as probabilities. Accuracy is left out on purpose: predicting nobody cancels is eighty four point six percent accurate and worthless.

Build the harness now and test it on a scorer you know is useless. Random scores give an average precision of about zero point one five nine, an AUC near a half, and a lift of one. Those are the floors any real model must clear.

Write acceptance criteria first. Precision at the top ten percent must beat break-even, and so must the lower end of a bootstrap interval. Beat the baselines. Leave the ambition target open until you have seen them. And score the test set once.

The plan follows the outline: extract, clean, explore, model, evaluate, deploy, present.

Next, Phase 1 begins with lesson four, extracting data with SQL.
