# Script — Project Structure for ML

## Segment 1 (title)

A single notebook is fine for exploring an idea. It stops being fine when a second person, a scheduled job, or a test needs to use your code. Then you need a project with a clear shape.

## Segment 2 (steps)

Give each kind of thing its own home. Code goes in a package. Data goes in a data folder. Trained models go in a models folder. And settings go in one config file. Code and settings will be tracked in Git. Data and models get versioned separately, which we cover in chapter two.

## Segment 3 (code)

Here is the real layout of the churn project we built for this lesson. The churn folder is an importable package. Raw data and models have their own folders. Notebooks are for exploration only. A params file holds the settings, and a requirements file lists the dependencies.

## Segment 4 (code)

The training entry point reads its settings from the params file, builds the pipeline from the package, fits it, and saves it. Changing a setting becomes a one-line edit, not a hunt through the code.

## Segment 5 (code)

Running the training module from the project root trained on seven hundred fifty rows and reached accuracy point seven six eight. That matches the notebook from lessons one and two, so the refactor changed the structure, not the behavior.

## Segment 6 (steps)

Keep notebooks as clients of the package. Explore in a notebook. When some logic is stable, move it into the package and import it back. Now the notebook, the training script, the tests, and later a deployed service all run the same code.

## Segment 7 (outro)

Next, we put this project under version control, with Git and GitHub, and handle the parts that are specific to data science.
