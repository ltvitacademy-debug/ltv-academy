# Lesson 9 — Why Python for Cloud Automation

**Chapter 3 · Python for Cloud Automation · Lesson 9 of 32**

## What you'll learn

- Why Python has become the second major language for serious cloud automation, alongside PowerShell
- What "official SDK" means, and why both Azure and AWS ship one for Python specifically
- Why Python's data structures and library ecosystem handle complex logic more gracefully than a growing shell script
- Where Python is already running, invisibly, inside tools you've used since Chapter 1

## Not a replacement — a different tool for harder jobs

Chapter 1 already covered choosing between PowerShell, Python, and a CLI — this lesson isn't about
declaring a winner. PowerShell (Chapters 1-2) is excellent for Windows-flavored, Azure-heavy
automation and ties natively into .NET objects. Python earns its own place for a different reason:
it's genuinely **cross-platform** — the exact same `.py` script runs unmodified on Windows, Linux,
and macOS — and it's the language both Microsoft and Amazon chose to fully support with first-class,
officially maintained SDKs. Not a thin community wrapper around a REST API, but the real thing, kept
in sync with every new service feature on day one.

## Official SDKs, not just API wrappers

Microsoft maintains the **Azure SDK for Python**, and Amazon maintains **Boto3**, its official
Python SDK for AWS. "Official" matters here: when a new VM size or a new API field ships, these
libraries get updated by the cloud provider itself, not by a volunteer reverse-engineering the REST
API in their spare time. Lesson 10 covers both SDKs' real package names and import patterns in
depth.

## Handling logic a shell script struggles with

A short PowerShell or Bash script is great for a handful of sequential steps. Once a task needs real
branching logic, structured data, or error handling across hundreds of resources — "check every
storage account against five compliance rules and build a report" — Python's native dictionaries,
lists, classes, and exception handling, plus its enormous library ecosystem (`requests` for HTTP
calls, `pytest` for testing the automation itself), keep that complexity manageable in a way a
growing shell script usually doesn't.

## Python is already running under the hood

This isn't a hypothetical argument. The `az` CLI you'll script against in Chapter 4 is itself
written in Python, built directly on the Azure SDK for Python. AWS's own command-line tool is built
on `botocore`, the exact same library Boto3 is built on. Ansible, one of the most widely used
infrastructure automation tools in the industry, writes every one of its modules in Python.
Choosing Python for your own automation puts you in the same language as the tools you already rely
on.

## Key terms

| Term | Meaning |
|---|---|
| Azure SDK for Python | Microsoft's official, first-class Python SDK for Azure, split into many packages |
| Boto3 | AWS's official Python SDK, covering nearly every AWS service from one package |
| Cross-platform | A script that runs unmodified on Windows, Linux, and macOS |
| `requests` / `pytest` | Widely used Python libraries for HTTP calls and automated testing |

## Check yourself

You're ready for Lesson 10 when you can explain, in your own words, why an "official" SDK maintained
by the cloud provider itself is a meaningfully different thing from a community-built wrapper around
the same API.
