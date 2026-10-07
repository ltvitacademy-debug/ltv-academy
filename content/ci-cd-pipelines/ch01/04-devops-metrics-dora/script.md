# Script — DevOps Metrics: DORA

## Segment 1 (title)

How do you know if a CI slash CD pipeline is actually making things better, rather than just different? Google's DevOps Research and Assessment team spent years studying thousands of software organizations and found four metrics that reliably separate high performers from the rest. Let's cover all four, and how Northbridge Retail would track them.

## Segment 2 (steps)

Deployment Frequency measures how often you release to production — elite teams deploy on demand, multiple times a day, while low performers deploy less than once a month. Lead Time for Changes measures commit to live in production — elite teams do that in under an hour. Change Failure Rate measures what percentage of deployments cause a production failure. And Time to Restore Service measures how long recovery takes when something does fail, with elite teams restoring service in under an hour.

## Segment 3 (steps)

DORA groups these into two pairs: throughput, which is speed, and stability, which is safety. The counterintuitive finding is that these aren't a trade-off, and teams don't have to choose between fast and safe. The highest performing teams are fast and stable at the same time, because small changes, automated testing, and fast rollback make deployment both safer and faster at once.

## Segment 4 (steps)

At Northbridge Retail's cart service, that might look like eight deploys a day, a 22 minute lead time for a bug fix, and a 5 percent change failure rate — two bad releases out of the last forty, solidly in elite range. None of these come from one pipeline run; they're measured over weeks or months of real deployments, which is exactly why they're useful for judging a CI/CD investment.

## Segment 5 (outro)

That closes out the conceptual groundwork. Up next, chapter two: building Northbridge Retail's first real pipeline in GitHub Actions.
