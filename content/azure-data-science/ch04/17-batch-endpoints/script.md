Real-time endpoints answer one request at a time, in milliseconds. But a lot of data science work is not like that. The marketing team wants a churn score for every customer by morning. Nobody is waiting on a single answer. That is the job for a batch endpoint.

A batch endpoint receives a pointer to data, not the data itself. It starts a job, spins up a compute cluster, scores the files in parallel, writes the results to storage, and shuts the cluster down. You pay for compute only while it runs. Behind the endpoint sit deployments, each with a model and a cluster, and one is the default.

Batch or real time? Choose batch when the model is slow, or the input is large and spread across many files, and low latency does not matter. Choose real time when a person or an app is waiting.

The scoring script has two functions. In init, which runs once per worker, you load the model. In run, which gets a mini-batch, you score it. For file inputs, the mini-batch is a list of file paths, and you return one row of results for each input.

I ran this exact pattern locally. I trained a small churn model, wrote five little files, and called init once and run three times, in mini-batches of two files. Twenty predictions came back in one table. That merge is what the append row output action does in the cloud.

In the SDK, you build a ModelBatchDeployment with the model, environment, compute, and scoring script, plus settings like mini-batch size. Then you call invoke with an input folder. That code is illustrative, since we have no Azure account here, so check the current docs for exact names.

Once deployed, the studio shows the endpoint, its default deployment, the cluster, and settings like mini-batch size. You can change the default without changing how anyone invokes the endpoint.

Next: monitoring models and data drift.
