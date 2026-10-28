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
      L(1, "stateful-vs-stateless-firewalls-in-depth", "Stateful vs. Stateless Firewalls in Depth", { contentDir: "ch01/01-stateful-vs-stateless-firewalls-in-depth" }),
      L(2, "next-generation-firewalls-and-deep-packet-inspection", "Next-Generation Firewalls and Deep Packet Inspection", { contentDir: "ch01/02-next-generation-firewalls-and-deep-packet-inspection" }),
      L(3, "dmz-design-and-why-public-facing-servers-live-there", "DMZ Design and Why Public-Facing Servers Live There", { contentDir: "ch01/03-dmz-design-and-why-public-facing-servers-live-there" }),
      L(4, "vlans-and-network-segmentation-strategy", "VLANs and Network Segmentation Strategy", { contentDir: "ch01/04-vlans-and-network-segmentation-strategy" }),
    ],
  },
  {
    n: 2,
    title: "Intrusion Detection & Prevention Systems",
    lessons: [
      L(5, "ids-vs-ips-detection-vs-prevention", "IDS vs. IPS: Detection vs. Prevention", { contentDir: "ch02/05-ids-vs-ips-detection-vs-prevention" }),
      L(6, "signature-based-vs-anomaly-based-detection", "Signature-Based vs. Anomaly-Based Detection", { contentDir: "ch02/06-signature-based-vs-anomaly-based-detection" }),
      L(7, "reading-and-writing-basic-snort-suricata-rules", "Reading and Writing Basic Snort/Suricata Rules", { contentDir: "ch02/07-reading-and-writing-basic-snort-suricata-rules" }),
      L(8, "network-based-vs-host-based-ids", "Network-Based vs. Host-Based IDS", { contentDir: "ch02/08-network-based-vs-host-based-ids" }),
    ],
  },
  {
    n: 3,
    title: "Network Traffic Analysis",
    lessons: [
      L(9, "netflow-and-flow-based-monitoring", "NetFlow and Flow-Based Monitoring", { contentDir: "ch03/09-netflow-and-flow-based-monitoring" }),
      L(10, "deep-packet-inspection-vs-flow-analysis", "Deep Packet Inspection vs. Flow Analysis", { contentDir: "ch03/10-deep-packet-inspection-vs-flow-analysis" }),
      L(11, "baselining-normal-traffic-to-spot-anomalies", "Baselining Normal Traffic to Spot Anomalies", { contentDir: "ch03/11-baselining-normal-traffic-to-spot-anomalies" }),
      L(12, "detecting-data-exfiltration-patterns-in-traffic", "Detecting Data Exfiltration Patterns in Traffic", { contentDir: "ch03/12-detecting-data-exfiltration-patterns-in-traffic" }),
    ],
  },
  {
    n: 4,
    title: "Endpoint Detection Deep Dive",
    lessons: [
      L(13, "edr-telemetry-what-gets-collected-and-why", "EDR Telemetry: What Gets Collected and Why", { contentDir: "ch04/13-edr-telemetry-what-gets-collected-and-why" }),
      L(14, "process-trees-and-behavioral-detection", "Process Trees and Behavioral Detection", { contentDir: "ch04/14-process-trees-and-behavioral-detection" }),
      L(15, "detecting-living-off-the-land-techniques", "Detecting Living-off-the-Land Techniques", { contentDir: "ch04/15-detecting-living-off-the-land-techniques" }),
      L(16, "edr-response-actions-isolation-and-containment", "EDR Response Actions: Isolation and Containment", { contentDir: "ch04/16-edr-response-actions-isolation-and-containment" }),
    ],
  },
  {
    n: 5,
    title: "Threat Intelligence & Indicators of Compromise",
    lessons: [
      L(17, "what-an-ioc-actually-is-and-common-types", "What an IOC Actually Is and Common Types", { contentDir: "ch05/17-what-an-ioc-actually-is-and-common-types" }),
      L(18, "threat-intelligence-feeds-and-how-socs-use-them", "Threat Intelligence Feeds and How SOCs Use Them", { contentDir: "ch05/18-threat-intelligence-feeds-and-how-socs-use-them" }),
      L(19, "stix-and-taxii-sharing-threat-intelligence", "STIX and TAXII: Sharing Threat Intelligence", { contentDir: "ch05/19-stix-and-taxii-sharing-threat-intelligence" }),
      L(20, "open-source-intelligence-osint-for-defenders", "Open-Source Intelligence (OSINT) for Defenders", { contentDir: "ch05/20-open-source-intelligence-osint-for-defenders" }),
    ],
  },
  {
    n: 6,
    title: "Vulnerability Assessment & Scanning",
    lessons: [
      L(21, "vulnerability-scanners-nessus-and-openvas-concepts", "Vulnerability Scanners: Nessus and OpenVAS Concepts", { contentDir: "ch06/21-vulnerability-scanners-nessus-and-openvas-concepts" }),
      L(22, "authenticated-vs-unauthenticated-scans", "Authenticated vs. Unauthenticated Scans", { contentDir: "ch06/22-authenticated-vs-unauthenticated-scans" }),
      L(23, "reading-a-vulnerability-scan-report", "Reading a Vulnerability Scan Report", { contentDir: "ch06/23-reading-a-vulnerability-scan-report" }),
      L(24, "scan-scheduling-and-the-vulnerability-management-lifecycle", "Scan Scheduling and the Vulnerability Management Lifecycle", { contentDir: "ch06/24-scan-scheduling-and-the-vulnerability-management-lifecycle" }),
    ],
  },
  {
    n: 7,
    title: "Honeypots & Deception Technology",
    lessons: [
      L(25, "what-a-honeypot-actually-is-and-why-it-works", "What a Honeypot Actually Is and Why It Works", { contentDir: "ch07/25-what-a-honeypot-actually-is-and-why-it-works" }),
      L(26, "low-interaction-vs-high-interaction-honeypots", "Low-Interaction vs. High-Interaction Honeypots", { contentDir: "ch07/26-low-interaction-vs-high-interaction-honeypots" }),
      L(27, "deception-technology-beyond-the-honeypot", "Deception Technology Beyond the Honeypot", { contentDir: "ch07/27-deception-technology-beyond-the-honeypot" }),
      L(28, "why-honeypot-alerts-are-high-fidelity-signals", "Why Honeypot Alerts Are High-Fidelity Signals", { contentDir: "ch07/28-why-honeypot-alerts-are-high-fidelity-signals" }),
    ],
  },
  {
    n: 8,
    title: "Capstone: Building a Layered Threat Detection Program",
    lessons: [
      L(29, "lab-designing-a-segmented-network-with-a-dmz", "Lab: Designing a Segmented Network with a DMZ", { contentDir: "ch08/29-lab-designing-a-segmented-network-with-a-dmz" }),
      L(30, "lab-writing-detection-rules-for-a-known-attack-pattern", "Lab: Writing Detection Rules for a Known Attack Pattern", { contentDir: "ch08/30-lab-writing-detection-rules-for-a-known-attack-pattern" }),
      L(31, "case-study-catching-a-slow-data-exfiltration", "Case Study: Catching a Slow Data Exfiltration", { contentDir: "ch08/31-case-study-catching-a-slow-data-exfiltration" }),
      L(32, "chapter-capstone-network-security-and-threat-detection-review", "Chapter Capstone: Network Security & Threat Detection Review", { contentDir: "ch08/32-chapter-capstone-network-security-and-threat-detection-review" }),
    ],
  },
];
