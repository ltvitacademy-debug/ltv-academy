# Using LLM APIs From Python

Last lesson ended with a function called `call_llm(prompt)` that we did not write. This lesson writes it. Calling a hosted language model from Python is much less mysterious than it sounds: you send text and settings over HTTPS, and you get text back. The official Python packages just wrap that in a friendly client object.

One honest caveat first. Providers change model names, parameters, and even whole endpoints often. The call shapes below were checked against the providers' official documentation at the time of writing, but always confirm against the current docs before you rely on them. Model names are shown as placeholders on purpose.

## What you'll learn

- The shape of a text-generation call with the OpenAI, Anthropic, and Azure OpenAI Python SDKs
- How to keep API keys out of your code with environment variables
- Why wrapping the call in one function makes retries and testing easy
- How to test your pipeline without any API access

## Keys belong in the environment

Never paste a key into a notebook or commit it to a repository. Set it as an environment variable and read it at run time. The official clients even read their standard variable automatically when you construct them with no arguments.

```python
import os

def get_key(name):
    key = os.environ.get(name)
    if not key:
        raise RuntimeError(f"Set the {name} environment variable")
    return key
```

## OpenAI (not run here)

The examples below need an API key and network access, so they are **not run here**. OpenAI's documentation currently recommends the Responses API for new work; the older Chat Completions API remains supported.

```python
from openai import OpenAI

client = OpenAI()  # reads OPENAI_API_KEY
r = client.responses.create(
    model="MODEL_NAME",   # a model name from OpenAI's current docs
    input=prompt,
)
print(r.output_text)
```

## Anthropic (not run here)

Anthropic's Messages API requires a `model`, a `max_tokens` limit, and a list of `messages`. The text comes back in a list of content blocks.

```python
from anthropic import Anthropic

client = Anthropic()  # reads ANTHROPIC_API_KEY
m = client.messages.create(
    model="MODEL_NAME",   # a model alias from Anthropic's current docs
    max_tokens=1024,
    messages=[{"role": "user", "content": prompt}],
)
print(m.content[0].text)
```

## Azure OpenAI (not run here)

Azure OpenAI uses the same `openai` package. As of this writing, Microsoft's documentation shows pointing the standard `OpenAI` client at your resource's `/openai/v1/` endpoint. The important difference: `model` is your **deployment name**, the name you chose when you deployed a model in your Azure resource, not the underlying model name. Microsoft recommends Microsoft Entra ID or Azure Key Vault over raw keys for production.

```python
key = os.getenv("AZURE_OPENAI_API_KEY")
client = OpenAI(
    api_key=key,
    base_url="https://YOUR-RESOURCE.openai.azure.com/openai/v1/",
)
r = client.responses.create(
    model="MY_DEPLOYMENT_NAME",
    input=prompt,
)
```

Notice how similar the three are: a client, a model, your text in, text out. That is why a narrow `call_llm(prompt)` function works so well.

## Retries and a fake model (this part runs)

Networks fail and providers rate-limit. A tiny retry loop with exponential backoff handles the transient errors. The official SDKs also retry some failures by default, so check their current documentation before stacking your own on top. To test the loop without any API, we substitute a fake model that fails twice and then answers.

```python
import time

class FakeModel:
    def __init__(self):
        self.calls = 0
    def __call__(self, prompt):
        self.calls += 1
        if self.calls <= 2:
            raise ConnectionError("simulated timeout")
        return "Items can be returned within 30 days. [0]"

def with_retries(fn, attempts=3, base_delay=0.1):
    for attempt in range(1, attempts + 1):
        try:
            return fn()
        except ConnectionError as err:
            print(f"attempt {attempt} failed: {err}")
            if attempt == attempts:
                raise
            time.sleep(base_delay * 2 ** (attempt - 1))

model = FakeModel()
def call_llm(prompt):
    return with_retries(lambda: model(prompt))
```

Running it printed:

```
attempt 1 failed: simulated timeout
attempt 2 failed: simulated timeout
Items can be returned within 30 days. [0]
```

Swap `model` for a function that wraps one of the SDK calls above and nothing else in your pipeline changes.

## Recap

Every provider follows the same pattern: create a client from a key in the environment, send a model name plus your text, and read the text back. Keep keys out of code, treat model names and parameters as things to verify against current docs, and hide the provider behind one small function. A fake model lets you test retries and the rest of the pipeline offline. Next: getting structured data out of those free-text answers.
