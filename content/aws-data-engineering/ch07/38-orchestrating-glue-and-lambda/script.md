# Script — Orchestrating Glue & Lambda

## Segment 1 (title)

Let's put everything from this chapter together: a state machine that starts a Glue crawler, runs a Glue ETL job, and finishes with a Lambda notification — with retries and a failure path built in.

## Segment 2 (steps: three stages, chained)

StartCrawler refreshes the Data Catalog schema for newly-landed data. RunETLJob transforms that data now that the catalog is current. NotifyComplete invokes a Lambda that posts a completion message, only once the ETL job has actually succeeded.

## Segment 3 (code: shared failure path)

Both StartCrawler and RunETLJob catch their failures into the same NotifyFailure state. One fallback path handles a failure at either stage, instead of duplicating notification logic for each one — a genuinely common production pattern.

## Segment 4 (steps: visibility matters)

You could have one Lambda invoke the next to chain these steps, but then retry logic and failure branching live as scattered code, invisible from outside. Step Functions gives you one console view showing exactly where last night's run stopped, with retry and catch rules declared, not buried.

## Segment 5 (outro)

Orchestration chapter complete. Next up: AWS Database Migration Service — moving a real database into AWS, starting with DMS fundamentals.
