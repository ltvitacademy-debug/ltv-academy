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
      L(1, "what-linux-is-and-why-devops-uses-it", "What Linux Is & Why DevOps Uses It", { contentDir: "ch01/01-what-linux-is-and-why-devops-uses-it", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792458810/ltv-linux-administration/what-linux-is-and-why-devops-uses-it.mp4", durationLabel: "2 min 0 s" }),
      L(2, "distributions-and-choosing-one", "Distributions & Choosing One", { contentDir: "ch01/02-distributions-and-choosing-one", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792458957/ltv-linux-administration/distributions-and-choosing-one.mp4", durationLabel: "2 min 8 s" }),
      L(3, "setting-up-a-linux-lab", "Setting Up a Linux Lab", { contentDir: "ch01/03-setting-up-a-linux-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792459053/ltv-linux-administration/setting-up-a-linux-lab.mp4", durationLabel: "2 min 3 s" }),
      L(4, "the-filesystem-hierarchy", "The Filesystem Hierarchy", { contentDir: "ch01/04-the-filesystem-hierarchy", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792459156/ltv-linux-administration/the-filesystem-hierarchy.mp4", durationLabel: "2 min 5 s" }),
      L(5, "navigating-with-the-shell", "Navigating With the Shell", { contentDir: "ch01/05-navigating-with-the-shell", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792459297/ltv-linux-administration/navigating-with-the-shell.mp4", durationLabel: "1 min 53 s" }),
    ],
  },
  {
    n: 2,
    title: "Files & Directories",
    lessons: [
      L(6, "creating-copying-and-moving-files", "Creating, Copying & Moving Files", { contentDir: "ch02/06-creating-copying-and-moving-files", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792459403/ltv-linux-administration/creating-copying-and-moving-files.mp4", durationLabel: "2 min 8 s" }),
      L(7, "viewing-and-searching-files", "Viewing & Searching Files", { contentDir: "ch02/07-viewing-and-searching-files", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792459475/ltv-linux-administration/viewing-and-searching-files.mp4", durationLabel: "2 min 2 s" }),
      L(8, "links-archives-and-compression", "Links, Archives & Compression", { contentDir: "ch02/08-links-archives-and-compression", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792459557/ltv-linux-administration/links-archives-and-compression.mp4", durationLabel: "2 min 2 s" }),
      L(9, "text-editors-nano-and-vim", "Text Editors: nano & vim", { contentDir: "ch02/09-text-editors-nano-and-vim", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792459636/ltv-linux-administration/text-editors-nano-and-vim.mp4", durationLabel: "2 min 16 s" }),
    ],
  },
  {
    n: 3,
    title: "Permissions, Users & Groups",
    lessons: [
      L(10, "permissions-and-ownership", "Permissions & Ownership", { contentDir: "ch03/10-permissions-and-ownership", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792459712/ltv-linux-administration/permissions-and-ownership.mp4", durationLabel: "2 min 11 s" }),
      L(11, "users-and-groups", "Users & Groups", { contentDir: "ch03/11-users-and-groups", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792459791/ltv-linux-administration/users-and-groups.mp4", durationLabel: "2 min 10 s" }),
      L(12, "sudo-and-privilege", "sudo & Privilege", { contentDir: "ch03/12-sudo-and-privilege", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792459864/ltv-linux-administration/sudo-and-privilege.mp4", durationLabel: "2 min 0 s" }),
      L(13, "special-permissions-and-acls", "Special Permissions & ACLs", { contentDir: "ch03/13-special-permissions-and-acls", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792459941/ltv-linux-administration/special-permissions-and-acls.mp4", durationLabel: "2 min 12 s" }),
    ],
  },
  {
    n: 4,
    title: "Shell Power Tools",
    lessons: [
      L(14, "pipes-and-redirection", "Pipes & Redirection", { contentDir: "ch04/14-pipes-and-redirection", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792460022/ltv-linux-administration/pipes-and-redirection.mp4", durationLabel: "2 min 13 s" }),
      L(15, "grep-sed-and-awk", "grep, sed & awk", { contentDir: "ch04/15-grep-sed-and-awk", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792460096/ltv-linux-administration/grep-sed-and-awk.mp4", durationLabel: "2 min 4 s" }),
      L(16, "find-and-xargs", "find & xargs", { contentDir: "ch04/16-find-and-xargs", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792460170/ltv-linux-administration/find-and-xargs.mp4", durationLabel: "2 min 1 s" }),
      L(17, "environment-variables-and-path", "Environment Variables & PATH", { contentDir: "ch04/17-environment-variables-and-path", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792460246/ltv-linux-administration/environment-variables-and-path.mp4", durationLabel: "2 min 6 s" }),
    ],
  },
  {
    n: 5,
    title: "Processes & Services",
    lessons: [
      L(18, "processes-and-signals", "Processes & Signals", { contentDir: "ch05/18-processes-and-signals", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792460318/ltv-linux-administration/processes-and-signals.mp4", durationLabel: "2 min 2 s" }),
      L(19, "systemd-and-services", "systemd & Services", { contentDir: "ch05/19-systemd-and-services", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792460396/ltv-linux-administration/systemd-and-services.mp4", durationLabel: "1 min 59 s" }),
      L(20, "scheduling-with-cron-and-systemd-timers", "Scheduling With cron & systemd Timers", { contentDir: "ch05/20-scheduling-with-cron-and-systemd-timers", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792460473/ltv-linux-administration/scheduling-with-cron-and-systemd-timers.mp4", durationLabel: "2 min 2 s" }),
      L(21, "logs-and-journalctl", "Logs & journalctl", { contentDir: "ch05/21-logs-and-journalctl", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792460547/ltv-linux-administration/logs-and-journalctl.mp4", durationLabel: "1 min 56 s" }),
      L(22, "resource-monitoring", "Resource Monitoring", { contentDir: "ch05/22-resource-monitoring", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792460619/ltv-linux-administration/resource-monitoring.mp4", durationLabel: "2 min 13 s" }),
    ],
  },
  {
    n: 6,
    title: "Packages, Storage & SSH",
    lessons: [
      L(23, "package-managers-apt-and-dnf", "Package Managers: apt & dnf", { contentDir: "ch06/23-package-managers-apt-and-dnf", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792460684/ltv-linux-administration/package-managers-apt-and-dnf.mp4", durationLabel: "2 min 4 s" }),
      L(24, "disks-partitions-and-mounts", "Disks, Partitions & Mounts", { contentDir: "ch06/24-disks-partitions-and-mounts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792460752/ltv-linux-administration/disks-partitions-and-mounts.mp4", durationLabel: "2 min 13 s" }),
      L(25, "ssh-and-key-based-access", "SSH & Key-Based Access", { contentDir: "ch06/25-ssh-and-key-based-access", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792460816/ltv-linux-administration/ssh-and-key-based-access.mp4", durationLabel: "2 min 2 s" }),
      L(26, "securing-a-linux-server", "Securing a Linux Server", { contentDir: "ch06/26-securing-a-linux-server", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792460879/ltv-linux-administration/securing-a-linux-server.mp4", durationLabel: "2 min 4 s" }),
    ],
  },
  {
    n: 7,
    title: "Bash Scripting",
    lessons: [
      L(27, "script-basics", "Script Basics", { contentDir: "ch07/27-script-basics", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792460946/ltv-linux-administration/script-basics.mp4", durationLabel: "1 min 53 s" }),
      L(28, "variables-and-conditionals", "Variables & Conditionals", { contentDir: "ch07/28-variables-and-conditionals", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792461015/ltv-linux-administration/variables-and-conditionals.mp4", durationLabel: "2 min 10 s" }),
      L(29, "loops-and-functions", "Loops & Functions", { contentDir: "ch07/29-loops-and-functions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792461078/ltv-linux-administration/loops-and-functions.mp4", durationLabel: "2 min 6 s" }),
      L(30, "arguments-and-input", "Arguments & Input", { contentDir: "ch07/30-arguments-and-input", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792461139/ltv-linux-administration/arguments-and-input.mp4", durationLabel: "1 min 57 s" }),
      L(31, "error-handling-and-debugging", "Error Handling & Debugging", { contentDir: "ch07/31-error-handling-and-debugging", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792461209/ltv-linux-administration/error-handling-and-debugging.mp4", durationLabel: "2 min 9 s" }),
    ],
  },
  {
    n: 8,
    title: "Capstone",
    lessons: [
      L(32, "capstone-kickoff-set-up-and-harden-a-linux-server", "Capstone Kickoff: Set Up and Harden a Linux Server", { contentDir: "ch08/32-capstone-kickoff-set-up-and-harden-a-linux-server", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792461274/ltv-linux-administration/capstone-kickoff-set-up-and-harden-a-linux-server.mp4", durationLabel: "2 min 13 s" }),
      L(33, "capstone-build-it", "Capstone: Build It", { contentDir: "ch08/33-capstone-build-it", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792461341/ltv-linux-administration/capstone-build-it.mp4", durationLabel: "2 min 9 s" }),
      L(34, "capstone-wrap-up-and-portfolio-presentation", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch08/34-capstone-wrap-up-and-portfolio-presentation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792461405/ltv-linux-administration/capstone-wrap-up-and-portfolio-presentation.mp4", durationLabel: "2 min 9 s" }),
    ],
  },
];
