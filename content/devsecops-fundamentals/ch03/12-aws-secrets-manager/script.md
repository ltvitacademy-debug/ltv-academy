# Script — AWS Secrets Manager

## Segment 1 (title)

For the AWS side of Northbridge Retail's data pipeline, the equivalent of Key Vault is AWS Secrets Manager. The core idea carries over directly: store the secret centrally, grant access through IAM instead of handing out the raw value. Secrets Manager adds one thing Key Vault doesn't handle quite the same way — built-in scheduled rotation.

## Segment 2 (steps)

Creating a secret starts with a type: database credentials, with built-in support for RDS, Redshift, and DocumentDB, or any other secret as structured key-value pairs. Unlike a Key Vault secret holding one string, a Secrets Manager secret commonly stores a username and a password together as one JSON object.

## Segment 3 (code)

The same action from the CLI creates a secret with that structured JSON value directly — a database credential naturally needs more than one field, stored together rather than as three separate secrets.

## Segment 4 (steps)

Automatic rotation is the signature feature. Instead of a human remembering to rotate a password on a schedule — which realistically means it never happens — a Lambda function generates a new credential, updates the target database, and updates the stored secret, all on a defined schedule. For RDS and Redshift, AWS's managed rotation handles that Lambda for you.

## Segment 5 (code)

Reading a secret still comes down to the same least-privilege IAM shape from Lesson 7 — GetSecretValue, scoped to one secret's ARN. Notice the random six-character suffix on that ARN: it stops a policy from accidentally matching a different secret that happens to share a name prefix.

## Segment 6 (outro)

Secrets Manager plays the same role as Key Vault, with scheduled rotation as its standout feature. Next up: HashiCorp Vault, for teams that don't live entirely inside one cloud.
