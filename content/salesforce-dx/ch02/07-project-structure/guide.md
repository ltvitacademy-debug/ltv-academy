# Lesson 7 — Project Structure

**Chapter 2 · Projects and Metadata · Lesson 7 of 22**

## What you'll learn

- The standard folder layout every Salesforce DX project follows
- What each top-level file and folder is responsible for
- How to scaffold a new project with the CLI
- Why a consistent structure matters for tooling and teammates

## Generating a new project

Rather than hand-building the folder layout, you scaffold it:

```bash
sf project generate --name my-project
```

This creates a new directory named `my-project` with the full standard structure already in place, ready to have metadata added to it.

## The standard layout

```
my-project/
├── config/
│   └── project-scratch-def.json
├── force-app/
│   └── main/
│       └── default/
│           ├── classes/
│           ├── objects/
│           ├── layouts/
│           ├── permissionsets/
│           ├── flows/
│           └── lwc/
├── scripts/
├── .forceignore
├── .gitignore
├── sfdx-project.json
└── README.md
```

- **`sfdx-project.json`** — the root configuration file for the entire project: where its package directories are, which namespace (if any) it's associated with, and what API version it targets. Lesson 8 covers this file in full.
- **`force-app/`** — the default package directory where your actual metadata source lives. The nested `main/default/` path is the conventional structure for an unmanaged/unpackaged working directory, with subfolders per metadata type (`classes/` for Apex, `objects/` for custom objects and fields, `lwc/` for Lightning Web Components, and so on).
- **`config/`** — holds scratch org definition files, as covered in Lesson 6.
- **`.forceignore`** — tells the CLI which local files to exclude from deploy/retrieve operations (covered in Lesson 12 and again in Lesson 22). It follows the same pattern syntax as `.gitignore`.
- **`.gitignore`** — the ordinary Git ignore file, pre-populated to exclude things like local CLI config and OS-specific files that shouldn't be committed.
- **`scripts/`** — not required by the CLI itself, but a conventional home for setup scripts, such as Apex anonymous scripts (`sf apex run --file`) or data import plans used to seed a fresh scratch org.

## Why the structure is standardized

Every piece of Salesforce DX tooling — the CLI, the VS Code extensions (Lesson 11), CI pipelines — assumes this layout. A command like `sf project deploy start` with no flags looks at `sfdx-project.json` to figure out which directories count as package directories and deploys all of them; a teammate opening your project in VS Code expects to find Apex classes under `force-app/main/default/classes/` without being told. Deviating from the convention doesn't break anything outright, but it means every piece of tooling now needs to be told explicitly where things are, instead of just working.

## Multiple package directories

A project isn't limited to one `force-app/`-style folder. Larger projects, especially ones building multiple packages (Chapter 3), often have several package directories side by side — one per package — each declared as its own entry in `sfdx-project.json`'s `packageDirectories` array, with one of them marked as the default.

## Key terms

| Term | Meaning |
|---|---|
| `sf project generate` | Scaffolds a new Salesforce DX project with the standard folder layout |
| `force-app/` | The default package directory holding a project's metadata source |
| Package directory | Any folder declared in `sfdx-project.json` as holding deployable metadata |
| `.forceignore` | Excludes specified local files/folders from CLI deploy and retrieve operations |

## Lab

Run `sf project generate --name dx-practice` (or, without CLI access, sketch the resulting folder tree by hand from memory). Identify where you'd place a new custom Apex trigger, a new custom object's field metadata, and a new Lightning Web Component, using the standard layout from this lesson. Then explain, in one sentence, what would likely go wrong for a teammate opening your project in VS Code if you renamed `force-app` to something nonstandard without updating `sfdx-project.json`.

## Check yourself

Can you sketch the standard Salesforce DX project folder layout from memory, including where Apex classes and custom objects live? Can you explain why tooling like the CLI and VS Code extensions depend on this structure being consistent across projects?
