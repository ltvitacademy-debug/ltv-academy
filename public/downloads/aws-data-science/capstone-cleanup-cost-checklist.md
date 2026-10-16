# SageMaker Capstone Cleanup & Cost Checklist

Every real-money SageMaker surprise on a personal or team account traces
back to one of the items on this list — something kept running after an
experiment ended. Run through it at the end of any project, not only the
capstone. Order matters: delete dependents before the thing they depend on.

## 1. Delete in this order

```
[ ] Monitoring schedule   sm.delete_monitoring_schedule(MonitoringScheduleName=...)
[ ] Endpoint              sm.delete_endpoint(EndpointName=...)
[ ] Endpoint configuration sm.delete_endpoint_config(EndpointConfigName=...)
[ ] Model                 sm.delete_model(ModelName=...)
```

A real-time endpoint bills for its instances for as long as it exists,
whether or not anyone calls it — this is the single most common
forgotten-cost item on an ML account. Batch transform jobs do not need
this step; they stop billing when the job ends on its own.

## 2. Stop idle compute

```
[ ] Stop or turn on idle shutdown for any JupyterLab/Studio space
[ ] Stop notebook instances you are not actively using
[ ] Stop an MLflow tracking server if one was created for this project
```

Idle shutdown needs SageMaker Distribution image version 2.0+ and can be
set at the domain or user-profile level.

## 3. Clean up storage

```
[ ] Delete or archive S3 data you no longer need (raw/, processed/, models/)
[ ] Delete feature groups you no longer use (the online store is
    always-on infrastructure and bills even when nothing reads it)
[ ] Delete MLflow artifact-store objects if the tracking server itself
    was deleted
```

## 4. Confirm it actually stopped

```
[ ] Check the Billing console / Cost Explorer that nothing from this
    project is still accruing charges
[ ] Keep (or set) an AWS Budget alert on the project's resource group
    or tags, so a missed item surfaces before the invoice does
```

## 5. The promotion-gate sanity check (model-specific)

Before marking a model version "done," confirm:

```
[ ] Test AUC (not just validation AUC) meets the stated gate
[ ] Recall/precision reported per meaningful segment, not only overall
[ ] The model card names at least one real limitation
[ ] The approved version in the Model Registry matches what is
    actually deployed
```

## Why this list exists

A trained model costs nothing to admire in a notebook. It costs real
money the moment it becomes a running endpoint, a scheduled monitor, or
an always-on feature store — and none of those stop themselves. Treat
this checklist as the last cell in every notebook, not an afterthought
you get to eventually.
