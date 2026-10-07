# Script — Common ML Platform Components

## Segment 1 (title)

Whether a team builds, buys, or mixes both, the actual list of components an ML platform needs is fairly consistent across companies. This lesson maps that list, so the rest of this course has a shared vocabulary — the next several chapters each go deep on one of these pieces.

## Segment 2 (steps)

Four of the six show up almost everywhere. A feature store defines, stores, and serves input features, so training and live prediction use the exact same definition. Experiment tracking logs every run's parameters, metrics, and artifacts, so you can compare one run against another without digging through notebook history. A model registry is a versioned catalog of trained models, tracking what's in production, staged, or archived. And pipeline orchestration runs data prep, training, and evaluation as a reproducible job instead of a notebook someone runs by hand.

## Segment 3 (steps)

The rest of the list rounds it out. Deployment infrastructure packages a trained model and rolls it out, often gradually, to serving infrastructure. Monitoring and reliability tooling watches model performance and data drift, with the on-call and incident response built around it. And a seventh thread, versioning and lineage, isn't a separate component — it runs through all the others, since every piece needs to answer which version of it ran, on which data, producing which result.

## Segment 4 (steps)

Picture one model's path through all of this. A scientist defines a feature in the feature store, which backfills history for training and serves fresh values in production. A pipeline trains a candidate and logs the run to the experiment tracker. The best candidate gets registered and promoted toward production. Deployment infrastructure rolls it out. And monitoring watches the live result, sometimes triggering a new pipeline run and closing the loop.

## Segment 5 (outro)

These six jobs are consistent whether you're on one managed platform or a fully self-hosted stack — the names change, the jobs don't. Up next, lesson four: how the need for each of these changes as a company scales from one model to hundreds.
