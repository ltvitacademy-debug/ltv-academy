# Script — AWS Bedrock, Overview

## Segment 1 (title)

Everything so far in this course has been Azure. Azure isn't the only cloud running production AI, and knowing the landscape beyond it is part of being a credible AI engineer — starting with AWS Bedrock.

## Segment 2 (screenshot: select model)

Bedrock's whole pitch is in its model picker — Amazon's own Titan models, Anthropic's Claude, Meta's Llama, Mistral AI, Cohere, and more, all grouped by provider in one console, behind one API, instead of a separate account and SDK per vendor the way working with each of those providers directly would require.

## Segment 3 (screenshot: test agent)

Before an agent built in Bedrock goes anywhere near production, the Test Agent window lets you step through a conversation turn by turn — including pausing on a tool call, like this order-history lookup, to review exactly what it wants to return before you submit it and let the agent continue.

## Segment 4 (code: converse API)

Calling a model is one unified command — the Converse API — the same request shape whether the model behind model-id is Anthropic's Claude or Amazon's own Titan, instead of a different request format per provider the way working with each vendor's own SDK would look.

## Segment 5 (steps: what Bedrock offers)

Three things pull teams toward Bedrock specifically: real multi-model choice without juggling separate vendor accounts, IAM-native security using the exact same identity model as the rest of an AWS account, and a serverless-by-default pricing model — pay per token, with no endpoint to provision before the first call.

## Segment 6 (outro)

A real alternative to Azure OpenAI, inside AWS's own identity and billing model. Next up: a third cloud, with its own answer to the same problem.
