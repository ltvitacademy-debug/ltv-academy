Azure Machine Learning is one place to do data science on Azure. Azure Databricks is the other big one, and many teams already have it. This lesson covers the data science workflow there.

You already know Spark and Delta from earlier courses, so we focus on the machine learning side. Databricks Runtime for ML gives you clusters with scikit-learn, XGBoost, MLflow and deep learning frameworks preinstalled. Notebooks are where you work. MLflow tracking is built into the platform. And Unity Catalog governs the data, features and models you use.

To use the ML runtime, you create compute and select the Machine learning checkbox. Databricks then sets the access mode to Dedicated with you as the user, which is what lets the cluster read Unity Catalog data. For deep learning, choose a GPU worker type. Then attach a notebook.

The training code will feel familiar. Turn on MLflow autologging for scikit-learn, train inside a run, and log any extra metric yourself, such as test AUC. I ran this same pattern locally on synthetic churn data and got an AUC of about zero point nine two.

In a Databricks notebook, an experiment sidebar lists each run with its parameters and metrics, right next to your code. From there you can open the full experiment page and compare runs.

Databricks also offers AutoML. You give it a dataset and the problem type, and it prepares the data, tries several algorithms, tunes them, and generates source notebooks for you to read and modify. That makes it a transparent, glass-box baseline rather than a black box. One note: the docs say AutoML is not built into Databricks Runtime 18 ML and above, so check current documentation.

The same sidebar leads to Models and Serving, where a registered model can be deployed as an endpoint. We will keep registry and deployment ideas for the last chapter.

Next, lesson twelve goes deeper into MLflow on Databricks.
