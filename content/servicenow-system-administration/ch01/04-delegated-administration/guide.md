# Lesson 4 — Delegated Administration

**Chapter 1 · Users, Groups & Roles · Lesson 4 of 36**

## What you'll learn

- What delegated administration actually means in ServiceNow
- Why handing out full `admin` is the blunt, risky option — and what it exposes
- Real scoped administrative roles ServiceNow ships with: `user_admin`, `catalog_admin`, `report_admin`
- How these roles tie directly back to least privilege and role containment from Lesson 3
- How to decide, as an administrator, which scoped role actually fits a request

## The problem delegated administration solves

Not every administrative task requires full system access. A manager who needs to reset passwords and update a handful of user fields for their team doesn't need the ability to rewrite business rules or change system properties. A catalog owner who needs to add new Service Catalog items and tweak variable sets doesn't need to touch ACLs or scheduled jobs. If the only administrative option available were the full `admin` role, you'd face a bad choice on every one of these requests: either refuse the request and become a bottleneck for routine work, or grant `admin` and hand out far more power than the task actually needs — remember from Lesson 3 that `admin` contains nearly every other role, so granting it is never a small decision.

**Delegated administration** is ServiceNow's answer: a set of narrower, purpose-built administrative roles that let a non-full-admin user manage one specific slice of the platform, with real functional power in that one area and nothing outside it.

## Real scoped admin roles

ServiceNow ships several of these out of the box, and recognizing them by name is a practical administrator skill:

- **`user_admin`** — manages user records: creating users, editing fields, managing group membership. This is the role for an HR-adjacent manager or a helpdesk lead who needs to administer people, without needing access to catalog configuration, business rules, or system properties.
- **`catalog_admin`** — manages the Service Catalog: catalog items, categories, variable sets, catalog UI policies (all covered in Chapter 3). A catalog owner with this role can build and maintain the entire catalog experience without ever touching `admin`.
- **`report_admin`** — manages reporting: creating and administering reports and dashboards platform-wide, including reports other users have built, without needing access to the underlying data configuration that produced that data.

Each of these is a genuinely scoped grant: a user with only `catalog_admin` cannot reset another user's password, and a user with only `user_admin` cannot touch a catalog item. That boundary is the entire point.

## Tying this back to least privilege

Delegated administration is least privilege applied at an organizational level, not just a per-record level. Instead of asking "does this person need to do administrative work?" (a yes/no question that too often resolves to "grant admin"), a careful administrator asks "which specific administrative function does this person need, and is there a narrower role that grants exactly that?" This is also where Lesson 3's containment lesson comes back around: before assigning any of these scoped roles for the first time, it's still worth opening the role record and checking its Contains Roles list, because a scoped role in a heavily customized instance can sometimes have been configured to contain more than its name implies. The habit doesn't change just because the role sounds narrower.

## Deciding which role fits a request

When a request for "more access" comes in, work through it the way an administrator actually should: first, identify the specific task the person needs to do (reset passwords? build catalog items? manage dashboards?). Second, check whether a scoped role already covers exactly that task — `user_admin`, `catalog_admin`, and `report_admin` cover a lot of common ground, and many ServiceNow instances define additional custom scoped roles for other narrow functions. Third, only reach for full `admin` when the request genuinely spans multiple administrative domains at once (a true platform owner role) or when no scoped role exists and building one isn't practical. Defaulting to `admin` because it's the familiar, "safe" choice is actually the opposite of safe — it's the choice that creates the most risk if that account is ever compromised or misused.

## Key terms

| Term | Meaning |
|---|---|
| Delegated administration | Granting a scoped slice of administrative power instead of full admin |
| `user_admin` | Scoped role for managing user records and group membership |
| `catalog_admin` | Scoped role for managing the Service Catalog |
| `report_admin` | Scoped role for managing reports and dashboards |
| Least privilege (org level) | Matching the narrowest role that covers the actual task, rather than defaulting to admin |

## Check yourself

A department lead asks for "admin access" so they can manage their team's user accounts and also build a couple of new catalog items. What's the least-privilege way to fulfill this request, and which two roles does it likely involve instead of full admin?
