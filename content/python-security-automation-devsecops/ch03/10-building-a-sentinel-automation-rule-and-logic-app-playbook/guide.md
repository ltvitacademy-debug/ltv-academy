# Lesson 10 — Building a Sentinel Automation Rule and Logic App Playbook

**Chapter 3 · Building SOAR Playbooks · Lesson 2 of 4**

## What you'll learn

- The exact pieces of a Microsoft Sentinel **Automation Rule**: trigger,
  conditions, and actions
- How to build a **Logic App (Consumption)** playbook that Sentinel can
  call, using the Microsoft Sentinel connector's native trigger
- How to wire an Automation Rule to run that playbook automatically the
  moment a matching incident is created
- How to read the underlying Logic App workflow definition (the JSON
  behind the designer canvas) well enough to debug it

## The Automation Rule: trigger, conditions, actions

An **Automation Rule** in Sentinel is the piece that decides *when* and
*whether* something should run — it doesn't do the work itself. Every
rule has the same three parts:

- **Trigger**: "When incident is created" or "When incident is updated."
  This lesson uses incident creation.
- **Conditions**: a set of AND/OR filters evaluated against the incident
  and its entities — analytic rule name, severity, tactics, title
  contains, or an entity (account, IP, host) matching a value.
- **Actions**: what happens if the conditions match — run a playbook,
  change status, assign an owner, add a tag, add a task, or some
  combination, evaluated top to bottom.

A realistic condition set for the playbook you're about to build: *incident
severity is High or Medium* AND *analytic rule name is one of the sign-in
and identity rules you already use from earlier courses*. That keeps the
playbook scoped to incidents where enrichment is actually worth the API
calls, instead of firing on every informational incident.

## The Logic App playbook: trigger and first steps

In the Azure portal, a Sentinel playbook starts life as an ordinary
**Logic App (Consumption)** resource, built with the **Microsoft Sentinel**
connector's trigger: *"Microsoft Sentinel incident"*. That trigger hands
your workflow the full incident object — its ARM ID, severity, title, and
the list of entities Sentinel extracted (accounts, IPs, hosts, URLs) —
the moment Sentinel calls it.

A minimal but real shape for the workflow, shown here as the Logic Apps
workflow definition language behind the designer:

```json
{
  "definition": {
    "$schema": "https://schema.management.azure.com/providers/Microsoft.Logic/schemas/2016-06-01/workflowdefinition.json#",
    "triggers": {
      "Microsoft_Sentinel_incident": {
        "type": "ApiConnectionWebhook",
        "inputs": { "host": { "connection": { "name": "@parameters('$connections')['azuresentinel']['connectionId']" } } }
      }
    },
    "actions": {
      "Get_incident": {
        "type": "ApiConnection",
        "inputs": {
          "method": "get",
          "path": "/Incidents/@{encodeURIComponent(triggerBody()?['object']?['id'])}"
        },
        "runAfter": {}
      },
      "Add_comment_to_incident": {
        "type": "ApiConnection",
        "inputs": {
          "method": "post",
          "path": "/Incidents/@{encodeURIComponent(triggerBody()?['object']?['id'])}/comments",
          "body": { "message": "Automated enrichment starting." }
        },
        "runAfter": { "Get_incident": ["Succeeded"] }
      }
    }
  }
}
```

Read the shape, not just the syntax: the trigger receives the incident,
`Get_incident` pulls the full incident record so later steps have
something to work with, and `Add_comment_to_incident` writes a visible,
timestamped note onto the incident — the same comment trail an analyst
would see if they opened it by hand. `runAfter` is how Logic Apps
expresses sequencing: each action only runs once the ones it depends on
have succeeded.

## Wiring the rule to the playbook

Back in Sentinel, under **Automation → Automation rules**, you create the
rule and, under **Actions**, choose **Run playbook** and select the Logic
App you just built. Sentinel needs explicit permission to invoke that
specific playbook — when you first add it as an action, Sentinel prompts
you to grant the **Microsoft Sentinel Automation Contributor** role on
that Logic App's resource group if it isn't already assigned, since
without it the trigger call is rejected before your workflow ever runs.

## Testing before you trust it

Never validate a new playbook by waiting for a real incident. Two
reliable ways to test it:

1. From an existing incident in Sentinel, use **Run playbook (manual
   trigger)** to invoke it on demand and watch the Logic Apps **Run
   history** blade for each action's status and output.
2. Use `az sentinel` or the REST API to create a disposable test incident
   in a non-production workspace, let the Automation Rule fire naturally,
   then confirm the comment and any downstream steps appear correctly.

Run history is where most real debugging happens — each action shows its
raw inputs and outputs, so a failed `Get_incident` step (wrong permissions,
a malformed incident ID) is visible immediately instead of as a vague
"the playbook didn't do anything" symptom.

## Key terms

| Term | Meaning |
|---|---|
| Automation Rule | Sentinel object defining trigger + conditions + actions; decides when a playbook runs |
| Logic App (Consumption) | The Azure resource type used for a Sentinel playbook — a workflow of connector actions |
| Microsoft Sentinel connector trigger | The trigger type ("Microsoft Sentinel incident") that hands the full incident object to a playbook |
| `runAfter` | The workflow-definition field that sequences actions based on prior actions' success/failure |

## Check yourself

You're ready for Lesson 11 when you can describe, from trigger to action,
exactly what happens between an incident being created in Sentinel and a
comment appearing on it automatically — and where in that chain you'd look
first if the comment never showed up.
