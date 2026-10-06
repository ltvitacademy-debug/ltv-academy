A model that's accurate but unsafe isn't shippable. Azure AI Content Safety is the service that screens both what goes into a model and what comes back out.

It screens for four harm categories: hate and fairness, sexual content, violence, and self-harm. On top of that, Prompt Shields catches jailbreak attempts and indirect attacks — malicious instructions hidden inside a document the model processes.

You don't need code to try it first. The Foundry portal's Try it out page under Guardrails and controls lets you moderate sample text or images interactively, and see exactly what gets flagged.

Results aren't a simple yes or no. Each category gets a severity level: Safe, scored zero, Low at two, Medium at four, and High at six — explicit, severe, or illegal content. You configure which severities your application accepts or rejects.

Once a test run in the portal looks right, View Code exports the exact call — including your severity thresholds — ready to drop straight into your application.

Moderating images gets one extra step if you're passing a blob URL instead of uploading bytes directly: the Content Safety resource needs a Storage Blob Data Reader role, granted through managed identity, before it can read from your storage account.

Safety checks like these aren't free — every analysis call is billed. Next, we look at keeping that, and every other AI service, under control cost-wise.
