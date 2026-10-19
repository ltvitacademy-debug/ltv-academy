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
      L(1, "the-capstone-brief-and-dataset", "The Capstone Brief & Dataset", { contentDir: "ch01/01-the-capstone-brief-and-dataset", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792408347/ltv-data-science-capstone/the-capstone-brief-and-dataset.mp4", durationLabel: "2 min 22 s" }),
      L(2, "scoping-the-business-problem", "Scoping the Business Problem", { contentDir: "ch01/02-scoping-the-business-problem", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792408598/ltv-data-science-capstone/scoping-the-business-problem.mp4", durationLabel: "2 min 6 s" }),
      L(3, "success-metrics-and-project-plan", "Success Metrics & Project Plan", { contentDir: "ch01/03-success-metrics-and-project-plan", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792408876/ltv-data-science-capstone/success-metrics-and-project-plan.mp4", durationLabel: "2 min 14 s" }),
    ],
  },
  {
    n: 2,
    title: "Phase 1: Data & Exploration",
    lessons: [
      L(4, "extracting-data-with-sql", "Extracting Data With SQL", { contentDir: "ch02/04-extracting-data-with-sql", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792409138/ltv-data-science-capstone/extracting-data-with-sql.mp4", durationLabel: "2 min 13 s" }),
      L(5, "cleaning-and-preparing-in-python", "Cleaning & Preparing in Python", { contentDir: "ch02/05-cleaning-and-preparing-in-python", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792409475/ltv-data-science-capstone/cleaning-and-preparing-in-python.mp4", durationLabel: "2 min 11 s" }),
      L(6, "exploratory-data-analysis", "Exploratory Data Analysis", { contentDir: "ch02/06-exploratory-data-analysis", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792409700/ltv-data-science-capstone/exploratory-data-analysis.mp4", durationLabel: "2 min 9 s" }),
      L(7, "findings-so-far-a-checkpoint-review", "Findings So Far: A Checkpoint Review", { contentDir: "ch02/07-findings-so-far-a-checkpoint-review", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792409934/ltv-data-science-capstone/findings-so-far-a-checkpoint-review.mp4", durationLabel: "2 min 6 s" }),
    ],
  },
  {
    n: 3,
    title: "Phase 2: Modeling",
    lessons: [
      L(8, "feature-engineering-and-baselines", "Feature Engineering & Baselines", { contentDir: "ch03/08-feature-engineering-and-baselines", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792410143/ltv-data-science-capstone/feature-engineering-and-baselines.mp4", durationLabel: "2 min 0 s" }),
      L(9, "training-and-comparing-models", "Training & Comparing Models", { contentDir: "ch03/09-training-and-comparing-models", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792410358/ltv-data-science-capstone/training-and-comparing-models.mp4", durationLabel: "2 min 1 s" }),
      L(10, "tuning-and-evaluation", "Tuning & Evaluation", { contentDir: "ch03/10-tuning-and-evaluation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792410591/ltv-data-science-capstone/tuning-and-evaluation.mp4", durationLabel: "2 min 13 s" }),
      L(11, "explaining-the-model", "Explaining the Model", { contentDir: "ch03/11-explaining-the-model", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792410834/ltv-data-science-capstone/explaining-the-model.mp4", durationLabel: "2 min 12 s" }),
    ],
  },
  {
    n: 4,
    title: "Phase 3: Deployment & Presentation",
    lessons: [
      L(12, "packaging-and-deploying-the-model", "Packaging & Deploying the Model", { contentDir: "ch04/12-packaging-and-deploying-the-model", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792411064/ltv-data-science-capstone/packaging-and-deploying-the-model.mp4", durationLabel: "2 min 11 s" }),
      L(13, "monitoring-plan", "Monitoring Plan", { contentDir: "ch04/13-monitoring-plan", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792411305/ltv-data-science-capstone/monitoring-plan.mp4", durationLabel: "2 min 14 s" }),
      L(14, "building-the-stakeholder-presentation", "Building the Stakeholder Presentation", { contentDir: "ch04/14-building-the-stakeholder-presentation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792411549/ltv-data-science-capstone/building-the-stakeholder-presentation.mp4", durationLabel: "2 min 10 s" }),
      L(15, "presenting-and-defending-your-work", "Presenting & Defending Your Work", { contentDir: "ch04/15-presenting-and-defending-your-work", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792411763/ltv-data-science-capstone/presenting-and-defending-your-work.mp4", durationLabel: "2 min 2 s" }),
    ],
  },
  {
    n: 5,
    title: "Career Preparation",
    lessons: [
      L(16, "resume-and-linkedin-for-data-scientists", "Resume & LinkedIn for Data Scientists", { contentDir: "ch05/16-resume-and-linkedin-for-data-scientists", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792411971/ltv-data-science-capstone/resume-and-linkedin-for-data-scientists.mp4", durationLabel: "1 min 55 s" }),
      L(17, "building-a-github-portfolio", "Building a GitHub Portfolio", { contentDir: "ch05/17-building-a-github-portfolio", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792412172/ltv-data-science-capstone/building-a-github-portfolio.mp4", durationLabel: "1 min 45 s" }),
      L(18, "the-data-science-interview-landscape", "The Data Science Interview Landscape", { contentDir: "ch05/18-the-data-science-interview-landscape", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792412409/ltv-data-science-capstone/the-data-science-interview-landscape.mp4", durationLabel: "2 min 9 s" }),
      L(19, "statistics-and-machine-learning-interview-questions", "Statistics & Machine Learning Interview Questions", { contentDir: "ch05/19-statistics-and-machine-learning-interview-questions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792412651/ltv-data-science-capstone/statistics-and-machine-learning-interview-questions.mp4", durationLabel: "2 min 23 s" }),
      L(20, "sql-and-coding-interview-practice", "SQL & Coding Interview Practice", { contentDir: "ch05/20-sql-and-coding-interview-practice", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792412904/ltv-data-science-capstone/sql-and-coding-interview-practice.mp4", durationLabel: "2 min 6 s" }),
      L(21, "case-study-and-take-home-interviews", "Case Study & Take-Home Interviews", { contentDir: "ch05/21-case-study-and-take-home-interviews", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792413134/ltv-data-science-capstone/case-study-and-take-home-interviews.mp4", durationLabel: "2 min 10 s" }),
      L(22, "behavioral-interviews-and-communication", "Behavioral Interviews & Communication", { contentDir: "ch05/22-behavioral-interviews-and-communication", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792413362/ltv-data-science-capstone/behavioral-interviews-and-communication.mp4", durationLabel: "2 min 2 s" }),
      L(23, "salary-and-offer-basics", "Salary & Offer Basics", { contentDir: "ch05/23-salary-and-offer-basics", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792413619/ltv-data-science-capstone/salary-and-offer-basics.mp4", durationLabel: "2 min 21 s" }),
    ],
  },
];
