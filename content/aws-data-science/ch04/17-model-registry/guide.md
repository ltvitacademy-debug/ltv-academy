# Model Registry

You can train a good model in an afternoon. Knowing six months later which model is running in production, what data trained it, how it scored, and who said it could ship is a different problem. The SageMaker Model Registry is the catalog that answers those questions. It turns "a tarball somewhere in S3" into a named, versioned, reviewable asset. This lesson covers the concepts, the API calls, the approval workflow, and how a registered version becomes an endpoint.

## What you'll learn

- The difference between a model group and a model version
- The three approval statuses and what changing them can trigger
- How to register a version and approve it with boto3
- How to deploy from the registry, and a local sketch of an approval gate

## Groups and versions

A **model group** (in the API, a *model package group*) holds every version of a model built to solve one problem, for example `churn-model`. Each **model version** (a *model package*) is one registered candidate. Versions are numbered automatically, and the ARN of a version ends in the group name and number, such as `.../model-package/churn-model/1`.

A version records the pieces needed to run the model again: the inference container image, the S3 location of `model.tar.gz`, the content types the container accepts, and optionally metrics and free-form metadata. It does not hold the model itself; it points to it.

## Approval status

Each version carries a `ModelApprovalStatus`: `PendingManualApproval`, `Approved` or `Rejected`. This is the hand-off between the data scientist and whoever owns production. The AWS docs describe what happens when you use one of the SageMaker-provided MLOps project templates: moving a version from `PendingManualApproval` to `Approved` initiates CI/CD deployment of that version, while moving to `Rejected` does nothing. Without a project template, the status is a label that your own automation (for example an EventBridge rule) can react to.

## Registering a version with boto3

This code is adapted from the AWS documentation and is **illustrative, not run here**, because there is no AWS account in this course. What I did run: I validated these exact requests offline against boto3's own service model using botocore's `Stubber`. It printed `boto3 param validation passed for 4 calls`, so the parameter names and shapes are accepted by boto3 1.42; a misspelled parameter raised `ParamValidationError`. That checks shape, not that AWS would accept your values.

```python
sm.create_model_package_group(
    ModelPackageGroupName="churn-model",
    ModelPackageGroupDescription="Meal-kit churn risk")

resp = sm.create_model_package(
    ModelPackageGroupName="churn-model",
    ModelApprovalStatus="PendingManualApproval",
    CustomerMetadataProperties={"val_auc": "0.7992"},
    InferenceSpecification={
        "Containers": [{"Image": image_uri,
                        "ModelDataUrl": model_data_s3_uri}],
        "SupportedContentTypes": ["text/csv"],
        "SupportedResponseMIMETypes": ["application/json"]})
package_arn = resp["ModelPackageArn"]
```

Approving is one more call:

```python
sm.update_model_package(
    ModelPackageArn=package_arn,
    ModelApprovalStatus="Approved",
    ApprovalDescription="Passed AUC gate")
```

Two practical notes. Script-mode scikit-learn models also need the container to find your inference script; the SDK normally handles this by packaging the entry point and setting environment variables, so with raw boto3 check the container documentation for what to set. And in SageMaker Pipelines you register through a model-registration step instead of calling the API by hand; the docs call it a `RegisterModel` step.

## Deploying from the registry

The documented boto3 route is `create_model` with `Containers=[{"ModelPackageName": package_arn}]`, then `create_endpoint_config`, then `create_endpoint`, the same three-call sequence used for any real-time endpoint. The current SDK documentation shows a `ModelBuilder` taking the package ARN as its `model` argument, but the Python SDK changed substantially between major versions, so treat any SDK snippet as version-specific and check the docs for the version you install.

## A local sketch of an approval gate

The point of the approval status is a rule, not a click. I wrote a small stand-in in plain Python (it is not the SageMaker API) that trains three candidates and applies our project rule: validation AUC of at least 0.75 and better than the currently approved version.

```
 version         desc  val_auc     status
       1 logreg C=0.1   0.7991 Superseded
       2 logreg C=1.0   0.7992   Approved
       3  gbm depth=3   0.7844   Rejected
```

"Superseded" is a label in my sketch only; the real service has the three statuses above. The rule lives in code, so it is repeatable and auditable, which is the goal of registry-driven promotion.

## Recap

- A model group is the home of one problem; each registered version points to a container image and a `model.tar.gz`.
- Approval status (`PendingManualApproval`, `Approved`, `Rejected`) is the promotion signal; project templates can act on it.
- Register with `create_model_package`, approve with `update_model_package`, deploy through `create_model` with a `ModelPackageName`.
- Encode the promotion rule in code, not in someone's memory.
