// The Python & Bash Automation course outline. All 24 lessons have real
// guide.md/script.md content (the header here previously, incorrectly,
// called this "framework only" — fixed 2026-10-17). Lessons without a
// contentDir render as "in production". Step 4 of the DevOps Engineer
// path (Git & GitHub is step 3, reused from the software-engineering
// course). Automation-focused Python, distinct from Python for Data
// Science and Python for AI Engineering.

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
      L(1, "robust-bash-scripts", "Robust Bash Scripts", { contentDir: "ch01/01-robust-bash-scripts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792447057/ltv-python-and-bash-automation/robust-bash-scripts.mp4", durationLabel: "2 min 15 s" }),
      L(2, "functions-and-reusable-libraries", "Functions & Reusable Libraries", { contentDir: "ch01/02-functions-and-reusable-libraries", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792447466/ltv-python-and-bash-automation/functions-and-reusable-libraries.mp4", durationLabel: "1 min 57 s" }),
      L(3, "text-processing-pipelines", "Text Processing Pipelines", { contentDir: "ch01/03-text-processing-pipelines", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792447625/ltv-python-and-bash-automation/text-processing-pipelines.mp4", durationLabel: "1 min 59 s" }),
      L(4, "scheduling-and-running-scripts", "Scheduling & Running Scripts", { contentDir: "ch01/04-scheduling-and-running-scripts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792447779/ltv-python-and-bash-automation/scheduling-and-running-scripts.mp4", durationLabel: "2 min 3 s" }),
    ],
  },
  {
    n: 2,
    title: "Python for Automation",
    lessons: [
      L(5, "python-basics-for-sysadmins", "Python Basics for Sysadmins", { contentDir: "ch02/05-python-basics-for-sysadmins", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792447927/ltv-python-and-bash-automation/python-basics-for-sysadmins.mp4", durationLabel: "2 min 1 s" }),
      L(6, "working-with-files-and-the-os", "Working With Files & the OS", { contentDir: "ch02/06-working-with-files-and-the-os", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792448071/ltv-python-and-bash-automation/working-with-files-and-the-os.mp4", durationLabel: "2 min 2 s" }),
      L(7, "running-commands-with-subprocess", "Running Commands With subprocess", { contentDir: "ch02/07-running-commands-with-subprocess", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792448204/ltv-python-and-bash-automation/running-commands-with-subprocess.mp4", durationLabel: "2 min 2 s" }),
      L(8, "argument-parsing-and-cli-tools", "Argument Parsing & CLI Tools", { contentDir: "ch02/08-argument-parsing-and-cli-tools", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792448345/ltv-python-and-bash-automation/argument-parsing-and-cli-tools.mp4", durationLabel: "1 min 59 s" }),
      L(9, "logging-and-error-handling", "Logging & Error Handling", { contentDir: "ch02/09-logging-and-error-handling", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792448490/ltv-python-and-bash-automation/logging-and-error-handling.mp4", durationLabel: "1 min 59 s" }),
    ],
  },
  {
    n: 3,
    title: "Data Formats & Configuration",
    lessons: [
      L(10, "json-in-python", "JSON in Python", { contentDir: "ch03/10-json-in-python", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792448620/ltv-python-and-bash-automation/json-in-python.mp4", durationLabel: "2 min 0 s" }),
      L(11, "yaml-and-configuration-files", "YAML & Configuration Files", { contentDir: "ch03/11-yaml-and-configuration-files", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792448736/ltv-python-and-bash-automation/yaml-and-configuration-files.mp4", durationLabel: "2 min 3 s" }),
      L(12, "environment-variables-and-secrets", "Environment Variables & Secrets", { contentDir: "ch03/12-environment-variables-and-secrets", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792448872/ltv-python-and-bash-automation/environment-variables-and-secrets.mp4", durationLabel: "2 min 19 s" }),
      L(13, "templating-with-jinja2", "Templating With Jinja2", { contentDir: "ch03/13-templating-with-jinja2", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792449002/ltv-python-and-bash-automation/templating-with-jinja2.mp4", durationLabel: "1 min 55 s" }),
    ],
  },
  {
    n: 4,
    title: "APIs & Cloud Automation",
    lessons: [
      L(14, "calling-rest-apis", "Calling REST APIs", { contentDir: "ch04/14-calling-rest-apis", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792449118/ltv-python-and-bash-automation/calling-rest-apis.mp4", durationLabel: "1 min 58 s" }),
      L(15, "authentication-and-tokens", "Authentication & Tokens", { contentDir: "ch04/15-authentication-and-tokens", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792449226/ltv-python-and-bash-automation/authentication-and-tokens.mp4", durationLabel: "1 min 55 s" }),
      L(16, "automating-cloud-resources-with-sdks", "Automating Cloud Resources With SDKs", { contentDir: "ch04/16-automating-cloud-resources-with-sdks", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792449335/ltv-python-and-bash-automation/automating-cloud-resources-with-sdks.mp4", durationLabel: "1 min 59 s" }),
      L(17, "webhooks-and-event-driven-scripts", "Webhooks & Event-Driven Scripts", { contentDir: "ch04/17-webhooks-and-event-driven-scripts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792449448/ltv-python-and-bash-automation/webhooks-and-event-driven-scripts.mp4", durationLabel: "1 min 55 s" }),
    ],
  },
  {
    n: 5,
    title: "Real Automation Tasks",
    lessons: [
      L(18, "automating-user-and-server-setup", "Automating User & Server Setup", { contentDir: "ch05/18-automating-user-and-server-setup", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792449575/ltv-python-and-bash-automation/automating-user-and-server-setup.mp4", durationLabel: "2 min 4 s" }),
      L(19, "log-parsing-and-reporting", "Log Parsing & Reporting", { contentDir: "ch05/19-log-parsing-and-reporting", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792449677/ltv-python-and-bash-automation/log-parsing-and-reporting.mp4", durationLabel: "1 min 46 s" }),
      L(20, "backups-and-cleanup-jobs", "Backups & Cleanup Jobs", { contentDir: "ch05/20-backups-and-cleanup-jobs", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792449782/ltv-python-and-bash-automation/backups-and-cleanup-jobs.mp4", durationLabel: "1 min 48 s" }),
      L(21, "health-checks-and-alerts", "Health Checks & Alerts", { contentDir: "ch05/21-health-checks-and-alerts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792449888/ltv-python-and-bash-automation/health-checks-and-alerts.mp4", durationLabel: "1 min 50 s" }),
    ],
  },
  {
    n: 6,
    title: "Capstone",
    lessons: [
      L(22, "capstone-kickoff-automate-a-repetitive-admin-workflow", "Capstone Kickoff: Automate a Repetitive Admin Workflow", { contentDir: "ch06/22-capstone-kickoff-automate-a-repetitive-admin-workflow", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792449976/ltv-python-and-bash-automation/capstone-kickoff-automate-a-repetitive-admin-workflow.mp4", durationLabel: "1 min 36 s" }),
      L(23, "capstone-build-it", "Capstone: Build It", { contentDir: "ch06/23-capstone-build-it", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792450153/ltv-python-and-bash-automation/capstone-build-it.mp4", durationLabel: "1 min 47 s" }),
      L(24, "capstone-wrap-up-and-portfolio-presentation", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch06/24-capstone-wrap-up-and-portfolio-presentation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792450328/ltv-python-and-bash-automation/capstone-wrap-up-and-portfolio-presentation.mp4", durationLabel: "1 min 32 s" }),
    ],
  },
];
