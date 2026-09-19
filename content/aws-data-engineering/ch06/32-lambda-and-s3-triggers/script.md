# Script — Lambda + S3 Triggers

## Segment 1 (title)

S3 PUT events are the single most common Lambda trigger pattern in data engineering. A file lands, and a Lambda function processes it automatically, within moments, with nothing polling anything.

## Segment 2 (code: S3 event notification)

A bucket, or a prefix inside it, gets configured with an event notification — on ObjectCreated, matching some prefix and suffix filter, invoke a specific Lambda function. The moment a matching file lands, S3 invokes that function and passes it the bucket name and object key.

## Segment 3 (steps: two permission pieces, both required)

Two separate permissions have to be in place. A resource-based policy on the Lambda function lets S3 actually invoke it. An execution role attached to the function lets it read or write the S3 objects it's processing. Miss the first and S3 silently can't invoke the function. Miss the second and the function gets invoked but fails with access-denied the moment it tries to fetch the object.

## Segment 4 (outro)

Lambda plus S3 triggers down. Next up: Lambda's limitations for data workloads — where this pattern stops being the right tool, and what to reach for instead.
