# Setting Up Python & Environments

Welcome to Python for Data Science. This is step two of the Data Scientist path. In T-SQL Development you learned to pull data out of databases; here you learn the tool that lets you clean it, reshape it, and analyze it at scale. The next course, Statistics & Probability, gives you the reasoning to interpret what you find, and the courses after that build exploratory analysis, machine learning, and deployment on top of what you learn here.

This course teaches Python from zero, but only the parts data work actually needs. There is no web framework here, no game programming, no object-oriented theory. Every lesson uses small retail datasets (customers, orders, prices) so that each idea has a concrete job to do. Before any of that, you need a working setup, and the most valuable thing to learn on day one is the **virtual environment**.

## What you'll learn

- How to install Python 3 and confirm it works
- Why every project should get its own virtual environment
- How to create, activate, and leave an environment with `venv`
- How to install packages with `pip` and record them in `requirements.txt`
- The Anaconda / Miniconda alternative, and when people choose it

## Step 1: Install Python 3 and check it

Download Python 3 from python.org and run the installer. On Windows, the installer offers a checkbox to add Python to your PATH; tick it, so the `python` command works from any terminal. Then open a terminal and check:

```bash
python --version
```

You should see something like `Python 3.9.13` (your exact version will differ; any recent Python 3 is fine for this course). On macOS and Linux the command is often `python3`. If a command is not found, the installer's PATH option is the usual cause.

You can also ask Python where it lives:

```python
import sys
print(sys.version)
print(sys.executable)
```

`sys.executable` prints the full path of the interpreter that is running. That path matters a great deal once you have more than one Python on your machine.

## Step 2: Make one environment per project

Every package you install has a version, and different projects need different versions. If you install everything into one global Python, an upgrade for project A can silently break project B. A **virtual environment** solves this: it is a folder holding a private copy of the interpreter plus its own installed packages.

```bash
python -m venv .venv
```

That creates a `.venv` folder inside your project. To use it, you activate it:

```bash
# Windows (PowerShell)
.venv\Scripts\activate

# macOS / Linux
source .venv/bin/activate
```

Your prompt will show `(.venv)` in front once it is active. On Windows, PowerShell can block the activation script depending on its execution policy; Command Prompt users can run `.venv\Scripts\activate.bat` instead, and Microsoft and Python document the PowerShell fix if you prefer it (check current docs). To leave the environment, type `deactivate`.

## Step 3: Install packages and record them

With the environment active, `pip` installs into that environment only:

```bash
pip install numpy pandas matplotlib
pip freeze > requirements.txt
```

`pip freeze` lists every installed package with its exact version. The file it writes looks like this (your versions will differ):

```text
numpy==1.23.1
pandas==1.4.3
```

Anyone, including future you, can rebuild the same environment with one command:

```bash
pip install -r requirements.txt
```

Keep `.venv` out of version control and commit `requirements.txt` instead. The recipe travels; the folder does not.

## The Anaconda alternative

Anaconda and Miniconda are distributions that bundle Python with a package manager called `conda`. Many data teams use them because they make scientific packages easy to install. The equivalent commands are `conda create -n ds python` and `conda activate ds`. The habit is the same either way: one environment per project, and a written record of what is in it. This course uses `venv` and `pip` in its examples, and everything transfers to conda.

## Recap

- Install Python 3, then confirm with `python --version`.
- Create an environment per project with `python -m venv .venv`, and activate it.
- Install with `pip install`, record with `pip freeze > requirements.txt`, rebuild with `pip install -r requirements.txt`.
- Next lesson: Jupyter Notebooks, the interactive workspace where most data work happens.
