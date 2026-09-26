Welcome to the capstone. You have met the AWS pieces one at a time. Now you join them into one project for your portfolio: a churn model, trained, deployed, and monitored on AWS.

Start with the brief. A meal-kit company, made up for this exercise, has a retention team that can only phone so many customers. They want a churn risk score, instantly on the support screen and in bulk every night, and they want to know when the model stops being trustworthy.

Write down what done means before you model. Beat a naive baseline with an A U C of at least point seven five. Report recall by plan. Follow SageMaker's script mode and handler contracts, and test them locally. Run a drift check, write a model card, and clean up. These targets are my choices, not AWS requirements.

The architecture has stages you know. Data in S3 and a training job. Register the model. Deploy an endpoint with data capture. Then monitor, review, and present. We have no AWS account here, so cloud-only steps are illustrative, and everything else runs on your laptop.

Now the baseline. The data is synthetic, six thousand customers with a thirty-eight percent churn rate. A model that always says no churn is sixty-two percent accurate, and finds zero churners. Accuracy alone would fool you.

A logistic regression pipeline reaches an A U C of point seven nine eight on the test set. But look at recall by plan. On weekly plans it finds only sixteen percent of churners. Overall numbers hide weak spots, so we report by segment from day one.

Next lesson, you build it.
