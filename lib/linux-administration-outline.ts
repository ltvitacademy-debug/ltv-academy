// The Linux Administration course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Step 2 of the DevOps Engineer path. No prior Linux assumed.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/linux-administration/
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

export const LINUX_ADMINISTRATION_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Linux Foundations",
    lessons: [
      L(1, "what-linux-is-and-why-devops-uses-it", "What Linux Is & Why DevOps Uses It"),
      L(2, "distributions-and-choosing-one", "Distributions & Choosing One"),
      L(3, "setting-up-a-linux-lab", "Setting Up a Linux Lab"),
      L(4, "the-filesystem-hierarchy", "The Filesystem Hierarchy"),
      L(5, "navigating-with-the-shell", "Navigating With the Shell"),
    ],
  },
  {
    n: 2,
    title: "Files & Directories",
    lessons: [
      L(6, "creating-copying-and-moving-files", "Creating, Copying & Moving Files"),
      L(7, "viewing-and-searching-files", "Viewing & Searching Files"),
      L(8, "links-archives-and-compression", "Links, Archives & Compression"),
      L(9, "text-editors-nano-and-vim", "Text Editors: nano & vim"),
    ],
  },
  {
    n: 3,
    title: "Permissions, Users & Groups",
    lessons: [
      L(10, "permissions-and-ownership", "Permissions & Ownership"),
      L(11, "users-and-groups", "Users & Groups"),
      L(12, "sudo-and-privilege", "sudo & Privilege"),
      L(13, "special-permissions-and-acls", "Special Permissions & ACLs"),
    ],
  },
  {
    n: 4,
    title: "Shell Power Tools",
    lessons: [
      L(14, "pipes-and-redirection", "Pipes & Redirection"),
      L(15, "grep-sed-and-awk", "grep, sed & awk"),
      L(16, "find-and-xargs", "find & xargs"),
      L(17, "environment-variables-and-path", "Environment Variables & PATH"),
    ],
  },
  {
    n: 5,
    title: "Processes & Services",
    lessons: [
      L(18, "processes-and-signals", "Processes & Signals"),
      L(19, "systemd-and-services", "systemd & Services"),
      L(20, "scheduling-with-cron-and-systemd-timers", "Scheduling With cron & systemd Timers"),
      L(21, "logs-and-journalctl", "Logs & journalctl"),
      L(22, "resource-monitoring", "Resource Monitoring"),
    ],
  },
  {
    n: 6,
    title: "Packages, Storage & SSH",
    lessons: [
      L(23, "package-managers-apt-and-dnf", "Package Managers: apt & dnf"),
      L(24, "disks-partitions-and-mounts", "Disks, Partitions & Mounts"),
      L(25, "ssh-and-key-based-access", "SSH & Key-Based Access"),
      L(26, "securing-a-linux-server", "Securing a Linux Server"),
    ],
  },
  {
    n: 7,
    title: "Bash Scripting",
    lessons: [
      L(27, "script-basics", "Script Basics"),
      L(28, "variables-and-conditionals", "Variables & Conditionals"),
      L(29, "loops-and-functions", "Loops & Functions"),
      L(30, "arguments-and-input", "Arguments & Input"),
      L(31, "error-handling-and-debugging", "Error Handling & Debugging"),
    ],
  },
  {
    n: 8,
    title: "Capstone",
    lessons: [
      L(32, "capstone-kickoff-set-up-and-harden-a-linux-server", "Capstone Kickoff: Set Up and Harden a Linux Server"),
      L(33, "capstone-build-it", "Capstone: Build It"),
      L(34, "capstone-wrap-up-and-portfolio-presentation", "Capstone: Wrap-Up & Portfolio Presentation"),
    ],
  },
];
