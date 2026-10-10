# Lesson 4 — Dev Hub

**Chapter 1 · Salesforce DX Basics · Lesson 4 of 22**

## What you'll learn

- What a Dev Hub org is and what capabilities it unlocks
- Which org types can and cannot be enabled as a Dev Hub
- The irreversibility of enabling Dev Hub, and why that matters for which org you pick
- How to authenticate the CLI to your Dev Hub and set it as the default

## What a Dev Hub actually is

A **Dev Hub** isn't a special edition of Salesforce — it's a regular org (production, a Developer Edition org, or a trial org) with one setting turned on that grants it the ability to create and manage **scratch orgs** and to create **second-generation packages**. Every scratch org you'll create starting in the next lesson traces back to a specific Dev Hub; the Dev Hub is what tracks how many active scratch orgs exist, enforces organization-wide scratch org limits, and is the org you authenticate packaging commands against.

## Which orgs qualify

You enable Dev Hub from **Setup → Dev Hub**, logged in as a System Administrator. A few rules matter here:

- Production, Developer Edition, and trial orgs can all be enabled as a Dev Hub.
- **Sandboxes cannot be enabled as a Dev Hub.**
- Once enabled, **Dev Hub cannot be disabled.** This is a one-way switch.
- A Developer Edition or trial org works fine for learning and personal projects, but has a real downside for anything you intend to keep: if that org expires or you lose access to it, you lose access to every package and scratch org allocation tied to it. For real team or ISV use, Salesforce recommends enabling Dev Hub on an active production org (ISV partners specifically use their Partner Business Org).

## Authenticating the CLI to your Dev Hub

Once Dev Hub is enabled in the org, connect the CLI to it:

```bash
sf org login web --alias DevHub --set-default-dev-hub
```

This opens a browser window for you to log in, then stores an authenticated connection under the alias `DevHub` and marks it as your default Dev Hub — meaning CLI commands that need a Dev Hub (like `sf org create scratch`) will use it automatically without you specifying `--target-dev-hub` every time.

You can also set or change the default explicitly:

```bash
sf config set target-dev-hub=DevHub
```

And confirm which org the CLI currently thinks is your default Dev Hub:

```bash
sf org list
```

This lists every org the CLI has authenticated connections to, flagging which one is the default Dev Hub and which (if any) is your default regular org.

## Why this lesson comes before scratch orgs

Every single scratch org creation command in this course depends on having a working, authenticated Dev Hub. If `sf org create scratch` fails with an error about not finding a Dev Hub, the fix is almost always one of: Dev Hub isn't enabled in the target org, the CLI was never authenticated to it, or no default Dev Hub is set and `--target-dev-hub` wasn't passed explicitly. Chapter 4's troubleshooting lesson revisits this exact failure mode.

## Key terms

| Term | Meaning |
|---|---|
| Dev Hub | A regular org with a setting enabled that lets it create scratch orgs and second-generation packages |
| `sf org login web` | Opens a browser to authenticate the CLI to an org |
| `--set-default-dev-hub` | Marks the org being authenticated as the CLI's default Dev Hub |
| `sf config set target-dev-hub` | Sets or changes which authenticated org the CLI treats as the default Dev Hub |

## Lab

If you have access to a free Developer Edition org (sign up at developer.salesforce.com if not), log in as System Administrator, go to Setup, search "Dev Hub" in Quick Find, and click Enable. Then run `sf org login web --alias DevHub --set-default-dev-hub` from your terminal and confirm it succeeded with `sf org list`. If you don't have an org available, write out the exact sequence of clicks and commands you would run, in order, to go from a brand-new Developer Edition org to a CLI-authenticated default Dev Hub.

## Check yourself

Can you name which org types can be enabled as a Dev Hub, and which cannot? Can you explain why enabling Dev Hub on a trial org is risky for anything beyond short-term learning, specifically in terms of what you'd lose if the org expired?
