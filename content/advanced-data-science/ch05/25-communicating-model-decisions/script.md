# Script — Communicating Model Decisions

## Segment 1 (title)

A SHAP plot is not a deliverable. A retention manager does not want log-odds. A finance lead wants to know what the campaign will cost and return. The last mile of data science is translating what the model learned into a decision someone can make.

## Segment 2 (audience)

Start with the audience. Executives want the outcome and the money. Operators, the people making the calls, want to know who to contact and why, in words they can say to a customer. Reviewers want the method, the metrics, and the known limits. One model, three explanations.

## Segment 3 (reason codes)

To turn SHAP values into reason codes, we take the three largest contributions for a customer, and phrase each one as a sentence, using the customer's own values and friendly names.

## Segment 4 (output)

For the customer the model worries about most, that reads: ninety-five percent chance of churning. Three months as a customer, a high monthly charge, and a monthly contract all raise risk. An operator can act on that. Notice we quoted a probability, not log-odds.

## Segment 5 (threshold code)

Next, the threshold. Point five has no business meaning. Set it from economics. Suppose an offer costs ten, saves thirty percent of the churners it reaches, and a saved customer is worth two hundred. We loop over cutoffs, count flagged customers, churners caught, and net value.

## Segment 6 (table)

At a cutoff of point six, net value is fourteen hundred thirty. At point two, contacting three hundred four customers catches one hundred twenty of the one hundred forty-nine churners and nets forty-one sixty. The recommendation is a business one, and the assumptions must be shown, because if costs change, so does the answer.

## Segment 7 (structure)

Present it in four parts. A headline with the number. Evidence, two or three drivers and one example. An action with owner, date, and a holdout to measure success. And caveats: data, limits, and assumptions.

## Segment 8 (outro)

Next lesson, fairness and bias in models.
