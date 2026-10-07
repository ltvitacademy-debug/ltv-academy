# Script — Capstone: Build It

## Segment 1 (title)

With the brief laid out, it's time to actually write the configuration. Let's walk through the root module that calls both network modules and ends with a real plan showing exactly what Northbridge's dev environment is about to get.

## Segment 2 (code)

The root main.tf calls the azure-network and aws-network modules side by side, each with its own CIDR range, and both sharing one local.common_tags map defined once and reused everywhere.

## Segment 3 (code)

Resources that don't belong inside either module sit right alongside the module calls — the App Service plan, the S3 bucket for product images — each one reading its resource group or tags from a module output or the shared local value instead of repeating anything by hand.

## Segment 4 (code)

Running terraform plan against all of this shows every resource about to be created across both clouds — twelve to add, zero to change, zero to destroy. A clean plan with the expected count is the signal to move forward, and it's exactly what a teammate would review in a pull request first.

## Segment 5 (outro)

With a clean plan in hand, next up is Lesson 36: applying it, tearing it down safely, and how to present this project in a portfolio or an interview.
