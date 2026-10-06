# Lesson 7 — Deploying a Model Endpoint

**Chapter 2 · Working With Azure AI Services · Lesson 7 of 24**

## What you'll learn

- The full hands-on flow from catalog card to a live endpoint
- Why some models show a terms-and-conditions step and others don't
- What managed compute asks you to configure that other options don't
- What to check immediately after a deployment finishes

## The deployment flow, start to finish

Deploying a model from the catalog has three stages:

1. **Find & select** — browse or search the model catalog, open a model's card, and select **Use this model**.
2. **Agree & customize** — accept terms if the model requires them, then set a deployment name and confirm (or change) the connection.
3. **Deploy & verify** — submit the deployment, then confirm it comes up **Succeeded** and **Healthy**.

## Step 1: terms, if the model needs them

Models sold directly by Microsoft deploy immediately. Models from partners and community show a terms step the first time you deploy them in a given project:

![The terms and conditions step for deploying a Mistral-Large model, showing an Agree and proceed button.](/courses/azure-ai-cloud/ch02/07-deploying-a-model-endpoint/models-deploy-agree.png)
*Models from partners and community show a terms-and-conditions step the first time you deploy them in a project.*

Accept it once per project, per model — subsequent deployments of the same model skip this step entirely.

## Step 2: customize the connection

Foundry automatically selects a connection for the deployment based on your project's setup, which is correct most of the time:

![The deployment customization screen, showing a Customize option to change the connection a deployment uses.](/courses/azure-ai-cloud/ch02/07-deploying-a-model-endpoint/models-deploy-customize.png)
*Foundry auto-selects a connection for you — select Customize if you need to point the deployment somewhere specific.*

Select **Customize** only when you have a specific reason — for example, routing the deployment through a particular Foundry resource rather than the project's default.

## Managed compute asks for more

If you're deploying to managed compute, the dialog asks you to size the hardware yourself:

![The managed compute deployment dialog, showing instance count, virtual machine selection, and endpoint/deployment name fields.](/courses/azure-ai-cloud/ch02/07-deploying-a-model-endpoint/deployment-configuration.png)
*Instance count, VM size, and endpoint name — managed compute deployments ask you to size the hardware yourself.*

| Field | What it controls |
|---|---|
| Instance count | How many copies of the VM serve this deployment |
| Virtual machine | The VM SKU — cores, RAM, and the hourly price |
| Endpoint | New or existing — an endpoint can host multiple deployments |
| Deployment name | What your code calls at request time (see Lesson 3) |

This is the one deployment option where you're explicitly choosing hardware, rather than just picking a model and letting the platform handle sizing.

## After you click Deploy

Once the deployment finishes:

1. **Check status** — the provisioning state should read **Succeeded**, and the deployment state should read **Healthy**. If either doesn't, the portal's error messages are the place to start debugging.
2. **Copy the Target URI and key** — found on the deployment's details page. This is exactly what your SDK code from Lesson 6 connects to.
3. **Test it** — use the portal's **Test** tab to send a sample request before writing or deploying any application code against it.

## Key terms

| Term | Meaning |
|---|---|
| Target URI | The endpoint URL a deployment exposes for inference requests |
| Provisioning state | Whether the deployment resource itself was created successfully |
| Deployment state | Whether the deployed model is actually healthy and serving requests |
| Connection | The Foundry resource a deployment routes through |

## Check yourself

You're ready for Lesson 8 when you can explain, without looking: what two status fields should you check immediately after a deployment finishes, and what do they each tell you?
