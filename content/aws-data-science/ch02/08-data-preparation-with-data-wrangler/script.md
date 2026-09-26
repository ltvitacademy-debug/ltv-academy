Real data is messy: missing values, duplicates, outliers, and columns that quietly contain the answer. SageMaker Data Wrangler is AWS's visual tool for cleaning, feature engineering and analysis. We will learn its concepts, then rebuild the checks in pandas so you see what they mean.

A Data Wrangler flow moves through four stages. Import from S3, Athena, Redshift and other sources. Transform, with standard tools plus your own Python. Analyze, with a data quality report, target leakage analysis and quick modeling. And export to S3, Feature Store, Pipelines or a Python script.

Where does it live? The AWS docs say Data Wrangler is now integrated into SageMaker Canvas, and the newer Studio reaches it through Canvas. Older docs describe it inside Studio Classic. Names and menus change, so check which one your domain uses. We do not show its screens here.

To see what a quality report looks for, I made a synthetic table messy on purpose. A pandas analogue found five percent of spend missing, three hundred ninety duplicate rows, and four hundred fifty-two outliers. A leakage screen then flagged a column whose single-feature AUC was zero point nine eight nine.

The flow, as code. Drop duplicates, add a missing flag, fill with the median, remove the leaky column, and one-hot encode. This is an analogue of the ideas, not Data Wrangler's own algorithm.

The payoff: a model scored an AUC of zero point nine nine one with the leaky column, and zero point six three two without it. The honest number is the lower one. A feature that predicts almost perfectly on its own deserves suspicion.

Export matters, because a flow clicked together once is a liability if nobody can reproduce it. Exporting to a script, a Pipelines step or Feature Store turns it into repeatable code. Next, Lesson 9 covers training jobs.
