# Lesson 6 — Scratch Org Definition Files

**Chapter 1 · Salesforce DX Basics · Lesson 6 of 22**

## What you'll learn

- What a scratch org definition file is and where it lives in a project
- The core properties that define a scratch org's "shape"
- Why teams keep multiple definition files for different purposes
- How a definition file differs when building from an org shape instead of an edition

## The blueprint for a scratch org

A **scratch org definition file** is a JSON file that acts as the blueprint for exactly what a scratch org looks like when it's created: which Salesforce edition it's based on, which optional features and Settings are turned on, and basic org identity details. Every time you run `sf org create scratch --definition-file config/project-scratch-def.json`, the CLI reads this file and builds an org matching it. By convention, it lives at `config/project-scratch-def.json` inside a Salesforce DX project, and — like everything else in a source-driven project — it belongs in version control, so the whole team creates orgs with the identical shape.

## A typical definition file

```json
{
  "orgName": "Acme DX Training",
  "edition": "Developer",
  "adminEmail": "dev@example.com",
  "language": "en_US",
  "country": "US",
  "features": ["EnableSetPasswordInApi"],
  "settings": {
    "lightningExperienceSettings": {
      "enableS1DesktopEnabled": true
    },
    "mobileSettings": {
      "enableS1EncryptedStoragePref2": false
    }
  }
}
```

Key properties worth knowing:

- **`edition`** — the Salesforce edition to base the scratch org on (commonly `Developer`). Mutually exclusive with using a `sourceOrg` or `snapshot` property instead.
- **`features`** — a list of org features to turn on at creation, such as enabling specific licenses or capabilities your project needs (for example, Multi-Currency, or a specific add-on license).
- **`settings`** — nested blocks matching the Metadata API's settings metadata types (like `lightningExperienceSettings`), letting you configure org behavior exactly as you would retrieve and deploy it as metadata.
- **`orgName`, `adminEmail`, `language`, `country`** — identity and locale details for the org and its default admin user.
- **`hasSampleData`** — optionally seeds the org with Salesforce's own standard sample data (accounts, contacts, opportunities) for quick demos.

## Multiple definition files for different purposes

Real projects usually keep more than one definition file: a lean one for fast day-to-day feature work, a richer one that enables every optional feature a project might eventually need for full integration testing, and sometimes a CI-specific one. Nothing stops you from naming your own — `config/project-scratch-def.json` is just the conventional default name the CLI assumes if you don't pass `--definition-file` explicitly in some workflows; you'll still usually name it explicitly for clarity.

## Building from an org shape instead of an edition

When you want a scratch org that matches an existing org's exact features, settings, and licenses (covered fully in Chapter 3's org shapes lesson), the definition file looks different: instead of `edition`, it sets a `sourceOrg` property to the source org's 15-character org ID:

```json
{
  "orgName": "Shape-Matched Scratch Org",
  "sourceOrg": "00DB1230000Ifx5",
  "edition": "Developer"
}
```

If your Dev Hub, the source org, and the resulting org shape are all on the same Salesforce release, a minimal file with just `orgName` and `sourceOrg` is enough.

## Key terms

| Term | Meaning |
|---|---|
| Scratch org definition file | The JSON blueprint (edition, features, settings) a scratch org is created from |
| `config/project-scratch-def.json` | The conventional path/name for a project's main definition file |
| `features` | The definition file property listing org features/capabilities to enable at creation |
| `sourceOrg` | A definition file property that builds a scratch org matching an existing org's shape, used instead of `edition` |

## Lab

Write your own `project-scratch-def.json` for a hypothetical project that needs: the Developer edition, an admin email of your choosing, English/US locale, and Salesforce's standard sample data enabled. Then write a second, leaner version of the same file with sample data turned off, intended for a faster CI pipeline run. Compare the two and note which properties you kept identical and which you changed.

## Check yourself

Can you name the four or five properties most scratch org definition files include, and what each one controls? Can you explain why a project might keep more than one definition file, and what changes in the file when building a scratch org from an org shape instead of an edition?
