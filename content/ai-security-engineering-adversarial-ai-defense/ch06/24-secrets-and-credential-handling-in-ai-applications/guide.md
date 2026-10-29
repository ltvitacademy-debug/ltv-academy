# Lesson 24 — Secrets and Credential Handling in AI Applications

**Chapter 6 · Securing AI Application Architecture · Lesson 4 of 4**

## What you'll learn

- Why a secret that ever enters a model's context window should be
  treated as a secret that has already leaked
- Why separating the **reasoning plane** from the **credential plane**
  is the core architectural fix, and what that separation looks like
  in a real tool-calling pipeline
- How managed identity and workload identity federation — the same
  patterns from Course 9's cloud security content — eliminate most of
  the long-lived credentials an AI application would otherwise need
- Where a secrets vault still belongs for the handful of credentials
  that can't be replaced by managed identity

## If it's in the prompt, it's already out

The single rule that matters most in this lesson: never put an API
key, database password, or any other credential into a prompt or
system prompt. It feels convenient — "just give the model the key so
it can call the API directly" — and it is exactly the wrong move,
for reasons specific to how these systems work. A context window
isn't a private scratchpad; it can be logged for debugging, included
in a trace for observability, summarized into memory for a later
turn, or — if the application has any prompt-injection exposure at
all, which Chapter 2 already established is the default assumption —
read back out by an attacker who convinces the model to repeat part
of its own context. A secret that enters the prompt has to be treated
as a secret that has already leaked, whether or not you can point to
the exact moment it did.

## Separate the reasoning plane from the credential plane

The architectural fix is keeping the model's reasoning path and your
application's credential path as two genuinely separate things,
connected only at the moment a tool actually executes. The model
decides *that* a tool should be called and *with what arguments* —
"look up order 4471," "send a refund for $40" — but it never holds,
sees, or needs the credential the tool uses to actually perform that
action. The orchestration layer around the model is what holds real
credentials, injects them into the tool call at execution time, and
keeps them out of anything that gets fed back into the model's
context, including the tool's result.

```
# WRONG — the model is handed the credential
tool_schema = {
    "name": "call_crm_api",
    "args": {"api_key": "sk-live-...", "endpoint": "...", "payload": "..."}
}

# RIGHT — the model only supplies intent and parameters;
# the orchestration layer injects the real credential at call time
tool_schema = {
    "name": "lookup_order",
    "args": {"order_id": "4471"}   # no credential field at all
}

def lookup_order(order_id):
    token = get_managed_identity_token(scope="orders:read")  # injected here
    return crm_client.get(order_id, auth=token)
```

The model never sees `token`. It asked for an order lookup; the
orchestration layer decided how that request gets authenticated.

## Managed identity: removing the credential instead of just hiding it

Course 9 covered managed identity and workload identity federation as
cloud-security fundamentals — letting a workload authenticate to a
cloud service using an identity tied to the compute resource itself
(an Azure Managed Identity, an AWS IAM role, a GCP workload identity
pool), with the cloud platform issuing short-lived tokens behind the
scenes instead of a long-lived key being stored anywhere at all. That
pattern isn't just useful for AI applications — it's one of the best
tools available for them specifically. Every service-to-service call
an orchestration layer makes on a tool's behalf — to a database, an
internal API, a cloud storage bucket — is a candidate for managed
identity instead of an embedded key. There's no key to leak through a
log, a config file, or a container image, because there's no
long-lived key at all; the identity is the compute resource, and the
token it gets is short-lived and automatically rotated.

## Where a vault still earns its place

Managed identity doesn't eliminate every secret — a third-party API
that only accepts a static key, or a legacy system with no identity
federation support, still needs one somewhere. For what's left, use a
dedicated secrets manager (Azure Key Vault, AWS Secrets Manager,
HashiCorp Vault) rather than an environment variable or a config file
checked into source control: secrets stay encrypted at rest, access
is itself logged and auditable, and rotation can happen without a
code change. And apply the same discipline to your training and
fine-tuning pipelines as to your application code — scan any data
that will be used to train, fine-tune, or populate a RAG index for
accidentally embedded secrets before it goes in, because a credential
baked into training data or an indexed document can resurface through
ordinary model output later, the same way any other memorized
training data can.

## Key terms

| Term | Meaning |
|---|---|
| Reasoning plane vs. credential plane | Keeping the model's decision-making path separate from the application's real credentials, connected only at tool-execution time |
| Managed identity / workload identity federation | A cloud-native pattern where a workload authenticates using an identity tied to the compute resource, removing the need for a stored long-lived key |
| Secrets vault | A dedicated secrets-management service (Key Vault, Secrets Manager, Vault) used for credentials that can't be replaced by managed identity |
| Context-window leak | Any secret that enters a model's prompt or context being treated as already exposed, due to logging, tracing, memory, or prompt-injection risk |

## Check yourself

You're ready to move to Chapter 7 when you can explain, without
looking: why does putting an API key directly into a prompt count as
a leak even if nothing seems to go wrong, and what does the
orchestration layer do differently to avoid that?
