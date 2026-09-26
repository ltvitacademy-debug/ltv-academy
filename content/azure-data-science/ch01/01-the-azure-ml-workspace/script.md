Welcome to Azure Data Science. You already know how to build a model with scikit-learn on your own laptop. This course is about doing that same work on Microsoft's cloud, where the data is bigger, the compute is shared, and someone else has to be able to reproduce your result. The starting point is the Azure Machine Learning workspace.

A workspace is the top-level resource for Azure Machine Learning. Think of it as the project home for everything a machine learning team produces: jobs, which are training runs, plus data assets, models, pipelines and endpoints. This is the studio, the web interface for a workspace. The left navigation is a map of what it holds: an Author section with notebooks and automated ML, an Assets section with data, jobs, environments and models, and a Manage section for compute. Microsoft rearranges this menu now and then, so treat the labels as a snapshot.

When you create a workspace, Azure connects it to companion resources. A storage account holds logs, uploads and notebooks. A key vault holds secrets. Application Insights collects diagnostics from your endpoints. And a container registry stores Docker images for custom environments.

In the portal's create form, you pick a subscription, a resource group, a name and a region. The same form lets you choose existing companion resources or have Azure create new ones for you.

To use a workspace from code, you build a client object called MLClient. Give it your subscription, resource group and workspace name, or download the config file from the studio and call from config. This code is illustrative and not run here, since it needs an Azure subscription. Every later action in this course, creating compute, submitting a job, registering a model, goes through that one object.

A good habit is one workspace per project, so cost reporting and datastore settings stay separate, with access managed through roles and Microsoft Entra groups rather than individual users.

Next lesson: compute and environments, the machines and software that actually run your work.
