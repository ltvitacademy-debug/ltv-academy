# Script — IAM Best Practices for Pipelines

## Segment 1 (title)

This chapter covered how roles work, how bucket policies combine with identity policies, and cross-account access. This last lesson pulls it all together into the habits that keep a pipeline from being one leaked credential away from an incident.

## Segment 2 (code: scoped, not wildcard)

A wildcard policy — s3 colon star on resource star — works immediately on any bucket, which is exactly the problem: a bug or compromised dependency now has access to everything. Scope the resource field to the specific prefixes the job actually touches, and a bug's blast radius shrinks to just those prefixes.

## Segment 3 (steps: four habits)

Three habits hold up in production: least privilege by default, granting exactly what a job needs and nothing more; roles instead of standing access keys everywhere, with IAM Identity Center for human operators instead of long-lived user credentials; and running IAM Access Analyzer on an ongoing basis to catch policies that grant more external access than intended.

## Segment 4 (outro)

IAM for data pipelines, done. Next up: Glue architecture, opening Chapter Three — AWS Glue and the Glue Catalog.
