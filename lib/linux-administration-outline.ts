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
      L(1, "what-linux-is-and-why-devops-uses-it", "What Linux Is & Why DevOps Uses It", { contentDir: "ch01/01-what-linux-is-and-why-devops-uses-it" }),
      L(2, "distributions-and-choosing-one", "Distributions & Choosing One", { contentDir: "ch01/02-distributions-and-choosing-one" }),
      L(3, "setting-up-a-linux-lab", "Setting Up a Linux Lab", { contentDir: "ch01/03-setting-up-a-linux-lab" }),
      L(4, "the-filesystem-hierarchy", "The Filesystem Hierarchy", { contentDir: "ch01/04-the-filesystem-hierarchy" }),
      L(5, "navigating-with-the-shell", "Navigating With the Shell", { contentDir: "ch01/05-navigating-with-the-shell" }),
    ],
  },
  {
    n: 2,
    title: "Files & Directories",
    lessons: [
      L(6, "creating-copying-and-moving-files", "Creating, Copying & Moving Files", { contentDir: "ch02/06-creating-copying-and-moving-files" }),
      L(7, "viewing-and-searching-files", "Viewing & Searching Files", { contentDir: "ch02/07-viewing-and-searching-files" }),
      L(8, "links-archives-and-compression", "Links, Archives & Compression", { contentDir: "ch02/08-links-archives-and-compression" }),
      L(9, "text-editors-nano-and-vim", "Text Editors: nano & vim", { contentDir: "ch02/09-text-editors-nano-and-vim" }),
    ],
  },
  {
    n: 3,
    title: "Permissions, Users & Groups",
    lessons: [
      L(10, "permissions-and-ownership", "Permissions & Ownership", { contentDir: "ch03/10-permissions-and-ownership" }),
      L(11, "users-and-groups", "Users & Groups", { contentDir: "ch03/11-users-and-groups" }),
      L(12, "sudo-and-privilege", "sudo & Privilege", { contentDir: "ch03/12-sudo-and-privilege" }),
      L(13, "special-permissions-and-acls", "Special Permissions & ACLs", { contentDir: "ch03/13-special-permissions-and-acls" }),
    ],
  },
  {
    n: 4,
    title: "Shell Power Tools",
    lessons: [
      L(14, "pipes-and-redirection", "Pipes & Redirection", { contentDir: "ch04/14-pipes-and-redirection" }),
      L(15, "grep-sed-and-awk", "grep, sed & awk", { contentDir: "ch04/15-grep-sed-and-awk" }),
      L(16, "find-and-xargs", "find & xargs", { contentDir: "ch04/16-find-and-xargs" }),
      L(17, "environment-variables-and-path", "Environment Variables & PATH", { contentDir: "ch04/17-environment-variables-and-path" }),
    ],
  },
  {
    n: 5,
    title: "Processes & Services",
    lessons: [
      L(18, "processes-and-signals", "Processes & Signals", { contentDir: "ch05/18-processes-and-signals" }),
      L(19, "systemd-and-services", "systemd & Services", { contentDir: "ch05/19-systemd-and-services" }),
      L(20, "scheduling-with-cron-and-systemd-timers", "Scheduling With cron & systemd Timers", { contentDir: "ch05/20-scheduling-with-cron-and-systemd-timers" }),
      L(21, "logs-and-journalctl", "Logs & journalctl", { contentDir: "ch05/21-logs-and-journalctl" }),
      L(22, "resource-monitoring", "Resource Monitoring", { contentDir: "ch05/22-resource-monitoring" }),
    ],
  },
  {
    n: 6,
    title: "Packages, Storage & SSH",
    lessons: [
      L(23, "package-managers-apt-and-dnf", "Package Managers: apt & dnf", { contentDir: "ch06/23-package-managers-apt-and-dnf" }),
      L(24, "disks-partitions-and-mounts", "Disks, Partitions & Mounts", { contentDir: "ch06/24-disks-partitions-and-mounts" }),
      L(25, "ssh-and-key-based-access", "SSH & Key-Based Access", { contentDir: "ch06/25-ssh-and-key-based-access" }),
      L(26, "securing-a-linux-server", "Securing a Linux Server", { contentDir: "ch06/26-securing-a-linux-server" }),
    ],
  },
  {
    n: 7,
    title: "Bash Scripting",
    lessons: [
      L(27, "script-basics", "Script Basics", { contentDir: "ch07/27-script-basics" }),
      L(28, "variables-and-conditionals", "Variables & Conditionals", { contentDir: "ch07/28-variables-and-conditionals" }),
      L(29, "loops-and-functions", "Loops & Functions", { contentDir: "ch07/29-loops-and-functions" }),
      L(30, "arguments-and-input", "Arguments & Input", { contentDir: "ch07/30-arguments-and-input" }),
      L(31, "error-handling-and-debugging", "Error Handling & Debugging", { contentDir: "ch07/31-error-handling-and-debugging" }),
    ],
  },
  {
    n: 8,
    title: "Capstone",
    lessons: [
      L(32, "capstone-kickoff-set-up-and-harden-a-linux-server", "Capstone Kickoff: Set Up and Harden a Linux Server", { contentDir: "ch08/32-capstone-kickoff-set-up-and-harden-a-linux-server" }),
      L(33, "capstone-build-it", "Capstone: Build It", { contentDir: "ch08/33-capstone-build-it" }),
      L(34, "capstone-wrap-up-and-portfolio-presentation", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch08/34-capstone-wrap-up-and-portfolio-presentation" }),
    ],
  },
];
