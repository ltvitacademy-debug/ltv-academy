# Lesson 6 — Security Baselines and the CIS Benchmarks

**Chapter 2 · Group Policy & Windows Hardening · Lesson 6 of 32**

## What you'll learn

- What a security baseline actually is, and why it's a starting point rather than a finished configuration
- What the Microsoft Security Compliance Toolkit provides, and how it's meant to be used
- What the CIS Benchmarks are, who publishes them, and how they differ from a vendor's own baseline
- Why real organizations start from a published baseline instead of configuring every setting from scratch

## A security baseline is a documented, tested starting point

A **security baseline** is a specific, documented set of configuration settings for an operating system or application that represents a minimum acceptable security posture — things like which password and lockout policies apply, which services are disabled, which audit events get logged, and which legacy protocols are turned off. The key word is *documented*: a baseline isn't "whatever feels reasonably secure," it's a concrete, version-controlled list of settings that someone tested and is willing to stand behind, usually delivered as a GPO backup or a configuration template you import rather than build by hand.

## Microsoft's own baseline: the Security Compliance Toolkit

Microsoft publishes its own recommended settings through the **Security Compliance Toolkit (SCT)** — a free download containing security baselines for specific Windows versions (Windows 11, Windows Server 2022, and so on) along with the tools to apply and compare them. Each baseline ships as a set of GPO backups: an administrator imports them straight into Group Policy Management, links the resulting GPOs the same way covered in Lesson 5, and gets Microsoft's own recommended starting configuration for that OS version — rather than hand-picking hundreds of individual settings and hoping nothing important was missed.

## The CIS Benchmarks: an independent industry standard

The **CIS Benchmarks**, published by the **Center for Internet Security (CIS)**, are a different kind of baseline: they're developed through a consensus process involving security practitioners across industries, not by the vendor of the product itself, and they cover far more than just Windows — Linux distributions, cloud platforms, browsers, databases, and dozens of other targets each get their own benchmark document. CIS Benchmarks are typically organized into **Level 1** (basic hardening with minimal impact on normal business function) and **Level 2** (more aggressive "defense in depth" hardening that can affect compatibility or usability, intended for higher-security environments). Because CIS is vendor-independent, its benchmarks are widely referenced by compliance frameworks and auditors as an objective standard, separate from whatever the vendor itself recommends.

## Why start from a baseline instead of building from scratch

Configuring hundreds of individual security settings by hand, on every new server or workstation, invites exactly the kind of inconsistency and human error that attackers rely on — one missed setting on one machine is often all it takes. Starting from a published baseline, whether Microsoft's SCT or a CIS Benchmark, solves several problems at once: the settings have already been tested by a wider community or by the vendor itself, applying them is fast and repeatable (import the GPO backup, link it, done), and it gives an organization a defensible answer during an audit — "we hardened this server to CIS Benchmark Level 1" is a concrete, checkable claim, where "we configured it carefully" is not.

**Concrete example:** a company standing up a new batch of Windows Server 2022 file servers imports the Microsoft SCT baseline for that OS version as its starting GPO, then layers one additional custom GPO on top for settings specific to that company's compliance requirements — rather than configuring each file server's security settings individually and hoping every admin remembered the same things.

## Key terms

| Term | Meaning |
|---|---|
| Security baseline | A documented, tested minimum set of security configuration settings for an OS or application |
| Microsoft Security Compliance Toolkit (SCT) | Microsoft's free, version-specific Windows baselines, delivered as importable GPO backups |
| CIS Benchmarks | Vendor-independent, consensus-developed hardening standards published by the Center for Internet Security, covering many platforms |
| CIS Level 1 / Level 2 | Level 1 is basic hardening with minimal functional impact; Level 2 is stricter "defense in depth" hardening for higher-security environments |

## Check yourself

An auditor asks how a server's security configuration was determined. Why is "we imported the Microsoft SCT baseline for this OS version, then layered one custom GPO on top" a stronger answer than "we configured the important-looking settings"?
