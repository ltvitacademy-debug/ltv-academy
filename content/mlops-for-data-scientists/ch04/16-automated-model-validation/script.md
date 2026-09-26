Welcome to lesson sixteen. Lesson fourteen asks whether a model is intact. This lesson asks the harder question a retrained model raises: is the candidate good enough to replace the one in production? We turn that judgment into an automated validation gate.

A good gate has several rules, because each guards a different failure. A floor stops a broken model. A comparison with production stops a model that is acceptable alone but worse than what customers use today. Slice checks stop a model that is fine on average but weak for one group. And calibration stops scores that rank well but sit too high or too low.

Write the rules down as constants. Minimum AUC of point seven five. At most a point oh one drop against production. A floor of point seven for every contract type. And a gap of no more than point oh three between the average score and the real churn rate.

The gate scores the candidate and the production model on the same fixed holdout of eight hundred customers that neither model trained on. It checks every rule, saves a report, and ends with exit code zero for a pass or one for a fail. A non-zero exit code is what makes a CI step fail.

We ran three candidates. Production scores point eight oh two. Candidate A, retrained with the same recipe, scores point eight oh one and is approved. Candidate B, where a cleanup dropped the contract column, scores point seven five two. It squeaks past the floor by two thousandths, but the comparison with production rejects it. Candidate C, with stronger regularization, scores point seven nine eight and is approved.

Be honest about noise. On eight hundred rows, the production AUC has a ninety-five percent interval from about point seven six seven to point eight three four. A difference of four thousandths is far smaller than that. A bigger holdout narrows it, and tolerances are a policy you choose and document.

Next, lesson seventeen: promotion between environments.
