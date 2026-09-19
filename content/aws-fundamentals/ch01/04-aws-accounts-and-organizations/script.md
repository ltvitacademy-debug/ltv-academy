# Script — AWS Accounts & Organizations, Basics

## Segment 1 (title)

An AWS account is the fundamental container in AWS — it holds your resources, your billing, and every identity that can act inside it, starting with one all-powerful root user you're not meant to use day-to-day.

## Segment 2 (code: account as container)

The root user is tied to the sign-up email and can do literally anything, including closing the account, so AWS's own guidance is to lock it away behind MFA and create individual IAM users or roles for everyday access instead.

## Segment 3 (steps: why many accounts)

Real organizations rarely stop at one account — they split by environment or team, because separate accounts give a hard security and billing boundary. Organizations groups those accounts, arranges them into OUs, and gives you consolidated billing plus Service Control Policies as guardrails.

## Segment 4 (outro)

A mistake in "dev" can't reach "production" when they're not just logically separated but entirely different accounts. Next up: the shared responsibility model.
