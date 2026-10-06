We've talked about deployment options in the abstract. Now let's actually deploy a model, start to finish.

The flow has three stages. Find and select a model in the catalog, then choose Use this model. Agree to terms if the model needs them, and customize the deployment name and connection. Then deploy, and verify the endpoint comes up healthy.

If you picked a model from a partner or the community, the first deployment in a project shows a terms-and-conditions step — accept it once, and future deployments of that model skip this step.

Foundry auto-selects a connection for the deployment based on your project. Most of the time that default is correct — but if you need to route this deployment through a specific Foundry resource, select Customize.

Managed compute deployments ask for more: how many instances, which virtual machine size, and a name for the endpoint. This is the one deployment option where you're explicitly sizing hardware, not just picking a model.

Once you click Deploy, watch two things: the provisioning state should read Succeeded, and the deployment state should read Healthy. Then copy the Target URI and key from the deployment's details — that's what your SDK code calls. Use the Test tab in the portal to confirm it responds before you wire up any application code.

A deployed model that only answers from its training data is useful, but limited. Next, we ground it in your own data using Azure AI Search.
