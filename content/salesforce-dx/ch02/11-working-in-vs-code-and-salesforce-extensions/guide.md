# Lesson 11 — Working in VS Code and Salesforce Extensions

**Chapter 2 · Projects and Metadata · Lesson 11 of 22**

## What you'll learn

- What the Salesforce Extension Pack actually bundles
- How VS Code commands relate to the CLI commands you've already learned
- What the Apex Replay Debugger adds beyond plain deploys
- What has to be installed on your machine before these extensions work

## A UI on top of the same CLI

Visual Studio Code is Salesforce's officially supported editor for Salesforce DX development, via the **Salesforce Extension Pack** (sometimes called the "Expanded" pack) in the VS Code Marketplace. It's important to understand what this actually is: a set of extensions that wrap the same `sf` CLI commands you've been learning, surfaced as command-palette actions and right-click menu items, plus language-specific tooling (syntax highlighting, autocomplete, linting) for Apex, Lightning Web Components, Visualforce, Aura, and SOQL. Nothing the extensions do is magic the CLI can't also do directly — the extensions make the same operations faster to trigger and give you inline feedback (like deploy errors underlined directly in a file) that a raw terminal doesn't.

## What the pack bundles

- **Salesforce CLI Integration** — the glue extension that lets every other extension call into your installed `sf` CLI; without the CLI already installed (Lesson 2), none of the rest of the pack works.
- **Apex** — syntax highlighting, code completion, outline view, and go-to-definition for `.cls` and `.trigger` files, plus the **Apex Replay Debugger**, which lets you step through a captured Apex execution log line by line inside the editor — genuinely useful for understanding what a trigger or a Flow-invoked Apex method actually did during a specific transaction, without attaching a live debugger.
- **Lightning Web Components** — component scaffolding, HTML/JS autocomplete tied to the LWC framework's APIs, and local preview support.
- **Visualforce** and **Aura Components** — equivalent tooling for those older UI frameworks, still common in mature orgs.
- **SOQL** — a dedicated SOQL editor with autocomplete against your org's actual schema.

## Command palette equivalents

Most CLI commands you've learned have a command-palette equivalent, typically prefixed `SFDX:`. A few examples: `SFDX: Create Project` wraps `sf project generate`; `SFDX: Deploy This Source to Org` and `SFDX: Retrieve Source from Org` wrap `sf project deploy start`/`sf project retrieve start` scoped to the currently open file or folder; `SFDX: Create a Default Scratch Org` wraps `sf org create scratch`. Right-clicking a file or folder in the Explorer surfaces the same deploy/retrieve actions scoped to just that selection — functionally identical to passing `--source-dir` with that path on the command line.

## Prerequisites

Beyond the Salesforce CLI itself, Apex-related features need a **Java Development Kit (JDK)** installed and configured, since the Apex language server and the Replay Debugger both run on the JVM. If Apex autocomplete or the debugger silently fail to start, a missing or misconfigured JDK is the most common cause — worth checking before assuming the extension itself is broken.

## Key terms

| Term | Meaning |
|---|---|
| Salesforce Extension Pack | The VS Code extension bundle providing Salesforce DX tooling and language support |
| Apex Replay Debugger | A VS Code feature that steps through a captured Apex execution log line by line |
| Salesforce CLI Integration | The extension connecting the rest of the pack to your installed `sf` CLI |
| JDK | Required for Apex language features and the Replay Debugger, which run on the JVM |

## Lab

If you have VS Code installed, install the Salesforce Extension Pack from the Marketplace, open a Salesforce DX project (or generate one with `SFDX: Create Project`), and open the Command Palette to locate the `SFDX: Deploy This Source to Org` and `SFDX: Retrieve Source from Org` commands. Without running them, write down which raw CLI command and flags each one is equivalent to, based on what you learned in Lesson 10.

## Check yourself

Can you explain why the Salesforce Extension Pack's deploy/retrieve commands aren't doing anything the CLI itself can't do? Can you name what the Apex Replay Debugger lets you do that a plain deploy doesn't, and what has to be installed on your machine for Apex features in VS Code to work?
