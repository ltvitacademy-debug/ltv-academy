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
      L(1, "why-powershell-for-dbas", "What Is PowerShell & Why for DBAs and Admins?"),
      L(2, "the-console-ise-and-vs-code", "The Console, ISE & VS Code"),
      L(3, "cmdlets-and-syntax", "Cmdlets & Syntax"),
      L(4, "getting-help", "Getting Help: Get-Help & Get-Command"),
      L(5, "variables-and-data-types", "Variables & Data Types"),
    ],
  },
  {
    n: 2,
    title: "Working With Objects & Pipelines",
    lessons: [
      L(6, "the-pipeline", "The Pipeline"),
      L(7, "objects-vs-text", "Objects vs. Text"),
      L(8, "where-select-foreach-object", "Where-Object, Select-Object & ForEach-Object"),
      L(9, "sorting-and-filtering", "Sorting & Filtering"),
    ],
  },
  {
    n: 3,
    title: "Scripts & Control Flow",
    lessons: [
      L(10, "writing-a-ps1-script", "Writing a .ps1 Script"),
      L(11, "if-else-and-switch", "if/else & switch"),
      L(12, "loops", "Loops: foreach, while & for"),
      L(13, "functions", "Functions"),
    ],
  },
  {
    n: 4,
    title: "PowerShell for Azure & SQL",
    lessons: [
      L(14, "azure-powershell-module-basics", "Azure PowerShell Module Basics"),
      L(15, "connecting-to-azure", "Connecting to Azure From PowerShell"),
      L(16, "running-t-sql-from-powershell", "Running T-SQL From PowerShell: An Intro to dbatools"),
      L(17, "automating-a-routine-admin-task", "Automating a Routine Admin Task"),
      L(18, "reading-and-modifying-an-existing-script", "Reading & Modifying an Existing Script"),
    ],
  },
];
