// The full PowerShell Fundamentals course outline. Only lessons with a
// contentDir + videoUrl are playable; everything else renders as "in
// production". Aimed at DBAs and data engineers who need to read, modify,
// and use automation scripts — not become PowerShell developers.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/powershell/
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

export const POWERSHELL_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "PowerShell Basics",
    lessons: [
      L(1, "why-powershell-for-dbas", "What Is PowerShell & Why for DBAs and Admins?", {
        contentDir: "ch01/01-why-powershell-for-dbas",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792162904/ltv-powershell/why-powershell-for-dbas.mp4",
        durationLabel: "1 min 9 s",
      }),
      L(2, "the-console-ise-and-vs-code", "The Console, ISE & VS Code", {
        contentDir: "ch01/02-the-console-ise-and-vs-code",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792162952/ltv-powershell/the-console-ise-and-vs-code.mp4",
        durationLabel: "1 min 14 s",
      }),
      L(3, "cmdlets-and-syntax", "Cmdlets & Syntax", {
        contentDir: "ch01/03-cmdlets-and-syntax",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792163002/ltv-powershell/cmdlets-and-syntax.mp4",
        durationLabel: "1 min 23 s",
      }),
      L(4, "getting-help", "Getting Help: Get-Help & Get-Command", {
        contentDir: "ch01/04-getting-help",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792163047/ltv-powershell/getting-help.mp4",
        durationLabel: "1 min 9 s",
      }),
      L(5, "variables-and-data-types", "Variables & Data Types", {
        contentDir: "ch01/05-variables-and-data-types",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792163099/ltv-powershell/variables-and-data-types.mp4",
        durationLabel: "1 min 27 s",
      }),
    ],
  },
  {
    n: 2,
    title: "Working With Objects & Pipelines",
    lessons: [
      L(6, "the-pipeline", "The Pipeline", {
        contentDir: "ch02/06-the-pipeline",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792163152/ltv-powershell/the-pipeline.mp4",
        durationLabel: "1 min 31 s",
      }),
      L(7, "objects-vs-text", "Objects vs. Text", {
        contentDir: "ch02/07-objects-vs-text",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792163212/ltv-powershell/objects-vs-text.mp4",
        durationLabel: "1 min 44 s",
      }),
      L(8, "where-select-foreach-object", "Where-Object, Select-Object & ForEach-Object", {
        contentDir: "ch02/08-where-select-foreach-object",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792163258/ltv-powershell/where-select-foreach-object.mp4",
        durationLabel: "1 min 21 s",
      }),
      L(9, "sorting-and-filtering", "Sorting & Filtering", {
        contentDir: "ch02/09-sorting-and-filtering",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792163315/ltv-powershell/sorting-and-filtering.mp4",
        durationLabel: "1 min 42 s",
      }),
    ],
  },
  {
    n: 3,
    title: "Scripts & Control Flow",
    lessons: [
      L(10, "writing-a-ps1-script", "Writing a .ps1 Script", {
        contentDir: "ch03/10-writing-a-ps1-script",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792163369/ltv-powershell/writing-a-ps1-script.mp4",
        durationLabel: "1 min 29 s",
      }),
      L(11, "if-else-and-switch", "if/else & switch", {
        contentDir: "ch03/11-if-else-and-switch",
        videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792163423/ltv-powershell/if-else-and-switch.mp4",
        durationLabel: "1 min 32 s",
      }),
      L(12, "loops", "Loops: foreach, while & for", {
        contentDir: "ch03/12-loops",
        // videoUrl/durationLabel pending
      }),
      L(13, "functions", "Functions", {
        contentDir: "ch03/13-functions",
        // videoUrl/durationLabel pending
      }),
    ],
  },
  {
    n: 4,
    title: "PowerShell for Azure & SQL",
    lessons: [
      L(14, "azure-powershell-module-basics", "Azure PowerShell Module Basics", {
        contentDir: "ch04/14-azure-powershell-module-basics",
        // videoUrl/durationLabel pending
      }),
      L(15, "connecting-to-azure", "Connecting to Azure From PowerShell", {
        contentDir: "ch04/15-connecting-to-azure",
        // videoUrl/durationLabel pending
      }),
      L(16, "running-t-sql-from-powershell", "Running T-SQL From PowerShell: An Intro to dbatools", {
        contentDir: "ch04/16-running-t-sql-from-powershell",
        // videoUrl/durationLabel pending
      }),
      L(17, "automating-a-routine-admin-task", "Automating a Routine Admin Task", {
        contentDir: "ch04/17-automating-a-routine-admin-task",
        // videoUrl/durationLabel pending
      }),
      L(18, "reading-and-modifying-an-existing-script", "Reading & Modifying an Existing Script", {
        contentDir: "ch04/18-reading-and-modifying-an-existing-script",
        // videoUrl/durationLabel pending
      }),
    ],
  },
];
