A trained model sitting in S3 helps nobody. To be useful, an application has to send it features and get a prediction back in milliseconds. That is a real-time endpoint.

Three objects sit behind an endpoint. A model, which names the container image and the model artifact in S3. An endpoint configuration, which lists the variants, with their instance type and count. And the endpoint itself, a named, running deployment. Once it is in service, clients call InvokeEndpoint with data and get answers back.

For scikit-learn, you write an inference script with four functions. Model fn loads the model once, at start-up. Then for every request, input fn turns the request bytes into data, predict fn runs the model, and output fn serializes the answer in the format the caller asked for.

I chained those four functions in a small local harness. A JSON request for two customers returned two churn probabilities, and a CSV request returned them as CSV. An unsupported content type raises a clear error. Testing handlers locally costs nothing, so do it before you deploy.

Here is the illustrative boto3 code, not run here. You create an endpoint configuration with a production variant naming the model, instance type and count, then create the endpoint from it. It can take several minutes to come into service, and you create the model first.

Applications call the endpoint with the runtime client. You pass the endpoint name, a content type, and a body, and read the response body. And notice the last line: delete the endpoint when you are finished.

Four habits. Auto scaling on invocations per instance. Variants, to split traffic between a current model and a candidate. Monitoring in CloudWatch. And deleting idle endpoints, because the instances bill for as long as the endpoint exists, whether or not anyone calls it.

An always-on endpoint is the wrong choice for some workloads. Lesson sixteen covers batch transform and serverless inference.
