# Lesson 9 — Content Safety & Moderation APIs

**Chapter 2 · Working With Azure AI Services · Lesson 9 of 24**

## What you'll learn

- The harm categories Azure AI Content Safety screens for
- How severity levels work, and why they're not a simple yes/no
- How to test moderation in the portal before writing any code
- The extra step needed to moderate images stored in Blob Storage

## What Content Safety screens for

Azure AI Content Safety screens both the prompts going into a model and the responses coming back out, across four harm categories:

- **Hate and fairness** — discriminatory language toward a person or identity group.
- **Sexual** — explicit or inappropriate sexual content.
- **Violence** — content describing or promoting physical harm.
- **Self-harm** — content related to self-injury.

On top of these, **Prompt Shields** provides a unified API for two kinds of attacks: jailbreaks (users trying to manipulate a model into bypassing its safety rules) and indirect attacks (malicious instructions hidden inside a document the model processes, sometimes called cross-domain prompt injection).

## Testing it without writing code

Before wiring moderation into an application, you can test it directly in the Foundry portal:

![The Guardrails and controls Try it out page, with panels for moderating text and image content.](/courses/azure-ai-cloud/ch02/09-content-safety-and-moderation-apis/try-it-out.png)
*The Foundry portal's Try it out page lets you moderate sample text or images interactively, no code required.*

Select **Moderate text content** or **Moderate image content**, run a sample, and see exactly which categories get flagged and at what severity.

## Severity, not just yes/no

Content Safety doesn't just reject or accept — it scores severity per category:

| Level | Score | Meaning |
|---|---|---|
| Safe | 0 | Fine for general, journalistic, professional contexts |
| Low | 2 | Opinionated, offensive language, low intensity |
| Medium | 4 | Offensive, demeaning, or harmful-instruction content |
| High | 6 | Explicit, severe, or illegal harm |

Your application configures which severities are acceptable per category — a customer support bot and a mature-content platform might draw very different lines at the same severity score.

## From testing to code

Once a test run in the portal looks right, **View Code** exports the exact call — your configured severity thresholds included:

![The View Code button on the Analyze text/image content pages, which exports a ready-to-use code sample.](/courses/azure-ai-cloud/ch02/09-content-safety-and-moderation-apis/view-code-option.png)
*Once a test run looks right, View Code exports the exact call — severity thresholds and all — ready to drop into your app.*

## Moderating images from Blob Storage

If you're passing an image by blob URL instead of uploading raw bytes, there's one extra setup step: the Content Safety resource needs read access to your storage account.

![The Add role assignment screen in the Azure portal, granting a Storage Blob Data Reader role to a managed identity.](/courses/azure-ai-cloud/ch02/09-content-safety-and-moderation-apis/add-role-assignment.png)
*To analyze an image by blob URL instead of uploading bytes, the Content Safety resource needs a Storage Blob Data Reader role via managed identity.*

Enable a system-assigned managed identity on the Content Safety resource, then assign it **Storage Blob Data Reader** (or **Contributor**/**Owner**) on the storage account. Without this, blob-URL image analysis requests fail with an authorization error.

## Key terms

| Term | Meaning |
|---|---|
| Harm category | One of hate, sexual, violence, or self-harm, scored independently |
| Prompt Shields | Detection for jailbreak attempts and indirect prompt injection |
| Severity level | A 0/2/4/6 score (Safe/Low/Medium/High) per harm category |
| Managed identity | An Azure-managed credential, used here to grant blob read access without a key |

## Check yourself

You're ready for Lesson 10 when you can explain, without looking: what are the four harm categories Content Safety screens for, and what's the difference between a jailbreak attack and an indirect attack?
