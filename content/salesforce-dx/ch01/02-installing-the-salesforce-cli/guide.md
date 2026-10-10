# Lesson 2 — Installing the Salesforce CLI

**Chapter 1 · Salesforce DX Basics · Lesson 2 of 22**

## What you'll learn

- The current name and package for the Salesforce CLI, and why `sfdx` and `sf` both still show up in older material
- Two supported ways to install it, and why you should only use one of them
- How to confirm the install worked and check for updates
- Why you should never install it two different ways on the same machine

## `sfdx` became `sf`

If you search for Salesforce CLI help online, you'll find material referring to both `sfdx` and `sf`. Here's the history in one paragraph: the original CLI shipped as `sfdx`, with colon-separated commands like `force:org:create`. Salesforce rebuilt the CLI as `sf` (sf v2), with space-separated commands like `sf org create scratch`, and dropped the old `force` topic from most commands entirely. The `sfdx`/`sf v1` generation is deprecated — Salesforce doesn't support it anymore, though some of the old `force:` commands still technically run for now. **Every command in this course uses the current `sf` syntax.** If you see `force:source:push` or `sfdx force:org:create` in an older tutorial, mentally translate it: those are the deprecated predecessors of `sf project deploy start` and `sf org create scratch`.

## Installing the CLI

The current recommended install method is npm, since the CLI itself ships as the npm package `@salesforce/cli`:

```bash
npm install --global @salesforce/cli
```

Salesforce also publishes standalone platform installers (Windows `.exe`, macOS `.pkg`) for machines without Node.js already set up. **Pick one method and stick with it** — installing via both the standalone installer and npm on the same machine causes path conflicts between the two installations that are genuinely annoying to debug.

## Verifying the install

Once installed, confirm it worked:

```bash
sf version
```

```
@salesforce/cli/2.65.6 win32-x64 node-v20.11.0
```

A version string starting with `@salesforce/cli/2` confirms you're on the current `sf` (v2) generation, not the deprecated `sf` v1 bundled inside the old `sfdx`.

## Updating the CLI

If you installed via npm, update with npm — not with `sf update`, which is reserved for the standalone installer's own auto-update mechanism and will tell you to use npm instead if it detects an npm install:

```bash
npm install --global @salesforce/cli@latest
```

## Installing plugins

Some functionality — things like packaging commands — ships as separate plugins rather than being baked into the core CLI. Install one with:

```bash
sf plugins install @salesforce/plugin-packaging
```

You'll use this plugin starting in Chapter 3.

## Key terms

| Term | Meaning |
|---|---|
| `sf` | The current Salesforce CLI, successor to the deprecated `sfdx`/`sf v1` |
| `@salesforce/cli` | The npm package that installs the `sf` CLI |
| `sf version` | Confirms the installed CLI version |
| `sf plugins install` | Installs an additional CLI plugin, such as the packaging plugin |

## Lab

Install the Salesforce CLI on your own machine using `npm install --global @salesforce/cli` (or the standalone installer if you don't have Node.js set up). Run `sf version` and confirm the output starts with `@salesforce/cli/2`. Then run `sf plugins install @salesforce/plugin-packaging` so it's ready for Chapter 3. Paste both command outputs into your own notes as a record that your environment is ready.

## Check yourself

Can you explain why `force:org:create` and `sf org create scratch` refer to the same underlying action but belong to two different CLI generations? Can you name the one rule you should follow when choosing how to install the CLI (npm vs. the standalone installer) to avoid a broken setup?
