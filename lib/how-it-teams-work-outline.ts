// How IT Teams Work: a short, shared course on Agile, Waterfall, Scrum,
// Kanban, the SDLC, and software releases — linked into every career path's
// first stage, since every path's graduate needs this regardless of which
// specific technology they end up working in.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/how-it-teams-work/
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

export const HOW_IT_TEAMS_WORK_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "How Work Gets Done",
    lessons: [
      L(1, "agile-vs-waterfall", "Agile vs. Waterfall", {
        contentDir: "ch01/01-agile-vs-waterfall",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792139388/ltv-how-it-teams-work/agile-vs-waterfall.mp4",
        durationLabel: "2 min 21 s",
      }),
      L(2, "scrum-sprints-and-user-stories", "Scrum, Sprints & User Stories", {
        contentDir: "ch01/02-scrum-sprints-and-user-stories",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792139482/ltv-how-it-teams-work/scrum-sprints-and-user-stories.mp4",
        durationLabel: "2 min 19 s",
      }),
      L(3, "kanban-boards-and-work-management", "Kanban Boards & Work Management", {
        contentDir: "ch01/03-kanban-boards-and-work-management",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792139569/ltv-how-it-teams-work/kanban-boards-and-work-management.mp4",
        durationLabel: "2 min 31 s",
      }),
      L(4, "sdlc-dev-qa-uat-and-production", "SDLC: Dev, QA, UAT & Production", {
        contentDir: "ch01/04-sdlc-dev-qa-uat-and-production",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792139653/ltv-how-it-teams-work/sdlc-dev-qa-uat-and-production.mp4",
        durationLabel: "2 min 12 s",
      }),
      L(5, "version-control-with-git", "Version Control with Git", {
        contentDir: "ch01/05-version-control-with-git",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792139736/ltv-how-it-teams-work/version-control-with-git.mp4",
        durationLabel: "2 min 14 s",
      }),
      L(6, "releases-deployments-and-cicd", "Releases, Deployments & CI/CD", {
        contentDir: "ch01/06-releases-deployments-and-cicd",
      }),
    ],
  },
  {
    n: 2,
    title: "Capstone",
    lessons: [
      L(7, "real-world-it-project-simulation", "Real-World IT Project Simulation", {
        contentDir: "ch02/07-real-world-it-project-simulation",
      }),
    ],
  },
];
