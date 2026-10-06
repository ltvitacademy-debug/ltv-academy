# Lesson 5 — GitHub for Salesforce Developers

**Chapter 1 · Building Your Presence · Lesson 5 of 19**

## What you'll learn

- What "source-driven development" means for Salesforce, and why it matters for your portfolio
- The current Salesforce CLI — the `sf` command, not the retired `sfdx` prefix
- The real commands for logging in, generating a project, and pushing/pulling metadata
- What belongs in a Salesforce Git repository, and what never does

## Source-driven development, in one sentence

Historically, a Salesforce org itself was the source of truth — you clicked around in Setup, and the org was the only record of what you'd built. **Source-driven development** flips that: your local, version-controlled project files become the source of truth, and the org is just a deployment target you push that source to (or pull changes from). That's what makes a Salesforce project put-able into Git and GitHub at all — without it, there's nothing meaningful to commit.

## The current CLI: `sf`, not `sfdx`

The tool that makes source-driven development possible is the **Salesforce CLI**. If you've seen older tutorials or blog posts, you may see commands starting with `sfdx` — that was the previous major version of the CLI. The current CLI ships as the npm package `@salesforce/cli`, and its commands start with `sf`, not `sfdx`. The old `sfdx` command set still works as a deprecated alias in some installs, but new commands, new documentation, and this lesson all use `sf`.

```
npm install -g @salesforce/cli
sf --version
```

## Logging in and creating a project

Authenticate the CLI against an org (your Trailhead Playground or Developer Edition org is exactly what the free lab environment from the Salesforce Administrator path gave you), then generate a new source-driven project:

```
sf org login web -d -a MyPlayground
sf template generate project --name MyLtvProject
```

`sf org login web` opens a browser window to log in and links that org to the CLI under the alias you give it (`-d` also sets it as your default org). `sf template generate project` scaffolds a proper Salesforce DX project — the folder structure, the `sfdx-project.json` config file, and a `force-app/main/default` source tree ready for Git. (You may see this same command referred to as `sf project generate` in some documentation — that's a supported alias for the same underlying command.)

## Pushing and pulling metadata

Once your project is linked to an org, two commands move metadata in each direction:

```
sf project deploy start -o MyPlayground
sf project retrieve start -o MyPlayground
```

`sf project deploy start` pushes your local source *into* the org. `sf project retrieve start` pulls metadata *from* the org back into your local source — useful after making a change declaratively in Setup that you now want committed. Both take `-o` to specify which org alias to target.

## What belongs in the repository — and what never does

Commit the source-formatted metadata: object and field definitions, Flow definitions, permission sets, layouts, and the `sfdx-project.json` config. That's real, reviewable, diffable Salesforce configuration — exactly the kind of evidence a GitHub repo makes checkable, the same spirit as the portfolio page from the last lesson, just at the metadata level instead of the narrative level.

Never commit real data, org credentials, auth URLs, or security tokens. A standard Salesforce DX `.gitignore` already excludes the local `.sfdx` and `.sf` auth directories by default — leave that exclusion in place, and never override it to "fix" an auth error by committing a credentials file.

## Key terms

| Term | Meaning |
|---|---|
| Source-driven development | Treating local, version-controlled files (not the org) as the source of truth |
| `sf` | The current Salesforce CLI command — `@salesforce/cli`, successor to the retired `sfdx` v7 |
| Scratch org | A temporary, disposable Salesforce org created from source for development and testing |
| `sfdx-project.json` | The config file marking a directory as a Salesforce DX project |

## Lab

In your own Trailhead Playground or Developer Edition org, install the Salesforce CLI, run `sf org login web` to connect it, then run `sf project retrieve start` to pull one real piece of metadata (a custom object or Flow from your capstone) into a local source-driven project you could commit to GitHub.

## Check yourself

What's the actual difference between `sf project deploy start` and `sf project retrieve start`, and why does a `.gitignore` matter just as much as the commands themselves?
