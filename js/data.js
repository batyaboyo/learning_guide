const careerData = {
    plans: {
        A: {
            id: 'planA',
            title: 'Cybersecurity Path',
            subtitle: 'SOC → Pentesting → Red Teaming',
            color: '#DC143C',
            icon: '🛡️',
            phases: [
                {
                    id: 'p1',
                    title: 'Phase 1: SOC Analyst Foundations',
                    duration: 'Months 1-4',
                    resources: [
                        { name: 'TryHackMe SOC Level 1 Path', url: 'https://tryhackme.com/path/outline/soclevel1', type: 'Course', platform: 'TryHackMe' },
                        { name: 'TryHackMe Cyber Defense', url: 'https://tryhackme.com/path/outline/cyberdefense', type: 'Course', platform: 'TryHackMe' },
                        { name: 'LetsDefend SOC Analyst Learning Path', url: 'https://letsdefend.io/training', type: 'Course', platform: 'LetsDefend' },
                        { name: 'Cybrary SOC Analyst', url: 'https://www.cybrary.it', type: 'Course', platform: 'Cybrary' },
                        { name: 'Blue Team Labs Online', url: 'https://blueteamlabs.online', type: 'Lab', platform: 'BTLO' },
                        { name: 'Immersive Labs (Community)', url: 'https://www.immersivelabs.com', type: 'Lab', platform: 'Immersive Labs' },
                        { name: 'SANS Cyber Aces', url: 'https://www.cyberaces.org', type: 'Course', platform: 'SANS' },
                        { name: 'Professor Messer Security+ (YouTube)', url: 'https://www.youtube.com/playlist?list=PLG49S3nxzAnkL2ulTSqvMrbCdISPNK9Pr', type: 'Video', platform: 'YouTube' },
                        { name: 'Security Blue Team BTL1 Free', url: 'https://www.securityblue.team', type: 'Course', platform: 'SBT' },
                        { name: 'Splunk Fundamentals', url: 'https://www.splunk.com/en_us/training.html', type: 'Course', platform: 'Splunk' },
                        { name: 'Microsoft Learn Security', url: 'https://learn.microsoft.com/en-us/training/browse/?terms=security', type: 'Course', platform: 'Microsoft' },
                        { name: 'John Hammond', url: 'https://www.youtube.com/@_JohnHammond', type: 'Video', platform: 'YouTube' },
                        { name: 'NetworkChuck', url: 'https://www.youtube.com/@NetworkChuck', type: 'Video', platform: 'YouTube' },
                        { name: 'David Bombal', url: 'https://www.youtube.com/@davidbombal', type: 'Video', platform: 'YouTube' },
                        { name: 'Black Hills Information Security', url: 'https://www.youtube.com/@BlackHillsInformationSecurity', type: 'Video', platform: 'YouTube' }
                    ]
                },
                {
                    id: 'p2',
                    title: 'Phase 2: Penetration Testing',
                    duration: 'Months 5-8',
                    resources: [
                        { name: 'TryHackMe Jr Penetration Tester', url: 'https://tryhackme.com/path/outline/jrpenetrationtester', type: 'Course', platform: 'TryHackMe' },
                        { name: 'TryHackMe Offensive Pentesting', url: 'https://tryhackme.com/path/outline/pentesting', type: 'Course', platform: 'TryHackMe' },
                        { name: 'HackTheBox Academy (Free)', url: 'https://academy.hackthebox.com', type: 'Course', platform: 'HTB' },
                        { name: 'PortSwigger Web Security Academy', url: 'https://portswigger.net/web-security', type: 'Lab', platform: 'PortSwigger' },
                        { name: 'PicoCTF', url: 'https://picoctf.org', type: 'CTF', platform: 'PicoCTF' },
                        { name: 'OverTheWire Wargames', url: 'https://overthewire.org/wargames', type: 'CTF', platform: 'OverTheWire' },
                        { name: 'Pwn College', url: 'https://pwn.college', type: 'Course', platform: 'Pwn College' },
                        { name: 'Hack This Site', url: 'https://www.hackthissite.org', type: 'Lab', platform: 'HTS' },
                        { name: 'OWASP Testing Guide', url: 'https://owasp.org/www-project-web-security-testing-guide', type: 'Book', platform: 'OWASP' },
                        { name: 'HackTricks', url: 'https://book.hacktricks.xyz', type: 'Book', platform: 'GitBook' },
                        { name: 'IppSec', url: 'https://www.youtube.com/@ippsec', type: 'Video', platform: 'YouTube' },
                        { name: 'LiveOverflow', url: 'https://www.youtube.com/@LiveOverflow', type: 'Video', platform: 'YouTube' },
                        { name: 'HackerSploit', url: 'https://www.youtube.com/@HackerSploit', type: 'Video', platform: 'YouTube' }
                    ]
                },
                {
                    id: 'p3',
                    title: 'Phase 3: Red Teaming',
                    duration: 'Months 9-12',
                    resources: [
                        { name: 'TryHackMe Red Team Path', url: 'https://tryhackme.com/path/outline/redteaming', type: 'Course', platform: 'TryHackMe' },
                        { name: 'RangeForce Community', url: 'https://www.rangeforce.com', type: 'Lab', platform: 'RangeForce' },
                        { name: 'Active Directory Security', url: 'https://adsecurity.org', type: 'Blog', platform: 'ADSecurity' },
                        { name: 'MITRE ATT&CK Navigator', url: 'https://mitre-attack.github.io/attack-navigator', type: 'Tool', platform: 'MITRE' },
                        { name: 'Red Team Field Manual (RTFM)', url: '#', type: 'Book', platform: 'Amazon' },
                        { name: 'The Cyber Mentor Red Team Series', url: 'https://www.youtube.com/@TCMSecurityAcademy', type: 'Video', platform: 'YouTube' }
                    ]
                }
            ]
        },
        B: {
            id: 'planB',
            title: 'Django Full-Stack Dev',
            subtitle: 'Python → Django → Full Stack',
            color: '#10B981',
            icon: '🐍',
            phases: [
                {
                    id: 'p1',
                    title: 'Month 1: Python & Web Foundations',
                    duration: 'Month 1',
                    resources: [
                        { name: 'Python for Everybody (Dr. Chuck)', url: 'https://www.py4e.com', type: 'Course', platform: 'Py4E' },
                        { name: 'freeCodeCamp Python', url: 'https://www.freecodecamp.org/learn/scientific-computing-with-python', type: 'Course', platform: 'freeCodeCamp' },
                        { name: 'Automate the Boring Stuff', url: 'https://automatetheboringstuff.com', type: 'Book', platform: 'Web' },
                        { name: 'Google Python Class', url: 'https://developers.google.com/edu/python', type: 'Course', platform: 'Google' },
                        { name: 'Real Python', url: 'https://realpython.com', type: 'Blog', platform: 'Real Python' },
                        { name: 'Corey Schafer Python', url: 'https://www.youtube.com/@coreyms', type: 'Video', platform: 'YouTube' },
                        { name: 'Tech With Tim', url: 'https://www.youtube.com/@TechWithTim', type: 'Video', platform: 'YouTube' },
                        { name: 'Programming with Mosh', url: 'https://www.youtube.com/@programmingwithmosh', type: 'Video', platform: 'YouTube' }
                    ]
                },
                {
                    id: 'p2',
                    title: 'Month 2: Django Core Development',
                    duration: 'Month 2',
                    resources: [
                        { name: 'Official Django Tutorial', url: 'https://docs.djangoproject.com/en/stable/intro/tutorial01', type: 'Doc', platform: 'Django' },
                        { name: 'Django for Everybody', url: 'https://www.dj4e.com', type: 'Course', platform: 'DJ4E' },
                        { name: 'Django Girls Tutorial', url: 'https://tutorial.djangogirls.org', type: 'Course', platform: 'Django Girls' },
                        { name: 'Mozilla Django Tutorial', url: 'https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django', type: 'Doc', platform: 'MDN' },
                        { name: 'Dennis Ivy Django', url: 'https://www.youtube.com/@DennisIvy', type: 'Video', platform: 'YouTube' },
                        { name: 'Traversy Media', url: 'https://www.youtube.com/@TraversyMedia', type: 'Video', platform: 'YouTube' },
                        { name: 'Coding Entrepreneurs', url: 'https://www.youtube.com/@CodingEntrepreneurs', type: 'Video', platform: 'YouTube' },
                        { name: 'Pretty Printed', url: 'https://www.youtube.com/@PrettyPrintedTutorials', type: 'Video', platform: 'YouTube' }
                    ]
                },
                {
                    id: 'p3',
                    title: 'Month 3: Full-Stack & Modern Web',
                    duration: 'Month 3',
                    resources: [
                        { name: 'Django REST Framework', url: 'https://www.django-rest-framework.org/tutorial/quickstart', type: 'Doc', platform: 'DRF' },
                        { name: 'JavaScript.info', url: 'https://javascript.info', type: 'Course', platform: 'Web' },
                        { name: 'The Odin Project', url: 'https://www.theodinproject.com', type: 'Course', platform: 'Odin' },
                        { name: 'Full Stack Open', url: 'https://fullstackopen.com/en', type: 'Course', platform: 'Helsinki U' },
                        { name: 'MDN Web Docs', url: 'https://developer.mozilla.org', type: 'Doc', platform: 'MDN' },
                        { name: 'React Documentation', url: 'https://react.dev', type: 'Doc', platform: 'React' },
                        { name: 'Docker for Beginners', url: 'https://docker-curriculum.com', type: 'Course', platform: 'Docker' }
                    ]
                }
            ]
        },
        C: {
            id: 'planC',
            title: 'IT & Security Support',
            subtitle: 'A+ → Networking → System Admin',
            color: '#3B82F6',
            icon: '🔧',
            phases: [
                {
                    id: 'p1',
                    title: 'IT Foundations',
                    duration: 'Ongoing',
                    resources: [
                        { name: 'Professor Messer A+', url: 'https://www.professormesser.com/free-a-plus-training/220-1101/220-1101-video/220-1101-training-course', type: 'Course', platform: 'Professor Messer' },
                        { name: 'Google IT Support Certificate', url: 'https://www.coursera.org/professional-certificates/google-it-support', type: 'Course', platform: 'Coursera' },
                        { name: 'Microsoft Learn', url: 'https://learn.microsoft.com/en-us/training', type: 'Course', platform: 'Microsoft' },
                        { name: 'Cisco Networking Academy', url: 'https://www.netacad.com', type: 'Course', platform: 'Cisco' },
                        { name: 'Linux Foundation Free Courses', url: 'https://training.linuxfoundation.org/resources', type: 'Course', platform: 'Linux FDN' },
                        { name: 'PowerCert Animated Videos', url: 'https://www.youtube.com/@PowerCertAnimatedVideos', type: 'Video', platform: 'YouTube' },
                        { name: 'Linux Journey', url: 'https://linuxjourney.com', type: 'Course', platform: 'Web' },
                        { name: 'Eli the Computer Guy', url: 'https://www.youtube.com/@Elithecomputerguypage', type: 'Video', platform: 'YouTube' },
                        { name: 'Techquickie', url: 'https://www.youtube.com/@techquickie', type: 'Video', platform: 'YouTube' },
                        { name: 'CBT Nuggets', url: 'https://www.youtube.com/@cbtnuggets', type: 'Video', platform: 'YouTube' }
                    ]
                }
            ]
        }
    },
    uganda: {
        communities: [
            { name: 'Innovation Village (Ntinda)', url: 'https://innovationvillage.co.ug' },
            { name: 'Outbox Hub', url: 'https://outbox.co.ug' },
            { name: 'Hive Colab', url: 'http://www.hivecolab.org' },
            { name: 'Refactory Academy', url: 'https://refactory.ug' },
            { name: 'PyLadies Kampala', url: '#' },
            { name: 'Google Developer Groups Kampala', url: '#' }
        ],
        jobs: [
            { name: 'BrighterMonday Uganda', url: 'https://www.brightermonday.co.ug' },
            { name: 'Fuzu Uganda', url: 'https://www.fuzu.com/ug' },
            { name: 'LinkedIn Jobs Uganda', url: 'https://www.linkedin.com/jobs' },
            { name: 'Remote African Jobs', url: 'https://remoteafrican.com' }
        ]
    },
    projects: [
        // --- PLAN A: CYBERSECURITY ---
        // SOC Analyst
        {
            id: 1, plan: 'A', name: 'Home Network Security Monitor',
            difficulty: 'Beginner', time: '2-3 days',
            desc: 'Set up Wireshark to monitor your home network traffic, identify all connected devices, and create a security report.',
            skills: ['Network analysis', 'packet inspection', 'documentation'],
            tools: ['Wireshark', 'network mapping tools'],
            income: '50k-200k UGX', portfolio: 'Shows basic security awareness',
            steps: ['Install Wireshark and Nmap', 'Map local network devices', 'Capture 15mins of traffic', 'Analyze HTTP/DNS traffic', 'Document findings']
        },
        {
            id: 2, plan: 'A', name: 'Security Incident Response Playbook',
            difficulty: 'Beginner', time: '3-5 days',
            desc: 'Create a comprehensive incident response plan document for a small business.',
            skills: ['Incident response', 'documentation', 'security frameworks'],
            tools: ['Word/Google Docs', 'NIST framework'],
            income: '200k-500k UGX', portfolio: 'Demonstrates knowledge of IR procedures',
            steps: ['Study NIST IR lifecycle', 'Draft Preparation phase', 'Draft Detection/Analysis protocols', 'Create communication templates', 'Finalize layout']
        },
        {
            id: 3, plan: 'A', name: 'Log Analysis Dashboard',
            difficulty: 'Intermediate', time: '1 week',
            desc: 'Build a Splunk dashboard analyzing sample security logs (Boss of the SOC dataset).',
            skills: ['SIEM', 'log analysis', 'threat detection'],
            tools: ['Splunk Free', 'BOTS dataset'],
            income: 'Demo for job interviews', portfolio: 'Shows hands-on SIEM experience',
            steps: ['Install Splunk Free', 'Ingest BOTS dataset', 'Create index patterns', 'Build visualizations for failed logins', 'Create alert thresholds']
        },
        {
            id: 4, plan: 'A', name: 'Phishing Email Analyzer',
            difficulty: 'Beginner-Intermediate', time: '3-5 days',
            desc: 'Create a tool/guide to analyze phishing emails, extract IOCs (Indicators of Compromise).',
            skills: ['Email security', 'threat intelligence'],
            tools: ['Email headers', 'VirusTotal', 'URLScan.io'],
            income: '300k-1M UGX', portfolio: 'Practical security skill',
            steps: ['Collect sample phishing emails', 'Parse email headers', 'Extract URLs and attachments', 'Check IOCs on VirusTotal', 'Write analysis report']
        },
        {
            id: 5, plan: 'A', name: 'Virtual SOC Lab Environment',
            difficulty: 'Intermediate', time: '1-2 weeks',
            desc: 'Build a complete home SOC lab with Security Onion, attacking machine, and victim machines.',
            skills: ['Virtualization', 'IDS/IPS', 'network security'],
            tools: ['VirtualBox', 'Security Onion', 'Kali Linux', 'Windows VMs'],
            income: 'Blog/YouTube tutorial monetization', portfolio: 'Shows initiative and hands-on skills',
            steps: ['Setup VirtualBox/VMware', 'Install Security Onion', 'Deploy Kali and Windows targets', 'Configure network networking', 'Test log ingestion']
        },
        {
            id: 6, plan: 'A', name: 'Threat Intelligence Report',
            difficulty: 'Intermediate', time: '1 week',
            desc: 'Research current cyber threats affecting East Africa, create professional threat intel report.',
            skills: ['Research', 'OSINT', 'technical writing'],
            tools: ['MITRE ATT&CK', 'threat intel platforms'],
            income: '500k-2M UGX', portfolio: 'Demonstrates analytical skills',
            steps: ['Identify regional threats', 'Gather OSINT data', 'Map to MITRE ATT&CK', 'Draft executive summary', 'Publish report']
        },
        {
            id: 7, plan: 'A', name: 'Security Awareness Training Program',
            difficulty: 'Beginner-Intermediate', time: '1-2 weeks',
            desc: 'Create a complete security awareness training with slides, quizzes, and phishing simulation guide.',
            skills: ['Teaching', 'social engineering awareness'],
            tools: ['PowerPoint/Google Slides', 'Canva'],
            income: '500k-3M UGX per session', portfolio: 'Shows communication skills',
            steps: ['Outline key topics', 'Design slide deck', 'Create interactive quizzes', 'Draft phishing examples', 'Package materials']
        },
        {
            id: 8, plan: 'A', name: 'Network Traffic Analysis Report',
            difficulty: 'Intermediate', time: '3-5 days',
            desc: 'Capture and analyze 24 hours of network traffic, identify anomalies, create detailed report.',
            skills: ['Packet analysis', 'threat detection'],
            tools: ['Wireshark', 'Zeek', 'NetworkMiner'],
            income: 'Freelance analysis service', portfolio: 'Real-world SOC task',
            steps: ['Configure traffic capture', 'Run for 24 hours', 'Filter for non-standard ports', 'Identify top talkers', 'Report suspicious activity']
        },
        {
            id: 9, plan: 'A', name: 'Malware Traffic Analysis',
            difficulty: 'Intermediate-Advanced', time: '1 week',
            desc: 'Analyze pcap files from Malware-Traffic-Analysis.net, identify C2 communications.',
            skills: ['Malware analysis', 'network forensics'],
            tools: ['Wireshark', 'IDS signatures'],
            income: 'Incident response consulting', portfolio: 'Advanced SOC capability',
            steps: ['Download sample PCAP', 'Identify infection vector', 'Find Command & Control IP', 'Extract malicious payload', 'Write technical writeup']
        },
        {
            id: 10, plan: 'A', name: 'Security Baseline Configuration Guide',
            difficulty: 'Beginner-Intermediate', time: '1 week',
            desc: 'Create hardening guides for Windows/Linux systems based on CIS Benchmarks.',
            skills: ['System hardening', 'compliance'],
            tools: ['CIS Benchmarks', 'PowerShell/Bash'],
            income: '300k-1M UGX', portfolio: 'Shows security best practices knowledge',
            steps: ['Select OS version', 'Review CIS Benchmarks', 'Draft configuration steps', 'Create checking script', 'Validate on VM']
        },
        // Pentesting
        {
            id: 11, plan: 'A', name: 'Personal Website Vulnerability Assessment',
            difficulty: 'Beginner', time: '2-3 days',
            desc: 'Scan your own or friend\'s website, identify vulnerabilities, create professional report.',
            skills: ['Web app testing', 'OWASP Top 10'],
            tools: ['OWASP ZAP', 'Burp Suite Community'],
            income: '500k-2M UGX per assessment', portfolio: 'Real-world pentest report',
            steps: ['Obtain permission', 'Run automated scan', 'Manual verification', 'Document findings', 'Propose remediations']
        },
        {
            id: 12, plan: 'A', name: 'DVWA Complete Walkthrough',
            difficulty: 'Beginner-Intermediate', time: '1 week',
            desc: 'Exploit all DVWA vulnerabilities at all difficulty levels, document methodology.',
            skills: ['SQL injection', 'XSS', 'CSRF', 'command injection'],
            tools: ['DVWA', 'Burp Suite', 'browser dev tools'],
            income: 'Create YouTube series (ad revenue)', portfolio: 'Demonstrates fundamental skills',
            steps: ['Setup DVWA', 'Solve Low security', 'Solve Medium security', 'Solve High security', 'Write comprehensive guide']
        },
        {
            id: 13, plan: 'A', name: 'WordPress Security Audit Tool',
            difficulty: 'Intermediate', time: '1-2 weeks',
            desc: 'Build a Python script that audits WordPress sites for common vulnerabilities.',
            skills: ['Web scraping', 'security testing', 'Python'],
            tools: ['Python', 'requests library', 'WPScan API'],
            income: '300k-1M UGX each', portfolio: 'Shows automation skills',
            steps: ['Plan tool features', 'Implement version detection', 'Check common plugins', 'Integrate WPScan API', 'Generate output report']
        },
        {
            id: 14, plan: 'A', name: 'Bug Bounty Practice Lab',
            difficulty: 'Intermediate', time: 'Ongoing',
            desc: 'Participate in bug bounty programs, document findings (even if not accepted).',
            skills: ['Real-world testing', 'report writing'],
            tools: ['HackerOne', 'BugCrowd', 'various testing tools'],
            income: 'Direct bounties ($50-$10,000+)', portfolio: 'Bug bounty profile',
            steps: ['Sign up on HackerOne', 'Select program', 'Reconnaissance', 'Vulnerability scanning', 'Report submission']
        },
        {
            id: 15, plan: 'A', name: 'Mobile App Security Assessment',
            difficulty: 'Intermediate-Advanced', time: '1-2 weeks',
            desc: 'Analyze a simple Android app, find vulnerabilities, create report.',
            skills: ['Mobile pentesting', 'reverse engineering basics'],
            tools: ['APKTool', 'Jadx', 'MobSF', 'ADB'],
            income: '1M-5M UGX', portfolio: 'Niche skill for Ugandan market',
            steps: ['Decompile APK', 'Static analysis', 'Dynamic analysis', 'Intercept traffic', 'Report issues']
        },
        {
            id: 16, plan: 'A', name: 'Custom Exploitation Scripts',
            difficulty: 'Intermediate-Advanced', time: '1-2 weeks',
            desc: 'Write Python exploits for known vulnerabilities (CVEs).',
            skills: ['Exploit development', 'Python', 'networking'],
            tools: ['Python', 'Metasploit framework'],
            income: 'Security consulting credibility', portfolio: 'Advanced technical capability',
            steps: ['Select CVE', 'Understand vulnerability', 'Write PoC in Python', 'Test against lab target', 'Refine payload']
        },
        {
            id: 17, plan: 'A', name: 'CTF Challenge Writeups',
            difficulty: 'Varies', time: 'Ongoing',
            desc: 'Solve CTF challenges, publish detailed writeups on blog/GitHub.',
            skills: ['Problem-solving', 'technical writing'],
            tools: ['Various CTF tools'],
            income: 'Build reputation, job offers', portfolio: 'Public demonstration of skills',
            steps: ['Select CTF', 'Solve challenge', 'Screenshoot steps', 'Explain methodology', 'Publish post']
        },
        {
            id: 18, plan: 'A', name: 'Network Penetration Testing Lab',
            difficulty: 'Intermediate-Advanced', time: '2-3 weeks',
            desc: 'Build multi-machine vulnerable network, perform full pentest, document.',
            skills: ['Network pentesting', 'pivoting', 'privilege escalation'],
            tools: ['VirtualBox', 'Metasploitable', 'Windows VMs', 'Kali'],
            income: '2M-10M UGX', portfolio: 'Enterprise-level testing experience',
            steps: ['Design network topology', 'Setup VMs', 'Scan network', 'Exploit entry point', 'Pivot and escalate']
        },
        {
            id: 19, plan: 'A', name: 'API Security Testing Project',
            difficulty: 'Intermediate', time: '1 week',
            desc: 'Test public APIs (or create vulnerable one), find security issues.',
            skills: ['API testing', 'authentication bypass', 'IDOR'],
            tools: ['Postman', 'Burp Suite', 'custom scripts'],
            income: 'API security consulting', portfolio: 'Modern application security',
            steps: ['Identify API endpoints', 'Test auth mechanisms', 'Check for IDOR', 'Fuzz inputs', 'Document results']
        },
        {
            id: 20, plan: 'A', name: 'Social Engineering Awareness Campaign',
            difficulty: 'Beginner-Intermediate', time: '1-2 weeks',
            desc: 'Create phishing simulation templates, awareness materials, testing framework.',
            skills: ['Social engineering', 'awareness training'],
            tools: ['GoPhish', 'email templating'],
            income: '500k-3M UGX', portfolio: 'Red team capability',
            steps: ['Setup GoPhish', 'Design email template', 'Create landing page', 'Run simulation', 'Analyze click rates']
        },
        // Red Teaming
        {
            id: 21, plan: 'A', name: 'Active Directory Attack Lab',
            difficulty: 'Advanced', time: '2-3 weeks',
            desc: 'Build AD environment, demonstrate common attack paths, create defensive recommendations.',
            skills: ['AD exploitation', 'Kerberos attacks', 'lateral movement'],
            tools: ['BloodHound', 'Mimikatz', 'Impacket', 'PowerView'],
            income: '5M-20M UGX per engagement', portfolio: 'Enterprise-critical skill',
            steps: ['Setup Domain Controller', 'Create users/groups', 'Run BloodHound', 'Execute Kerberoasting', 'Document defenses']
        },
        {
            id: 22, plan: 'A', name: 'Custom C2 Infrastructure',
            difficulty: 'Advanced', time: '2-4 weeks',
            desc: 'Set up Covenant/Sliver C2, demonstrate red team capabilities.',
            skills: ['Command and control', 'persistence', 'evasion'],
            tools: ['Covenant', 'Sliver', 'cloud hosting'],
            income: 'Advanced red team engagements', portfolio: 'Red team operations capability',
            steps: ['Provision cloud server', 'Install C2 framework', 'Generate payloads', 'Test connectivity', 'Implement evasion']
        },
        {
            id: 23, plan: 'A', name: 'EDR/Antivirus Evasion Research',
            difficulty: 'Advanced', time: '2-3 weeks',
            desc: 'Research AV/EDR bypass techniques, create PoC payloads (ethical use only).',
            skills: ['Malware development', 'evasion techniques'],
            tools: ['Visual Studio', 'obfuscation tools', 'test environment'],
            income: 'Security research reputation', portfolio: 'Cutting-edge red team skill',
            steps: ['Study detection methods', 'Develop obfuscation', 'Test against AV', 'Refine code', 'Document technique']
        },
        {
            id: 24, plan: 'A', name: 'Purple Team Exercise Framework',
            difficulty: 'Advanced', time: '3-4 weeks',
            desc: 'Design complete purple team exercise combining attack and defense.',
            skills: ['Red team + blue team collaboration'],
            tools: ['Full SOC + pentest toolkit'],
            income: '10M-30M UGX', portfolio: 'Strategic security thinking',
            steps: ['Define scenarios', 'Execute attacks', 'Monitor defenses', 'Tune alerts', 'Create after-action report']
        },
        {
            id: 25, plan: 'A', name: 'Threat Emulation Based on Real APTs',
            difficulty: 'Advanced', time: '2-3 weeks',
            desc: 'Study real APT groups, emulate their TTPs in lab environment.',
            skills: ['Threat intelligence', 'adversary emulation'],
            tools: ['MITRE ATT&CK', 'Caldera', 'Atomic Red Team'],
            income: 'Threat intelligence consulting', portfolio: 'Advanced threat modeling',
            steps: ['Select APT group', 'Analyze TTPs', 'Configure emulation plan', 'Run emulation', 'Analyze footprint']
        },

        // --- PLAN B: DJANGO ---
        {
            id: 26, plan: 'B', name: 'Personal Expense Tracker CLI',
            difficulty: 'Beginner', time: '2-3 days',
            desc: 'Command-line tool to track daily expenses, generate reports.',
            skills: ['Python basics', 'file I/O', 'data structures'],
            tools: ['Python', 'CSV module'],
            income: '200k-500k UGX', portfolio: 'Shows programming fundamentals',
            steps: ['Design data structure', 'Implement add/view functions', 'Add CSV persistence', 'Create summary report', 'Polish CLI UI']
        },
        {
            id: 27, plan: 'B', name: 'Web Scraper for Ugandan Job Boards',
            difficulty: 'Beginner-Intermediate', time: '3-5 days',
            desc: 'Scrape BrighterMonday/Fuzu for tech jobs, send daily email digest.',
            skills: ['Web scraping', 'APIs', 'automation'],
            tools: ['BeautifulSoup', 'Requests', 'smtplib'],
            income: 'Job alert service subscription', portfolio: 'Practical automation',
            steps: ['Inspect target HTML', 'Write scrape logic', 'Parse job data', 'Setup email sending', 'Schedule cron job']
        },
        {
            id: 28, plan: 'B', name: 'Password Manager (Local)',
            difficulty: 'Intermediate', time: '1 week',
            desc: 'Build secure password manager with encryption.',
            skills: ['Cryptography', 'security', 'file handling'],
            tools: ['Python', 'cryptography library'],
            income: 'Learning project', portfolio: 'Security-focused development',
            steps: ['Design encryption scheme', 'Implement master key', 'Create add/retrieve logic', 'Add file storage', 'Build CLI/GUI']
        },
        {
            id: 29, plan: 'B', name: 'SMS/USSD Integration Tool',
            difficulty: 'Intermediate', time: '1 week',
            desc: 'Build tool that integrates with Africa\'s Talking API for SMS.',
            skills: ['API integration', 'mobile-first thinking'],
            tools: ['Python', 'Africa\'s Talking API'],
            income: '500k-2M UGX setup', portfolio: 'Uganda-relevant skill',
            steps: ['Get API keys', 'Setup Python env', 'Implement SMS send', 'Handle callbacks', 'Build usage demo']
        },
        {
            id: 30, plan: 'B', name: 'Data Analysis Dashboard (CSV)',
            difficulty: 'Beginner-Intermediate', time: '5-7 days',
            desc: 'Analyze sample datasets, create visualizations, generate insights.',
            skills: ['Data analysis', 'pandas', 'matplotlib'],
            tools: ['Pandas', 'Matplotlib', 'Seaborn'],
            income: '300k-1M UGX', portfolio: 'Data skills showcase',
            steps: ['Load CSV data', 'Clean/preprocess', 'Generate stats', 'Create charts', 'Export report']
        },
        {
            id: 31, plan: 'B', name: 'Personal Blog with CMS',
            difficulty: 'Beginner', time: '1 week',
            desc: 'Full-featured blog with posts, comments, categories, admin panel.',
            skills: ['Django models', 'views', 'templates', 'admin'],
            tools: ['Django', 'SQLite', 'Bootstrap'],
            income: '500k-1.5M UGX', portfolio: 'Essential Django project',
            steps: ['Setup Django project', 'Create Post model', 'Build detail/list views', 'Add comments', 'Style with Bootstrap']
        },
        {
            id: 32, plan: 'B', name: 'Student Management System',
            difficulty: 'Intermediate', time: '2 weeks',
            desc: 'Manage students, courses, grades, attendance for schools.',
            skills: ['Complex models', 'relationships', 'user roles'],
            tools: ['Django', 'PostgreSQL', 'authentication'],
            income: '2M-10M UGX per school', portfolio: 'Real-world application',
            steps: ['Design DB schema', 'Implement User roles', 'Create Student/Course models', 'Build gradebook views', 'Generate PDF reports']
        },
        {
            id: 33, plan: 'B', name: 'Job Board for Ugandan Tech Jobs',
            difficulty: 'Intermediate', time: '2 weeks',
            desc: 'Post jobs, apply online, employer dashboard, search/filter.',
            skills: ['Forms', 'user authentication', 'file uploads'],
            tools: ['Django', 'Bootstrap', 'database design'],
            income: '100k-500k per listing', portfolio: 'Full-stack capability',
            steps: ['Create Job model', 'Build search/filter', 'Implement apply form', 'Create employer dashboard', 'Add email notifications']
        },
        {
            id: 34, plan: 'B', name: 'Restaurant Order Management',
            difficulty: 'Intermediate', time: '1-2 weeks',
            desc: 'Menu management, online orders, kitchen dashboard, delivery tracking.',
            skills: ['Real-time updates', 'payment integration potential'],
            tools: ['Django', 'JavaScript', 'possibly Django Channels'],
            income: '1M-5M UGX', portfolio: 'Business application',
            steps: ['Design Menu models', 'Build cart system', 'Create order flow', 'Build kitchen view', 'Implement status tracking']
        },
        {
            id: 35, plan: 'B', name: 'E-commerce Platform (Basic)',
            difficulty: 'Intermediate-Advanced', time: '3-4 weeks',
            desc: 'Product catalog, shopping cart, checkout, order management.',
            skills: ['Complex business logic', 'sessions', 'payments'],
            tools: ['Django', 'Stripe/Flutterwave', 'PostgreSQL'],
            income: '3M-15M UGX', portfolio: 'Major portfolio piece',
            steps: ['Setup models', 'Implement Cart logic', 'Integrate Payments', 'Build Order history', 'Secure checkout']
        },
        {
            id: 36, plan: 'B', name: 'Appointment Booking System',
            difficulty: 'Intermediate', time: '1-2 weeks',
            desc: 'Calendar, book appointments, email confirmations, admin dashboard.',
            skills: ['DateTime handling', 'scheduling', 'notifications'],
            tools: ['Django', 'FullCalendar.js', 'email backend'],
            income: '1M-4M UGX', portfolio: 'Service business application',
            steps: ['Integrate Calendar JS', 'Create Booking model', 'Implement availability logic', 'Send email confirms', 'Admin schedule view']
        },
        {
            id: 37, plan: 'B', name: 'Inventory Management System',
            difficulty: 'Intermediate', time: '2 weeks',
            desc: 'Track products, stock levels, sales, generate reports.',
            skills: ['Complex queries', 'reporting', 'data visualization'],
            tools: ['Django', 'Chart.js', 'Excel export'],
            income: '2M-8M UGX each', portfolio: 'Business intelligence',
            steps: ['Model Product/Stock', 'Record In/Out transactions', 'Calculate current stock', 'Build alert system', 'Create visual reports']
        },
        {
            id: 38, plan: 'B', name: 'URL Shortener with Analytics',
            difficulty: 'Beginner-Intermediate', time: '3-5 days',
            desc: 'Shorten URLs, track clicks, geographic data, referrers.',
            skills: ['URL routing', 'analytics', 'data aggregation'],
            tools: ['Django', 'GeoIP', 'Chart.js'],
            income: 'Premium service subscription', portfolio: 'Fun practical project',
            steps: ['Create Link model', 'Implement redirect view', 'Track request metadata', 'Build analytics dashboard', 'Add QR code generation']
        },
        {
            id: 39, plan: 'B', name: 'Community Forum/Q&A Site',
            difficulty: 'Intermediate-Advanced', time: '2-3 weeks',
            desc: 'Questions, answers, voting, reputation system, moderation.',
            skills: ['Complex relationships', 'gamification', 'permissions'],
            tools: ['Django', 'Markdown editor', 'search'],
            income: '2M-10M UGX', portfolio: 'Social platform experience',
            steps: ['Design Thread/Post models', 'Implement voting logic', 'Add user reputation', 'Build moderation tools', 'Integrate search']
        },
        {
            id: 40, plan: 'B', name: 'Task/Project Management Tool',
            difficulty: 'Intermediate', time: '2 weeks',
            desc: 'Projects, tasks, assignments, deadlines, team collaboration.',
            skills: ['User permissions', 'notifications', 'dashboard design'],
            tools: ['Django', 'JavaScript', 'drag-and-drop'],
            income: '1M-5M UGX', portfolio: 'SaaS application experience',
            steps: ['Create Project/Task models', 'Implement Kanban view', 'Add user assignments', 'Build deadline alerts', 'Create dashboard']
        },
        {
            id: 41, plan: 'B', name: 'Portfolio Website with CMS Backend',
            difficulty: 'Intermediate', time: '1 week',
            desc: 'Beautiful portfolio site with Django backend to manage projects.',
            skills: ['Frontend design', 'Django admin customization'],
            tools: ['Django', 'React/Vue', 'modern CSS'],
            income: '500k-3M UGX', portfolio: 'YOUR portfolio!',
            steps: ['Design frontend', 'Build Project model', 'Create API/Template', 'Populate content', 'Deploy']
        },
        {
            id: 42, plan: 'B', name: 'Real-time Chat Application',
            difficulty: 'Advanced', time: '2 weeks',
            desc: 'WhatsApp-style chat with Django Channels and WebSockets.',
            skills: ['Real-time communications', 'WebSockets'],
            tools: ['Django Channels', 'Redis', 'JavaScript'],
            income: '3M-10M UGX', portfolio: 'Advanced real-time capability',
            steps: ['Setup Channels/Redis', 'Create Room/Message models', 'Implement simple chat', 'Add user presence', 'Polish UI']
        },
        {
            id: 43, plan: 'B', name: 'Mobile Money Integration Demo',
            difficulty: 'Intermediate-Advanced', time: '1-2 weeks',
            desc: 'Accept payments via MTN/Airtel Mobile Money APIs.',
            skills: ['Payment integration', 'Uganda-specific'],
            tools: ['Django', 'MTN MoMo API', 'Flutterwave'],
            income: '1M-5M UGX per project', portfolio: 'Critical Uganda skill',
            steps: ['Get API Sandox keys', 'Implement Request to Pay', 'Handle Webhooks', 'Verify transactions', 'Build demo store']
        },
        {
            id: 44, plan: 'B', name: 'SaaS Starter Template',
            difficulty: 'Advanced', time: '3-4 weeks',
            desc: 'Multi-tenant SaaS with subscriptions, billing, user management.',
            skills: ['SaaS architecture', 'Stripe integration'],
            tools: ['Django', 'Stripe', 'subdomain routing'],
            income: '5M+ UGX', portfolio: 'Enterprise-level architecture',
            steps: ['Design Tenant model', 'Implement middleware', 'Setup Stripe billing', 'Create onboarding flow', 'Document code']
        },
        {
            id: 45, plan: 'B', name: 'API for Mobile App',
            difficulty: 'Intermediate-Advanced', time: '2 weeks',
            desc: 'RESTful API with authentication, documentation, versioning.',
            skills: ['Django REST Framework', 'API design'],
            tools: ['DRF', 'JWT authentication', 'Swagger/Postman'],
            income: '2M-8M UGX', portfolio: 'Backend specialization',
            steps: ['Define API requirements', 'Setup DRF', 'Implement Endpoints', 'Add JWT Auth', 'Generate Swagger docs']
        },
        {
            id: 46, plan: 'B', name: 'Food Delivery Platform (MVP)',
            difficulty: 'Advanced', time: '4-6 weeks',
            desc: 'Restaurants, menus, orders, delivery tracking, payment.',
            skills: ['Complex business logic', 'real-time updates'],
            tools: ['Django', 'React/Vue', 'Google Maps API', 'payments'],
            income: '10M-50M UGX', portfolio: 'Startup-level project',
            steps: ['Plan architecture', 'Build Restaurant/Menu API', 'Implement Order flow', 'Add Geolocation', 'Build User APPs']
        },
        {
            id: 47, plan: 'B', name: 'Learning Management System (LMS)',
            difficulty: 'Advanced', time: '3-4 weeks',
            desc: 'Courses, videos, quizzes, progress tracking, certificates.',
            skills: ['Video streaming', 'gamification', 'reporting'],
            tools: ['Django', 'video hosting', 'progress tracking'],
            income: '5M-20M UGX', portfolio: 'EdTech experience',
            steps: ['Create Course/Lesson models', 'Implement progress tracking', 'Build Quiz engine', 'Generate PDF certificates', 'Admin dashboard']
        },
        {
            id: 48, plan: 'B', name: 'Property/Real Estate Listings',
            difficulty: 'Intermediate', time: '2 weeks',
            desc: 'List properties, search, filter, contact agents, admin dashboard.',
            skills: ['Search optimization', 'image handling', 'maps'],
            tools: ['Django', 'Google Maps', 'image optimization'],
            income: '2M-10M UGX', portfolio: 'Vertical-specific application',
            steps: ['Design Property model', 'Build filter/search', 'Implement image gallery', 'Add map view', 'Contact form']
        },
        {
            id: 49, plan: 'B', name: 'Event Management & Ticketing',
            difficulty: 'Intermediate-Advanced', time: '2-3 weeks',
            desc: 'Create events, sell tickets, QR codes, attendee management.',
            skills: ['Payment processing', 'QR generation', 'email'],
            tools: ['Django', 'payment gateway', 'QR library'],
            income: '1M-5M UGX', portfolio: 'Event industry application',
            steps: ['Create Event model', 'Implement Ticket generation', 'Add QR code logic', 'Integrate payments', 'Check-in interface']
        },
        {
            id: 50, plan: 'B', name: 'Weather Dashboard with API',
            difficulty: 'Beginner-Intermediate', time: '3-5 days',
            desc: 'Fetch weather data, display forecasts, historical data.',
            skills: ['External API integration', 'data visualization'],
            tools: ['Django', 'OpenWeather API', 'Chart.js'],
            income: 'Add weather to other projects', portfolio: 'API integration demonstration',
            steps: ['Get API Key', 'Build fetch service', 'Create caching layer', 'Design frontend', 'Display charts']
        },

        // --- PLAN C: IT SUPPORT ---
        {
            id: 51, plan: 'C', name: 'Home Lab Setup Guide',
            difficulty: 'Beginner', time: '1 week',
            desc: 'Document building a home lab with VirtualBox, networking.',
            skills: ['Virtualization', 'documentation'],
            tools: ['VirtualBox', 'various OS images'],
            income: '200k-1M UGX', portfolio: 'Shows hands-on experience',
            steps: ['Select hardware', 'Install VirtualBox', 'Setup Network (NAT/Bridge)', 'Install Windows Server', 'Document topology']
        },
        {
            id: 52, plan: 'C', name: 'PC Build and Optimization Service',
            difficulty: 'Beginner-Intermediate', time: 'Ongoing',
            desc: 'Build custom PCs, optimize performance, troubleshoot.',
            skills: ['Hardware', 'Windows optimization'],
            tools: ['PC components', 'diagnostic software'],
            income: '200k-500k per build', portfolio: 'Practical IT skills',
            steps: ['Select components', 'Assemble PC', 'Install OS/Drivers', 'Run stress tests', 'Optimize startup/services']
        },
        {
            id: 53, plan: 'C', name: 'Network Setup for Small Business',
            difficulty: 'Intermediate', time: '1-2 days per client',
            desc: 'Design and implement network, WiFi, security, documentation.',
            skills: ['Networking', 'router configuration', 'security'],
            tools: ['Routers', 'switches', 'cable management'],
            income: '500k-3M UGX per setup', portfolio: 'Network administration',
            steps: ['Assess requirements', 'Run cabling', 'Configure Router/WiFi', 'Secure access points', 'Document network map']
        },
        {
            id: 54, plan: 'C', name: 'Data Backup & Recovery Solutions',
            difficulty: 'Beginner-Intermediate', time: 'Varies',
            desc: 'Set up automated backups, cloud sync, disaster recovery plans.',
            skills: ['Backup software', 'cloud services', 'data management'],
            tools: ['Windows Backup', 'cloud storage', 'cloning tools'],
            income: '300k-2M UGX setup', portfolio: 'Data protection expertise',
            steps: ['Identify critical data', 'Select backup medium (Cloud/NAS)', 'Configure auto-backup', 'Test recovery', 'Write policy']
        },
        {
            id: 55, plan: 'C', name: 'Office 365/Google Workspace Migration',
            difficulty: 'Intermediate', time: '1-3 days per client',
            desc: 'Migrate email, documents, train users, troubleshoot.',
            skills: ['Cloud administration', 'migration tools', 'training'],
            tools: ['Microsoft 365 admin', 'Google Admin'],
            income: '1M-5M UGX per migration', portfolio: 'Cloud services expertise',
            steps: ['Setup tenant', 'Verify domain', 'Create users', 'Migrate emails/data', 'Train staff']
        },
        {
            id: 56, plan: 'C', name: 'Remote IT Support Service',
            difficulty: 'Beginner-Intermediate', time: 'Ongoing',
            desc: 'Offer remote troubleshooting via TeamViewer/AnyDesk.',
            skills: ['Remote support tools', 'troubleshooting'],
            tools: ['TeamViewer', 'AnyDesk', 'remote desktop'],
            income: '50k-200k per session', portfolio: 'Support experience',
            steps: ['Setup remote tool', 'Receive ticket', 'Remote in', 'Diagnose issue', 'Resolve and log']
        },
        {
            id: 57, plan: 'C', name: 'Security Awareness Training for SMEs',
            difficulty: 'Beginner-Intermediate', time: '1 day per session',
            desc: 'Train employees on security best practices.',
            skills: ['Teaching', 'security awareness', 'presentation'],
            tools: ['PowerPoint', 'demonstration tools'],
            income: '500k-3M UGX per session', portfolio: 'Training experience',
            steps: ['Assess client needs', 'Prepare slides', 'Conduct workshop', 'Run quick quiz', 'Provide handouts']
        },
        {
            id: 58, plan: 'C', name: 'Website Hosting & Email Setup',
            difficulty: 'Beginner-Intermediate', time: '1-2 days per client',
            desc: 'Set up web hosting, email, DNS, SSL certificates.',
            skills: ['cPanel/hosting', 'DNS', 'email configuration'],
            tools: ['Hosting platforms', 'domain registrars'],
            income: '300k-1.5M setup', portfolio: 'Web services management',
            steps: ['Buy domain/hosting', 'Configure DNS records', 'Setup email accounts', 'Install SSL', 'Connect email client']
        },
        {
            id: 59, plan: 'C', name: 'CCTV/Security Camera Installation',
            difficulty: 'Intermediate', time: '1-3 days per installation',
            desc: 'Install cameras, configure recording, remote viewing.',
            skills: ['Physical installation', 'network configuration'],
            tools: ['IP cameras', 'NVR/DVR', 'networking'],
            income: '1M-10M UGX per installation', portfolio: 'Security systems expertise',
            steps: ['Site survey', 'Install cabling', 'Mount cameras', 'Configure NVR/DVR', 'Setup mobile viewing']
        },
        {
            id: 60, plan: 'C', name: 'IT Asset Management System',
            difficulty: 'Intermediate', time: '2 weeks',
            desc: 'Create spreadsheet or simple app to track company IT assets.',
            skills: ['Database management', 'reporting'],
            tools: ['Excel/Google Sheets', 'custom web app'],
            income: '500k-2M per implementation', portfolio: 'IT management skills',
            steps: ['Inventory all assets', 'Design tracking sheet/db', 'Tag physical assets', 'Input data', 'Setup maintenance schedule']
        }
    ]
};
