Welcome to lesson fifteen. Tests that run only when someone remembers are a suggestion, not a safeguard. GitHub Actions makes them a gate. You already know workflows, jobs, and steps from the Git and CI/CD course, so here we apply them to a model.

On every pull request, a fresh machine checks out the code, installs the pinned libraries, trains the model on a small dataset, and runs the tests. The pull request then shows a red or a green result.

The workflow file lives in dot github slash workflows. It runs on pull requests and on pushes to main. Permissions are read-only, and a newer commit cancels an older run. The test job sets up Python three point ten, installs from the requirements files, runs train dot py, then runs pytest.

Four choices are specific to machine learning. Match the Python version to training and Docker, because our pinned scikit-learn only supports up to three point ten. Cache the pip install so heavy libraries load quickly. Use synthetic or small sample data, with real credentials kept in secrets. And keep pull request runs cheap, moving full retraining to a separate scheduled workflow.

Each job starts on a clean machine, so pass the trained model along as an artifact. The test job uploads the models folder. A package job needs the test job to pass, and runs only on main. It downloads the model and builds an image tagged with the commit hash.

Now the honest part. We did not run this on GitHub. We parsed the file with PyYAML, then ran the test job's commands in a clean copy on this machine. That exposed a real bug: no models folder in a fresh checkout, so training crashed. One line fixed it. Then a simulated bad change, stronger regularization, barely moved the AUC, but the golden test caught it, and the job stopped.

Next, lesson sixteen: automated model validation, deciding whether a new model is good enough.
