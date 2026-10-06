# Lesson 6 — Azure AI Foundry SDK, Basics

**Chapter 2 · Working With Azure AI Services · Lesson 6 of 24**

## What you'll learn

- The three Python packages that cover most Foundry SDK work
- Where to find the endpoint and credentials every client needs
- How `DefaultAzureCredential` authenticates without a key in your code
- How to send your first chat completion through the SDK

## Three packages, one workflow

Most Foundry SDK work in Python touches three packages:

- **`azure-identity`** — handles authentication, so your code never has to manage a raw key directly.
- **`azure-ai-projects`** — the project-level client: deployments, connections, and agents live behind this.
- **`openai`** (or `azure-ai-inference`) — the client that actually sends chat requests, once you're connected.

```bash
pip install azure-identity azure-ai-projects openai
```

## Where the credentials come from

Every client needs an endpoint URL and credentials to connect. Your project's **Overview** page in the Foundry portal shows both:

![The project Overview page in Foundry, showing the connected resource and the Azure AI model inference endpoint and key.](/courses/azure-ai-cloud/ch02/06-azure-ai-foundry-sdk-basics/overview-endpoint-and-key.png)
*Your project's Overview page shows the endpoint URL and key every client in this lesson needs.*

## Authenticate, then connect

```python
from azure.identity import DefaultAzureCredential
from azure.ai.projects import AIProjectClient

project = AIProjectClient(
    endpoint="https://my-resource.services.ai.azure.com",
    credential=DefaultAzureCredential(),
)
```

`DefaultAzureCredential` tries several authentication methods in order — your Azure CLI login, a managed identity, environment variables — until one works. The practical benefit: the same code authenticates correctly on your laptop (via `az login`) and in production (via managed identity), with no key ever hardcoded.

## Your first chat completion

Once you have a project client, get an OpenAI-compatible client from it and call it exactly like you would the standard OpenAI SDK:

```python
chat = project.get_openai_client()

reply = chat.chat.completions.create(
    model="my-deployment-name",
    messages=[{"role": "user", "content": "Hi"}],
)
print(reply.choices[0].message.content)
```

Remember Lesson 3's gotcha: `model` here is your **deployment name**, not necessarily the underlying model's name.

## Confirming what's actually deployed

If a deployment name throws a 404 or "not found" error, the fix is almost always to check what's actually deployed:

![The Models + endpoints page listing deployed models grouped by their connection.](/courses/azure-ai-cloud/ch02/06-azure-ai-foundry-sdk-basics/endpoints-ai-services-connection.png)
*The Models + endpoints page lists every deployment your code can target by name — useful when a deployment name typo throws a 404.*

This page is the ground truth for exact deployment names, independent of whatever you think you named something.

## Key terms

| Term | Meaning |
|---|---|
| `DefaultAzureCredential` | A credential class that tries multiple auth methods in order, without a hardcoded key |
| `AIProjectClient` | The SDK's entry point for a Foundry project — deployments, connections, agents |
| `get_openai_client()` | Returns an OpenAI-compatible client pointed at your project's deployments |
| Models + endpoints | The portal page listing every deployment that actually exists in a project |

## Check yourself

You're ready for Lesson 7 when you can explain, without looking: what three things does `DefaultAzureCredential` try, in order, and why is that better than hardcoding a key?
