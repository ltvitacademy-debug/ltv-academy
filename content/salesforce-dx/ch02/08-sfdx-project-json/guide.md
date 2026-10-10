# Lesson 8 — sfdx-project.json

**Chapter 2 · Projects and Metadata · Lesson 8 of 22**

## What you'll learn

- Every major top-level property in sfdx-project.json and what it controls
- How packageDirectories distinguishes multiple metadata locations
- Why this file must be committed to version control
- How this file connects to packaging, covered fully in Chapter 3

## The file that tells every tool what your project is

`sfdx-project.json` sits at the root of every Salesforce DX project. It's not optional configuration you can skip — the CLI reads it to know where your metadata lives, what namespace (if any) the project belongs to, and what API version to target. Treat it the way you'd treat a `package.json` in a Node project: small, but everything depends on it being correct and committed to Git.

## A representative example

```json
{
  "packageDirectories": [
    {
      "path": "force-app",
      "default": true
    }
  ],
  "namespace": "",
  "sourceApiVersion": "61.0",
  "sfdcLoginUrl": "https://login.salesforce.com",
  "packageAliases": {}
}
```

## Property by property

- **`packageDirectories`** (required). An array of objects, each with a `path` (relative to the project root — never an absolute path) pointing to a folder holding metadata. If there's only one entry, it's assumed to be the default automatically. With more than one, exactly one entry must be marked `"default": true`. The default directory matters operationally: it's where the CLI pulls org changes back into when syncing (Lesson 10, Lesson 12), where source conversions land if you don't specify an output directory, and the directory used when creating a second-generation package if not otherwise specified.
- **`namespace`**. Either an empty string (unpackaged/unmanaged project, the common case for this course's examples) or the registered namespace prefix (Lesson 16) that any second-generation package created from this project will be associated with.
- **`sourceApiVersion`**. The Metadata API version new metadata gets created against and that source-format conversions target — this is what actually determines, for example, which Apex/API features a newly generated class can use.
- **`sfdcLoginUrl`**. The base login URL used for org authentication flows, typically `https://login.salesforce.com` for production-type orgs or `https://test.salesforce.com` for sandboxes.
- **`packageAliases`**. A map of human-readable package names to their internal package/package-version IDs, populated automatically as you create packages in Chapter 3 — lets you reference a package by name (`"Expense Manager"`) in commands instead of its opaque ID.

## Multiple package directories, one project

```json
{
  "packageDirectories": [
    { "path": "force-app", "default": true },
    { "path": "packaged-app", "package": "Expense Manager", "versionName": "ver 1.0", "versionNumber": "1.0.0.NEXT" }
  ],
  "namespace": "",
  "sourceApiVersion": "61.0"
}
```

Here, `force-app` holds unpackaged working metadata and `packaged-app` is tied to an actual package (Chapter 3 covers `package`, `versionName`, and `versionNumber` in depth). This is the normal shape for a project that's building a distributable package while also keeping some org-specific configuration unpackaged.

## Key terms

| Term | Meaning |
|---|---|
| `packageDirectories` | Required array declaring every folder in the project holding deployable metadata |
| `default` package directory | The directory the CLI uses by default for pulls, conversions, and package creation |
| `sourceApiVersion` | The Metadata API version new metadata and conversions target |
| `packageAliases` | A generated map of human-readable package names to their internal IDs |

## Lab

Write an `sfdx-project.json` for a hypothetical project with two package directories: `force-app` (default, unpackaged) and `utils-package` (tied to a package named `"Shared Utilities"`). Set `sourceApiVersion` to a recent API version of your choosing and leave `namespace` empty. Then explain, in a sentence or two, what would happen if you had two package directories and forgot to mark either one as `default`.

## Check yourself

Can you name all five properties covered in this lesson and what each controls? Can you explain what makes a package directory "the default," and name two operations that specifically depend on it?
