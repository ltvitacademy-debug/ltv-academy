// Windows, Linux & Security Administration course outline. Lessons without a contentDir
// render as "in production". Course 3 of the Cybersecurity Analyst → Security Engineer path's
// Job-Ready Foundation stage — hardening, user/permission management, and security
// administration across both major operating systems, building on course 2's networking and
// core security fundamentals.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/windows-linux-security-administration/
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

export const WINDOWS_LINUX_SECURITY_ADMINISTRATION_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Windows Server & Active Directory Fundamentals",
    lessons: [
      L(1, "windows-server-roles-and-what-a-domain-controller-does", "Windows Server Roles and What a Domain Controller Does", { contentDir: "ch01/01-windows-server-roles-and-what-a-domain-controller-does" }),
      L(2, "active-directory-structure-domains-trees-forests-and-ous", "Active Directory Structure: Domains, Trees, Forests, and OUs", { contentDir: "ch01/02-active-directory-structure-domains-trees-forests-and-ous" }),
      L(3, "managing-users-and-groups-in-active-directory", "Managing Users and Groups in Active Directory", { contentDir: "ch01/03-managing-users-and-groups-in-active-directory" }),
      L(4, "ntfs-permissions-and-share-permissions", "NTFS Permissions and Share Permissions", { contentDir: "ch01/04-ntfs-permissions-and-share-permissions" }),
    ],
  },
  {
    n: 2,
    title: "Group Policy & Windows Hardening",
    lessons: [
      L(5, "group-policy-objects-and-how-they-apply", "Group Policy Objects and How They Apply", { contentDir: "ch02/05-group-policy-objects-and-how-they-apply" }),
      L(6, "security-baselines-and-the-cis-benchmarks", "Security Baselines and the CIS Benchmarks", { contentDir: "ch02/06-security-baselines-and-the-cis-benchmarks" }),
      L(7, "windows-firewall-and-windows-defender", "Windows Firewall and Windows Defender", { contentDir: "ch02/07-windows-firewall-and-windows-defender" }),
      L(8, "bitlocker-and-data-at-rest-protection", "BitLocker and Data-at-Rest Protection", { contentDir: "ch02/08-bitlocker-and-data-at-rest-protection" }),
    ],
  },
  {
    n: 3,
    title: "Windows Logging & Event Management",
    lessons: [
      L(9, "windows-event-viewer-and-the-security-log", "Windows Event Viewer and the Security Log", { contentDir: "ch03/09-windows-event-viewer-and-the-security-log" }),
      L(10, "key-windows-event-ids-every-analyst-should-know", "Key Windows Event IDs Every Analyst Should Know", { contentDir: "ch03/10-key-windows-event-ids-every-analyst-should-know" }),
      L(11, "introduction-to-sysmon-for-deeper-visibility", "Introduction to Sysmon for Deeper Visibility", { contentDir: "ch03/11-introduction-to-sysmon-for-deeper-visibility" }),
      L(12, "windows-audit-policy-what-to-log-and-why", "Windows Audit Policy: What to Log and Why", { contentDir: "ch03/12-windows-audit-policy-what-to-log-and-why" }),
    ],
  },
  {
    n: 4,
    title: "Linux Administration Deep Dive",
    lessons: [
      L(13, "sudo-and-the-sudoers-file-in-depth", "sudo and the sudoers File in Depth", { contentDir: "ch04/13-sudo-and-the-sudoers-file-in-depth" }),
      L(14, "pam-pluggable-authentication-modules-basics", "PAM: Pluggable Authentication Modules Basics", { contentDir: "ch04/14-pam-pluggable-authentication-modules-basics" }),
      L(15, "linux-file-permissions-beyond-the-basics-acls-and-sticky-bit", "Linux File Permissions Beyond the Basics: ACLs and the Sticky Bit", { contentDir: "ch04/15-linux-file-permissions-beyond-the-basics-acls-and-sticky-bit" }),
      L(16, "cron-systemd-timers-and-scheduled-task-security", "Cron, systemd Timers, and Scheduled Task Security", { contentDir: "ch04/16-cron-systemd-timers-and-scheduled-task-security" }),
    ],
  },
  {
    n: 5,
    title: "Linux Hardening & Security Tools",
    lessons: [
      L(17, "selinux-and-apparmor-mandatory-access-control", "SELinux and AppArmor: Mandatory Access Control", { contentDir: "ch05/17-selinux-and-apparmor-mandatory-access-control" }),
      L(18, "auditd-and-linux-system-auditing", "auditd and Linux System Auditing", { contentDir: "ch05/18-auditd-and-linux-system-auditing" }),
      L(19, "ssh-hardening-beyond-key-based-auth", "SSH Hardening Beyond Key-Based Auth", { contentDir: "ch05/19-ssh-hardening-beyond-key-based-auth" }),
      L(20, "fail2ban-and-brute-force-protection", "fail2ban and Brute-Force Protection", { contentDir: "ch05/20-fail2ban-and-brute-force-protection" }),
    ],
  },
  {
    n: 6,
    title: "Patch Management & Baseline Configuration",
    lessons: [
      L(21, "patch-management-fundamentals-and-patch-tuesday", "Patch Management Fundamentals and Patch Tuesday", { contentDir: "ch06/21-patch-management-fundamentals-and-patch-tuesday" }),
      L(22, "wsus-and-windows-update-for-business", "WSUS and Windows Update for Business", { contentDir: "ch06/22-wsus-and-windows-update-for-business" }),
      L(23, "linux-patch-management-with-apt-and-yum-dnf", "Linux Patch Management with apt and yum/dnf", { contentDir: "ch06/23-linux-patch-management-with-apt-and-yum-dnf" }),
      L(24, "vulnerability-scanning-concepts-and-cve-cvss", "Vulnerability Scanning Concepts and CVE/CVSS", { contentDir: "ch06/24-vulnerability-scanning-concepts-and-cve-cvss" }),
    ],
  },
  {
    n: 7,
    title: "Endpoint Protection & Monitoring",
    lessons: [
      L(25, "antivirus-vs-edr-how-endpoint-protection-has-evolved", "Antivirus vs. EDR: How Endpoint Protection Has Evolved", { contentDir: "ch07/25-antivirus-vs-edr-how-endpoint-protection-has-evolved" }),
      L(26, "windows-defender-for-endpoint-concepts", "Windows Defender for Endpoint Concepts", { contentDir: "ch07/26-windows-defender-for-endpoint-concepts" }),
      L(27, "linux-endpoint-protection-options", "Linux Endpoint Protection Options", { contentDir: "ch07/27-linux-endpoint-protection-options" }),
      L(28, "asset-inventory-and-why-you-cant-protect-what-you-cant-see", "Asset Inventory and Why You Can't Protect What You Can't See", { contentDir: "ch07/28-asset-inventory-and-why-you-cant-protect-what-you-cant-see" }),
    ],
  },
  {
    n: 8,
    title: "Capstone: Hardening a Mixed Environment",
    lessons: [
      L(29, "lab-hardening-a-windows-server-baseline", "Lab: Hardening a Windows Server Baseline", { contentDir: "ch08/29-lab-hardening-a-windows-server-baseline" }),
      L(30, "lab-hardening-a-linux-server-baseline", "Lab: Hardening a Linux Server Baseline", { contentDir: "ch08/30-lab-hardening-a-linux-server-baseline" }),
      L(31, "case-study-responding-to-a-failed-audit", "Case Study: Responding to a Failed Security Audit", { contentDir: "ch08/31-case-study-responding-to-a-failed-audit" }),
      L(32, "chapter-capstone-os-administration-and-hardening-review", "Chapter Capstone: OS Administration & Hardening Review", { contentDir: "ch08/32-chapter-capstone-os-administration-and-hardening-review" }),
    ],
  },
];
