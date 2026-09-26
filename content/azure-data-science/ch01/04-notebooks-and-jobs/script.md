Data scientists live in notebooks, and Azure Machine Learning gives you a hosted one inside the studio. But a notebook is a scratchpad, not a repeatable process. The habit that separates a prototype from a real workflow is moving the logic into a script and running it as a job.

In the studio's notebook toolbar you pick a compute instance and a kernel. In Microsoft's current tutorials the kernel is called Python 3.10 SDK version 2. You can also open the same notebook in VS Code, attached to that instance.

The path is simple. Explore in the notebook. Move the stable logic into a script. Submit the script as a command job. Then review the run in the studio.

Your script takes arguments instead of hard-coded values, and you test it locally first. A command job is a command line with placeholders like inputs dot data. This small mimic fills them in and runs the script. The output is real: accuracy point seven six five on our illustrative churn data.

A command job has five parts. The code folder, and the command to run. The environment, the software recipe from lesson two. The compute, a cluster, or leave it out for serverless. And the inputs, like a versioned data asset.

In the SDK, the command function takes all five, and create or update submits it. This is illustrative and not run here. The data input points at the data asset by name and version, so the job records exactly which data it used.

Afterward, the Jobs page shows the run. This screenshot is from a Microsoft tutorial job, with tabs for metrics, logs and the code snapshot that ran. Where those metrics come from is the subject of lesson seven.

Next lesson: Azure ML studio versus the SDK, and when to use each.
