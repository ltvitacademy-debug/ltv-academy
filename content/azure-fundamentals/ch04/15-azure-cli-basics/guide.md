# Lesson 15 — Azure CLI Basics

**Chapter 4 · Working in Azure · Lesson 15 of 18**

## What you'll learn

- What the Azure CLI is, and how it relates to the Portal you toured in Lesson 4
- Why a command line matters once you move past clicking through the Portal
- The handful of commands that cover most of what a beginner actually needs
- Scriptability and repeatability — the real reason the CLI exists

## The Portal vs. the CLI

Lesson 4 toured the Azure Portal — the web interface where you click through
menus to create and manage resources. The **Azure CLI** (Command-Line
Interface) does the same thing, but through typed commands instead of
clicks. Both talk to the exact same Azure — nothing the CLI does is "more
powerful" than the Portal in terms of what's possible. The difference is
*how* you do it, and that difference matters more than it sounds like it
should.

## Why a command line matters

Clicking through the Portal to create one virtual machine is fine. Clicking
through the Portal to create the same VM fifty times, identically, every
time a new project starts — that's where it breaks down. A CLI command is:

- **Scriptable** — save it in a file, run it any time, run it as part of an automated pipeline
- **Repeatable** — the tenth run creates exactly the same thing as the first, no chance of a misclick
- **Fast** — one command instead of ten clicks across three menus

This is the same instinct behind the Terraform & Bicep course's whole
premise (a course this one sits before) — once you're doing something more
than once, typing it as a command you can save and rerun beats clicking
through a UI from memory.

## The commands a beginner actually needs

You don't need to memorize the entire Azure CLI. A small handful of commands
covers almost everything at this level:

```
az login                          # sign in — opens a browser to authenticate
az account show                   # confirm which subscription you're using
az account list                   # see all subscriptions you have access to
az group create --name rg-demo \
  --location eastus               # create a resource group (Lesson 5)
az group list                     # see all resource groups in the subscription
az vm list                        # see all virtual machines
```

Every one of these maps to something you already understand conceptually:
`az login` is authentication (Lesson 9's Entra ID), `az account show` tells
you which subscription you're scoped into, and `az group create` creates the
exact same kind of resource group you saw in the Portal in Lesson 5 — just
typed instead of clicked.

## Reading a command, piece by piece

Take `az group create --name rg-demo --location eastus` apart:

| Piece | Meaning |
|---|---|
| `az` | You're calling the Azure CLI |
| `group create` | The action — create a resource group |
| `--name rg-demo` | A parameter — what to name it |
| `--location eastus` | A parameter — which region (Lesson 3) |

Almost every Azure CLI command follows this same shape: `az <service>
<action> --<parameter> <value>`. Once that pattern clicks, reading a new
command you've never seen before stops being intimidating.

## Key terms

| Term | Meaning |
|---|---|
| Azure CLI | A command-line tool for managing Azure resources by typing commands |
| Scriptable | Can be saved in a file and run again without manual clicking |
| Repeatable | Running the same command twice produces the same result |
| Parameter | A named value passed to a command, like `--name` or `--location` |

## Check yourself

You're ready for Lesson 16 when you can explain, without looking: what does
`az group create --name rg-demo --location eastus` actually do, piece by
piece, and why does "scriptable" matter more than "faster to type"?
