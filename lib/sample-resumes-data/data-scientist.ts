import type { PathResumes } from "../sampleResumeTypes";

const CONTACT = ["Atlanta, GA", "(404) 555-0182", "john.doe@example.com", "linkedin.com/in/johndoe-biexample"];

export const RESUMES: PathResumes = {
  "job-ready": {
    levelLabel: "Job Ready",
    name: "John Doe",
    contact: CONTACT,
    summary:
      "Data Scientist trained across the full pipeline — SQL extraction, Python, statistics, machine learning, generative " +
      "AI, cloud ML, and MLOps — through a hands-on, project-based program. Took a messy, synthetic business dataset from " +
      "a vague retention question through SQL feature extraction, cleaning, exploratory analysis, model comparison and " +
      "tuning, explainability, a packaged prediction API, a drift-monitoring plan, and a defended stakeholder " +
      "presentation. Bringing that SQL-to-deployment fluency to a Data Scientist, Data Science Analyst, Machine Learning " +
      "Analyst, or Applied Scientist role.",
    skills: [
      "Python for Data Science (pandas, NumPy, data cleaning & validation)",
      "T-SQL Querying & Feature Extraction",
      "Statistics, Probability & A/B Testing",
      "Exploratory Data Analysis & Visualization (Matplotlib, Plotly, Power BI)",
      "Machine Learning Fundamentals (regression, trees, ensembles, clustering, PCA)",
      "Applied Machine Learning with scikit-learn (pipelines, tuning, imbalanced data)",
      "Advanced Modeling (gradient boosting, time-series forecasting, NLP, recommenders)",
      "Model Explainability (permutation importance, SHAP)",
      "Generative AI & LLMs (transformers, embeddings, vector search, RAG)",
      "Cloud Machine Learning (Azure Machine Learning, AWS SageMaker)",
      "MLOps & Model Lifecycle (versioning, CI/CD, drift monitoring, retraining)",
      "Git/GitHub for Data Science Workflows",
      "Stakeholder Communication & Technical Presentation",
    ],
    tools:
      "Python (pandas, NumPy, scikit-learn, Matplotlib, Plotly, SHAP), T-SQL/SSMS, SQLite, Jupyter Notebook, Git/GitHub, " +
      "Power BI, Azure Machine Learning Studio, AWS SageMaker, MLflow, Docker, FastAPI",
    sections: [
      {
        heading: "Training",
        entries: [
          {
            left: "Lifting the Veil IT Academy — Apprenticeship Program",
            right: "Jan 2026 – Jun 2026",
            sub: "Data Scientist Track · Atlanta, GA",
            bullets: [
              "Completed an intensive, project-based apprenticeship covering SQL, Python, statistics, machine learning, generative AI, cloud ML on Azure and AWS, and MLOps, through hands-on labs and a full business-problem-to-deployment capstone.",
              "Queried and joined relational data in T-SQL — multi-table joins, GROUP BY/HAVING aggregation, window and ranking functions (ROW_NUMBER, RANK, DENSE_RANK, NTILE, OVER/PARTITION BY), CTEs including recursive CTEs, and subqueries — plus data-warehouse concepts (star schema, fact/dimension tables, OLTP vs. OLAP) covering where SQL fits in a data pipeline.",
              "Built Python data workflows with NumPy array work and vectorization and pandas (GroupBy aggregation, merging/reshaping, text and datetime handling), queried SQL databases and REST APIs from Python, and diagnosed and handled missing data, duplicate/inconsistent records, data-type problems, and outliers with written validation checks.",
              "Applied descriptive statistics, probability (including Bayes' theorem), common distributions, and the Central Limit Theorem; built confidence intervals both analytically and by bootstrapping; and ran hypothesis tests (chi-square, ANOVA) with attention to Type I/II error, statistical power, and multiple-comparisons correction.",
              "Designed and analyzed A/B tests end to end — sample-size/power planning through interpreting results — and distinguished correlation from causation using simple linear regression.",
              "Followed a structured EDA workflow (univariate, bivariate, multivariate, correlation and outlier analysis), built static and interactive charts in Matplotlib and Plotly, and connected Power BI to Python- and SQL-sourced data to share exploratory findings with non-technical stakeholders.",
              "Built supervised models (linear/multiple/logistic regression, ridge/lasso regularization, decision trees, random forests) and unsupervised models (clustering, hierarchical clustering, PCA), with a working grasp of bias/variance, overfitting, and train/validation/test splitting.",
              "Built scikit-learn pipelines with ColumnTransformer preprocessing, evaluated models with cross-validation and precision/recall/F1/ROC-AUC/confusion matrices, tuned hyperparameters with grid and randomized search, and handled imbalanced classes with resampling (SMOTE) and class weighting.",
              "Trained and compared gradient-boosted models (XGBoost, LightGBM/CatBoost) against random-forest baselines, built time-series forecasts (exponential smoothing, ARIMA, Prophet, and ML-based forecasting), and worked through NLP basics (tokenization, TF-IDF, text classification, sentiment analysis, topic modeling) and recommender-system approaches (collaborative and content-based filtering).",
              "Explained model decisions with permutation feature importance and SHAP, and evaluated models for fairness and disparities across population subgroups.",
              "Worked with neural network and transformer/LLM concepts, built and compared text embeddings, used a vector database for semantic search, and built a retrieval-augmented generation (RAG) pipeline calling LLM APIs from Python, weighing cost, latency, and privacy tradeoffs.",
              "Trained and tracked models in the Azure Machine Learning workspace (notebooks, jobs, Automated ML, MLflow experiment tracking), including feature engineering at scale with Spark on Databricks, and deployed to real-time and batch endpoints with data-drift monitoring and Responsible AI tooling.",
              "Used AWS data tools (S3, Glue Data Catalog, Athena, Redshift, IAM) feeding SageMaker — Data Wrangler preparation, training jobs, hyperparameter tuning, Feature Store, SageMaker Pipelines — and deployed to real-time and batch/serverless endpoints with Model Monitor for drift.",
              "Structured ML projects for production with reproducible environments, versioned data and models, and tracked experiments with MLflow and a model registry; packaged a trained model behind a prediction API, containerized a model service with Docker, and reasoned about batch vs. real-time inference.",
              "Wrote CI/CD for machine learning (automated tests for ML code and data, GitHub Actions for ML, automated model validation, promotion between environments) and a monitoring/retraining plan covering data drift, concept drift, performance alerting, automated retraining triggers, and model documentation.",
              "Used Git on data science projects the way a working data scientist does: .gitignore rules keeping large data and model files out of history, nbstripout to keep notebook diffs clean, experiment branches that tie a settings change to its result, and GitHub pull-request templates for ML changes.",
              "Practiced the data science interview process — statistics/ML conceptual questions, SQL and coding practice, a take-home case study, and a mock behavioral interview — and rehearsed defending a finished project in front of a skeptical stakeholder panel.",
            ],
          },
        ],
      },
      {
        heading: "Projects",
        entries: [
          {
            left: "Harvest Table Customer Churn Prediction — Capstone Project",
            right: "2026",
            sub: "Lifting the Veil IT Academy, Data Scientist Apprenticeship Program · fictional meal-kit company, synthetic seeded dataset",
            bullets: [
              "Scoped a vague retention request into a precise prediction problem: an active population of 3,690 customers, a 60-day cancellation label (15.4% base rate), a fixed snapshot date, and a documented no-leakage rule, after auditing the raw data and finding issues including duplicate rows, inconsistent region spellings, and dollar-sign-formatted order amounts.",
              "Built a break-even cost model from assumed contact cost, save rate, and customer value to set a 20.8% break-even precision and chose decision-relevant metrics (average precision, precision/lift at the top 10%, calibration) instead of defaulting to accuracy on an imbalanced label.",
              "Wrote a CTE-based SQL extract that removed duplicate customers with a window function, caught a silent text-to-number conversion bug in a currency column, and joined order and ticket history into one leakage-safe, snapshot-filtered feature table per customer.",
              "Cleaned the dataset in pandas against six written rules (deduplication, mixed-format date parsing, category standardization, invalid-value handling, currency casting, missing-value imputation) and reconciled the Python result against the SQL extract to confirm both pipelines agreed.",
              "Ran exploratory analysis with churn-rate-by-group charts and confidence-interval error bars to separate real signals (order consistency, tenure, late/refunded-order share) from noise (region, age, recent tickets), including a two-factor analysis showing combined risk compounding beyond either factor alone.",
              "Compared logistic regression, random forest, and gradient-boosted candidates with repeated cross-validation and a paired-fold comparison, selected a model by a rule set agreed before seeing the results, then tuned and evaluated it once on a held-out test set with bootstrap confidence intervals — reaching about 2.6x the base churn rate in the top-risk decile, clear of the break-even threshold.",
              "Explained the selected model with standardized coefficients, permutation importance, and SHAP; tested a hypothesis about a surprising driver with a follow-up feature rather than reporting it blindly; and checked the flagged customer list for disparities across plan, region, and age segments.",
              "Packaged the fitted pipeline with a model card and a FastAPI prediction endpoint behind a documented request/response contract, wrote a drift-monitoring plan (PSI/KS statistics, alert thresholds set from measured noise, retraining triggers), and built a stakeholder deck and one-slide executive summary that led with the recommendation and was rehearsed against six likely pushbacks.",
            ],
          },
          {
            left: "A/B Test Design & Analysis",
            right: "2026",
            sub: "Statistics & Probability for Data Science — end-to-end statistical analysis project",
            bullets: [
              "Designed an A/B test with sample-size and power considerations and analyzed its results with an appropriate hypothesis test, reporting a confidence interval rather than a single point estimate.",
              "Applied Type I/Type II error and multiple-comparisons reasoning to avoid overstating the result, and distinguished correlation from causation using simple linear regression on the same data.",
            ],
          },
          {
            left: "Business Outcome Forecasting",
            right: "2026",
            sub: "Advanced Data Science — forecasting and model-explanation project",
            bullets: [
              "Forecasted a business outcome using exponential smoothing, ARIMA, Prophet, and an ML-based forecasting approach, evaluating all of them against naive baselines.",
              "Explained the chosen forecasting model's drivers with feature/permutation importance and SHAP, applying the same explainability practices used on the capstone.",
            ],
          },
          {
            left: "AI-Powered Data Tool (RAG)",
            right: "2026",
            sub: "AI & Generative AI Fundamentals for Data Scientists — applied project",
            bullets: [
              "Built a retrieval-augmented generation pipeline — generating and comparing embeddings, storing them in a vector database for semantic search, and calling an LLM API from Python to answer questions grounded in a specific dataset.",
              "Evaluated the tool for hallucination and reliability limits, and weighed cost, latency, and data-privacy tradeoffs of the approach.",
            ],
          },
          {
            left: "Cloud Model Training & Deployment (Azure & AWS)",
            right: "2026",
            sub: "Azure Data Science and AWS Data Science — cloud ML projects",
            bullets: [
              "Trained, deployed, and monitored a model on Azure Machine Learning — workspace, compute, MLflow experiment tracking, and a real-time or batch endpoint with data-drift monitoring.",
              "Trained, deployed, and monitored a second model on AWS SageMaker — S3-backed data, a SageMaker training job, and a real-time or batch/serverless endpoint with Model Monitor drift checks.",
            ],
          },
          {
            left: "ML Lifecycle Automation",
            right: "2026",
            sub: "MLOps for Data Scientists — capstone project",
            bullets: [
              "Automated a model's full lifecycle end to end: data and model versioning, MLflow experiment tracking and a model registry, a packaged prediction API, CI/CD with automated tests and GitHub Actions, and a drift-and-retraining monitoring plan — the same lifecycle practiced in depth on the Harvest Table capstone.",
            ],
          },
        ],
      },
      {
        heading: "GitHub Portfolio",
        entries: [
          {
            left: "github.com/johndoe-biexample/harvest-table-churn",
            right: "2026",
            sub: "Public portfolio repository for the capstone project",
            bullets: [
              "Initialized a Git repository for the churn project with a .gitignore that keeps raw data and trained-model binaries out of version control, and installed nbstripout so notebook diffs show real code and metric changes instead of execution-counter noise.",
              "Branched each modeling experiment, committing a settings change together with the metric it produced so the diff shows what changed and what it did to the score, instead of leaving that link undocumented.",
              "Wrote a README following a problem / approach / results / limits / how-to-run structure, laid the repo out into clear data/sql/notebooks/src/reports folders, and ran a pre-publish checklist for secrets, data rights, and synthetic-data disclosure before making the repository public.",
            ],
          },
        ],
      },
      {
        heading: "Education",
        entries: [{ left: "High School Diploma — Washington High School", right: "Atlanta, GA · 2020" }],
      },
    ],
  },
};
