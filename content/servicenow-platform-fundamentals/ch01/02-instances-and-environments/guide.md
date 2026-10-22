# Lesson 2 — Instances & Environments

**Chapter 1 · What ServiceNow Actually Is · Lesson 2 of 34**

## What you'll learn

- What a ServiceNow "instance" actually is, technically
- Why a customer never has just one instance
- The standard Development → Test/QA → Production pattern and why it exists
- How customizations actually move between instances (at a conceptual level)
- How to recognize an instance from its URL

## An instance is a complete, isolated deployment

A ServiceNow **instance** is a full, independent copy of the platform: its own database, its own
set of applications, its own customizations, its own users and roles. Two instances belonging to
the same customer do not share data. If you create an incident in one instance, it does not exist
in any other instance unless someone deliberately copies or integrates the data across. This is
different from, say, two environments in many other SaaS products that might share an underlying
database with environment flags — ServiceNow instances are genuinely separate.

Every customer's contract with ServiceNow entitles them to a set number of instances, each
provisioned on ServiceNow's cloud infrastructure, each independently addressable.

## Why a real customer has more than one

No organization builds and tests changes directly in the environment their employees and
customers rely on every day. A typical ServiceNow customer runs at least three instances:

- **Development** — where admins and developers build and test new configuration, workflow, or
  code changes, often with made-up or scrubbed data
- **Test / QA** — a stable environment where changes are validated against more realistic data
  and by actual business testers before anyone trusts them
- **Production** — the live instance that real employees, agents, and customers use daily

Larger organizations often add more: a dedicated **UAT** (user acceptance testing) instance, a
**sub-production/staging** instance that mirrors production closely for final checks, or
additional dev instances per team or project.

## How changes actually move between instances

A change built in Development doesn't just appear in Production — it has to be deliberately
packaged and promoted. ServiceNow's long-standing mechanism for this is the **Update Set**: a
container that records configuration changes (new fields, modified business rules, new forms) so
they can be captured in one instance and committed into another. More recently, ServiceNow has
pushed toward **Source Control integration** — storing that same configuration as code in a Git
repository and using DevOps tooling to promote it between instances, closer to how software
engineering teams already manage code. This course does not go deep into either mechanism yet —
Update Sets and Source Control/DevOps are covered properly later, in the DevOps, Testing &
Deployment course further along this learning path. For now, the important idea is simply that
promotion between instances is deliberate and tracked, never a silent copy.

## Recognizing an instance by its URL

Every ServiceNow instance has a predictable URL pattern:
`https://<instance-name>.service-now.com`. The `<instance-name>` is chosen when the instance is
provisioned and often hints at its role — for example `acme` for production, `acmetest` for
Test/QA, and `acmedev` for Development are common (though not universal) naming conventions. When
you're troubleshooting or following along with any lab in this course, the first thing worth
checking is the instance name in the browser's address bar — it tells you immediately which
environment you're actually looking at, which matters enormously once you're making real changes.

## Key terms

| Term | Meaning |
|---|---|
| Instance | A complete, isolated ServiceNow deployment with its own database and customizations |
| Development instance | Where admins/developers build and test changes before anyone else sees them |
| Update Set | A container that records configuration changes so they can be moved between instances |
| Source Control / DevOps integration | Modern approach storing configuration as code in Git, promoted via DevOps tooling |

## Check yourself

Without looking back: why can't you just "copy" an incident record from a Development instance
into Production by hand, and what's the name of the mechanism ServiceNow traditionally uses to
move configuration changes between instances deliberately?
