# Lesson 13 — Metadata-Driven Architecture

**Chapter 3 · How Salesforce Works · Lesson 13 of 20**

## What you'll learn

- The difference between **data** and **metadata** in Salesforce
- Why almost everything an admin configures is metadata, not "code"
- Why this architecture is what makes Salesforce's "clicks, not code" customization possible
- How metadata is what actually moves between sandboxes, change sets, and packages

## Data vs. metadata

These two words get confused constantly, so it's worth being precise from the start.

**Data** is the actual business information stored in your org's records: the specific Account named "Acme Corp," the specific Contact named "Maria Gomez," the specific Opportunity worth $45,000 closing next quarter. Data is what your users create and edit every day.

**Metadata** is the *definition* of the structures that hold that data — and the configuration of how the whole org behaves. The fact that an Account has a field called "Industry" that's a picklist with values like "Technology," "Finance," and "Healthcare"? That's metadata. The page layout that decides which fields appear on the Account detail page, and in what order? Metadata. The validation rule that blocks a Contact from saving without an email address? Metadata. The automation that sends a Slack message when a deal closes? Also metadata.

A simple way to hold onto the distinction: **metadata is the blueprint, data is what gets built from the blueprint.**

## Why this is the whole point of the platform

Traditional enterprise software draws a hard line between "the application" (written by engineers, shipped as compiled code) and "the data" (what the application happens to store). If you wanted to add a new field to a form, you typically needed a developer to change the application itself.

Salesforce flips this. The vast majority of what makes your org *your* org — custom fields, objects, page layouts, validation rules, automation (Flow), permission sets, record types, reports, dashboards — is stored as **metadata records**, not as compiled application code. That's why an admin with no programming background can add a new custom field to the Account object in about thirty seconds through Setup: they aren't modifying Salesforce's underlying application at all. They're creating a new metadata record that tells the existing, unmodified application "this org also has a field called X, which behaves like Y."

This is the real meaning behind the phrase "clicks, not code" that you'll hear throughout your Salesforce career. Declarative tools like Flow, Process Builder (its retired predecessor), validation rules, and page layouts don't actually write application code — they generate and store metadata that the Salesforce platform engine reads and executes at runtime.

## Why it matters beyond the demo

This isn't just a trivia fact — it's the foundation for several things you'll do constantly as an admin or architect:

- **Change sets and deployments.** When you move a new field or Flow from a Sandbox to Production, you aren't copying rows of business data — you're deploying metadata, the blueprint itself, so the new environment gains that structure.
- **Unmanaged and managed packages.** Everything sold on AppExchange (Lesson 9) is fundamentally a bundle of metadata (plus, often, real code) that installs into your org.
- **Source control for Salesforce.** Modern development teams store an org's metadata as text files in Git, exactly the way software engineers version their code — because metadata *is* configuration-as-text once it's retrieved from the org.

## Key terms

| Term | Meaning |
|---|---|
| Data | The actual business records stored in an org (Accounts, Contacts, Opportunities, etc.) |
| Metadata | The definitions and configuration that describe how an org's structures and behavior work |
| Metadata-driven architecture | Salesforce's approach of storing customizations as metadata the platform engine interprets, rather than as compiled code |
| Change set | A bundle of metadata moved between Salesforce environments (e.g., Sandbox to Production) |

## Lab

1. In Setup, go to Object Manager → Account → Fields & Relationships, and find one standard field (like "Industry"). That field's definition is metadata.
2. Create a Contact record for a real-sounding person. That record is data.
3. In one sentence, explain why a Flow you build with clicks in Setup doesn't require a developer to "compile" anything.

## Check yourself

You're ready for Lesson 14 when you can give a coworker a clean, one-sentence definition of metadata vs. data, and explain why that distinction is the reason Salesforce admins can customize so much without writing code.
