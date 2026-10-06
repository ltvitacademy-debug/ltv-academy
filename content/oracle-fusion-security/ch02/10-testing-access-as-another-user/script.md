# Script — Testing Access as Another User

## Segment 1 (title)

Chapter two has built up users, security contexts, role assignments, and provisioning. This closing lesson covers how you actually verify all of it worked — without guessing, and without waiting for a ticket.

## Segment 2 (steps)

From the Roles tab in the Security Console, you can select a role or a user and choose Simulate Navigator. It previews the Navigator menu structure, with a padlock marking anything not currently authorized, plus two follow-up views: which roles would grant access to a given menu item, and which privileges sit behind it. It's fast and needs no login as anyone else — but it only shows function security, which pages and menus are reachable. It can't show what data would actually appear, because that depends on an actual session.

## Segment 3 (steps)

Because Simulate Navigator stops at function security, confirming real data access still needs either the actual user testing it, or an administrator using a dedicated test user account — provisioned with the identical role and data access — signing in and checking what appears. Never borrow a real employee's credentials for this. At Castellan Robotics, before go-live, the implementation team builds test accounts mirroring each job-role-plus-data-access combination and walks through every one before a real employee is provisioned.

## Segment 4 (steps)

The practical workflow: simulate first to confirm function security, then sign in as a matching test account to confirm data security. If something's wrong, trace back through privilege, duty role, job role for function problems, or data access set, business unit, security context for data problems.

## Segment 5 (outro)

Simulate first, then test as a real account — that habit saves you from assuming a role looks right without ever confirming what a real session shows. Chapter two is complete. Up next, chapter three and lesson eleven: financials job roles.
