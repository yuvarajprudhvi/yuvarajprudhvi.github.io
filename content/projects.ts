export type Block =
  | { kind: "p"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "callout"; title: string; text: string }
  | { kind: "quote"; text: string }
  | { kind: "note"; text: string }
  | { kind: "chips"; label: string; items: { code: string; name: string }[] }
  | {
      kind: "shot";
      src: string;
      alt: string;
      caption: string;
      width: number;
      height: number;
    }
  | { kind: "table"; head: string[]; rows: string[][]; monoCols?: number[] }
  | {
      kind: "waves";
      items: { wave: string; gap?: string; title: string; points: string[] }[];
    }
  | { kind: "matrix"; columns: { tactic: string; techniques: string[] }[] }
  | { kind: "steps"; items: { title: string; text: string }[] };

export type Section = { title: string; blocks: Block[] };

export type Project = {
  slug: string;
  file: string;
  title: string;
  kicker: string;
  summary: string;
  track: "blue" | "ops" | "both";
  role: string;
  tools: string[];
  period: string;
  /** heading over the figures. Soft Cell's belong to the campaign, not to me. */
  metricsLabel?: string;
  metrics: { value: string; label: string }[];
  pdf?: string;
  sections: Section[];
};

export const projects: Project[] = [
  // ------------------------------------------------------------------
  {
    slug: "operation-soft-cell",
    file: "01",
    title: "Operation Soft Cell",
    kicker: "APT campaign analysis",
    summary:
      "A state-backed intrusion that sat inside telecom networks for years and walked out with call records instead of money. Four waves, one very late detection, and a hard lesson about monitoring you have not deployed yet.",
    track: "blue",
    role: "Threat research and write-up",
    tools: ["MITRE ATT&CK", "OSINT", "Vendor reporting"],
    period: "August 2026",
    pdf: "/reports/operation-soft-cell.pdf",
    metricsLabel: "The campaign in numbers",
    metrics: [
      { value: "4", label: "waves over two years" },
      { value: "200M", label: "people affected" },
      { value: "100 GB", label: "records per session" },
      { value: "48 hrs", label: "to detection, once tooling existed" },
    ],
    sections: [
      {
        title: "What they were after",
        blocks: [
          {
            kind: "p",
            text: "Cybereason disclosed Operation Soft Cell in June 2019. It had been running against telecom operators around the world for years before that. The activity is linked to China and tracked by Microsoft as Gallium, and most researchers put it in overlap with APT10. A Swisscom researcher later found threads running to APT41 and LuckyMouse as well. Attribution is still not settled, and I would rather leave it unsettled than pick whichever answer is tidiest.",
          },
          {
            kind: "p",
            text: "What makes this one worth studying is the target. Not passwords. Not card data. Call Detail Records, which log who called whom, when, for how long, from which handset, and through which cell tower. Enough of those and a foreign intelligence service can follow anyone on the network without ever touching their phone.",
          },
          {
            kind: "note",
            text: "A CDR is metadata. No audio, no messages. That is exactly why it scales so well as surveillance.",
          },
          {
            kind: "callout",
            title: "Why telecom, specifically",
            text: "Citizen Lab showed that cell tower logs on their own reveal where somebody lives and works, just by comparing which towers a phone talks to during office hours against the rest of the day. Bulk CDR access from one large carrier gives you that for millions of people at once. Carriers also happen to have government departments and security services sitting on their networks as customers.",
          },
        ],
      },
      {
        title: "Four waves, patient ones",
        blocks: [
          {
            kind: "p",
            text: "They were inside for at least a year before anybody deployed a tool capable of seeing them. Once monitoring went in, four separate waves surfaced across 2018 and 2019. The gaps in between were not the attackers resting. They were almost certainly still collecting.",
          },
          {
            kind: "waves",
            items: [
              {
                wave: "Wave 1",
                title: "Webshell, credentials, RAT",
                points: [
                  "Webshell on an internet-facing server",
                  "Credential theft",
                  "Remote access trojan deployed",
                  "Caught inside 48 hours of monitoring going live, webshell matched China Chopper",
                ],
              },
              {
                wave: "Wave 2",
                gap: "2 months on",
                title: "Modified webshell, fake admins",
                points: [
                  "Reworked webshell placed on an IIS server",
                  "Fake administrator accounts created to hold position",
                  "NBTScan used to map the network",
                  "Poison Ivy, hTran and web shells moving data out",
                  "A Mimikatz variant tried and blocked",
                ],
              },
              {
                wave: "Wave 3",
                gap: "3 months on",
                title: "Domain Admin",
                points: [
                  "Escalated to Domain Administrator",
                  "Lateral movement over WMI and PsExec",
                  "Exfiltration attempted through hTran",
                ],
              },
              {
                wave: "Wave 4",
                gap: "1 month on",
                title: "New infrastructure, bulk theft",
                points: [
                  "Same tooling, fresh infrastructure to get around the blocks",
                  "SoftEther VPN installed as a standing backdoor",
                  "Active Directory enumerated",
                  "Roughly 100 GB of CDR data taken per session",
                ],
              },
            ],
          },
        ],
      },
      {
        title: "How they stayed invisible",
        blocks: [
          {
            kind: "p",
            text: "Every malware family was tucked inside something that looked legitimate. A genuine McAfee binary, mcoemcpy.exe, side-loaded a malicious DLL. A signed Microsoft imaging executable did the same job for a different payload. The DeployFilter webshell registered itself as a native IIS module inside applicationHost.config, which put it out of reach of any endpoint tool watching running processes. A code-signing certificate stolen from Whizzimo, LLC made the files look trustworthy on the way in.",
          },
          {
            kind: "quote",
            text: "A tool that checks process names and file signatures would have flagged none of this. Every technique here was picked to survive exactly that check.",
          },
        ],
      },
      {
        title: "How researchers unpicked it",
        blocks: [
          {
            kind: "steps",
            items: [
              {
                title: "One string in memory",
                text: "The Swisscom work started with memory analysis of injected shellcode. The dump held C2 addresses and domains belonging to the victim. One string, GOklqoUwu, returned three results on Google. One of them was a Joe Sandbox report describing the same string as a named object created by nslookup.exe on a compromised machine. That was the thread that pulled everything else along.",
              },
              {
                title: "Poison Ivy and Phantom Creator",
                text: "Poison Ivy came in through RunHelp.exe by DLL side-loading, held open with a scheduled task, calling home to rosaf112.ddns.net. Hunting that technique surfaced Phantom Creator, a builder tool configured with a SamsungHelp run key and a SamSungHelp folder under AppData. Those details matched the Cybereason report exactly, which confirmed which builder produced the original samples.",
              },
              {
                title: "Shared infrastructure",
                text: "A PlugX sample arrived as a self-extracting RAR dropping mcoemcpy.exe, mcutil.dll and antivir.dat into ProgramData. A Trochilus sample installed into a folder called Windows Imaging Devices Network Sharing Service, and its C2 resolved to the same IP as the PlugX C2. Kaspersky's similarity engine put Trochilus at a 99% match with RedLeaves, a RAT already tied to APT10.",
              },
              {
                title: "270 samples from one config pattern",
                text: "A Gh0st RAT variant kept its configuration in the file overlay, encoded by adding 0x7A to each byte and then XOR-ing with 0x19, running as a service called Microsoft Device Manager. That pattern was unique enough to surface about 270 related samples on VirusTotal. Most of them were the attacker testing their own evasion.",
              },
              {
                title: "The certificate that pointed at APT41",
                text: "The Mimikatz variant was signed with that stolen Whizzimo certificate, issued by GoDaddy, which Mandiant had already tied to APT41. Following the certificate turned up a cluster of files uploaded from Hong Kong accounts, including a .NET dropper for the DeployFilter webshell. Once registered as a native IIS module, it could see every HTTP request hitting the server.",
              },
            ],
          },
        ],
      },
      {
        title: "The campaign against ATT&CK",
        blocks: [
          {
            kind: "p",
            text: "Laying it out across the kill chain shows the shape of the operation. Heavy spending on defence evasion and discovery. Almost nothing on impact. Nobody was trying to break anything here.",
          },
          {
            kind: "matrix",
            columns: [
              {
                tactic: "Initial Access",
                techniques: ["Exploit Public-Facing Application"],
              },
              {
                tactic: "Execution",
                techniques: [
                  "Command-Line Interface",
                  "Windows Management Instrumentation",
                  "PowerShell",
                ],
              },
              { tactic: "Persistence", techniques: ["Web Shell", "Create Account"] },
              {
                tactic: "Privilege Escalation",
                techniques: ["Valid Accounts", "Web Shell"],
              },
              {
                tactic: "Defense Evasion",
                techniques: [
                  "DLL Side-Loading",
                  "Indicator Removal from Tools",
                  "Obfuscated Files or Information",
                  "Masquerading",
                ],
              },
              { tactic: "Credential Access", techniques: ["Credential Dumping"] },
              {
                tactic: "Discovery",
                techniques: [
                  "System Network Configuration Discovery",
                  "Remote System Discovery",
                  "Account Discovery",
                  "Permission Groups Discovery",
                ],
              },
              {
                tactic: "Lateral Movement",
                techniques: [
                  "Windows Admin Shares",
                  "Pass the Hash",
                  "Remote File Copy",
                ],
              },
              {
                tactic: "Collection",
                techniques: [
                  "Data from Local System",
                  "Data Staged",
                  "Input Capture",
                ],
              },
              {
                tactic: "Command & Control",
                techniques: ["Remote File Copy", "Connection Proxy"],
              },
              {
                tactic: "Exfiltration",
                techniques: ["Data Compressed", "Exfiltration Over C2 Channel"],
              },
            ],
          },
        ],
      },
      {
        title: "What I concluded",
        blocks: [
          {
            kind: "p",
            text: "The tooling, the infrastructure, the certificates and the choice of victim all point at Chinese state-sponsored activity connected to APT10, APT41 and LuckyMouse. Whether that means one group wearing several names, separate teams sharing a toolkit, or contractors working for different customers inside the same structure, I cannot tell you. Neither could the researchers who did the original work.",
          },
          {
            kind: "p",
            text: "For an operation this careful, the mistakes were surprisingly ordinary. Victim domains left sitting in shellcode memory. C2 servers reused across malware families. Builder tools and test samples uploaded to VirusTotal from Hong Kong accounts. Those slips are the whole reason anyone could connect the campaigns to each other.",
          },
          {
            kind: "note",
            text: "Worth remembering when a report makes an adversary sound superhuman. They were good. They were not careful.",
          },
          {
            kind: "quote",
            text: "A year of undetected access, then detection in 48 hours. The entire gap is explained by nobody having deployed a tool yet, not by anything the attackers did.",
          },
        ],
      },
      {
        title: "What I would tell a defender",
        blocks: [
          {
            kind: "list",
            items: [
              "Start with servers running email and web on the same machine. That configuration is one these attackers specifically went after.",
              "Look at operational network segments on their own. They are almost always the less-monitored half of the estate.",
              "Read applicationHost.config on every IIS server and check the registered native modules for odd paths or unsigned DLLs.",
              "Go through scheduled tasks and registry run keys for anything named after a consumer hardware brand or a Windows service that is not actually installed.",
              "Flag processes running out of AppData or ProgramData with names that do not match anything you deployed.",
              "Alert on DNS going to dynamic DNS providers, .ddns.net and .myftp.biz especially.",
              "Alert on VPN software appearing that nobody asked for. SoftEther above all.",
              "Put the real controls at the database. Limit which accounts can run large CDR queries, alert past a record threshold, apply DLP to exports, audit the access logs. None of that stops the break-in. It would have gutted what waves 3 and 4 could carry out.",
            ],
          },
        ],
      },
    ],
  },

  // ------------------------------------------------------------------
  {
    slug: "sumo-logic-siem",
    file: "02",
    title: "Sumo Logic SIEM deployment",
    kicker: "Detection, end to end",
    summary:
      "A cloud SIEM installed against my own Windows VM on AWS, logs proven to be flowing, then ten deliberately wrong RDP passwords to check the platform would actually catch something.",
    track: "both",
    role: "Deployment and validation",
    tools: ["Sumo Logic", "AWS EC2", "Windows Server", "RDP"],
    period: "August 2026",
    pdf: "/reports/sumo-logic-siem-deployment.pdf",
    metrics: [
      { value: "149", label: "security events searchable" },
      { value: "10", label: "failed logons caught" },
      { value: "3", label: "Windows channels ingested" },
      { value: "4625", label: "the code that proved it" },
    ],
    sections: [
      {
        title: "Why bother doing it myself",
        blocks: [
          {
            kind: "p",
            text: "Sumo Logic is a cloud SIEM. It pulls logs off servers, applications and cloud services into one place so an analyst can search and alert on them instead of walking machine to machine. Reading that sentence takes ten seconds. Doing it takes an afternoon, and the afternoon is where you find out what the documentation left out.",
          },
          {
            kind: "p",
            text: "So I ran the whole loop on my own kit: install the collector, attach a source, confirm data is arriving, search it, then generate something worth catching. The environment was a Windows Server instance on AWS EC2 that I reached over RDP.",
          },
        ],
      },
      {
        title: "Getting the collector on",
        blocks: [
          {
            kind: "steps",
            items: [
              {
                title: "Add an installed collector",
                text: "Data Management, then Collection, then Add Collector. Picked the Windows installed collector to match the VM.",
              },
              {
                title: "Generate an access key",
                text: "The agent needs an Access ID and key to authenticate back to the account. Created one, then installed the Windows agent on the VM over RDP using it.",
              },
              {
                title: "Confirm it is healthy",
                text: "The collector registered and came back Healthy, which means the agent can reach Sumo Logic and is waiting for a source.",
              },
            ],
          },
          {
            kind: "shot",
            src: "/shots/sumo-source-types.jpg",
            alt: "Sumo Logic data collection screen showing platform and Windows source types available for the installed collector",
            caption:
              "Source types offered once the collector registered. Windows Event Log, Active Directory Inventory and Performance sit under the platform sources.",
            width: 900,
            height: 564,
          },
        ],
      },
      {
        title: "Getting logs to move",
        blocks: [
          {
            kind: "p",
            text: "A collector on its own sends nothing. It needs a source attached, which is the step that catches people out. I chose Windows Event Log, scoped it to the Security, Application and System channels, and left the allow and deny lists empty so nothing was filtered before it reached the index.",
          },
          {
            kind: "shot",
            src: "/shots/sumo-event-source-config.jpg",
            alt: "Windows Event Log source configuration with Security, Application and System channels selected",
            caption:
              "Source configuration. Standard event channels selected, legacy collection format, no filtering.",
            width: 900,
            height: 722,
          },
          {
            kind: "p",
            text: "Live Tail showed events landing with almost no delay. A search on _sourceCategory=windows/security came back with 149 results carrying real event codes: 4624 for a successful logon, 4634 for a logoff, 4672 for special privileges assigned.",
          },
          {
            kind: "note",
            text: "4672 firing on every admin logon is normal. It is also the one people misread as an incident on their first week.",
          },
          {
            kind: "shot",
            src: "/shots/sumo-live-tail.jpg",
            alt: "Sumo Logic Live Tail streaming Windows security events in real time",
            caption:
              "Live Tail streaming Win32_NTLogEvent records as they were written on the VM.",
            width: 900,
            height: 564,
          },
          {
            kind: "shot",
            src: "/shots/sumo-log-search.jpg",
            alt: "Sumo Logic log search returning 149 results for the windows/security source category",
            caption:
              "Log Search on the windows/security source category. 149 results, with the histogram showing ingestion across the window.",
            width: 900,
            height: 564,
          },
        ],
      },
      {
        title: "Making it catch something",
        blocks: [
          {
            kind: "p",
            text: "Ingestion working and detection working are two different claims. To test the second one I typed the wrong RDP password several times before logging in properly. It is the crudest signature there is, and it is still the one that shows up in real alerts.",
          },
          {
            kind: "p",
            text: "Sumo Logic recorded it as EventCode 4625, Audit Failure, ten times, followed by the successful logon. Failed attempts clustered on one host and then a success is precisely the shape a Tier 1 analyst is paid to look at.",
          },
          {
            kind: "shot",
            src: "/shots/sumo-failed-logons-4625.jpg",
            alt: "Sumo Logic search filtered to EventCode 4625 showing ten failed logon audit failure events",
            caption:
              "Searching windows/security for EventCode 4625. Ten audit failures from the simulated attempt.",
            width: 1080,
            height: 676,
          },
          {
            kind: "chips",
            label: "Event codes I worked with",
            items: [
              { code: "4624", name: "Successful logon" },
              { code: "4625", name: "Failed logon" },
              { code: "4634", name: "Logoff" },
              { code: "4672", name: "Special privileges assigned" },
            ],
          },
        ],
      },
      {
        title: "Where that leaves me",
        blocks: [
          {
            kind: "p",
            text: "At the end of it I had a collector pulling live Windows security logs off an AWS VM, proof the data was searchable, and a genuine suspicious event sitting in the console waiting to be triaged. Deploy, attach, verify, search, detect. A real SOC runs a bigger version of the same loop.",
          },
          {
            kind: "p",
            text: "I also worked through the Sumo Logic Academy onboarding track, which covers collection, search syntax and dashboards.",
          },
        ],
      },
    ],
  },

  // ------------------------------------------------------------------
  {
    slug: "okta-iam-lab",
    file: "03",
    title: "Okta IAM lab",
    kicker: "Identity and access",
    summary:
      "Five assignments taking an empty tenant to a domain-joined Windows Server syncing through an Okta agent, with MFA enforced at the end. The parts that failed are the parts I learned from.",
    track: "ops",
    role: "Build, integrate, debug",
    tools: ["Okta", "Windows Server", "AD DS", "AWS EC2", "Slack"],
    period: "August 2026",
    pdf: "/reports/okta-iam-lab.pdf",
    metrics: [
      { value: "5", label: "assignments" },
      { value: "lab.local", label: "domain built from nothing" },
      { value: "3", label: "failures debugged" },
      { value: "MFA", label: "enforced and tested" },
    ],
    sections: [
      {
        title: "Why identity is worth the time",
        blocks: [
          {
            kind: "p",
            text: "Okta is what companies use to run logins, accounts and access across every app they own. Sit on an IT support queue for a week and you notice how much of it is really identity work. Somebody cannot sign in. Somebody joined. Somebody left and still has access to a tool nobody remembers buying.",
          },
          {
            kind: "p",
            text: "I wanted to do that lifecycle rather than read about it, so I started from an empty tenant on the free plan.",
          },
          {
            kind: "shot",
            src: "/shots/okta-admin-dashboard.jpg",
            alt: "Okta Admin Console dashboard showing overview, tasks, org changes and security monitoring",
            caption:
              "Day one. No users, no groups, no applications. Everything after this is something I put there.",
            width: 1500,
            height: 938,
          },
        ],
      },
      {
        title: "Users, groups, and the first login",
        blocks: [
          {
            kind: "p",
            text: "Created two accounts with temporary passwords set to force a change at first login, made a group called IT-Students, and put both in it. Then I opened a private window, signed in as the first user, and Okta stopped me and made me set a new password before it let me through. Which is the point.",
          },
          {
            kind: "shot",
            src: "/shots/okta-group-members.jpg",
            alt: "Okta group page for IT-Students showing two member accounts with expired passwords",
            caption:
              "The IT-Students group with both test accounts assigned. Addresses blacked out, they are live aliases.",
            width: 1500,
            height: 938,
          },
          {
            kind: "callout",
            title: "This is a new hire, day one",
            text: "Create the account, drop them in the right group, hand over a temporary password, force the change. Four steps. A surprising share of IT support pain traces back to one of them being skipped.",
          },
        ],
      },
      {
        title: "Giving people apps",
        blocks: [
          {
            kind: "p",
            text: "Added Slack from the catalogue, then assigned it two ways on purpose: directly to one user, and to the IT-Students group so the second user inherited it. Signed in as a student afterwards and the tile was sitting on their dashboard.",
          },
          {
            kind: "p",
            text: "Direct assignment is fine for one person. At fifty it is a maintenance problem and at five hundred it is a breach waiting to happen, because nobody remembers to remove it. Group assignment is the only version that survives contact with a real company.",
          },
        ],
      },
      {
        title: "Wiring Okta into on-premise Active Directory",
        blocks: [
          {
            kind: "p",
            text: "This assignment needed a Windows Server that was genuinely part of a domain, so I used the VM already running on AWS for other lab work. An Okta AD Agent is a small program that sits inside the company network and bridges it to Okta without putting the directory on the internet.",
          },
          {
            kind: "steps",
            items: [
              {
                title: "Install AD DS",
                text: "Added the Active Directory Domain Services role so the server could manage accounts for a network.",
              },
              {
                title: "Promote to domain controller",
                text: "Promoted the server and created lab.local. The prerequisite check passed with the DNS delegation warning you always get when there is no authoritative parent zone.",
              },
              {
                title: "Install and activate the agent",
                text: "Pulled the agent installer out of the Admin Console, let it create an OktaService account to run under, and activated it with a code from the console.",
              },
              {
                title: "Check it took",
                text: "Back to Directory Integrations. Agent reporting Active against lab.local.",
              },
            ],
          },
          {
            kind: "shot",
            src: "/shots/ad-ds-prerequisites.jpg",
            alt: "Active Directory Domain Services configuration wizard prerequisites check passing on the target server",
            caption:
              "Domain controller promotion. Prerequisites passed, with the expected DNS delegation warning.",
            width: 1200,
            height: 880,
          },
          {
            kind: "shot",
            src: "/shots/okta-ad-agent-active.jpg",
            alt: "Okta directory integration page showing the lab.local AD agent operational with a live connection",
            caption: "Agent Monitors. Operational, connection live, running against lab.local.",
            width: 1500,
            height: 938,
          },
          {
            kind: "note",
            text: "The activation code is good for a few minutes. Have the browser tab open before you finish the installer.",
          },
          {
            kind: "callout",
            title: "Three things went wrong, and that is the useful part",
            text: "The installer failed first time because the server was not part of a domain yet. Then the agent tried to create a service account that already existed. Then my activation code expired while I was reading the next step, so I pulled a fresh one and moved faster. Nothing in a lab teaches you as much as the step that refuses to work.",
          },
        ],
      },
      {
        title: "Turning MFA on",
        blocks: [
          {
            kind: "p",
            text: "Checked that Okta Verify and Password were both enabled under Authenticators, then wrote an authentication policy requiring a password and a second factor together. Opened a private window, signed in as a student, and the rule fired. Okta held the login and asked for a security method before letting it through.",
          },
          {
            kind: "shot",
            src: "/shots/okta-mfa-challenge.jpg",
            alt: "Okta MFA challenge screen asking the user to verify with Okta Verify or password",
            caption: "The policy doing its job mid-login. Account address blacked out.",
            width: 940,
            height: 1048,
          },
          {
            kind: "quote",
            text: "Ten minutes of configuration turns a stolen password from an incident into an inconvenience.",
          },
        ],
      },
    ],
  },

  // ------------------------------------------------------------------
  {
    slug: "ibm-x-force",
    file: "04",
    title: "IBM X-Force threat intelligence",
    kicker: "Platform investigation",
    summary:
      "A sweep through a commercial threat intel platform. Malware domains, spam infrastructure, critical CVEs, threat groups and freshly registered phishing domains, plus what to make of a lookup that comes back empty.",
    track: "blue",
    role: "Threat intelligence analysis",
    tools: ["IBM X-Force Exchange", "WHOIS", "Passive DNS", "MITRE ATT&CK"],
    period: "August 2026",
    pdf: "/reports/ibm-x-force-threat-intelligence.pdf",
    metrics: [
      { value: "10", label: "spam and botnet IPs" },
      { value: "3", label: "critical CVEs" },
      { value: "3", label: "threat groups" },
      { value: "9.1+", label: "CVSS on every CVE reviewed" },
    ],
    sections: [
      {
        title: "The platform",
        blocks: [
          {
            kind: "p",
            text: "X-Force Exchange is IBM Security's threat intelligence platform. It runs on IBM's own telemetry, which they put at over 150 billion security events a day across more than 130 countries, mixed with whatever the community contributes. You get IP and URL reputation, malware profiles, CVEs with CVSS scoring, threat group pages and shared Collections where people post indicators.",
          },
          {
            kind: "p",
            text: "The feature I would actually use day to day is Early Warning, which flags newly registered phishing domains before the campaign starts. It also exports STIX 2 straight into a SIEM, which is the difference between intelligence you read and intelligence you act on.",
          },
        ],
      },
      {
        title: "Three domains, two of them empty",
        blocks: [
          {
            kind: "p",
            text: "I looked up three malware-linked domains. Two came back with almost nothing on them, and working out why is most of the exercise.",
          },
          {
            kind: "table",
            head: ["Domain", "What came back", "What I read into it"],
            rows: [
              [
                "tofsee.com",
                "Risk unknown, no DNS records, no malware associations",
                "Tofsee has been a spam botnet and email worm since around 2013. An empty page means either law enforcement already pulled the servers, or the history is sitting behind the paid tier.",
              ],
              [
                "emotet.com",
                "Categorised as spam URLs, US registrant on the WHOIS",
                "Spam entries running back to 2016, a 100% spam rating in November 2017 and actor analysis in March 2020. That lines up with Emotet's busiest stretch, right up to Europol taking it down in January 2021.",
              ],
              [
                "qakbot.com",
                "Risk unknown, no DNS records",
                "QakBot ran as a banking trojan and ransomware loader from about 2007 until August 2023, when US and EU law enforcement seized the infrastructure under Operation Duck Hunt. Nothing current is what you would expect.",
              ],
            ],
          },
          {
            kind: "note",
            text: "The recent registration date on emotet.com is almost certainly researchers holding the domain. Reading it as a comeback would be the easy mistake.",
          },
        ],
      },
      {
        title: "Vulnerabilities worth losing sleep over",
        blocks: [
          {
            kind: "p",
            text: "Three Critical CVEs through the vulnerabilities tool. All score 9.1 or above, all have vendor fixes out, and all sit on the edge of the network where nobody wants a bug.",
          },
          {
            kind: "table",
            head: ["CVE", "CVSS", "Affected", "What it gets you"],
            monoCols: [0, 1],
            rows: [
              [
                "CVE-2026-0257",
                "9.1",
                "PAN-OS 10.2 to 12.1, GlobalProtect, Cloud NGFW",
                "Authentication bypass. A remote attacker sets up VPN connections with no credentials and no help from a user. Listed in CISA KEV, patch available.",
              ],
              [
                "CVE-2024-21762",
                "9.8",
                "FortiOS 6.0.0 to 7.0.0, sslvpnd",
                "Out-of-bounds write in the SSL-VPN daemon giving remote code execution through a crafted HTTP request. Public exploits exist and it is being used in the FortiBleed campaign. Listed in CISA KEV.",
              ],
              [
                "CVE-2024-3400",
                "10.0",
                "PAN-OS 9.0 to 11.1, GlobalProtect",
                "Command injection handing an unauthenticated attacker the whole system. Scope changed, every impact rated High, exploited in the wild.",
              ],
            ],
          },
          {
            kind: "quote",
            text: "Three critical bugs, three vendor patches already shipped. Exposure here is not a discovery problem. It is a patching problem.",
          },
        ],
      },
      {
        title: "Who is behind the traffic",
        blocks: [
          {
            kind: "steps",
            items: [
              {
                title: "ITG23, also called Wizard Spider",
                text: "Financially driven, Russia and Eastern Europe, active since around 2016. Started with TrickBot as a banking trojan and grew into a ransomware-for-hire business running Ryuk and Conti. Malware includes TrickBot, BazarLoader, Ryuk, Conti and Anchor. Techniques worth knowing: T1566 phishing, T1055 process injection, T1486 data encrypted for impact, T1490 inhibit system recovery.",
              },
              {
                title: "ITG14, also called TA505",
                text: "Financially driven, Russia, active since around 2014. Sends scam email at volume into finance, healthcare and retail. Behind Clop ransomware, Dridex, the ServHelper backdoor and FlawedAmmyy RAT. Techniques: T1566.001 spearphishing attachment, T1204.002 malicious file, T1219 remote access software, T1486.",
              },
              {
                title: "Lazarus Group, also called Hidden Cobra",
                text: "North Korean state-backed, working under the Reconnaissance General Bureau, active since around 2009. Runs on both espionage and revenue, which is why crypto exchanges keep showing up as targets. Malware includes FALLCHILL, HOPLIGHT, AppleJeus, BlindingCan and WannaCry. Their indicator list includes fake crypto installers and fake job offer documents aimed at people working in defence, which is a genuinely nasty piece of social engineering.",
              },
            ],
          },
          {
            kind: "chips",
            label: "Techniques all three groups share",
            items: [
              { code: "T1566", name: "Phishing" },
              { code: "T1055", name: "Process Injection" },
              { code: "T1486", name: "Data Encrypted for Impact" },
              { code: "T1490", name: "Inhibit System Recovery" },
              { code: "T1195", name: "Supply Chain Compromise" },
              { code: "T1059", name: "Command and Scripting Interpreter" },
              { code: "T1219", name: "Remote Access Software" },
            ],
          },
        ],
      },
      {
        title: "Where the bad traffic lives",
        blocks: [
          {
            kind: "p",
            text: "Ten IPs tied to spam or botnet activity, run through IP reputation. The high-risk ones cluster where you would guess: bulletproof hosting and jurisdictions that do not answer abuse mail.",
          },
          {
            kind: "table",
            head: ["Address", "Risk", "Host and country", "Seen doing"],
            monoCols: [0],
            rows: [
              ["185.220.101.45", "High", "ForPrivacyNET, Germany", "Known Tor exit node"],
              ["91.92.109.142", "High", "VPSBG, Bulgaria", "Bulletproof hosting, spam and botnet"],
              ["193.32.162.157", "High", "Selectel, Russia", "Botnet campaigns reported 2024"],
              ["45.142.212.100", "High", "Serverius, Netherlands", "Emotet C2 node, 2022"],
              ["195.123.240.77", "High", "ITL, Ukraine", "Phorpiex sextortion campaign, 2024"],
              ["194.165.16.11", "High", "IPSERVER, Russia", "QakBot operations before the takedown"],
              ["85.209.11.23", "High", "Leaseweb, Netherlands", "TrickBot delivery proxy, 2022"],
              ["134.199.134.80", "Unknown", "DigitalOcean, US", "Unsuspicious, but trending on the platform"],
            ],
          },
        ],
      },
      {
        title: "Phishing, caught early",
        blocks: [
          {
            kind: "p",
            text: "Early Warning flags copycat domains as soon as they are registered, before the mail goes out. I went through three reports.",
          },
          {
            kind: "list",
            items: [
              "Allstate. Lookalikes such as allstate-login[.]com and allstate-secure-account[.]net built to collect insurance portal credentials, flagged shortly after registration and well before most security tools were blocking them.",
              "Netflix. netflix-billing[.]com and netflix-account-verify[.]net paired with fake account-suspension mail to harvest logins and card details, registered days before the campaign started.",
              "Nasdaq. nasdaq-login[.]com going after retail investor accounts, published the same day as the Netflix set.",
            ],
          },
          {
            kind: "note",
            text: "Same publish date across two unrelated brands reads to me like one operation, not a coincidence.",
          },
          {
            kind: "p",
            text: "Well-known financial names keep coming back around because a compromised trading account is worth more than a compromised streaming account, and the phishing kit costs the same either way.",
          },
        ],
      },
    ],
  },
];

export const sideProjects = [
  {
    title: "Privacy risks in generative and agentic AI",
    kicker: "Research",
    period: "2025 to 2026",
    summary:
      "A literature review over 90 sources looking at what actually leaks when people use AI systems. I ran five major platforms against ATT&CK and the Cyber Kill Chain to map the attack surface, found six places where GDPR, CCPA and the DPDP Act do not reach, and built a three-tier framework for protecting yourself while the law catches up.",
    meta: "Submitted to ICTCon 2026, IIT Goa and NFSU, Springer CCIS. Still under review.",
  },
  {
    title: "Privacy Policy Generator",
    kicker: "Compliance automation",
    period: "2024 to 2025",
    summary:
      "Regulatory text goes in, structured documentation comes out, covering GDPR, CCPA and PIPEDA. Built around privacy by design, exporting to PDF, Word and HTML so the output lands in whatever process a company is already running rather than sitting in a folder.",
    meta: "GDPR, CCPA, PIPEDA",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function projectNeighbours(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1) return { prev: undefined, next: undefined };
  return {
    prev: i > 0 ? projects[i - 1] : projects[projects.length - 1],
    next: i < projects.length - 1 ? projects[i + 1] : projects[0],
  };
}
