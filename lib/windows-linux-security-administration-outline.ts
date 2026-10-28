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
      L(1, "windows-server-roles-and-what-a-domain-controller-does", "Windows Server Roles and What a Domain Controller Does", { contentDir: "ch01/01-windows-server-roles-and-what-a-domain-controller-does", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-windows-linux-security-administration/windows-server-roles-and-what-a-domain-controller-does.mp4", durationLabel: "2 min 22 s" }),
      L(2, "active-directory-structure-domains-trees-forests-and-ous", "Active Directory Structure: Domains, Trees, Forests, and OUs", { contentDir: "ch01/02-active-directory-structure-domains-trees-forests-and-ous", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-windows-linux-security-administration/active-directory-structure-domains-trees-forests-and-ous.mp4", durationLabel: "2 min 12 s" }),
      L(3, "managing-users-and-groups-in-active-directory", "Managing Users and Groups in Active Directory", { contentDir: "ch01/03-managing-users-and-groups-in-active-directory", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-windows-linux-security-administration/managing-users-and-groups-in-active-directory.mp4", durationLabel: "2 min 15 s" }),
      L(4, "ntfs-permissions-and-share-permissions", "NTFS Permissions and Share Permissions", { contentDir: "ch01/04-ntfs-permissions-and-share-permissions", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-windows-linux-security-administration/ntfs-permissions-and-share-permissions.mp4", durationLabel: "2 min 24 s" }),
    ],
  },
  {
    n: 2,
    title: "Group Policy & Windows Hardening",
    lessons: [
      L(5, "group-policy-objects-and-how-they-apply", "Group Policy Objects and How They Apply", { contentDir: "ch02/05-group-policy-objects-and-how-they-apply", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-windows-linux-security-administration/group-policy-objects-and-how-they-apply.mp4", durationLabel: "2 min 21 s" }),
      L(6, "security-baselines-and-the-cis-benchmarks", "Security Baselines and the CIS Benchmarks", { contentDir: "ch02/06-security-baselines-and-the-cis-benchmarks", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-windows-linux-security-administration/security-baselines-and-the-cis-benchmarks.mp4", durationLabel: "2 min 28 s" }),
      L(7, "windows-firewall-and-windows-defender", "Windows Firewall and Windows Defender", { contentDir: "ch02/07-windows-firewall-and-windows-defender", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-windows-linux-security-administration/windows-firewall-and-windows-defender.mp4", durationLabel: "2 min 21 s" }),
      L(8, "bitlocker-and-data-at-rest-protection", "BitLocker and Data-at-Rest Protection", { contentDir: "ch02/08-bitlocker-and-data-at-rest-protection", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-windows-linux-security-administration/bitlocker-and-data-at-rest-protection.mp4", durationLabel: "2 min 5 s" }),
    ],
  },
  {
    n: 3,
    title: "Windows Logging & Event Management",
    lessons: [
      L(9, "windows-event-viewer-and-the-security-log", "Windows Event Viewer and the Security Log", { contentDir: "ch03/09-windows-event-viewer-and-the-security-log", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-windows-linux-security-administration/windows-event-viewer-and-the-security-log.mp4", durationLabel: "2 min 22 s" }),
      L(10, "key-windows-event-ids-every-analyst-should-know", "Key Windows Event IDs Every Analyst Should Know", { contentDir: "ch03/10-key-windows-event-ids-every-analyst-should-know", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-windows-linux-security-administration/key-windows-event-ids-every-analyst-should-know.mp4", durationLabel: "2 min 31 s" }),
      L(11, "introduction-to-sysmon-for-deeper-visibility", "Introduction to Sysmon for Deeper Visibility", { contentDir: "ch03/11-introduction-to-sysmon-for-deeper-visibility", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-windows-linux-security-administration/introduction-to-sysmon-for-deeper-visibility.mp4", durationLabel: "2 min 19 s" }),
      L(12, "windows-audit-policy-what-to-log-and-why", "Windows Audit Policy: What to Log and Why", { contentDir: "ch03/12-windows-audit-policy-what-to-log-and-why", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-windows-linux-security-administration/windows-audit-policy-what-to-log-and-why.mp4", durationLabel: "2 min 33 s" }),
    ],
  },
  {
    n: 4,
    title: "Linux Administration Deep Dive",
    lessons: [
      L(13, "sudo-and-the-sudoers-file-in-depth", "sudo and the sudoers File in Depth", { contentDir: "ch04/13-sudo-and-the-sudoers-file-in-depth", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-windows-linux-security-administration/sudo-and-the-sudoers-file-in-depth.mp4", durationLabel: "2 min 35 s" }),
      L(14, "pam-pluggable-authentication-modules-basics", "PAM: Pluggable Authentication Modules Basics", { contentDir: "ch04/14-pam-pluggable-authentication-modules-basics", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-windows-linux-security-administration/pam-pluggable-authentication-modules-basics.mp4", durationLabel: "3 min 6 s" }),
      L(15, "linux-file-permissions-beyond-the-basics-acls-and-sticky-bit", "Linux File Permissions Beyond the Basics: ACLs and the Sticky Bit", { contentDir: "ch04/15-linux-file-permissions-beyond-the-basics-acls-and-sticky-bit", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-windows-linux-security-administration/linux-file-permissions-beyond-the-basics-acls-and-sticky-bit.mp4", durationLabel: "2 min 36 s" }),
      L(16, "cron-systemd-timers-and-scheduled-task-security", "Cron, systemd Timers, and Scheduled Task Security", { contentDir: "ch04/16-cron-systemd-timers-and-scheduled-task-security", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-windows-linux-security-administration/cron-systemd-timers-and-scheduled-task-security.mp4", durationLabel: "2 min 28 s" }),
    ],
  },
  {
    n: 5,
    title: "Linux Hardening & Security Tools",
    lessons: [
      L(17, "selinux-and-apparmor-mandatory-access-control", "SELinux and AppArmor: Mandatory Access Control", { contentDir: "ch05/17-selinux-and-apparmor-mandatory-access-control", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-windows-linux-security-administration/selinux-and-apparmor-mandatory-access-control.mp4", durationLabel: "2 min 30 s" }),
      L(18, "auditd-and-linux-system-auditing", "auditd and Linux System Auditing", { contentDir: "ch05/18-auditd-and-linux-system-auditing", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-windows-linux-security-administration/auditd-and-linux-system-auditing.mp4", durationLabel: "2 min 28 s" }),
      L(19, "ssh-hardening-beyond-key-based-auth", "SSH Hardening Beyond Key-Based Auth", { contentDir: "ch05/19-ssh-hardening-beyond-key-based-auth", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-windows-linux-security-administration/ssh-hardening-beyond-key-based-auth.mp4", durationLabel: "2 min 19 s" }),
      L(20, "fail2ban-and-brute-force-protection", "fail2ban and Brute-Force Protection", { contentDir: "ch05/20-fail2ban-and-brute-force-protection", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-windows-linux-security-administration/fail2ban-and-brute-force-protection.mp4", durationLabel: "2 min 24 s" }),
    ],
  },
  {
    n: 6,
    title: "Patch Management & Baseline Configuration",
    lessons: [
      L(21, "patch-management-fundamentals-and-patch-tuesday", "Patch Management Fundamentals and Patch Tuesday", { contentDir: "ch06/21-patch-management-fundamentals-and-patch-tuesday", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-windows-linux-security-administration/patch-management-fundamentals-and-patch-tuesday.mp4", durationLabel: "2 min 43 s" }),
      L(22, "wsus-and-windows-update-for-business", "WSUS and Windows Update for Business", { contentDir: "ch06/22-wsus-and-windows-update-for-business", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-windows-linux-security-administration/wsus-and-windows-update-for-business.mp4", durationLabel: "2 min 24 s" }),
      L(23, "linux-patch-management-with-apt-and-yum-dnf", "Linux Patch Management with apt and yum/dnf", { contentDir: "ch06/23-linux-patch-management-with-apt-and-yum-dnf", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-windows-linux-security-administration/linux-patch-management-with-apt-and-yum-dnf.mp4", durationLabel: "2 min 25 s" }),
      L(24, "vulnerability-scanning-concepts-and-cve-cvss", "Vulnerability Scanning Concepts and CVE/CVSS", { contentDir: "ch06/24-vulnerability-scanning-concepts-and-cve-cvss", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-windows-linux-security-administration/vulnerability-scanning-concepts-and-cve-cvss.mp4", durationLabel: "2 min 34 s" }),
    ],
  },
  {
    n: 7,
    title: "Endpoint Protection & Monitoring",
    lessons: [
      L(25, "antivirus-vs-edr-how-endpoint-protection-has-evolved", "Antivirus vs. EDR: How Endpoint Protection Has Evolved", { contentDir: "ch07/25-antivirus-vs-edr-how-endpoint-protection-has-evolved", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-windows-linux-security-administration/antivirus-vs-edr-how-endpoint-protection-has-evolved.mp4", durationLabel: "2 min 50 s" }),
      L(26, "windows-defender-for-endpoint-concepts", "Windows Defender for Endpoint Concepts", { contentDir: "ch07/26-windows-defender-for-endpoint-concepts", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-windows-linux-security-administration/windows-defender-for-endpoint-concepts.mp4", durationLabel: "2 min 42 s" }),
      L(27, "linux-endpoint-protection-options", "Linux Endpoint Protection Options", { contentDir: "ch07/27-linux-endpoint-protection-options", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-windows-linux-security-administration/linux-endpoint-protection-options.mp4", durationLabel: "2 min 28 s" }),
      L(28, "asset-inventory-and-why-you-cant-protect-what-you-cant-see", "Asset Inventory and Why You Can't Protect What You Can't See", { contentDir: "ch07/28-asset-inventory-and-why-you-cant-protect-what-you-cant-see", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-windows-linux-security-administration/asset-inventory-and-why-you-cant-protect-what-you-cant-see.mp4", durationLabel: "2 min 33 s" }),
    ],
  },
  {
    n: 8,
    title: "Capstone: Hardening a Mixed Environment",
    lessons: [
      L(29, "lab-hardening-a-windows-server-baseline", "Lab: Hardening a Windows Server Baseline", { contentDir: "ch08/29-lab-hardening-a-windows-server-baseline", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-windows-linux-security-administration/lab-hardening-a-windows-server-baseline.mp4", durationLabel: "2 min 24 s" }),
      L(30, "lab-hardening-a-linux-server-baseline", "Lab: Hardening a Linux Server Baseline", { contentDir: "ch08/30-lab-hardening-a-linux-server-baseline", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-windows-linux-security-administration/lab-hardening-a-linux-server-baseline.mp4", durationLabel: "2 min 16 s" }),
      L(31, "case-study-responding-to-a-failed-audit", "Case Study: Responding to a Failed Security Audit", { contentDir: "ch08/31-case-study-responding-to-a-failed-audit", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-windows-linux-security-administration/case-study-responding-to-a-failed-audit.mp4", durationLabel: "2 min 19 s" }),
      L(32, "chapter-capstone-os-administration-and-hardening-review", "Chapter Capstone: OS Administration & Hardening Review", { contentDir: "ch08/32-chapter-capstone-os-administration-and-hardening-review", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-windows-linux-security-administration/chapter-capstone-os-administration-and-hardening-review.mp4", durationLabel: "2 min 13 s" }),
    ],
  },
];
