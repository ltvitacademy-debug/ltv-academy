# Lesson 12 — Automated Containment Actions, and the Approval Gate They Need

**Chapter 3 · Building SOAR Playbooks · Lesson 4 of 4**

## What you'll learn

- The two containment actions this lesson builds for real: disabling a
  user account and isolating a device
- Why every destructive or high-impact action in this playbook stops at a
  **human approval gate** before it executes
- How to build that gate in a Logic App with an adaptive-card approval
  step, and what happens on approve versus reject
- How to fully wire the chapter together: enrichment runs automatically,
  containment prepares and waits, a person decides

## The two containment actions

Containment is the first category of action in this chapter that changes
real-world state. Two concrete examples, both realistic and both commonly
automated behind a gate:

- **Disabling a user account** — setting `accountEnabled` to `false` on
  the compromised (or suspected-compromised) account via Microsoft Graph,
  which immediately blocks new sign-ins and revokes existing sessions on
  next token refresh.
- **Isolating a device** — triggering Microsoft Defender for Endpoint's
  device isolation, which cuts the machine off from the network while
  leaving Defender's own management channel intact, so the investigation
  can continue without the device being able to spread further.

```python
# Called by the playbook as an HTTP action against Microsoft Graph
import requests

def disable_user_account(user_id: str, token: str) -> int:
    resp = requests.patch(
        f"https://graph.microsoft.com/v1.0/users/{user_id}",
        headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
        json={"accountEnabled": False},
        timeout=10,
    )
    return resp.status_code  # 204 on success
```

Both actions are one API call away from the playbook. That's exactly why
they're dangerous to run unattended — the barrier to firing them by
mistake, on the wrong account or the wrong device, is just as low as the
barrier to firing them correctly.

## Why these specific actions need a gate

Go back to the test from Lesson 9: *if this automation is wrong, who
notices, how fast, and what does it cost?* For enrichment, the answer was
"nobody — worst case, someone reads an extra line of context." For
disabling an account or isolating a device, the answer is completely
different:

- Disable the wrong account, and a legitimate employee is locked out
  mid-shift — on a help-desk ticketing system, a hospital's clinical
  workstation, or a trading desk, that's not a minor inconvenience.
- Isolate the wrong device, and if it turns out to be a domain controller
  or a production database server, you may have just caused the outage
  you were trying to prevent.

Both failure modes are exactly the kind Lesson 9 flagged as needing a
human: high blast radius, and the cost of being wrong is asymmetric with
the cost of waiting an extra two minutes for a person to look.

## Building the approval gate

In the Logic App, the pattern is: prepare the action, send an approval
request, branch on the response, only then call the destructive action.
Using the Teams connector's adaptive-card approval action:

```json
{
  "actions": {
    "Post_adaptive_card_and_wait_for_response": {
      "type": "ApiConnectionWebhook",
      "inputs": {
        "body": {
          "recipient": { "groupId": "{soc-oncall-team-id}" },
          "messageBody": "Containment requested: disable user {upn} -- risk: High, impossible travel. Approve?",
          "buttons": [
            { "title": "Approve", "value": "approve" },
            { "title": "Reject", "value": "reject" }
          ]
        }
      },
      "runAfter": { "Add_comment_to_incident": ["Succeeded"] }
    },
    "Condition_-_Approved": {
      "type": "If",
      "expression": "@equals(body('Post_adaptive_card_and_wait_for_response')?['data']?['value'], 'approve')",
      "actions": {
        "Disable_user_account": { "type": "ApiConnection", "inputs": { "method": "patch" } }
      },
      "runAfter": { "Post_adaptive_card_and_wait_for_response": ["Succeeded"] }
    }
  }
}
```

The workflow literally cannot reach `Disable_user_account` unless the
condition branch evaluates true, and that condition only evaluates true
because a specific person clicked "Approve" on a specific card. There's no
path from incident creation to a disabled account that skips a human
decision.

## What happens on reject, and what gets logged either way

A rejected approval should still write a comment — "Containment declined
by {approver}, reason: {text}" — so the incident record shows a human
looked and chose not to act, not that the playbook silently did nothing.
Whichever branch runs, Log Analytics retains the full run history: who
approved or rejected, when, and what the playbook actually executed as a
result. That audit trail is as much the point of this lesson as the
containment action itself.

## Key terms

| Term | Meaning |
|---|---|
| Containment action | A step that changes real-world state to stop an active threat — disabling an account, isolating a device |
| Approval gate | A required human-approval step inserted between preparing an action and executing it |
| Adaptive card approval | A Teams connector action that posts an interactive card and pauses the workflow until someone responds |
| Audit trail | The retained record of who approved or rejected a containment action, and what the playbook executed as a result |

## Check yourself

You're ready to move on when you can trace, step by step, exactly how a
disabled-user-account action in this chapter's playbook is structurally
prevented from executing without a specific person clicking Approve — and
why that structural guarantee matters more than simply trusting the
playbook's author to write it carefully.
