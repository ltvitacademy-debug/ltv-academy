By now you have used Azure Machine Learning three ways: clicking in the studio, writing Python with the SDK, and reading some YAML. These are not three products. They are three front doors to the same workspace.

The studio is for looking and clicking. The Python SDK, version two, is for building and repeating. The command line interface, version two, describes work in YAML files. And a VS Code extension sits alongside. Microsoft says the CLI and the SDK have no difference in functionality.

The studio's home page has a New menu. Choose Training job to open a guided form.

The first question is how you want to train: automatically, with automated ML; with your own script, which is a command job; or with hyperparameter tuning. Microsoft describes this guided form as a preview feature, so check its status. You have seen the second option in lesson four.

With the CLI, the same job is a YAML file: code, command, inputs, environment and compute. You submit it with az ml job create. This is illustrative and not run here. It is the same information as the SDK call.

Because it is plain text, a YAML job can be reviewed in git. This is real output from diffing two versions of our job file. Someone bumps the tree count and moves to data version two, and the reviewer sees exactly those two changes.

So use the studio to look, the SDK to build, and the CLI with YAML to automate. And use version two for anything new: Microsoft's docs list the version one CLI and SDK as past or at end of support.

Next chapter, lesson six: running training jobs properly.
