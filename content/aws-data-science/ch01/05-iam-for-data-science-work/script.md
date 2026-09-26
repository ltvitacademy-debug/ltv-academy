Every lesson so far quietly depended on permissions. Your notebook reads S3, Glue writes a table, and soon a SageMaker job will save a model. You met IAM in earlier paths, so here we ask one question: what does a data science project actually need, and how do we grant only that?

Keep three identities straight. You, whose permissions decide what you can start. The SageMaker execution role, which is what a training job actually runs as. And service roles, such as the Glue job role or the role Redshift assumes. Most access denied errors come from mixing these up: you can read the bucket, but your job's role cannot.

Every role has a trust policy naming who may assume it. For a SageMaker execution role, the documented principal is sagemaker dot amazonaws dot com. Permissions policies attached to the role then say what it can do. This is illustrative, and was not created in an account.

The managed policy AmazonSageMakerFullAccess is a starting point. The docs say its S3 access covers only buckets with sagemaker or aws-glue in the name, so your own bucket needs an extra policy. Scope it to the project: raw data read-only, writes only to processed and models, and listing limited by a prefix condition.

I tested that idea with simple wildcard matching. Keys under processed and models matched. The raw file, and an unrelated HR file in the same bucket, did not. Real IAM evaluation has more rules, so this is a picture, not a substitute for testing.

Inside a SageMaker environment, the Python SDK can return the role attached to your space. The import differs between SDK version 2 and version 3, so check which you have. The docs warn it raises an error outside a SageMaker environment.

Four habits. Never paste access keys into a notebook. Scope S3 to project prefixes. Restrict pass role, the permission that lets you hand a role to SageMaker, to one role and one service. And do not reuse an administrator role for training jobs.

Next, Chapter 2 begins with the SageMaker environment itself.
