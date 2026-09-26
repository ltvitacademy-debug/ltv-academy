# Notebooks & Studio

You have a domain and a way in. Now for the daily work surface: the notebook. In SageMaker Studio that means a **JupyterLab space**. You already know Jupyter, so this lesson is not about cells and kernels. It is about what is different when the notebook runs on a rented machine: what that machine is, where your work is stored, how to right-size it, and how to keep a reproducible environment.

AWS code is illustrative and **not run here**; the parameter names were checked against the boto3 service model. The memory measurements come from real pandas runs on a synthetic table.

## What you'll learn

- What a JupyterLab space is made of
- How to create one and change its compute
- What comes pre-installed, and how to add packages
- How to estimate the instance size you need
- Habits that keep cost and surprises down

## Anatomy of a JupyterLab space

The AWS docs describe a JupyterLab space as running on a **single Amazon EC2 instance** with a **single Amazon EBS volume**. Everything in the space, including your code, Git profile and environment variables, is stored on that volume. A few facts worth knowing:

- The default storage size is **5 GB**, configured by your administrator, and you can increase it. The service model I inspected allows sizes from 5 up to 16,384 GB.
- You can switch to another instance type to scale compute up or down, and **Fast launch** instances start much faster. The EBS volume persists independently of the instance, so you do not lose files when you switch.
- The default image is **SageMaker Distribution**, which includes popular packages such as PyTorch, TensorFlow, Keras, NumPy, pandas and scikit-learn.
- The app is JupyterLab 4, with built-in Git integration, optional real-time collaboration in shared spaces, and Amazon Q Developer as a coding assistant.

## Creating a space

Most people use the Studio interface: open JupyterLab, create a space, give it a name, choose an instance type and storage size, run it, and open it. Menu labels change, so follow the current console. Behind the scenes it is API calls, illustrated here:

```python
sm.create_space(
    DomainId="d-xxxxxxxx", SpaceName="churn-lab",
    SpaceSettings={"AppType": "JupyterLab"})
sm.create_app(
    DomainId="d-xxxxxxxx", SpaceName="churn-lab",
    AppType="JupyterLab", AppName="default",
    ResourceSpec={"InstanceType": "ml.t3.medium"})
```

`ml.` instance names mirror EC2 families. Check the current instance table for CPU and memory before you choose.

## Customizing the environment

Open a terminal from the Launcher and use `conda` or `pip`. Because the EBS volume persists, environments you build there survive instance switches. The docs recommend a package manager over **lifecycle configurations**, because lifecycle scripts are more error-prone to debug and can slow startup. Pin your versions in a requirements file that lives in Git, so a teammate can rebuild the same environment.

## Sizing: measure before you guess

Bigger instances cost more per hour, so measure first. On the 50,000-row synthetic customer table from Lesson 1, `df.memory_usage(deep=True).sum()` reported **8.1 MB**, about 163 bytes per row, mostly from text columns. Converting the low-cardinality `region` and `plan` columns to pandas `category` dtype cut it to **2.1 MB**. Scaling the plain figure to 20 million rows gives roughly **3.3 GB** just to hold the data.

```python
for c in ["region", "plan"]:
    df[c] = df[c].astype("category")
```

That estimate is a floor, not a budget: pandas operations often create temporary copies, so leave generous headroom. If the data will not fit comfortably, push work to Athena or Glue (Chapter 1) or to a training job (Lesson 9), rather than buying a giant notebook.

## Habits

- Develop on a sample with a small instance; switch up only when needed.
- Treat the notebook as a control room. Heavy training belongs in managed jobs.
- Turn on idle shutdown so an idle app does not keep billing, and stop apps you are not using.
- Keep code in Git, data in S3, and package versions pinned.
- The docs also mention scheduling a notebook as a job to automate data preparation.

## Recap

A JupyterLab space is one EC2 instance plus one persistent EBS volume, launched from the SageMaker Distribution image. Customize with conda or pip, measure memory before choosing an instance, and keep the notebook light.

Next, Lesson 8 prepares data with Data Wrangler.
