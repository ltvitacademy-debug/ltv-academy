# Script — Trust, Availability and Salesforce Security Basics

## Segment 1 (title)

This lesson is about trust.salesforce.com — the platform's own public status page — and the basic security concepts every beginner needs before going further.

## Segment 2 (screenshot: trust.salesforce.com homepage)

This is the real, live trust.salesforce.com homepage. Notice the navigation bar: Status, Security, Compliance, Availability. Because your org runs on shared, multitenant infrastructure, this site is where you check Salesforce's own operational health, instead of guessing.

## Segment 3 (steps: four things one site)

This one site does four things: it shows your specific instance's live status, it publishes exactly when your next scheduled maintenance window and release upgrade will land, it tracks historical uptime that's often referenced in enterprise contracts, and it hosts security advisories and compliance documentation like SOC 2 and ISO 27001. Admins check this constantly — often before assuming a problem is in their own org.

## Segment 4 (code: two layers of access)

Inside your own org, security splits into two separate layers. Profiles and permission sets control access to functionality — which objects, fields, and apps a user can even use. Sharing rules and org-wide defaults control access to records — which specific rows that user can actually see. And every Salesforce user is now required to use Multi-Factor Authentication, enforced platform-wide.

## Segment 5 (outro)

That wraps up Chapter 3. Next lesson starts Chapter 4 — actually using Salesforce, beginning with objects, records, and fields.
