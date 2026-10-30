import type { PathResumes } from "../sampleResumeTypes";

const CONTACT = ["Columbus, OH", "(614) 555-0147", "john.doe@example.com", "linkedin.com/in/johndoe-biexample"];

export const RESUMES: PathResumes = {
  "job-ready": {
    levelLabel: "Job Ready",
    name: "John Doe",
    contact: CONTACT,
    summary:
      "Entry-level Cybersecurity Analyst trained across networking fundamentals, Windows/Linux security administration, " +
      "network defense and threat detection, SOC operations, Microsoft Sentinel and Defender XDR, and the full incident " +
      "response lifecycle through a hands-on apprenticeship program. Worked a complete, realistic incident end to end for " +
      "a simulated 140-person financial-services firm — triaging a Sentinel analytics-rule alert, scoping a second " +
      "compromised host through the investigation graph, containing and eradicating the threat, restoring from a " +
      "verified-clean backup, and running a hypothesis-driven threat hunt that uncovered a second compromised account " +
      "the original alert never caught. Bringing that triage-to-resolution mindset to a Junior SOC Analyst, Cybersecurity " +
      "Analyst, or Security Engineer role.",
    skills: [
      "SOC Alert Triage & Investigation (Validate, Scope, Classify, Escalate)",
      "SIEM Operations & Log Correlation",
      "Microsoft Sentinel Administration & KQL",
      "Incident Response (NIST Lifecycle: Preparation through Lessons Learned)",
      "Threat Hunting (Hypothesis-Driven, MITRE ATT&CK)",
      "Network Security & Segmentation (Firewalls, DMZ, VLANs)",
      "Intrusion Detection & Signature Writing (Snort/Suricata)",
      "Windows & Linux Security Hardening",
      "Active Directory & Group Policy Administration",
      "Endpoint Detection & Response (EDR/XDR)",
      "Vulnerability Assessment & Scanning",
      "Security Fundamentals (CIA Triad, Cryptography, Access Control)",
    ],
    tools:
      "Microsoft Sentinel, Microsoft Defender XDR (Endpoint, Office 365, Identity), KQL, Azure Log Analytics, Windows " +
      "Server & Active Directory, Group Policy, Sysmon, Windows Event Viewer/auditpol, Linux (sudo, SELinux, AppArmor, " +
      "auditd, SSH hardening, fail2ban), Wireshark, Snort/Suricata, Nessus/OpenVAS concepts, NetFlow, Kali Linux, " +
      "VirtualBox/VMware, Metasploitable2, pfSense, BitLocker, Windows Defender Firewall/Defender for Endpoint, SOAR " +
      "playbook concepts, STIX/TAXII",
    sections: [
      {
        heading: "Training",
        entries: [
          {
            left: "Lifting the Veil IT Academy — Apprenticeship Program",
            right: "Jan 2026 – Jul 2026",
            sub: "Cybersecurity Analyst → Security Engineer Track · Job-Ready Foundation · Columbus, OH",
            bullets: [
              "Completed an intensive, project-based apprenticeship covering the full SOC analyst toolchain, from IT/networking and OS security fundamentals through network defense, SOC operations, a vendor-specific SIEM deep dive, and a full incident-response capstone, with a hands-on lab or case study closing nearly every chapter.",
              "Practiced Agile/Scrum (sprints, user stories) and Kanban-based work management, the SDLC (Dev/QA/UAT/Production), and foundational Git version control through a real-world IT project simulation, building the cross-team workflow literacy every SOC analyst needs before touching security-specific tools.",
              "Built networking fundamentals end to end — the OSI and TCP/IP models, IPv4/IPv6 addressing and subnetting, routing, NAT/DHCP/DNS, TCP vs. UDP and the three-way handshake, common ports and protocols, and Wi-Fi security basics — then layered on core security concepts: the CIA triad, threat actors and attack surfaces, the vulnerability/threat/risk relationship, the Cyber Kill Chain and MITRE ATT&CK, authentication/authorization models (RBAC/DAC/MAC), symmetric/asymmetric encryption, hashing and PKI basics, malware types, social engineering, and web application attacks, through a capstone building an isolated home lab (VirtualBox, Kali Linux, Metasploitable2, pfSense) and reading live traffic in Wireshark.",
              "Administered Windows Server and Active Directory — domains/trees/forests/OUs, user and group management, NTFS vs. share permissions, Group Policy Objects, CIS security baselines, Windows Firewall profiles, BitLocker with AD-escrowed recovery keys, the Windows Security log and key Event IDs, Sysmon deployment, and granular audit policy — and parallel Linux administration — sudoers scoping, PAM, ACLs and the sticky bit, cron/systemd timer security, SELinux/AppArmor mandatory access control, auditd watch rules, SSH hardening, and fail2ban — plus patch management (WSUS, apt/yum/dnf) and CVE/CVSS vulnerability-scanning concepts, through a capstone hardening both a Windows server and a Linux server baseline and responding to a failed security audit case study.",
              "Designed and defended layered network security: stateful vs. stateless firewalls and next-gen/deep-packet-inspection concepts, three-legged-firewall DMZ design with host-to-host rule scoping, VLAN segmentation, IDS vs. IPS and signature- vs. anomaly-based detection, reading and writing real Snort/Suricata rules (sticky buffers, dsize, threshold tuning for alert fatigue), NetFlow and traffic-baselining for exfiltration detection, EDR telemetry and process-tree/living-off-the-land behavioral detection, IOC types and threat-intel feeds (STIX/TAXII, OSINT), and vulnerability scanner concepts (Nessus/OpenVAS, authenticated vs. unauthenticated scans), through a capstone designing a segmented network with a DMZ and writing tuned detection rules for a known SQL-injection-scanner and C2-beaconing pattern.",
              "Learned how a security operations center actually runs: Tier 1/2/3 analyst roles, 24x7 shift models, SOC maturity models, vendor-neutral SIEM mechanics (log aggregation, normalization, correlation, SIEM vs. log management), log collection (syslog, Windows Event Forwarding, agent vs. agentless), writing and tuning correlation rules, the validate-scope-classify-escalate triage workflow, case-note writing, SOC dashboards and MTTD/MTTR metrics, and SOAR/playbook automation concepts, through a capstone triaging a queue of three real-looking alerts to the correct false-positive, benign-true-positive, or escalate-now classification and writing a correlation rule for a known attack pattern.",
              "Applied those SOC concepts inside Microsoft's own stack: Sentinel architecture and the Log Analytics workspace, data connectors, KQL fundamentals (filtering, projecting, summarizing, joins, time windows), scheduled analytics rules and entity mapping, Sentinel workbooks, Microsoft Defender XDR (Defender for Endpoint, Office 365, and Identity) unified into one incident view, the incident queue and severity triage, the investigation graph and entity timelines, proactive hunting queries, bookmarks, and Sentinel playbooks/Logic Apps automation, through a capstone writing a KQL-based impossible-travel analytics rule end to end and then investigating the incident it generated using the investigation graph, a scoping hunt query, and a bookmark.",
              "Mastered the full NIST incident-response lifecycle (preparation, detection and analysis, containment, eradication and recovery, post-incident activity), writing IR plans and playbooks, IR team roles and RACI, tabletop exercises, multi-source timeline reconstruction and incident scoping, short- vs. long-term containment and evidence-safe isolation, root-cause eradication vs. restoring from a verified-clean backup, phased recovery and reinfection monitoring, after-action reports with owned/dated follow-ups, and hypothesis-driven threat hunting using MITRE ATT&CK as a map, through a job-ready capstone running a full incident response exercise end to end for a simulated financial-services firm, from the first Sentinel alert through containment, eradication, recovery, the written after-action report, and a follow-on threat hunt that found a second compromised account the original detection missed.",
              "Completed career-readiness training covering cybersecurity-specific resume and LinkedIn positioning, GitHub/portfolio presentation of lab and detection-rule work, and mock interview practice across networking, SOC triage, and incident-response scenario questions, aligned to the CompTIA Security+, Microsoft SC-200, and GIAC GCIH-style skill areas this foundation builds toward.",
            ],
          },
        ],
      },
      {
        heading: "Projects",
        entries: [
          {
            left: "Alderbrook Wealth Partners — Full Incident Response Exercise — Capstone Project",
            right: "2026",
            sub: "Lifting the Veil IT Academy, Cybersecurity Analyst Apprenticeship Program",
            bullets: [
              "Triaged a Microsoft Sentinel impossible-travel analytics rule alert for a simulated 140-person registered investment advisor, confirming a real compromise (not a false positive) by checking for a VPN exit node, verifying the user's travel status, and identifying an MFA push-fatigue approval that let a stolen credential through.",
              "Scoped the incident past the original alert by reading Sentinel's investigation graph, discovering a second compromised entity — the user's Entra-joined laptop — through a linked Defender for Endpoint alert for a suspicious PowerShell process spawned from Outlook, which the sign-in-only analytics rule never flagged on its own.",
              "Executed evidence-safe short-term containment: captured volatile memory/disk data via Defender for Endpoint live response before isolating the compromised host and disabling the user's Microsoft Entra ID account, revoking active sessions and refresh tokens to cut off the stolen credential immediately.",
              "Found the actual root cause in the forensic capture — a disguised scheduled task re-launching a remote-access tool on every reboot — and eradicated it by rebuilding the host from a verified-clean backup rather than live-cleaning a machine with SYSTEM-level persistence on it, then validated the restored device with an AV scan, a scheduled-task baseline check, and a tenant-wide sweep for the same indicator before returning it to production.",
              "Wrote an after-action report with four concrete, owned, dated follow-up items (enforcing number-matching MFA, adding a blocking Conditional Access policy, auditing scheduled-task creation via Sysmon/Event ID 4698, and scheduling phishing/MFA-fatigue refresher training) instead of a narrative summary.",
              "Ran a hypothesis-driven threat hunt off the closed incident's own root cause, using MITRE ATT&CK technique families (T1053.005 persistence, T1114.003 mailbox-forwarding collection) to ask what else the same credential-theft wave might have touched, and wrote a KQL query against mailbox-rule audit logs to test it.",
              "Found a second, independently compromised account — a Compliance Operations Analyst with a hidden inbox-forwarding rule exfiltrating wire-transfer emails — that had never triggered any existing alert, then converted the hunting query into a new scheduled, entity-mapped Sentinel analytics rule so the same technique is caught automatically going forward.",
            ],
          },
        ],
      },
      {
        heading: "GitHub Portfolio",
        entries: [
          {
            left: "github.com/johndoe-biexample/soc-analyst-portfolio",
            right: "2026",
            sub: "Public portfolio repository for lab work and detection rules",
            bullets: [
              "Organized a portfolio repo (detections/suricata/, detections/sentinel-kql/, labs/hardening/, writeups/) holding the Suricata rules written for the SQL-injection-scanner and C2-beaconing lab, the KQL impossible-travel analytics rule from the Sentinel capstone, and Windows/Linux hardening command sets from the OS-administration capstone, each with a short README explaining the detection logic and what it's tuned against.",
              "Wrote up the Alderbrook Wealth Partners incident response exercise as a case-study document (scenario, timeline, containment/eradication decisions, after-action items) with all company and account names kept clearly fictional, and scrubbed every lab writeup to confirm no real IP ranges, license keys, or TryHackMe room answers were ever committed.",
            ],
          },
        ],
      },
      {
        heading: "Education",
        entries: [{ left: "High School Diploma — Westerville North High School", right: "Columbus, OH · 2020" }],
      },
    ],
  },
};
