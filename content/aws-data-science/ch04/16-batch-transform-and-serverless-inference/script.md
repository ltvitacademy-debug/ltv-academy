An always-on endpoint is not always the right answer. This lesson covers two alternatives: batch transform, and serverless inference.

There are four ways to serve a model. Real-time endpoints, for steady, latency-sensitive traffic. Serverless endpoints, which scale to zero, for sporadic traffic that can tolerate a cold start. Asynchronous inference, which queues requests with large payloads or long processing. And batch transform, which scores a whole dataset in S3 and then shuts down. A simple rule: if nobody is waiting for the answer, prefer batch.

I simulated batch transform's behavior locally, with last lesson's inference handlers. This is the semantics, not the service. Five hundred input records were split into three mini-batches, and five hundred predictions came back in the same order. The output file is named after the input, plus dot out. And joining the input to the prediction gives self-explanatory rows.

Here is the illustrative boto3 call. A transform job names the model, the input data and its content type, an output location, and the instances to use. If you split the input by line, SageMaker feeds records in mini-batches. Instances start with the job, and stop when it ends. Split large data into several files, or only one instance will work.

A serverless endpoint replaces the instance type and count with a memory size and a maximum concurrency. Everything else, including how you call it, stays familiar.

Know the limits. Memory runs from one to six gigabytes. Requests and responses are capped at four megabytes. Each invocation has one minute. And the first request after idle time pays a cold start, which provisioned concurrency can reduce, at extra cost.

You can now train, tune and serve models. Next, in lesson seventeen, the Model Registry keeps track of versions and approvals.
