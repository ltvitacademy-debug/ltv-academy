# Script — CI/CD for the Pipeline

## Segment 1 (title)

Every resource so far has been described as if it were built once, by hand, in the console. This lesson deploys the Glue script and the state machine definition through a GitHub Actions pipeline instead.

## Segment 2 (code: the repo)

Both deployable artifacts — the PySpark script and the ASL state machine definition — live in a repo called northfield-data-platform, in version control, so a pull request against either one is now a reviewable, diffable change.

## Segment 3 (code: the deploy job)

On push to main, when files under glue-jobs or state-machines change, the workflow assumes a deploy role via OIDC, uploads the Glue script to S3 and updates the Glue job, then updates the Step Functions state machine's definition directly from the repo.

## Segment 4 (steps: why OIDC, not stored keys)

The workflow uses GitHub's OIDC identity provider to assume northfield-github-actions-deploy-role only for the duration of the job — no long-lived AWS access key sits in GitHub Secrets. The role's trust policy restricts which repo and branch can even assume it.

## Segment 5 (outro)

Next up: a cost optimization pass, tuning storage classes, Redshift capacity, and Glue sizing now that the pipeline is fully built and monitored.
