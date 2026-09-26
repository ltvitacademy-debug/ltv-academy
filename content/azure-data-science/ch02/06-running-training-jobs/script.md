In lesson four you submitted your first command job. Now let's look at the routine you will repeat hundreds of times: submit a job, watch it run, collect the results, and read the logs when something breaks.

A job moves through stages. Starting, then preparing, while the environment is built, then running, and finally completed. On the way you may also see provisioning, queued and finalizing, and a job can end as failed or canceled. If a job fails while preparing, the problem is the environment, not your model.

Before you submit anything, run the script on your own machine. Ours reads the churn table, trains, prints accuracy point seven five and area under the curve point six five five, and saves a model file and a metrics file. Those numbers are real, from a local run.

The compute is temporary, so results must be saved somewhere the job keeps. In the SDK you declare a named output, then refer to it in the command as outputs dot model directory. Files written to a folder called outputs are also kept by default. This code is illustrative and not run here.

Then watch. The stream call follows the logs live, and the status property tells you where the job is. Read the standard log file first when something fails, and set a timeout in the job's limits, so a mistake cannot run for hours.

In the studio, the Outputs and logs tab holds a user logs folder with a file called std log dot text. That is where your print statements and any error appear. A missing module means the environment lacks a package. A file not found error, like the one we triggered locally, means a wrong path. This screenshot is from Microsoft's documentation.

Next lesson: experiment tracking with MLflow, so those printed numbers become searchable metrics.
