# Lesson 23 — Capstone: Securing & Monitoring It

**Chapter 5 · Capstone · Lesson 23 of 24**

## What you'll learn

- How to call your endpoint without a hardcoded key anywhere in your code
- How to turn off public access so the endpoint isn't reachable from the open internet
- The real Azure CLI command that sends diagnostic logs somewhere you can see them
- What to check in the Foundry Monitor tab once logs start flowing

## Secure it: three layers, same endpoint

A deployed endpoint that works is only half the deliverable. Lesson 16 covered the general pattern for keeping secrets out of code; Lesson 14 covered keeping a service off the public internet. Both apply directly to the endpoint you just deployed.

```text
1. No hardcoded key   -- managed identity + Key Vault (Ch.3, L16)
2. No public exposure -- private endpoint / public access off (Ch.3, L14)
3. Screened responses -- Azure AI Content Safety, if the model is user-facing (Ch.2, L9)
```

## Layer 1: stop hardcoding the key

Your Lesson 22 code called `ml_client.online_endpoints.invoke()`, which is fine for testing from your own machine. An application calling this endpoint in production shouldn't have the key sitting in a config file or an environment variable it didn't get from somewhere secure. The same pattern from Lesson 16 applies directly:

```python
# Without managed identity -- a secret to leak
client = SecretClient(vault_url, credential=ClientSecretCredential(...))

# With managed identity -- nothing to leak
client = SecretClient(vault_url, credential=DefaultAzureCredential())
```

Store the endpoint's key in a Key Vault secret, grant your calling application's managed identity access to read it, and `DefaultAzureCredential()` picks it up automatically — no key pasted anywhere a screen share or a `git log` could expose it.

## Layer 2: turn off public access

Exactly as in Lesson 14, check the Networking tab on the workspace or hub behind your endpoint and disable public network access, then approve a private endpoint connection if you have a VNet to put it behind. For a capstone you're demoing rather than running in production, documenting that you *would* do this — and showing the toggle — is enough; for a real deployment, doing it is not optional.

## Monitor it: logs flowing somewhere

A Healthy endpoint with no logs is a deliverable half done. Send diagnostic logs to a Log Analytics workspace with a single Azure CLI command:

```bash
az monitor diagnostic-settings create \
  --name capstone-diagnostics \
  --resource <endpoint-resource-id> \
  --workspace <log-analytics-workspace-id> \
  --metrics '[{"category":"AllMetrics","enabled":true}]'
```

Once this runs, request counts, latency, and error rate start landing in Log Analytics automatically — no code change to your application required. This is the same `az monitor diagnostic-settings` command family that works identically against almost any Azure resource, not something specific to AI endpoints.

## Reading the result in Foundry

Lesson 11 covered the Monitor tab's dashboard: operational metrics, evaluation scores, and tracing, all in one place. Once your diagnostic setting is active, that same dashboard is where you'd watch this endpoint's token usage and latency over time — the capstone deliverable is the diagnostic setting existing and logs actually landing, not a long observation period.

## Key terms

| Term | Meaning |
|---|---|
| Diagnostic setting | An Azure configuration that routes a resource's logs and metrics to a destination like Log Analytics |
| `az monitor diagnostic-settings create` | The CLI command that creates one |
| Public network access | Whether a resource accepts traffic from the open internet at all |

## Lab

For the endpoint you deployed in Lesson 22: move its key into a Key Vault secret and confirm `DefaultAzureCredential()` can read it, then run the `az monitor diagnostic-settings create` command above against your own endpoint's resource ID. Take a screenshot (or note) confirming the diagnostic setting exists.

## Check yourself

You're ready for Lesson 24 when you can explain, without looking: what does a diagnostic setting actually do, and why is `DefaultAzureCredential()` safer than a client secret in code?
