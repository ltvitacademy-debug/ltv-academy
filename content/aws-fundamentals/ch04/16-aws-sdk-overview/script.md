# Script — AWS SDK, Overview

## Segment 1 (title)

An AWS SDK is a language-specific library that calls the exact same AWS APIs the CLI does. Boto3, the Python SDK, is the one you'll meet constantly, since Glue, Lambda, and most pipeline glue code is Python.

## Segment 2 (code: same API, different interface)

Same API call underneath, different interface on top. The CLI command aws s3 cp becomes s3_client.upload_file in boto3. The CLI is for humans and shell scripts; the SDK is for code — a Lambda function, a Glue job's script, an orchestration task.

## Segment 3 (code: client vs. resource)

Boto3 gives you two interfaces. Client is low-level, mapping almost one to one onto every API action, and it exists for every service. Resource is a higher-level, more Pythonic, object-oriented layer — convenient, but only available for a subset of services.

## Segment 4 (steps: the credential chain)

The SDK never asks you to hardcode an access key. It searches a fixed credential chain — environment variables, a shared credentials file, and critically, an IAM role attached to the compute running the code, like a Lambda execution role.

## Segment 5 (outro)

That's the direct payoff of Chapter Three's execution-role pattern: code inside a Lambda function just picks up its role's temporary credentials automatically, zero credential handling required. Next up: putting the CLI and SDK to work deploying something real.
