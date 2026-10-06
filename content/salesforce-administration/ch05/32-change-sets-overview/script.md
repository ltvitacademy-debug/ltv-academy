# Script — Change Sets Overview

## Segment 1 (title)

A sandbox is where you build safely. A change set is how what you built actually gets to production — Salesforce's native, point-and-click way to move configuration between two orgs without deploying from code.

## Segment 2 (screenshot: deployment connection settings)

Before any change set can move, the two orgs have to trust each other. On the Deployment Connections page, the target org checks Allow Inbound Changes, and the source checks Accept Outbound Changes — without that handshake, nothing can be sent.

## Segment 3 (screenshot: new change set)

In the sandbox — the source org — you create an Outbound Change Set. At this point it's just a Name and a Description; no components yet.

## Segment 4 (screenshot: change set components)

Next, add components: the specific fields, flows, page layouts, objects, or other metadata this change actually touches. View/Add Dependencies is worth clicking every time — it catches related components you'd otherwise forget and the deployment would fail without.

## Segment 5 (screenshot: deploy change set — test options)

Upload the change set, and it shows up as an Inbound Change Set in the target org. Deploying it asks which Apex tests to run: Default, Run Local Tests, Run All Tests, or Run Specified Tests — production deployments with Apex classes or triggers require this before anything goes live.

## Segment 6 (steps: the five-step flow)

Five steps end to end: connect the orgs once, create the outbound change set, add every component it needs, upload it, and deploy it from the inbound side after choosing a test level.

## Segment 7 (outro)

Next up: Release Updates and Critical Updates — how Salesforce rolls out changes to the platform itself, and what an admin needs to do about them.
