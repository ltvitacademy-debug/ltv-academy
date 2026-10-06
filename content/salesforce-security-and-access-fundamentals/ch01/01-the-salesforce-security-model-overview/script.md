# Script — The Salesforce Security Model Overview

## Segment 1 (title)

Every access question in Salesforce comes down to two questions, and this lesson draws the line between them before we spend the next twelve lessons going deep on each side.

## Segment 2 (steps: Two questions)

First: what can this user do, in general — see an object at all, create one, edit a field? That's object and field-level access, controlled by profiles, permission sets, and field-level security. Second: which specific records can they see — of fifty thousand Accounts, which ones are in front of them? That's record-level access, controlled by org-wide defaults, the role hierarchy, sharing rules, manual sharing, and teams. Both checks have to pass. A user can have full edit rights on the Account object and still see zero Account records, because nothing granted them access to any specific one.

## Segment 3 (screenshot: New User)

Look at the New User page in Setup — Role and Profile sit right next to each other, but they do completely different jobs. Profile governs what the user can do. Role governs which records open up to them through the hierarchy. That split is the whole model in miniature.

## Segment 4 (screenshot: Object Access matrix)

Chapter 1 covers the first question in full: object permissions and CRUD, profiles, permission sets, field-level security, and how profiles and permission sets combine into one effective set of access. This is the real matrix behind it — Create, Read, Edit, Delete, View All, Modify All, checked against both profiles and permission set groups.

## Segment 5 (screenshot: Role Hierarchy)

Chapter 2 covers the second question — org-wide defaults set the floor, the role hierarchy opens access upward through management chains, sharing rules extend it to groups outside that hierarchy, and manual sharing and teams handle the one-off exceptions. The role hierarchy, shown here, is the backbone all of that leans on.

## Segment 6 (outro)

Salesforce layers it this way so broad defaults stay cheap to maintain while precise exceptions stay possible without multiplying that baseline. Next up: Object Permissions and CRUD — the first layer, in depth.
