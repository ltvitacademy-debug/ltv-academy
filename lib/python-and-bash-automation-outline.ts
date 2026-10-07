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
      L(1, "robust-bash-scripts", "Robust Bash Scripts", { contentDir: "ch01/01-robust-bash-scripts" }),
      L(2, "functions-and-reusable-libraries", "Functions & Reusable Libraries", { contentDir: "ch01/02-functions-and-reusable-libraries" }),
      L(3, "text-processing-pipelines", "Text Processing Pipelines", { contentDir: "ch01/03-text-processing-pipelines" }),
      L(4, "scheduling-and-running-scripts", "Scheduling & Running Scripts", { contentDir: "ch01/04-scheduling-and-running-scripts" }),
    ],
  },
  {
    n: 2,
    title: "Python for Automation",
    lessons: [
      L(5, "python-basics-for-sysadmins", "Python Basics for Sysadmins", { contentDir: "ch02/05-python-basics-for-sysadmins" }),
      L(6, "working-with-files-and-the-os", "Working With Files & the OS", { contentDir: "ch02/06-working-with-files-and-the-os" }),
      L(7, "running-commands-with-subprocess", "Running Commands With subprocess", { contentDir: "ch02/07-running-commands-with-subprocess" }),
      L(8, "argument-parsing-and-cli-tools", "Argument Parsing & CLI Tools", { contentDir: "ch02/08-argument-parsing-and-cli-tools" }),
      L(9, "logging-and-error-handling", "Logging & Error Handling", { contentDir: "ch02/09-logging-and-error-handling" }),
    ],
  },
  {
    n: 3,
    title: "Data Formats & Configuration",
    lessons: [
      L(10, "json-in-python", "JSON in Python", { contentDir: "ch03/10-json-in-python" }),
      L(11, "yaml-and-configuration-files", "YAML & Configuration Files", { contentDir: "ch03/11-yaml-and-configuration-files" }),
      L(12, "environment-variables-and-secrets", "Environment Variables & Secrets", { contentDir: "ch03/12-environment-variables-and-secrets" }),
      L(13, "templating-with-jinja2", "Templating With Jinja2", { contentDir: "ch03/13-templating-with-jinja2" }),
    ],
  },
  {
    n: 4,
    title: "APIs & Cloud Automation",
    lessons: [
      L(14, "calling-rest-apis", "Calling REST APIs", { contentDir: "ch04/14-calling-rest-apis" }),
      L(15, "authentication-and-tokens", "Authentication & Tokens", { contentDir: "ch04/15-authentication-and-tokens" }),
      L(16, "automating-cloud-resources-with-sdks", "Automating Cloud Resources With SDKs", { contentDir: "ch04/16-automating-cloud-resources-with-sdks" }),
      L(17, "webhooks-and-event-driven-scripts", "Webhooks & Event-Driven Scripts", { contentDir: "ch04/17-webhooks-and-event-driven-scripts" }),
    ],
  },
  {
    n: 5,
    title: "Real Automation Tasks",
    lessons: [
      L(18, "automating-user-and-server-setup", "Automating User & Server Setup", { contentDir: "ch05/18-automating-user-and-server-setup" }),
      L(19, "log-parsing-and-reporting", "Log Parsing & Reporting", { contentDir: "ch05/19-log-parsing-and-reporting" }),
      L(20, "backups-and-cleanup-jobs", "Backups & Cleanup Jobs", { contentDir: "ch05/20-backups-and-cleanup-jobs" }),
      L(21, "health-checks-and-alerts", "Health Checks & Alerts", { contentDir: "ch05/21-health-checks-and-alerts" }),
    ],
  },
  {
    n: 6,
    title: "Capstone",
    lessons: [
      L(22, "capstone-kickoff-automate-a-repetitive-admin-workflow", "Capstone Kickoff: Automate a Repetitive Admin Workflow", { contentDir: "ch06/22-capstone-kickoff-automate-a-repetitive-admin-workflow" }),
      L(23, "capstone-build-it", "Capstone: Build It", { contentDir: "ch06/23-capstone-build-it" }),
      L(24, "capstone-wrap-up-and-portfolio-presentation", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch06/24-capstone-wrap-up-and-portfolio-presentation" }),
    ],
  },
];
