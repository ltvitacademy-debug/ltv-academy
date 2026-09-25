# Script — API-Based Integration Basics

## Segment 1 (title)

Connectors are convenient, but sometimes an integration goes straight through Salesforce's APIs. You met them in the SOQL course. Here's the integration view: which API fits, how to authenticate, and how to stay within limits.

## Segment 2 (steps: choosing an API)

Match the API to the job. The REST API is best for queries and moderate volumes. The Bulk API runs large asynchronous jobs, so it's the usual choice for big extracts and loads. And event-based options like Change Data Capture push changes to a subscriber in near real time. Small and interactive, REST. Big and scheduled, Bulk. Near real time, events.

## Segment 3 (code: a REST query)

A REST query is just SOQL sent over HTTPS. The request path includes an API version, and the response comes back in pages, so a good client follows the next-records link until it's done. Authentication uses OAuth 2.0, so the program gets a short-lived token without a human logging in. Salesforce has been moving new integrations from connected apps toward external client apps, so check current docs before you build.

## Segment 4 (code: incremental pulls)

Don't re-download everything each run. Filter on SystemModstamp, which updates whenever a record changes, and save the latest value you saw as the starting point for the next run. Deleted records need separate handling, because a deleted row simply stops appearing. Run the job as a dedicated integration user with least-privilege access, since that user decides which records the pipeline can see.

## Segment 5 (outro)

Salesforce enforces API limits that vary by edition, so look up your own numbers rather than memorizing them. Prefer Bulk for volume, and pull incrementally. Next up: External Data in CRM Analytics.
