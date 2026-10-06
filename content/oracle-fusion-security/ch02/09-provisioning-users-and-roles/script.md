# Script — Provisioning Users and Roles

## Segment 1 (title)

Every lesson so far has referred to provisioning a role to a user without fully explaining the mechanics. This lesson covers how a role actually ends up attached to a user's account.

## Segment 2 (steps)

A role mapping defines a relationship between a role and a set of conditions — say, anyone whose job is Accounts Payable Specialist and whose business unit is US Operations. Role mappings are configured in Manage Role Provisioning Rules, in Setup and Maintenance. Every automatic or self-requestable grant in the system traces back to one of these.

## Segment 3 (steps)

There are three ways a role gets provisioned. Autoprovisioning grants the role automatically the moment a matching assignment is created or updated, if the mapping has that option selected — that's how a new AP Specialist hire at Castellan Robotics gets her job role the same day. Manual provisioning is an administrator adding a role directly through the Security Console, for anything that doesn't fit a clean rule. Self request lets a matching user request a role themselves, usually with an approval workflow, which is lesson sixteen.

## Segment 4 (steps)

Autoprovisioning only works for users with associated worker information — which ties back to lesson two's point that most accounts come from a worker record in the first place. A purely manual account, like an external auditor's, can still get roles, just never through autoprovisioning.

## Segment 5 (outro)

Getting role mappings right during implementation turns "IT manually configures every new hire" into "every new hire gets correct access automatically." Done badly, you get over-provisioning or under-provisioning, every single time. Up next, lesson ten: testing access as another user, so you can verify what all this provisioning actually produced.
