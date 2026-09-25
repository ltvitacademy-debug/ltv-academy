// The Python & Bash Automation course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Step 4 of the DevOps Engineer path (Git & GitHub is step 3, reused from the software-engineering course). Automation-focused Python, distinct from Python for Data Science and Python for AI Engineering.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/python-and-bash-automation/
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

export const PYTHON_AND_BASH_AUTOMATION_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Bash for Automation",
    lessons: [
      L(1, "robust-bash-scripts", "Robust Bash Scripts"),
      L(2, "functions-and-reusable-libraries", "Functions & Reusable Libraries"),
      L(3, "text-processing-pipelines", "Text Processing Pipelines"),
      L(4, "scheduling-and-running-scripts", "Scheduling & Running Scripts"),
    ],
  },
  {
    n: 2,
    title: "Python for Automation",
    lessons: [
      L(5, "python-basics-for-sysadmins", "Python Basics for Sysadmins"),
      L(6, "working-with-files-and-the-os", "Working With Files & the OS"),
      L(7, "running-commands-with-subprocess", "Running Commands With subprocess"),
      L(8, "argument-parsing-and-cli-tools", "Argument Parsing & CLI Tools"),
      L(9, "logging-and-error-handling", "Logging & Error Handling"),
    ],
  },
  {
    n: 3,
    title: "Data Formats & Configuration",
    lessons: [
      L(10, "json-in-python", "JSON in Python"),
      L(11, "yaml-and-configuration-files", "YAML & Configuration Files"),
      L(12, "environment-variables-and-secrets", "Environment Variables & Secrets"),
      L(13, "templating-with-jinja2", "Templating With Jinja2"),
    ],
  },
  {
    n: 4,
    title: "APIs & Cloud Automation",
    lessons: [
      L(14, "calling-rest-apis", "Calling REST APIs"),
      L(15, "authentication-and-tokens", "Authentication & Tokens"),
      L(16, "automating-cloud-resources-with-sdks", "Automating Cloud Resources With SDKs"),
      L(17, "webhooks-and-event-driven-scripts", "Webhooks & Event-Driven Scripts"),
    ],
  },
  {
    n: 5,
    title: "Real Automation Tasks",
    lessons: [
      L(18, "automating-user-and-server-setup", "Automating User & Server Setup"),
      L(19, "log-parsing-and-reporting", "Log Parsing & Reporting"),
      L(20, "backups-and-cleanup-jobs", "Backups & Cleanup Jobs"),
      L(21, "health-checks-and-alerts", "Health Checks & Alerts"),
    ],
  },
  {
    n: 6,
    title: "Capstone",
    lessons: [
      L(22, "capstone-kickoff-automate-a-repetitive-admin-workflow", "Capstone Kickoff: Automate a Repetitive Admin Workflow"),
      L(23, "capstone-build-it", "Capstone: Build It"),
      L(24, "capstone-wrap-up-and-portfolio-presentation", "Capstone: Wrap-Up & Portfolio Presentation"),
    ],
  },
];
