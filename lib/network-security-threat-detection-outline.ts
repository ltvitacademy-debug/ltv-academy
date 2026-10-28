// Network Security, Endpoint Protection & Threat Detection course outline. Lessons without a
// contentDir render as "in production". Course 4 of the Cybersecurity Analyst → Security
// Engineer path's Job-Ready Foundation stage — firewalls, network segmentation, endpoint
// detection, and the attack-recognition skills a SOC analyst applies daily, building on course 3's
// Windows/Linux administration and hardening.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/network-security-threat-detection/
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

export const NETWORK_SECURITY_THREAT_DETECTION_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Firewall Architecture & Network Segmentation",
    lessons: [
      L(1, "stateful-vs-stateless-firewalls-in-depth", "Stateful vs. Stateless Firewalls in Depth", { contentDir: "ch01/01-stateful-vs-stateless-firewalls-in-depth", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-network-security-threat-detection/stateful-vs-stateless-firewalls-in-depth.mp4", durationLabel: "2 min 37 s" }),
      L(2, "next-generation-firewalls-and-deep-packet-inspection", "Next-Generation Firewalls and Deep Packet Inspection", { contentDir: "ch01/02-next-generation-firewalls-and-deep-packet-inspection", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-network-security-threat-detection/next-generation-firewalls-and-deep-packet-inspection.mp4", durationLabel: "2 min 28 s" }),
      L(3, "dmz-design-and-why-public-facing-servers-live-there", "DMZ Design and Why Public-Facing Servers Live There", { contentDir: "ch01/03-dmz-design-and-why-public-facing-servers-live-there", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-network-security-threat-detection/dmz-design-and-why-public-facing-servers-live-there.mp4", durationLabel: "2 min 26 s" }),
      L(4, "vlans-and-network-segmentation-strategy", "VLANs and Network Segmentation Strategy", { contentDir: "ch01/04-vlans-and-network-segmentation-strategy", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-network-security-threat-detection/vlans-and-network-segmentation-strategy.mp4", durationLabel: "2 min 27 s" }),
    ],
  },
  {
    n: 2,
    title: "Intrusion Detection & Prevention Systems",
    lessons: [
      L(5, "ids-vs-ips-detection-vs-prevention", "IDS vs. IPS: Detection vs. Prevention", { contentDir: "ch02/05-ids-vs-ips-detection-vs-prevention", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-network-security-threat-detection/ids-vs-ips-detection-vs-prevention.mp4", durationLabel: "2 min 13 s" }),
      L(6, "signature-based-vs-anomaly-based-detection", "Signature-Based vs. Anomaly-Based Detection", { contentDir: "ch02/06-signature-based-vs-anomaly-based-detection", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-network-security-threat-detection/signature-based-vs-anomaly-based-detection.mp4", durationLabel: "2 min 28 s" }),
      L(7, "reading-and-writing-basic-snort-suricata-rules", "Reading and Writing Basic Snort/Suricata Rules", { contentDir: "ch02/07-reading-and-writing-basic-snort-suricata-rules", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-network-security-threat-detection/reading-and-writing-basic-snort-suricata-rules.mp4", durationLabel: "2 min 14 s" }),
      L(8, "network-based-vs-host-based-ids", "Network-Based vs. Host-Based IDS", { contentDir: "ch02/08-network-based-vs-host-based-ids", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-network-security-threat-detection/network-based-vs-host-based-ids.mp4", durationLabel: "2 min 20 s" }),
    ],
  },
  {
    n: 3,
    title: "Network Traffic Analysis",
    lessons: [
      L(9, "netflow-and-flow-based-monitoring", "NetFlow and Flow-Based Monitoring", { contentDir: "ch03/09-netflow-and-flow-based-monitoring", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-network-security-threat-detection/netflow-and-flow-based-monitoring.mp4", durationLabel: "2 min 17 s" }),
      L(10, "deep-packet-inspection-vs-flow-analysis", "Deep Packet Inspection vs. Flow Analysis", { contentDir: "ch03/10-deep-packet-inspection-vs-flow-analysis", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-network-security-threat-detection/deep-packet-inspection-vs-flow-analysis.mp4", durationLabel: "2 min 6 s" }),
      L(11, "baselining-normal-traffic-to-spot-anomalies", "Baselining Normal Traffic to Spot Anomalies", { contentDir: "ch03/11-baselining-normal-traffic-to-spot-anomalies", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-network-security-threat-detection/baselining-normal-traffic-to-spot-anomalies.mp4", durationLabel: "2 min 11 s" }),
      L(12, "detecting-data-exfiltration-patterns-in-traffic", "Detecting Data Exfiltration Patterns in Traffic", { contentDir: "ch03/12-detecting-data-exfiltration-patterns-in-traffic", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-network-security-threat-detection/detecting-data-exfiltration-patterns-in-traffic.mp4", durationLabel: "2 min 21 s" }),
    ],
  },
  {
    n: 4,
    title: "Endpoint Detection Deep Dive",
    lessons: [
      L(13, "edr-telemetry-what-gets-collected-and-why", "EDR Telemetry: What Gets Collected and Why", { contentDir: "ch04/13-edr-telemetry-what-gets-collected-and-why", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-network-security-threat-detection/edr-telemetry-what-gets-collected-and-why.mp4", durationLabel: "2 min 34 s" }),
      L(14, "process-trees-and-behavioral-detection", "Process Trees and Behavioral Detection", { contentDir: "ch04/14-process-trees-and-behavioral-detection", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-network-security-threat-detection/process-trees-and-behavioral-detection.mp4", durationLabel: "2 min 46 s" }),
      L(15, "detecting-living-off-the-land-techniques", "Detecting Living-off-the-Land Techniques", { contentDir: "ch04/15-detecting-living-off-the-land-techniques", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-network-security-threat-detection/detecting-living-off-the-land-techniques.mp4", durationLabel: "2 min 40 s" }),
      L(16, "edr-response-actions-isolation-and-containment", "EDR Response Actions: Isolation and Containment", { contentDir: "ch04/16-edr-response-actions-isolation-and-containment", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-network-security-threat-detection/edr-response-actions-isolation-and-containment.mp4", durationLabel: "2 min 20 s" }),
    ],
  },
  {
    n: 5,
    title: "Threat Intelligence & Indicators of Compromise",
    lessons: [
      L(17, "what-an-ioc-actually-is-and-common-types", "What an IOC Actually Is and Common Types", { contentDir: "ch05/17-what-an-ioc-actually-is-and-common-types", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-network-security-threat-detection/what-an-ioc-actually-is-and-common-types.mp4", durationLabel: "2 min 29 s" }),
      L(18, "threat-intelligence-feeds-and-how-socs-use-them", "Threat Intelligence Feeds and How SOCs Use Them", { contentDir: "ch05/18-threat-intelligence-feeds-and-how-socs-use-them", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-network-security-threat-detection/threat-intelligence-feeds-and-how-socs-use-them.mp4", durationLabel: "2 min 21 s" }),
      L(19, "stix-and-taxii-sharing-threat-intelligence", "STIX and TAXII: Sharing Threat Intelligence", { contentDir: "ch05/19-stix-and-taxii-sharing-threat-intelligence", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-network-security-threat-detection/stix-and-taxii-sharing-threat-intelligence.mp4", durationLabel: "2 min 28 s" }),
      L(20, "open-source-intelligence-osint-for-defenders", "Open-Source Intelligence (OSINT) for Defenders", { contentDir: "ch05/20-open-source-intelligence-osint-for-defenders", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-network-security-threat-detection/open-source-intelligence-osint-for-defenders.mp4", durationLabel: "2 min 14 s" }),
    ],
  },
  {
    n: 6,
    title: "Vulnerability Assessment & Scanning",
    lessons: [
      L(21, "vulnerability-scanners-nessus-and-openvas-concepts", "Vulnerability Scanners: Nessus and OpenVAS Concepts", { contentDir: "ch06/21-vulnerability-scanners-nessus-and-openvas-concepts", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-network-security-threat-detection/vulnerability-scanners-nessus-and-openvas-concepts.mp4", durationLabel: "2 min 38 s" }),
      L(22, "authenticated-vs-unauthenticated-scans", "Authenticated vs. Unauthenticated Scans", { contentDir: "ch06/22-authenticated-vs-unauthenticated-scans", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-network-security-threat-detection/authenticated-vs-unauthenticated-scans.mp4", durationLabel: "2 min 22 s" }),
      L(23, "reading-a-vulnerability-scan-report", "Reading a Vulnerability Scan Report", { contentDir: "ch06/23-reading-a-vulnerability-scan-report", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-network-security-threat-detection/reading-a-vulnerability-scan-report.mp4", durationLabel: "2 min 40 s" }),
      L(24, "scan-scheduling-and-the-vulnerability-management-lifecycle", "Scan Scheduling and the Vulnerability Management Lifecycle", { contentDir: "ch06/24-scan-scheduling-and-the-vulnerability-management-lifecycle", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-network-security-threat-detection/scan-scheduling-and-the-vulnerability-management-lifecycle.mp4", durationLabel: "2 min 32 s" }),
    ],
  },
  {
    n: 7,
    title: "Honeypots & Deception Technology",
    lessons: [
      L(25, "what-a-honeypot-actually-is-and-why-it-works", "What a Honeypot Actually Is and Why It Works", { contentDir: "ch07/25-what-a-honeypot-actually-is-and-why-it-works", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-network-security-threat-detection/what-a-honeypot-actually-is-and-why-it-works.mp4", durationLabel: "2 min 28 s" }),
      L(26, "low-interaction-vs-high-interaction-honeypots", "Low-Interaction vs. High-Interaction Honeypots", { contentDir: "ch07/26-low-interaction-vs-high-interaction-honeypots", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-network-security-threat-detection/low-interaction-vs-high-interaction-honeypots.mp4", durationLabel: "2 min 38 s" }),
      L(27, "deception-technology-beyond-the-honeypot", "Deception Technology Beyond the Honeypot", { contentDir: "ch07/27-deception-technology-beyond-the-honeypot", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-network-security-threat-detection/deception-technology-beyond-the-honeypot.mp4", durationLabel: "2 min 23 s" }),
      L(28, "why-honeypot-alerts-are-high-fidelity-signals", "Why Honeypot Alerts Are High-Fidelity Signals", { contentDir: "ch07/28-why-honeypot-alerts-are-high-fidelity-signals", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-network-security-threat-detection/why-honeypot-alerts-are-high-fidelity-signals.mp4", durationLabel: "2 min 22 s" }),
    ],
  },
  {
    n: 8,
    title: "Capstone: Building a Layered Threat Detection Program",
    lessons: [
      L(29, "lab-designing-a-segmented-network-with-a-dmz", "Lab: Designing a Segmented Network with a DMZ", { contentDir: "ch08/29-lab-designing-a-segmented-network-with-a-dmz", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-network-security-threat-detection/lab-designing-a-segmented-network-with-a-dmz.mp4", durationLabel: "2 min 21 s" }),
      L(30, "lab-writing-detection-rules-for-a-known-attack-pattern", "Lab: Writing Detection Rules for a Known Attack Pattern", { contentDir: "ch08/30-lab-writing-detection-rules-for-a-known-attack-pattern", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-network-security-threat-detection/lab-writing-detection-rules-for-a-known-attack-pattern.mp4", durationLabel: "2 min 20 s" }),
      L(31, "case-study-catching-a-slow-data-exfiltration", "Case Study: Catching a Slow Data Exfiltration", { contentDir: "ch08/31-case-study-catching-a-slow-data-exfiltration", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-network-security-threat-detection/case-study-catching-a-slow-data-exfiltration.mp4", durationLabel: "2 min 25 s" }),
      L(32, "chapter-capstone-network-security-and-threat-detection-review", "Chapter Capstone: Network Security & Threat Detection Review", { contentDir: "ch08/32-chapter-capstone-network-security-and-threat-detection-review", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-network-security-threat-detection/chapter-capstone-network-security-and-threat-detection-review.mp4", durationLabel: "2 min 18 s" }),
    ],
  },
];
