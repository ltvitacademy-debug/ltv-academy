# The Azure ML Workspace

Welcome to Azure Data Science. You already know how to explore data, engineer features and train a model with scikit-learn on your own machine. This course is about doing that same work on Microsoft's cloud, where data is bigger, compute is shared, and a teammate (or an auditor) has to be able to reproduce what you did. Everything in Azure Machine Learning starts from one resource: the workspace.

Two notes before we begin. First, this course assumes you have met the cloud basics in the Azure Fundamentals course, so we will not re-explain subscriptions or resource groups beyond what we need. Second, product names and portal screens change often. Everything here follows the current Microsoft Learn documentation for Azure Machine Learning and the Python SDK v2 (`azure-ai-ml`) as of this writing; check the docs when a screen looks different from what you see here.

## What you'll learn

- What an Azure Machine Learning workspace is and what it stores
- The four companion Azure resources a workspace connects to
- How the studio's navigation maps onto the ML lifecycle
- How to connect to a workspace from Python with `MLClient`
- How teams organize workspaces for cost, access and sharing

## The workspace is your project's home

Microsoft describes the workspace as the top-level resource for Azure Machine Learning. It is the place where a team creates and groups the artifacts of a machine learning project: jobs (training runs), experiments, data assets, models, pipelines and inference endpoints. It also keeps a history of every training run, with its logs, metrics, output, lineage metadata and a snapshot of your scripts.

Besides holding results, the workspace hosts configuration: the compute targets that run your work, the datastores that say how to reach your data, and security settings for networking, identity and encryption. In the next lessons we will use each of these in turn.

## A tour of the studio

Azure Machine Learning studio (at `ml.azure.com`) is the web interface for a workspace. Its left navigation is a good map of what the workspace can do. In the layout shown in the Microsoft Learn screenshot for this lesson, the **Author** section holds notebooks, automated ML and the designer; **Assets** holds data, jobs, components, pipelines, environments, models and endpoints; and **Manage** holds compute. Microsoft reorganizes this menu from time to time, so treat the exact labels as a snapshot.

## The four companion resources

When you create a workspace, Azure connects it to other resources. You can bring existing ones, and if you do not, Azure Machine Learning creates them for you:

- **Storage account**: stores artifacts such as job logs, files you upload, and the notebooks used on compute instances.
- **Key Vault**: stores secrets that compute targets and the workspace need.
- **Application Insights**: collects diagnostic information from your inference endpoints.
- **Container Registry**: stores the Docker images built for custom environments. It is created when needed, and you can create workspaces without it if you never build custom containers.

The documentation notes some restrictions on which storage accounts can be the workspace's default (for example, not premium accounts, and not accounts with hierarchical namespace). You can still attach those later as extra datastores. Check the current docs before designing a production setup.

## Creating a workspace

You can create a workspace in the studio with default settings, in the Azure portal for more security options, with the Azure CLI, from the VS Code extension, from Python, or with infrastructure-as-code tools such as Bicep and Terraform (covered in the Terraform and Bicep course in this catalog). The SDK version looks like this:

```python
# Illustrative - not run here (needs an Azure subscription).
from azure.ai.ml import MLClient
from azure.ai.ml.entities import Workspace
from azure.identity import DefaultAzureCredential

# Connect at the resource-group level first.
ml_client = MLClient(
    DefaultAzureCredential(), "<SUBSCRIPTION_ID>", "<RESOURCE_GROUP>"
)

ws = Workspace(name="mlw-churn-dev", location="eastus",
               display_name="Churn project (dev)")
ws = ml_client.workspaces.begin_create(ws).result()
```

The `begin_create(...).result()` pattern appears throughout the SDK: creating cloud resources is a long-running operation, so you start it and then wait for it.

## Connecting from code

Once a workspace exists, you build an `MLClient` scoped to it. You can pass the subscription ID, resource group and workspace name directly, or download a small `config.json` from the studio and let the SDK read it:

```python
# Illustrative - not run here.
from azure.ai.ml import MLClient
from azure.identity import DefaultAzureCredential

cred = DefaultAzureCredential()
ml_client = MLClient.from_config(cred)   # reads config.json
print(ml_client.workspace_name)
```

Creating the client does not itself contact Azure; the first real call does. Every later action in this course - creating compute, registering data, submitting jobs - goes through this one object.

## Organizing workspaces

Microsoft's guidance for teams includes: use roles to manage permissions (for example one role for data scientists and another for administrators); assign access to Microsoft Entra groups instead of individuals; create one workspace per project so costs and datastores are scoped to that project; and share assets between workspaces with Azure Machine Learning registries. Newer "hub" workspaces let an organization share security settings, connections and compute across many project workspaces.

## Recap

- The workspace is the top-level Azure ML resource: it records jobs, data, models and endpoints, and hosts compute and datastore configuration.
- It connects to a storage account, a key vault, Application Insights and (when needed) a container registry.
- In code, an `MLClient` built from your subscription, resource group and workspace name is the handle to everything.
- Plan for one workspace per project, with access managed through roles and groups.

Next up: the compute that actually runs your work, and the environments that make it reproducible.
