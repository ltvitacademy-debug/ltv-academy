# Lesson 52 — ARM Templates & Azure DevOps Pipelines

**Chapter 10 · Security, DevOps & CI/CD · Lesson 5 of 5**

## What you'll learn

- The two real files that make up a factory's ARM deployment
- Building an Azure Pipelines release, artifact to deployment
- Why active triggers need a pre/post-deployment script
- Getting secrets from Key Vault into the deployment itself

## The artifact: pulling from `adf_publish`

Lesson 51's diagram showed a release pipeline pulling the publish
branch as its artifact. Concretely, that means pointing the release
at your factory's Git repository, with the **publish branch**
(`adf_publish`) as the default branch:

![Add an artifact panel in Azure Pipelines, with Azure Repos selected as source type, Source repository set to Dev, and Default branch set to adf_publish.](/courses/data-factory/ch10/52-arm-templates-devops-pipelines/continuous-integration-image7.png)
*The artifact source is your dev factory's repo — but pinned specifically to the adf_publish branch, not the collaboration branch itself.*

Inside that branch sit two files that matter, generated automatically
every time someone publishes: `ARMTemplateForFactory.json` (the
actual template) and `ARMTemplateParametersForFactory.json` (every
parameterized value the template expects).

## The deployment task

An **ARM Template Deployment** task in the release pipeline points
directly at those two files:

![Azure resource group deployment task configuration, showing Action set to "Create or update resource group," a resource group field, and the Template field pointing at ArmTemplateForFactory.json via a linked artifact.](/courses/data-factory/ch10/52-arm-templates-devops-pipelines/continuous-integration-image9.png)
*Notice the task is flanked by two "Azure PowerShell script" steps — the pre- and post-deployment scripts this lesson covers next.*

Two settings genuinely matter here:

- **Action: Create or update resource group** — not "Create new,"
  since you're deploying into an existing test or production
  resource group.
- **Deployment mode: Incremental**, not Complete. In Complete mode,
  any resource that exists in the resource group but *isn't* in the
  new template gets **deleted**. Incremental only adds and updates —
  a genuinely important setting to get right before your first real
  production deployment.

## Why triggers need special handling

Here's a real, sharp edge: **deployment can fail outright if you try
to update a trigger that's currently active.** The fix is a
PowerShell script, run before deployment, that stops every trigger,
followed by a second script after deployment that starts them again:

```
$triggersADF = Get-AzDataFactoryV2Trigger `
  -DataFactoryName $DataFactoryName -ResourceGroupName $ResourceGroupName

$triggersADF | ForEach-Object {
  Stop-AzDataFactoryV2Trigger -ResourceGroupName $ResourceGroupName `
    -DataFactoryName $DataFactoryName -Name $_.name -Force
}
```

Microsoft ships a ready-made version of this exact script
(`PrePostDeploymentScript.Ver2.ps1`) that's smart enough to only
stop and restart triggers that actually changed, rather than every
trigger in the factory — worth using directly rather than
reinventing it.

## Pulling secrets from Key Vault into the deployment

Two real ways to keep secrets out of the parameters file itself:

1. **Reference Key Vault directly in the parameters file**, using a
   `reference` block pointing at the vault and secret name — Azure
   Resource Manager resolves it automatically during deployment.
2. **Add a dedicated Azure Key Vault task** before the deployment
   task, which fetches secrets into pipeline variables the deployment
   task can then use.

Either way, the actual secret value never sits in plain text
anywhere in your release definition.

## Key terms

| Term | Meaning |
|---|---|
| ARMTemplateForFactory.json | The generated ARM template representing your published factory |
| ARMTemplateParametersForFactory.json | The parameters file listing every environment-specific value the template needs |
| Incremental deployment mode | Adds and updates resources without deleting anything absent from the new template |
| Complete deployment mode | Deletes any resource not present in the new template — genuinely dangerous if misconfigured |

## Lab

1. Locate (or imagine, if you don't have DevOps access right now)
   where `ARMTemplateForFactory.json` would live in your `adf_publish`
   branch.
2. Write one sentence explaining why Incremental deployment mode is
   the safer default for this scenario.
3. Explain why active triggers specifically need a pre/post-deployment
   script, rather than deploying successfully on their own.

## Check yourself

You're ready for Chapter 11 when you can explain, in one sentence,
the real risk of using Complete deployment mode instead of
Incremental for a Data Factory release.
