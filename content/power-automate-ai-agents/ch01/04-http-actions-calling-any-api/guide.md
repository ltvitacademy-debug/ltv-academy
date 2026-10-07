# HTTP Actions: Calling Any API from a Flow

Power Automate ships with hundreds of pre-built connectors, but you will not find one for your company's internal inference endpoint, your team's custom document-processing service, or most third-party AI APIs that aren't Microsoft's own. For all of those, there's the **HTTP** action — a raw, general-purpose action that sends any HTTP request to any URL and hands you back the response. If you've ever used `requests.post()` in Python or `fetch()` in JavaScript, the HTTP action is that, as a flow step.

## What you'll learn

- What the HTTP action's five fields map to in a request you'd write by hand
- How to call an API that needs an API key or bearer token
- What the action actually returns, and how to use it in the next step
- Where this fits for Castlebridge Logistics once Chapter 2 starts calling Azure OpenAI directly

## The HTTP action, field by field

Every HTTP action configures the same five things any HTTP client needs: **Method** (GET, POST, PUT, PATCH, DELETE), **URI** (the full endpoint URL, which can include dynamic content from earlier steps), **Headers** (key/value pairs — this is where an API key or `Content-Type` usually goes), **Queries** (query-string parameters, if you'd rather not hand-build them into the URI), and **Body** (the request payload, almost always JSON for an API call). Nothing here is Power-Automate-specific — it's the same five things you'd set on a `requests.post()` call or an Postman request.

![Screenshot of the HTTP method dropdown in the Power Automate designer, showing GET, POST, PATCH, PUT, and DELETE options](/courses/power-automate-ai-agents/ch01/04-http-actions-calling-any-api/http-methods.webp)
*The Method dropdown — the same verbs you'd use with any HTTP client.*

Here's an HTTP action configured to call a Microsoft Graph endpoint with a POST and a JSON body built from dynamic content pulled out of earlier steps — note the small blue tokens embedded directly inside the URI and Body fields:

![Screenshot of the HTTP action configured with Method set to POST, a URI containing dynamic content tokens, and a JSON body](/courses/power-automate-ai-agents/ch01/04-http-actions-calling-any-api/http-no-auth.webp)
*Method, URI, Headers, Queries, and Body — the five fields every HTTP action needs. Dynamic content from earlier steps can be dropped directly into any of them.*

## Authenticating the call

Most real APIs require something in the request before they'll respond with data instead of a 401. For an API key, that usually means adding a header — `Authorization: Bearer <your-key>` or `x-api-key: <your-key>` depending on the service — in the Headers section shown above. For calling Microsoft's own services (Azure OpenAI, Azure AI services, Microsoft Graph) with a managed identity instead of a static key, the HTTP action also has a dedicated **Authentication** section under advanced options, where you can select Active Directory OAuth and skip handling the token yourself.

Hardcoding a raw API key directly into a flow is a bad habit worth avoiding from day one — in production, that key should live in Azure Key Vault or a connection reference, not typed into a Headers field in plain text. You'll see the production-safe pattern in later chapters; for now, know that the field exists and what it's for.

## Using the response

Once an HTTP action runs, its output includes three things the rest of your flow can reference: `headers`, `body`, and `status code`. The `body` is almost always the piece you want — if the API returned JSON, that's where it lands, as a single opaque string until you parse it (that's the whole subject of the next lesson). The `status code` is what you'd check in a Condition to branch on success versus failure: a 200 or 202 means the call likely succeeded; a 4xx or 5xx means something needs handling — which is exactly the job of the error-handling patterns in Lesson 6.

Here's a complete flow at Castlebridge Logistics that uses an HTTP action mid-flow to post a result into a Microsoft Teams channel via the Graph API, after earlier steps built the request from a trigger's data:

![Screenshot of a complete Power Automate flow showing a trigger followed by an HTTP action that posts to Microsoft Teams](/courses/power-automate-ai-agents/ch01/04-http-actions-calling-any-api/flow-total.webp)
*A finished flow: trigger, then an HTTP action calling an external API, with its result available to anything after it.*

## Key terms

- **HTTP action** — a general-purpose action that sends any HTTP request to any URL
- **Method** — the HTTP verb (GET, POST, PUT, PATCH, DELETE)
- **URI** — the full endpoint address, which can embed dynamic content from earlier steps
- **Headers** — key/value pairs sent with the request, typically used for auth and content type
- **Body** — the request payload sent with POST, PUT, or PATCH
