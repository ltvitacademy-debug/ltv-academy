Deploying a model isn't a single button. Foundry gives you three distinct deployment options, and picking the right one matters.

Standard deployment in a Foundry resource is the default and the widest-capability option — use it unless you have a specific reason not to. Serverless API endpoints are pay-as-you-go with no compute quota required, but they're regional only. Managed compute gives you a dedicated virtual machine you choose and pay for by the hour, required for things like Hugging Face models or custom models.

With over ten thousand models in the catalog, the Deployment options filter is how you narrow the list down to only the models that support the option you actually need.

Partner and community models — Cohere, Mistral, and others — work a little differently. They route through Azure Marketplace. The first time you deploy one in a project, you subscribe to the offering; after that, deploying more of that model is instant.

Safety isn't a separate step you remember to add later. Every deployment wizard turns on a content filter by default, screening for hate, self-harm, sexual, and violent content before the model ever sees production traffic.

The three options aren't interchangeable under the hood. Content filtering ships with Foundry resources and serverless endpoints, but not managed compute. Keyless authentication through Microsoft Entra ID only works on Foundry resources. And billing itself is different — tokens processed for Foundry and serverless, versus compute core-hours for managed.

Sometimes, though, none of these three cloud options is the right call. Next, we look at when self-hosting actually wins.
