A deployed model does not fail with an error. It keeps returning numbers, just worse ones, because the world has moved. Monitoring is how you notice.

There are two kinds of drift. Data drift means the inputs changed, and you can see it from requests alone. Concept drift means the same inputs now lead to different outcomes, and you can only confirm it with ground truth labels, which for churn arrive weeks later.

SageMaker Model Monitor follows four steps. Capture requests and responses to S3. Build a baseline from training data, producing statistics and constraints files. Run a scheduled job that compares captured data with the baseline. And read the violations file it writes.

One important note. At the time of this writing, the AWS documentation says Model Monitor is no longer open to new customers, and points to a replacement built on Evidently AI, SageMaker MLflow, QuickSight, and CloudWatch. Check the current docs. The ideas carry over either way.

The SDK code is adapted from the docs and is illustrative. It creates a monitor and suggests a baseline from your training file. I could not run it, and SDK versions differ.

What I could run is the logic. I captured simulated requests in the documented format, and compared each feature with training data using the population stability index. Week one was normal. In week two the inputs shifted and two features flagged, yet A U C did not fall. In week three, nothing flagged, but the relationship changed, and A U C dropped to point five four four.

So watch three things. Inputs, right now. Predictions, right now. And model quality, as soon as labels arrive. A quiet input check does not mean a healthy model.

Next lesson: keeping the bill under control.
