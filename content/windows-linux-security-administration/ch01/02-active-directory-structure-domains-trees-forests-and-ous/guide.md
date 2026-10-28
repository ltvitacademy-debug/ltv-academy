# Lesson 2 — Active Directory Structure: Domains, Trees, Forests, and OUs

**Chapter 1 · Windows Server & Active Directory Fundamentals · Lesson 2 of 4**

## What you'll learn

- The four levels of Active Directory structure, from the ground up: domain, tree, forest, and OU
- What a forest and a tree actually are, and why most organizations never need more than one domain
- Why Organizational Units (OUs) exist — applying Group Policy and delegating admin to a subset of objects
- How to map a realistic company org chart onto an OU structure

## The hierarchy, bottom to top (and top to bottom)

Active Directory organizes everything — users, computers, groups — inside a structure
with four levels. From the top down:

```
Forest        contoso.com (the whole security boundary)
  Tree         contoso.com (a set of domains sharing a contiguous namespace)
    Domain      contoso.com (the actual administrative/security unit)
      OU          Sales, IT, HR (containers for organizing and managing objects)
```

A **domain** is the real administrative and security boundary — it has its own domain
controllers, its own copy of the AD database, and its own security policies. A **tree**
is one or more domains that share a contiguous DNS namespace, like `contoso.com` and
`sales.contoso.com` — a parent-child relationship in naming. A **forest** is the outer
boundary: one or more trees, connected by trust relationships, sharing a common schema
(the rules defining what kinds of objects and attributes can exist) and a Global Catalog.
The vast majority of small and mid-sized organizations run a **single domain in a single
tree in a single forest** — one `contoso.com`, nothing more exotic. Multiple domains or
trees usually show up only when a company has genuinely separate security requirements
or merges with another organization that already has its own AD forest.

## Organizational Units: why they exist

An **Organizational Unit (OU)** is a container inside a domain that holds users,
computers, groups, or even other OUs. Unlike a domain, tree, or forest, an OU is not a
security boundary — it's an **administrative and organizational** one, and it exists for
exactly two reasons:

1. **Applying Group Policy Objects (GPOs).** A GPO linked to an OU applies to everything
   inside it. Link a "Disable USB Storage" GPO to a `Finance` OU, and only computers in
   that OU get the restriction — not the whole domain.
2. **Delegating administrative control.** You can grant a help desk technician the
   right to reset passwords for users *inside the Sales OU only*, without giving them any
   rights over Finance or IT accounts. This is called **delegation**, and it's how large
   IT departments let junior staff do limited, scoped work safely.

## Mapping a real org chart to OUs

Picture a mid-sized company, Contoso Manufacturing, with a `contoso.com` domain. A
realistic OU structure that mirrors its org chart might look like:

```
contoso.com
  Corp
    Workstations
    Servers
  Departments
    Sales
      Users
      Computers
    IT
      Users
      Computers
      Service Accounts
    HR
      Users
      Computers
    Finance
      Users
      Computers
```

Notice the pattern: each department gets its own OU, and inside each department, users
and computers are split into their own sub-OUs. That split matters in practice — a GPO
that maps a network drive applies to users, not computers, and a GPO that enforces a
screen-lock timeout applies to computers, not users. Splitting them lets each kind of
policy target exactly the objects it should, without accidentally hitting the wrong one.

## Key terms

| Term | Meaning |
|---|---|
| Domain | The real administrative and security boundary in AD, with its own domain controllers and database |
| Tree | One or more domains sharing a contiguous DNS namespace |
| Forest | The outer AD boundary — one or more trees sharing a schema and Global Catalog |
| Organizational Unit (OU) | A container inside a domain used to apply GPOs and delegate admin rights to a subset of objects |
| Delegation | Granting a specific person or group limited admin rights over one OU, without domain-wide access |

## Check yourself

A help desk technician needs to reset passwords for the Sales department only, and
should never be able to touch Finance or IT accounts. Which AD feature makes that
possible, and at what level of the structure would you apply it?
