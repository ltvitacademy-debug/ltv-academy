# Lesson 19 — ChatOps: Sending Alerts and Approvals to Teams or Slack

**Chapter 5 · Security Orchestration Across Tools · Lesson 3 of 4**

## What you'll learn

- The difference between a one-way notification and an interactive
  **ChatOps** approval, and why they need different plumbing
- How to post a formatted alert to Microsoft Teams with an incoming
  webhook and an Adaptive Card
- How to post a formatted alert to Slack with Block Kit, and why an
  interactive button needs a bot token and a receiving endpoint, not
  just a webhook
- How to verify that a button click genuinely came from Slack before
  acting on it

## One-way notification vs. two-way ChatOps

A ticket in a case-management system is durable, but it isn't where
your team is already looking at 2 a.m. — chat is. There are two
different jobs chat can do for a security alert, and they need
different amounts of plumbing. The simple job is **notification**:
post a nicely formatted message into a channel so a human sees it
immediately. The harder job is **ChatOps**: put an actual button in
that message — "Approve," "Escalate," "Dismiss" — and have clicking it
trigger your automation to do something, like unblocking an IP or
closing a false positive, without the analyst ever leaving chat.
Notification only needs you to send a message out. ChatOps needs a
second channel back in, because the chat platform has to tell your
automation which button got clicked, by whom, and on which message —
which means you need a receiving endpoint again, the same shape of
thing you built in Lesson 17.

## Microsoft Teams: webhook and Adaptive Card

Teams' simplest integration is an **incoming webhook** — a per-channel
URL you POST a JSON card to, no bot registration required. The card
format is an **Adaptive Card**, a declarative JSON layout Teams
renders into a formatted message:

```python
import requests

def notify_teams(alert: dict, teams_webhook_url: str) -> None:
    card = {
        "type": "message",
        "attachments": [{
            "contentType": "application/vnd.microsoft.card.adaptive",
            "content": {
                "type": "AdaptiveCard",
                "version": "1.4",
                "body": [
                    {"type": "TextBlock", "text": f"🚨 {alert['title']}", "weight": "bolder", "size": "medium"},
                    {"type": "TextBlock", "text": alert["description"], "wrap": True},
                    {"type": "FactSet", "facts": [
                        {"title": "Severity", "value": alert["severity"]},
                        {"title": "Source", "value": alert["source_tool"]},
                    ]},
                ],
            },
        }],
    }
    requests.post(teams_webhook_url, json=card, timeout=10).raise_for_status()
```

That's enough for a one-way alert, and it's genuinely the right amount
of complexity if all you need is "put this in front of the team."
Adaptive Cards do support `Action.Http` buttons that can call a URL
when clicked, but a basic incoming webhook integration is still best
understood as a push-only channel — treat Teams as your notification
layer unless the team has set up the fuller bot-based integration that
real two-way ChatOps approval needs.

## Slack: Block Kit and why buttons need more than a webhook

A Slack incoming webhook can post a formatted message the same way,
using **Block Kit** instead of Adaptive Cards:

```python
def notify_slack(alert: dict, slack_webhook_url: str) -> None:
    blocks = [
        {"type": "section", "text": {"type": "mrkdwn",
            "text": f"*🚨 {alert['title']}*\n{alert['description']}"}},
        {"type": "actions", "elements": [
            {"type": "button", "text": {"type": "plain_text", "text": "Approve"},
             "style": "primary", "value": alert["event_id"], "action_id": "approve_alert"},
            {"type": "button", "text": {"type": "plain_text", "text": "Dismiss"},
             "style": "danger", "value": alert["event_id"], "action_id": "dismiss_alert"},
        ]},
    ]
    requests.post(slack_webhook_url, json={"blocks": blocks}, timeout=10).raise_for_status()
```

Here's the part that trips people up: that message will render real
buttons, but a plain incoming webhook has no way to tell you when
someone clicks one. For the click itself to reach your code, the
message has to come from a registered **Slack app** with an
**interactivity endpoint** configured — a URL Slack POSTs to whenever
a user interacts with a block. Your receiver for that endpoint looks
almost exactly like the webhook receiver from Lesson 17, because it is
one: same shape, same obligation to verify the request before trusting
it.

## Verifying a Slack interaction before acting on it

Slack signs every request it sends to your interactivity endpoint with
a **signing secret**, using a slightly different recipe than a plain
HMAC-over-body: it hashes a version string, a timestamp, and the raw
body together, which also lets you reject stale requests outright.

```python
import hmac
import hashlib
import time

def verify_slack_request(timestamp: str, raw_body: bytes, signature: str, signing_secret: str) -> bool:
    if abs(time.time() - int(timestamp)) > 60 * 5:
        return False  # reject requests older than 5 minutes — replay protection
    basestring = f"v0:{timestamp}:{raw_body.decode()}"
    expected = "v0=" + hmac.new(signing_secret.encode(), basestring.encode(), hashlib.sha256).hexdigest()
    return hmac.compare_digest(expected, signature)
```

Only after that check passes should your handler look at which
`action_id` was clicked and which analyst clicked it, and only then
should it actually call `escalate_ticket` or `add_comment` from Lesson
18. The approval button is cosmetic until the request behind it has
been verified — exactly the same lesson as webhook signatures, applied
to a click instead of an alert.

## Key terms

| Term | Meaning |
|---|---|
| ChatOps | Putting an interactive action (a button) directly in a chat message, so a human can trigger automation without leaving chat |
| Adaptive Card | Teams' declarative JSON card format, posted through an incoming webhook for one-way formatted messages |
| Block Kit | Slack's JSON layout format for messages, including interactive elements like buttons |
| Interactivity endpoint | The URL a Slack app POSTs to when a user clicks a button, requiring signing-secret verification before the click is trusted |

## Check yourself

You're ready for Lesson 20 when you can explain, without looking: why
does a plain Slack incoming webhook let you send a message with
buttons but not receive the click, and what two checks does
`verify_slack_request` perform before a click is trusted?
