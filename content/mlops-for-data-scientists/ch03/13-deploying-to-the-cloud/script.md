You have a container, and you know whether it should run live or on a schedule. Deploying to the cloud means handing it to a platform that keeps it running, scales it, secures it, and lets you roll out new versions safely. This lesson is a map, not a click-by-click walkthrough, because cloud product names and screens change often. Check the current documentation for the exact steps.

There are three main routes. First, a managed machine learning endpoint. Azure Machine Learning describes an endpoint as a stable URL that contains one or more deployments, with online endpoints for low-latency requests and batch endpoints for long-running jobs. Amazon SageMaker offers real-time, serverless, and asynchronous endpoints. This route fits teams already training on that platform.

Second, a container platform. Because you built a standard image, you can run it on Azure Container Apps, Amazon ECS with Fargate, or Google Cloud Run. You get portability, but you assemble monitoring and model management yourself.

Third, a scheduled job. If the answer from the last lesson was batch, you may not need an endpoint at all.

Every route expects the same things: an image in a registry, deployed by an exact version tag rather than latest; secrets and settings kept outside the image; a health endpoint; scaling limits, remembering that scaling to zero adds a cold start while the model loads; and logs and metrics.

Then roll out safely. Deploy the new version beside the old one, smoke test it, send a small share of traffic, watch errors and prediction distributions, and promote gradually, with rollback always one step away.

Our smoke test checks the health endpoint, then sends a known golden customer and confirms the score is still point nine oh nine. It passed against our local server, and it fails loudly if nothing answers.

Next, Chapter 4: CI/CD, starting with testing ML code and data.
