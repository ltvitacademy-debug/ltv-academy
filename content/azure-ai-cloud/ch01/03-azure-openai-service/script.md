Inside the Foundry catalog, one model family deserves its own lesson: Azure OpenAI Service.

Azure OpenAI gives you the same OpenAI models you'd get from OpenAI directly — chat models like GPT-4o and GPT-4.1, the o-series reasoning models, text-embedding-3 for search and RAG, and image, speech, and audio models — wrapped in Azure's enterprise security, networking, and SLAs.

Creating the resource starts exactly like any other Azure resource. In the Azure portal, select Create a resource, search for Azure OpenAI, and select it.

On the Basics tab you pick a subscription, resource group, region, and a name for the resource. Pricing tier is simple right now — Standard S0 is the only option available.

A few minutes after you submit, Azure finishes provisioning and shows a notification. Select Go to resource, and you land on your new Azure OpenAI resource, ready to deploy a model into.

Here's the one gotcha that catches almost everyone once: calling OpenAI's own API, you pass the model name directly. Calling Azure OpenAI, you pass your deployment name instead — a name you chose when you deployed the model, which can be completely different from the underlying model name.

Creating the resource is only step one. Next, we look at the different ways you can actually deploy a model into it.
