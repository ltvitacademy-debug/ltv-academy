# Script — Users and User Accounts

## Segment 1 (title)

Before any role or privilege matters, a user account has to exist. This lesson covers how Oracle Fusion user accounts get created, what information they carry, and the account lifecycle an administrator manages day to day.

## Segment 2 (steps)

Most user accounts are created automatically the moment a worker record is created — when HR hires an employee, or an implementation team creates a contingent worker record. That's called user account auto-creation. Accounts can also be created manually, through Manage Users, for people who aren't workers at all — an external auditor, a consultant, or a service account used by an integration.

## Segment 3 (steps)

A user account carries a unique user name, a link back to a person record where one exists, a password or single sign on identity, and a status. It does not carry any access on its own. A brand new account at Castellan Robotics can sign in once activated and see essentially nothing until roles are provisioned — that's lesson nine.

## Segment 4 (steps)

Accounts move through three states. Active means the account can sign in and use whatever its roles provide. Inactive means it exists but can't sign in, usually because the person was terminated or the account was deliberately deactivated. Locked is a temporary state, usually from failed sign-in attempts, and it's cleared by an administrator rather than by changing the account's active status. Deactivating a terminated employee promptly isn't just tidiness — it's exactly the kind of gap a security audit will catch later in this course.

## Segment 5 (outro)

A user account is the starting point, but by itself it grants nothing. Up next, lesson three: job roles, abstract roles, and data roles — the things that actually give that account something to do.
