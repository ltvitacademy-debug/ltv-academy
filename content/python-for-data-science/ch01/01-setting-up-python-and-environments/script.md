# Script — Setting Up Python & Environments

## Segment 1 (title)

Welcome to Python for Data Science. This is step two of the Data Scientist path, and in this first lesson we get your machine ready to do real work.

## Segment 2 (steps)

In T-SQL Development you learned to get data out of databases. Python is where you clean it, reshape it, and analyze it at scale. Statistics and Probability comes next, then exploration, machine learning, and deployment. We teach Python from zero here, but only what data work needs. No web frameworks, no game programming. Every lesson uses small retail datasets, so each idea has a job to do.

## Segment 3 (steps)

Setup is three moves. Install Python three from python dot org, and on Windows tick the box that adds Python to your path. Check it with python dash dash version in a terminal. Then make an environment for each project, and install packages into it. The environment is the part most beginners skip, and it is the part that saves you later.

## Segment 4 (code)

A virtual environment is a folder holding a private copy of Python and its packages. Python dash m venv dot venv creates one. Then you activate it. On Windows that is the Scripts activate command, on Mac and Linux it is source, bin, activate. When your prompt shows dot venv in parentheses, you are inside it. Type deactivate to leave.

## Segment 5 (code)

With the environment active, pip install puts packages in that environment only. Pip freeze, redirected into requirements dot txt, records every package with its exact version. Anyone can rebuild the same setup with pip install dash r requirements dot txt. Commit that file, not the environment folder. If you prefer Anaconda or Miniconda, the habit is identical: one environment per project.

## Segment 6 (outro)

Now your Python is installed, isolated, and reproducible. Next lesson, we open Jupyter Notebooks, the interactive workspace where most data work happens.
