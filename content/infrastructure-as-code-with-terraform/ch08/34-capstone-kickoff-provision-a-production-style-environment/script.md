# Script — Capstone Kickoff

## Segment 1 (title)

Everything in this course has been building toward one project. Northbridge Retail needs a small but genuinely production-style environment provisioned across both clouds, using modules, remote state, and everything else from this course. Here's the brief.

## Segment 2 (steps)

Northbridge's checkout service needs a home on both clouds: an Azure side with a resource group, virtual network, and an App Service running the storefront API, and an AWS side with a VPC, an S3 bucket for product images, and a Lambda function for order confirmation emails.

## Segment 3 (code)

You'll build it in this structure — two shared modules, one for each cloud's network, called from an environments/dev folder with its own backend and tfvars. This mirrors the directory-per-environment pattern from Chapter 7.

## Segment 4 (steps)

Before this counts as done, it needs a clean init and plan with no errors, every resource tagged with environment and project, no secret anywhere in a committed file, and state configured for a remote backend instead of left local.

## Segment 5 (outro)

Next up, Lesson 35: actually writing the configuration, with a real plan output showing exactly what this environment will contain.
