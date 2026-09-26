Welcome to the capstone. Five chapters gave you the parts. Now you connect them into one automated lifecycle for a single model, and you run every stage yourself. The model is the cancellation model from the earlier lessons, on the same illustrative data.

There are six stages. Train and track the model in MLflow. Pass it through a validation gate. Register it as a new version. Serve it behind an API and test the contract. Check live data for drift. And decide whether to retrain. The first four run for each new candidate. The last two run weekly.

Before writing any pipeline code, write down what good enough to ship means, and put it in a settings file. The gate wants a ROC A U C of at least point seven, an average precision of at least point two five, and no more than point zero one worse than the current champion. Drift alarms at a P S I of point two five, and retraining waits for two thousand labelled rows.

The project uses the layout from lesson three: a package with one module per stage, a tests folder, the settings file, a requirements file with pinned versions, and a workflow file.

Now the baseline. The data splits into four thousand eight hundred training rows and twelve hundred test rows, with the same cancel rate in both. The trained model scores a ROC A U C of point seven four four and an average precision of point three three three. A dummy model scores point five and point one one one. Our model clears the floors, and that is the baseline the pipeline must protect.

Be clear about what is real. Everything runs on your own computer, with a local MLflow store. The GitHub Actions workflow in lesson twenty-four is illustrative. It parses as valid YAML, but it was not run on GitHub here.

Next, in lesson twenty-three, we build the stages.
