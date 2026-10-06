# Script — Email-to-Case Overview

## Segment 1 (title)

Support teams shouldn't have to copy-paste customer emails into cases by hand. Email-to-Case watches an inbox and creates, or updates, a case for every message that arrives — this lesson is the overview of how it's wired together.

## Segment 2 (screenshot: Email-to-Case Settings page)

Setup starts on the Email-to-Case Settings page. An admin enables Email-to-Case, sets Case Source to Email so you can report on email-originated cases, and turns on On-Demand Service so Salesforce receives mail directly instead of needing local software.

## Segment 3 (screenshot: Routing Addresses — New button)

Next, a routing address — the actual email address customers write to. Every org starts with none defined; you click New under Routing Addresses to create the first one.

## Segment 4 (screenshot: routing address form)

The routing address form asks for a Routing Name, the real inbox address customers already use, and the defaults every case from that address should get: Case Owner, Priority, and Origin.

## Segment 5 (screenshot: generated email services address)

Save it, and Salesforce generates a unique address ending in .case.salesforce.com. You configure your real mail system to forward incoming messages to that generated address — that's the actual mechanism that turns an email into a case.

## Segment 6 (steps: On-Demand vs. Agent)

There are two delivery methods: On-Demand Service, which works out of the box with no local software, and the legacy on-premise Email-to-Case Agent, which polls a mailbox you run yourself. Almost every org today uses On-Demand. Either way, the email's subject becomes the case subject and the body becomes the case description.

## Segment 7 (outro)

Next up: Chatter and Collaboration — the feed, follows, and groups that keep everyone looking at the same case or opportunity in sync.
