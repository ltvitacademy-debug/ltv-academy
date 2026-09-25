// The Data Science Capstone course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Step 12 of the Data Scientist path. Students receive a messy business dataset and go: Business Problem → SQL → Python → EDA → ML Model → Evaluation → Deployment → Presentation. Closes with resume, portfolio, and interview preparation.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/data-science-capstone/
  videoUrl?: string;
  durationLabel?: string;
};

export type ChapterMeta = { n: number; title: string; lessons: LessonMeta[] };

const L = (n: number, slug: string, title: string, extra?: Partial<LessonMeta>): LessonMeta => ({
  n,
  slug,
  title,
  ...extra,
});

export const DATA_SCIENCE_CAPSTONE_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Capstone Overview",
    lessons: [
      L(1, "the-capstone-brief-and-dataset", "The Capstone Brief & Dataset"),
      L(2, "scoping-the-business-problem", "Scoping the Business Problem"),
      L(3, "success-metrics-and-project-plan", "Success Metrics & Project Plan"),
    ],
  },
  {
    n: 2,
    title: "Phase 1: Data & Exploration",
    lessons: [
      L(4, "extracting-data-with-sql", "Extracting Data With SQL"),
      L(5, "cleaning-and-preparing-in-python", "Cleaning & Preparing in Python"),
      L(6, "exploratory-data-analysis", "Exploratory Data Analysis"),
      L(7, "findings-so-far-a-checkpoint-review", "Findings So Far: A Checkpoint Review"),
    ],
  },
  {
    n: 3,
    title: "Phase 2: Modeling",
    lessons: [
      L(8, "feature-engineering-and-baselines", "Feature Engineering & Baselines"),
      L(9, "training-and-comparing-models", "Training & Comparing Models"),
      L(10, "tuning-and-evaluation", "Tuning & Evaluation"),
      L(11, "explaining-the-model", "Explaining the Model"),
    ],
  },
  {
    n: 4,
    title: "Phase 3: Deployment & Presentation",
    lessons: [
      L(12, "packaging-and-deploying-the-model", "Packaging & Deploying the Model"),
      L(13, "monitoring-plan", "Monitoring Plan"),
      L(14, "building-the-stakeholder-presentation", "Building the Stakeholder Presentation"),
      L(15, "presenting-and-defending-your-work", "Presenting & Defending Your Work"),
    ],
  },
  {
    n: 5,
    title: "Career Preparation",
    lessons: [
      L(16, "resume-and-linkedin-for-data-scientists", "Resume & LinkedIn for Data Scientists"),
      L(17, "building-a-github-portfolio", "Building a GitHub Portfolio"),
      L(18, "the-data-science-interview-landscape", "The Data Science Interview Landscape"),
      L(19, "statistics-and-machine-learning-interview-questions", "Statistics & Machine Learning Interview Questions"),
      L(20, "sql-and-coding-interview-practice", "SQL & Coding Interview Practice"),
      L(21, "case-study-and-take-home-interviews", "Case Study & Take-Home Interviews"),
      L(22, "behavioral-interviews-and-communication", "Behavioral Interviews & Communication"),
      L(23, "salary-and-offer-basics", "Salary & Offer Basics"),
    ],
  },
];
