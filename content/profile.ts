/** One string for the degree, everywhere. A recruiter cross-checking the CV
 *  against the site should not find three spellings of the same qualification. */
export const DEGREE = "B.Tech Computer Science and Engineering (Cybersecurity)";

export const profile = {
  name: "Yuvaraj Prudhvi",
  initials: "YP",

  /* what a recruiter needs in the first five seconds */
  roles: "SOC Analyst · IT Support",
  qualification: `${DEGREE}, 2026`,

  /* hero */
  headline: "Security is not a product, but a process.",
  headlineCredit: "Bruce Schneier",
  intro:
    "The process is the part I like. I am Yuvaraj, a computer science graduate with a cybersecurity specialisation, out of SRM University AP in May 2026. The last year has gone into standing up the tools a SOC actually runs on, breaking my own lab to find out whether they would notice, and writing down what happened. All four write-ups are below.",

  location: "Bangalore, India",
  availability: "Available now",
  relocation: "Open to relocating to the UAE, employment visa required",

  email: "yuvarajprudhvi.works@protonmail.com",
  phoneDisplay: "+91 79931 75987",
  phoneTel: "+917993175987",
  whatsapp: "https://wa.me/917993175987",
  // taken from the link targets embedded in the resume PDF, both verified 200
  github: "https://github.com/yuvarajprudhvi",
  linkedin: "https://www.linkedin.com/in/yuvarajprudhvi",
  tryhackme: "https://tryhackme.com/p/iamalsouser",
  resume: "/reports/yuvaraj-prudhvi-cv.pdf",
} as const;

export const education = {
  degree: DEGREE,
  university: "SRM University AP, Amaravati",
  graduated: "Graduated May 2026",
  coursework: "network security, cyber forensics and vulnerability analysis",
};

export const stats = [
  {
    value: "50+",
    label: "rooms on TryHackMe",
    note: "top 15% in India",
    href: profile.tryhackme,
  },
  { value: "4", label: "write-ups this year", note: "all in one month" },
  { value: "1", label: "paper submitted", note: "still waiting on the verdict" },
  { value: "2026", label: "B.Tech graduate", note: "cybersecurity specialisation" },
];

export type Track = {
  id: string;
  number: string;
  title: string;
  blurb: string;
  points: { text: string; evidence?: string; href?: string }[];
};

export const tracks: Track[] = [
  {
    id: "blue-team",
    number: "A",
    title: "Blue team",
    blurb:
      "Put detection in place, then find out whether it works. Most of what I know came from the second half of that sentence.",
    points: [
      {
        text: "Installed a cloud SIEM against a Windows box on AWS, pointed it at the security log, then failed my own RDP password ten times to see if it noticed. It did.",
        evidence: "Sumo Logic, EventCode 4625",
        href: "/work/sumo-logic-siem",
      },
      {
        text: "Ran domain, IP and CVE lookups on a commercial threat intel platform and worked out what the empty results were telling me, which turned out to be the interesting part.",
        evidence: "IBM X-Force Exchange",
        href: "/work/ibm-x-force",
      },
      {
        text: "Took apart a four-year state-sponsored telecom intrusion, mapped it to ATT&CK, and wrote the recommendations a defender could act on the same week.",
        evidence: "Operation Soft Cell",
        href: "/work/operation-soft-cell",
      },
      {
        text: "Fifty-odd TryHackMe rooms on triage, log review and root cause, most of them against a clock, plus the Jr Penetration Tester path.",
        evidence: "Top 15% in India",
        href: profile.tryhackme,
      },
    ],
  },
  {
    id: "infrastructure",
    number: "B",
    title: "The half everything sits on",
    blurb:
      "You cannot defend a domain until somebody builds one. I would rather be the person who has done both.",
    points: [
      {
        text: "Built a Windows Server on EC2, added AD DS, promoted it to a domain controller and ran a directory sync agent against the new domain.",
        evidence: "AD DS, lab.local",
        href: "/work/okta-iam-lab",
      },
      {
        text: "Worked the identity lifecycle end to end: accounts, groups, app assignment, forced password reset on first login, MFA policy.",
        evidence: "Okta Admin Console",
        href: "/work/okta-iam-lab",
      },
      {
        text: "Broke it three times first. Wrong domain state, a service account that already existed, and an activation code that expired while I was reading the next step.",
        evidence: "Assignment 4",
        href: "/work/okta-iam-lab",
      },
      {
        text: "AWS Certified Cloud Practitioner, with Cisco Introduction to Cybersecurity behind it.",
        evidence: "Valid to April 2028",
      },
    ],
  },
];

export const skills = [
  {
    group: "Networking",
    items:
      "TCP/IP, network traffic analysis, infrastructure support, system monitoring, troubleshooting",
  },
  {
    group: "IT operations",
    items:
      "System maintenance, alert monitoring, backup readiness, SOP documentation, MS Office",
  },
  {
    group: "Systems",
    items:
      "Linux, Windows Server, Active Directory, operating system fundamentals, hardware",
  },
  { group: "Cloud", items: "AWS fundamentals, EC2, access control, system reliability" },
  {
    group: "Security",
    items:
      "Threat intelligence, OSINT, log analysis, detection, incident response workflows",
  },
  {
    group: "Tools",
    items:
      "Sumo Logic, Okta, Nmap, Burp Suite, Metasploit, Splunk (self-study), MITRE ATT&CK, Cyber Kill Chain",
  },
  {
    group: "Compliance",
    items: "GDPR, CCPA, PIPEDA, DPDP Act 2023, privacy by design",
  },
];

/** Exam-based credentials. Kept separate from training on purpose. */
export const certifications = [
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    detail: "Valid to April 2028",
    credentialId: "4b1b3731aa2541f0aedaf0fbecc09284",
    verify: "https://aws.amazon.com/verification",
  },
];

/** Course and learning-path completions. Real work, but not proctored exams. */
export const training = [
  {
    name: "Jr Penetration Tester",
    issuer: "TryHackMe learning path",
    detail: "Completed 21 February 2025",
    credentialId: "THM-6XSREAX8KU",
  },
  {
    name: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    detail: "2022",
  },
  {
    name: "Onboarding track",
    issuer: "Sumo Logic Academy",
    detail: "Data collection, search, dashboards",
  },
];

export const timeline = [
  {
    year: "2026",
    title: "Four write-ups in one month",
    org: "SIEM, IAM, threat intel, APT analysis",
    text: "August was the month it came together. A Sumo Logic deployment on my own AWS VM, five Okta labs including the Active Directory integration, a sweep through IBM X-Force, and Operation Soft Cell. Everything on this site was built in that stretch.",
  },
  {
    year: "2026",
    title: "Graduated",
    org: DEGREE,
    text: "SRM University AP, May 2026. Network security, cyber forensics and vulnerability analysis on the timetable. Looking for a first role in a SOC or on a service desk, in India or the UAE.",
  },
  {
    year: "2025",
    title: "Privacy risks in generative and agentic AI",
    org: "Submitted to ICTCon 2026, IIT Goa and NFSU, Springer CCIS",
    text: "A literature review across 90 sources, running five major AI platforms against ATT&CK and the Cyber Kill Chain. Found six gaps where GDPR, CCPA and the DPDP Act do not reach, and put together a three-tier framework for protecting yourself in the meantime. Still under review.",
  },
  {
    year: "2024",
    title: "Privacy Policy Generator",
    org: "Compliance automation",
    text: "Regulatory text in, structured documentation out, with full coverage of GDPR, CCPA and PIPEDA. Exports to PDF, Word and HTML so the result drops into whatever process is already running.",
  },
  {
    year: "2022",
    title: "Started the degree, started the labs",
    org: "SRM University AP, Amaravati",
    text: "TryHackMe in the evenings from the first year, which is where most of the useful learning happened. Fifty-odd rooms later it put me in the top 15% in India.",
  },
];
