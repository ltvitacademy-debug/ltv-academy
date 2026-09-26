You have used Azure Machine Learning and Azure Databricks. Microsoft Fabric is the third Microsoft platform for data science, and it starts from the data.

Fabric is Microsoft's all-in-one analytics platform. Your data already lives in a lakehouse in OneLake, and Power BI reads from the same place. Notebooks, experiments and models live in that workspace too, so you train on governed data without copying it out. The loop is the one you know: prepare, experiment, model, then operationalize.

In a notebook, the default lakehouse is mounted under slash lakehouse slash default, so pandas can read files directly. Spark reads Delta tables with relative paths, and the spark session already exists. This code is illustrative, since we have no Fabric capacity here.

Modeling is M L flow, the A P I you already know. Set an experiment, start runs, log parameters and metrics, and log the model with a signature and a registered model name. I ran this locally. Two runs, with A U C near point seven nine four, and two model versions. The signature matters: it must describe what predict really returns.

In Fabric, the run page shows the properties, metrics, parameters, and the logged model folder. The Save as M L model button turns a good run into a model item, and every registration adds a version.

Batch scoring uses PREDICT. The model must be in M L flow format with its signature populated, and only some flavors are supported. You create an M L flow Transformer with the input columns, output column, model name and version. Then you transform a Spark data frame and write predictions to a Delta table. Illustrative, adapted from Microsoft Learn.

You can also choose Apply this version on the model page. A wizard maps your table to the model's signature and generates the notebook for you. Once predictions land in the lakehouse, Power BI can read them in Direct Lake mode, with no refresh.

Next: the model registry, and how registered versions become deployments in Azure Machine Learning.
