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
      L(1, "the-capstone-brief-and-dataset", "The Capstone Brief & Dataset", { contentDir: "ch01/01-the-capstone-brief-and-dataset" }),
      L(2, "scoping-the-business-problem", "Scoping the Business Problem", { contentDir: "ch01/02-scoping-the-business-problem" }),
      L(3, "success-metrics-and-project-plan", "Success Metrics & Project Plan", { contentDir: "ch01/03-success-metrics-and-project-plan" }),
    ],
  },
  {
    n: 2,
    title: "Phase 1: Data & Exploration",
    lessons: [
      L(4, "extracting-data-with-sql", "Extracting Data With SQL", { contentDir: "ch02/04-extracting-data-with-sql" }),
      L(5, "cleaning-and-preparing-in-python", "Cleaning & Preparing in Python", { contentDir: "ch02/05-cleaning-and-preparing-in-python" }),
      L(6, "exploratory-data-analysis", "Exploratory Data Analysis", { contentDir: "ch02/06-exploratory-data-analysis" }),
      L(7, "findings-so-far-a-checkpoint-review", "Findings So Far: A Checkpoint Review", { contentDir: "ch02/07-findings-so-far-a-checkpoint-review" }),
    ],
  },
  {
    n: 3,
    title: "Phase 2: Modeling",
    lessons: [
      L(8, "feature-engineering-and-baselines", "Feature Engineering & Baselines", { contentDir: "ch03/08-feature-engineering-and-baselines" }),
      L(9, "training-and-comparing-models", "Training & Comparing Models", { contentDir: "ch03/09-training-and-comparing-models" }),
      L(10, "tuning-and-evaluation", "Tuning & Evaluation", { contentDir: "ch03/10-tuning-and-evaluation" }),
      L(11, "explaining-the-model", "Explaining the Model", { contentDir: "ch03/11-explaining-the-model" }),
    ],
  },
  {
    n: 4,
    title: "Phase 3: Deployment & Presentation",
    lessons: [
      L(12, "packaging-and-deploying-the-model", "Packaging & Deploying the Model", { contentDir: "ch04/12-packaging-and-deploying-the-model" }),
      L(13, "monitoring-plan", "Monitoring Plan", { contentDir: "ch04/13-monitoring-plan" }),
      L(14, "building-the-stakeholder-presentation", "Building the Stakeholder Presentation", { contentDir: "ch04/14-building-the-stakeholder-presentation" }),
      L(15, "presenting-and-defending-your-work", "Presenting & Defending Your Work", { contentDir: "ch04/15-presenting-and-defending-your-work" }),
    ],
  },
  {
    n: 5,
    title: "Career Preparation",
    lessons: [
      L(16, "resume-and-linkedin-for-data-scientists", "Resume & LinkedIn for Data Scientists", { contentDir: "ch05/16-resume-and-linkedin-for-data-scientists" }),
      L(17, "building-a-github-portfolio", "Building a GitHub Portfolio", { contentDir: "ch05/17-building-a-github-portfolio" }),
      L(18, "the-data-science-interview-landscape", "The Data Science Interview Landscape", { contentDir: "ch05/18-the-data-science-interview-landscape" }),
      L(19, "statistics-and-machine-learning-interview-questions", "Statistics & Machine Learning Interview Questions", { contentDir: "ch05/19-statistics-and-machine-learning-interview-questions" }),
      L(20, "sql-and-coding-interview-practice", "SQL & Coding Interview Practice", { contentDir: "ch05/20-sql-and-coding-interview-practice" }),
      L(21, "case-study-and-take-home-interviews", "Case Study & Take-Home Interviews", { contentDir: "ch05/21-case-study-and-take-home-interviews" }),
      L(22, "behavioral-interviews-and-communication", "Behavioral Interviews & Communication", { contentDir: "ch05/22-behavioral-interviews-and-communication" }),
      L(23, "salary-and-offer-basics", "Salary & Offer Basics", { contentDir: "ch05/23-salary-and-offer-basics" }),
    ],
  },
];
