# Lesson 14 — Built-In Workbooks vs. Custom Dashboards

**Chapter 4 · Workbooks & Visualization · Lesson 14 of 32**

## What you'll learn

- Where Sentinel's built-in workbook templates actually come from, and why they're tied to data connectors
- How to find and activate a built-in workbook for a connector you've already enabled
- Why a built-in workbook isn't enough once a question is specific to your own organization
- How to decide, for a given request, whether to activate a template or build a custom workbook

## Built-in workbooks are shipped per data connector, not generically

Sentinel ships a gallery of pre-built workbook templates — in the Azure portal, under
Threat Management > Workbooks > Templates. These aren't generic "security dashboards." Each one
is built for a specific data source and only becomes useful once the matching **data connector**
(Chapter 1, Lesson 3) is actually ingesting that data. The **Azure Active Directory Sign-in Logs**
workbook, for example, visualizes authentication activity — successful and failed sign-ins over
time, sign-ins by location, risky sign-in trends — but it has nothing to show until the Microsoft
Entra ID (Azure AD) connector is enabled and sign-in data is flowing into the workspace. The
**Office 365** workbook template is the same pattern: it surfaces mailbox access, file activity,
and Teams usage, and it's only populated once the Office 365 connector is sending that telemetry
in. Browsing the template gallery is effectively a map of "what can I visualize" that follows
directly from "what have I connected."

## Activating one takes minutes, not a build project

Using a built-in workbook is close to a one-click action: find the template matching a connector
you already have enabled, click **Save**, and it's added to your own Workbooks list, already
wired to the right tables and columns. That's by design — Microsoft wants the common,
well-understood scenarios (sign-in monitoring, Office 365 activity, firewall traffic from a
specific vendor's connector) solved without every Sentinel customer writing the same KQL from
scratch. For a genuinely standard question like "show me sign-in trends," activating the built-in
template is almost always the right first move, not a custom build.

## Where built-in stops being enough

A built-in workbook is tuned for the common case, which means it stops being enough the moment a
question is specific to your organization. Say a SOC lead wants a single workbook combining
failed-login trends with a short list of VIP accounts (executives, domain admins) that is unique
to this company's risk priorities — no Microsoft template ships with your VIP list baked in,
because Microsoft has no way to know it. That gap is exactly what a **custom workbook** is for:
starting from a blank canvas (or cloning and editing a built-in template, which Sentinel allows)
and writing the specific KQL query steps, parameters, and layout a built-in template was never
going to anticipate.

## Key terms

| Term | Meaning |
|---|---|
| Workbook template | A pre-built workbook Microsoft ships, tied to one specific data connector |
| Data connector | The pipeline that brings a given log source into the workspace (Chapter 1, Lesson 3) |
| Custom workbook | A workbook built or edited from scratch for a question specific to one organization |
| Clone | Copying a built-in template as a starting point for a custom edit, instead of starting blank |

## Check yourself

A manager asks for a workbook showing failed sign-ins for everyone in the Finance department,
cross-referenced against a VPN connector that's also enabled. Would activating the built-in
Azure AD Sign-in Logs workbook satisfy this request on its own? Why or why not?
