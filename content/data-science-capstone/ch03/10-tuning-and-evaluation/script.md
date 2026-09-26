Two finalists, tied within noise. Now we tune them, set a contact policy, and open the test set exactly once.

First, write your decision rule before you look. Ours: ship logistic regression unless the tuned forest beats it by more than point oh two average precision. Tuning gave logistic regression almost nothing: point three two five at best, on a plateau. The forest reached point three three five. That gap is below our bar, so logistic regression is the model.

Next, the policy. Using the lesson three economics, a contact costs fifteen, and a contacted churner is worth seventy-two in expectation. So the break-even probability is point two oh eight. On out-of-fold training predictions, precision stays above break-even far down the list. But the team can only contact ten percent, so capacity is the constraint. The policy: contact the top ten percent by score.

Now the test set, opened once. Average precision point three three four. AUC point seven five five. Precision in the top ten percent is point four oh five, a lift of two point six times, against point two seven for the best simple rule. The ninety-five percent interval on that precision runs from point two nine seven to point five two seven. The lower end still clears break-even, so we pass the minimum bar from lesson three. The interval is wide, because only seventy-four customers are flagged.

Under the illustrative costs, per thousand customers, contacting everyone loses about thirty-nine hundred, and contacting the top ten percent gains about fourteen hundred. Reaching everyone above break-even would gain about twenty-four hundred, which is an argument for more capacity.

Finally, calibration. The chart shows precision against recall on the left, and predicted against observed churn on the right. Predicted probabilities and observed churn rates track each other across five bins, so the break-even cut-off is meaningful. Next, we explain what the model learned.
