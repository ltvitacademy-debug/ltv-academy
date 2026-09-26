Welcome to the capstone. You have seen every piece of the Azure data science stack. Now you tie them into one project you can put in a portfolio: a churn model, trained, deployed, and monitored on Azure.

Start with the brief. A subscription business loses about a third of its customers, and the retention team can only phone so many people. They want a churn risk score, instantly on the support screen and in bulk every night, and they want to know when the model stops being trustworthy.

Write down what done means before you model. Beat a naive baseline with an A U C of at least point seven five. Report recall by contract type. Package the model in M L flow format. Run a drift check. Write a model card. These targets are my choices for the exercise.

The path has stages you already know. Train and track, register, deploy to an endpoint, monitor, then review and present. We have no Azure account here, so cloud-only steps are illustrative, and everything else runs locally.

Now the baseline. The data is synthetic, five thousand customers, with a thirty-five percent churn rate. A model that always says no churn is sixty-five percent accurate, and finds zero churners. Accuracy alone would fool you.

A logistic regression pipeline, with scaling and encoding inside it, reaches an A U C of point seven nine three and finds about half the churners at the default threshold. That clears the first target, and it becomes the number to beat.

Make the repository easy to review, with data, source, monitoring, and a model card. Next lesson, you build it.
