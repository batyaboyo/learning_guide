const careerData = {
    plans: {
        A: {
            id: 'planA',
            title: 'Cybersecurity Path',
            subtitle: 'SOC → DFIR → Pentesting → Red Teaming → AI Security',
            color: '#DC143C',
            icon: '🛡️',
            phases: [
                {
                    id: 'p1',
                    title: 'Phase 1: SOC Analyst (Foundations)',
                    duration: 'Months 1-3',
                    resources: [
                        { name: 'TryHackMe SOC Level 1 Path', url: 'https://tryhackme.com/path/outline/soclevel1', type: 'Lab', platform: 'TryHackMe' },
                        { name: 'Google Cybersecurity Certificate', url: 'https://www.coursera.org/professional-certificates/google-cybersecurity', type: 'Course', platform: 'Coursera' },
                        { name: 'Professor Messer - CompTIA Security+ Playlist', url: 'https://www.youtube.com/@professormesser/playlists', type: 'Video', platform: 'YouTube' },
                        { name: 'John Hammond - Cybersecurity Basics & SOC', url: 'https://www.youtube.com/@JohnHammond010/videos', type: 'Video', platform: 'YouTube' },
                        { name: 'NetworkChuck - Security+ Training', url: 'https://www.youtube.com/@NetworkChuck/search?query=security+plus', type: 'Video', platform: 'YouTube' },
                        { name: 'Splunk Fundamentals Free Course', url: 'https://www.splunk.com/en_us/training/free-courses/splunk-fundamentals-1.html', type: 'Course', platform: 'Splunk' },
                        { name: 'Blue Team Labs Online', url: 'https://blueteamlabs.online/', type: 'Lab', platform: 'BTLO' },
                        { name: 'Wazuh Security Monitoring Training', url: 'https://wazuh.com/training/', type: 'Course', platform: 'Wazuh' }
                    ],
                    tools: [
                        { name: 'Wazuh', desc: 'Open-source SIEM/XDR.', url: 'https://wazuh.com/' },
                        { name: 'Wireshark', desc: 'Network protocol analyzer.', url: 'https://www.wireshark.org/' },
                        { name: 'Splunk (Free)', desc: 'Powerful log analysis tool.', url: 'https://www.splunk.com/' },
                        { name: 'Elastic Stack', desc: 'Log storage and visualization.', url: 'https://www.elastic.co/elastic-stack' },
                        { name: 'Security Onion', desc: 'Intrusion detection distribution.', url: 'https://securityonion.net/' },
                        { name: 'Zeek', desc: 'Network security monitor.', url: 'https://zeek.org/' },
                        { name: 'Suricata', desc: 'IDS/IPS engine.', url: 'https://suricata.io/' },
                        { name: 'MISP', desc: 'Threat intelligence platform.', url: 'https://www.misp-project.org/' },
                        { name: 'TheHive', desc: 'Incident response platform.', url: 'https://thehive-project.org/' },
                        { name: 'Shuffle', desc: 'Open-source SOAR.', url: 'https://shuffler.io/' },
                        { name: 'OSSEC', desc: 'Host-based IDS.', url: 'https://www.ossec.net/' },
                        { name: 'Graylog', desc: 'Log management.', url: 'https://www.graylog.org/' },
                        { name: 'Snort', desc: 'Network intrusion detection.', url: 'https://www.snort.org/' },
                        { name: 'CrowdResponse', desc: 'Incident response toolkit.', url: 'https://www.crowdstrike.com/resources/community-tools/crowdresponse/' },
                        { name: 'OSquery', desc: 'SQL-powered OS analytics.', url: 'https://osquery.io/' }
                    ]
                },
                {
                    id: 'p2',
                    title: 'Phase 2: DFIR (Investigation)',
                    duration: 'Months 4-6',
                    resources: [
                        { name: 'John Hammond - Digital Forensics & IR', url: 'https://www.youtube.com/@JohnHammond010/search?query=forensics', type: 'Video', platform: 'YouTube' },
                        { name: 'Eric Zimmerman - DFIR Tools & Techniques', url: 'https://www.youtube.com/@ericrzimmerman/videos', type: 'Video', platform: 'YouTube' },
                        { name: 'AntiSyphon Info Sec - DFIR Training', url: 'https://www.youtube.com/@AntiSyphonInfoSec/videos', type: 'Video', platform: 'YouTube' },
                        { name: 'Blue Team Labs Online (BTLO)', url: 'https://blueteamlabs.online/', type: 'Lab', platform: 'BTLO' },
                        { name: 'CyberDefenders - IR Case Studies', url: 'https://cyberdefenders.org/blueteam-ctf-challenges/', type: 'Lab', platform: 'CyberDefenders' },
                        { name: 'AboutDFIR Documentation', url: 'https://aboutdfir.com/', type: 'Doc', platform: 'AboutDFIR' }
                    ],
                    tools: [
                        { name: 'Autopsy', desc: 'Premier forensic platform.', url: 'https://www.sleuthkit.org/autopsy/' },
                        { name: 'Volatility', desc: 'Memory forensics framework.', url: 'https://www.volatilityfoundation.org/' },
                        { name: 'FTK Imager', desc: 'Data acquisition and imaging.', url: 'https://www.exterro.com/ftk-imager' },
                        { name: 'KAPE', desc: 'Fast triage and artifact collection.', url: 'https://www.kroll.com/en/services/cyber-risk/incident-response-retention/kape' },
                        { name: 'Sleuth Kit', desc: 'Command line forensic tools.', url: 'https://www.sleuthkit.org/' },
                        { name: 'SIFT', desc: 'Forensic toolkit distribution.', url: 'https://www.sans.org/tools/sift-workstation/' },
                        { name: 'CAINE', desc: 'Forensic live environment.', url: 'https://www.caine-live.net/' },
                        { name: 'Remnux', desc: 'Malware analysis distribution.', url: 'https://remnux.org/' },
                        { name: 'Recuva', desc: 'Simple file recovery.', url: 'https://www.ccleaner.com/recuva' },
                        { name: 'Velociraptor', desc: 'Endpoint visibility and IR.', url: 'https://docs.velociraptor.app/' },
                        { name: 'MemProcFS', desc: 'Memory analysis via file system.', url: 'https://github.com/ufrisk/MemProcFS' },
                        { name: 'RegRipper', desc: 'Registry analysis tool.', url: 'https://github.com/keydet89/RegRipper3.0' },
                        { name: 'EvtxECmd', desc: 'Event log parser.', url: 'https://github.com/EricZimmerman/EvtxECmd' },
                        { name: 'Magnet RAM Capture', desc: 'Memory imaging tool.', url: 'https://www.magnetforensics.com/resources/magnet-ram-capture/' },
                        { name: 'Wireshark', desc: 'Network forensics.', url: 'https://www.wireshark.org/' }
                    ]
                },
                {
                    id: 'p3',
                    title: 'Phase 3: Pentesting (Ethical Hacking)',
                    duration: 'Months 7-10',
                    resources: [
                        { name: 'IppSec - HackTheBox Walkthroughs', url: 'https://www.youtube.com/@Ippsec/videos', type: 'Video', platform: 'YouTube' },
                        { name: 'PortSwigger Web Security Academy', url: 'https://portswigger.net/web-security', type: 'Lab', platform: 'PortSwigger' },
                        { name: 'John Hammond - Web Security & Exploitation', url: 'https://www.youtube.com/@JohnHammond010/search?query=web+security', type: 'Video', platform: 'YouTube' },
                        { name: 'NetworkChuck - Ethical Hacking 101', url: 'https://www.youtube.com/@NetworkChuck/search?query=ethical+hacking', type: 'Video', platform: 'YouTube' },
                        { name: 'TryHackMe Jr Pentesting Path', url: 'https://tryhackme.com/path/outline/jrpenetrationtester', type: 'Lab', platform: 'TryHackMe' },
                        { name: 'HackTheBox Academy', url: 'https://academy.hackthebox.com/preview/modules', type: 'Lab', platform: 'HTB' },
                        { name: 'Nahamsec - Bug Bounty Recon', url: 'https://www.youtube.com/@nahamsec/videos', type: 'Video', platform: 'YouTube' },
                        { name: 'OWASP Juice Shop Lab', url: 'https://pwning.owasp-juice.shop/', type: 'Lab', platform: 'OWASP' }
                    ],
                    tools: [
                        { name: 'Burp Suite (Comm)', desc: 'Web proxy and scanner.', url: 'https://portswigger.net/' },
                        { name: 'Metasploit', desc: 'Exploitation framework.', url: 'https://www.metasploit.com/' },
                        { name: 'Nmap', desc: 'Network scanner.', url: 'https://nmap.org/' },
                        { name: 'SQLmap', desc: 'Automatic SQL injection.', url: 'https://sqlmap.org/' },
                        { name: 'OWASP ZAP', desc: 'Open-source web scanner.', url: 'https://www.zaproxy.org/' },
                        { name: 'Kali Linux', desc: 'Pentesting OS.', url: 'https://www.kali.org/' },
                        { name: 'Nikto', desc: 'Web server scanner.', url: 'https://cirt.net/Nikto2' },
                        { name: 'BeEF', desc: 'Browser exploitation framework.', url: 'https://beefproject.com/' },
                        { name: 'OpenVAS', desc: 'Vulnerability scanner.', url: 'https://www.openvas.org/' },
                        { name: 'SET', desc: 'Social Engineering Toolkit.', url: 'https://github.com/trustedsec/social-engineer-toolkit' },
                        { name: 'Aircrack-ng', desc: 'WiFi security suite.', url: 'https://www.aircrack-ng.org/' },
                        { name: 'John the Ripper', desc: 'Password cracker.', url: 'https://www.openwall.com/john/' },
                        { name: 'Hashcat', desc: 'Advanced password recovery.', url: 'https://hashcat.net/hashcat/' },
                        { name: 'Hydra', desc: 'Login cracker.', url: 'https://github.com/vanhauser-thc/thc-hydra' },
                        { name: 'Dirsearch', desc: 'Web path brute-forcer.', url: 'https://github.com/maurosoria/dirsearch' }
                    ]
                },
                {
                    id: 'p4',
                    title: 'Phase 4: Red Teaming (Advanced)',
                    duration: 'Months 11-14',
                    resources: [
                        { name: 'IppSec - Red Teaming & AD Attacks', url: 'https://www.youtube.com/@Ippsec/search?query=red+team', type: 'Video', platform: 'YouTube' },
                        { name: 'John Hammond - Red Team Operations', url: 'https://www.youtube.com/@JohnHammond010/search?query=red+team', type: 'Video', platform: 'YouTube' },
                        { name: 'NetworkChuck - Active Directory Security', url: 'https://www.youtube.com/@NetworkChuck/search?query=active+directory', type: 'Video', platform: 'YouTube' },
                        { name: 'TryHackMe Red Teaming Path', url: 'https://tryhackme.com/path/outline/redteaming', type: 'Lab', platform: 'TryHackMe' },
                        { name: 'MITRE ATT&CK Framework', url: 'https://attack.mitre.org/resources/getting-started/', type: 'Doc', platform: 'MITRE' },
                        { name: 'HackTheBox Red Team Challenges', url: 'https://www.hackthebox.com/', type: 'Lab', platform: 'HTB' },
                        { name: 'HackTricks Penetration Testing Reference', url: 'https://book.hacktricks.xyz/welcome/readme', type: 'Doc', platform: 'HackTricks' }
                    ],
                    tools: [
                        { name: 'BloodHound', desc: 'AD attack path analysis.', url: 'https://github.com/BloodHoundAD/BloodHound' },
                        { name: 'Gophish', desc: 'Phishing simulation framework.', url: 'https://getgophish.com/' },
                        { name: 'Sliver', desc: 'Cross-platform C2 framework.', url: 'https://github.com/BishopFox/sliver' },
                        { name: 'Caldera', desc: 'Adversary emulation.', url: 'https://caldera.mitre.org/' },
                        { name: 'Atomic Red Team', desc: 'Library of ATT&CK tests.', url: 'https://atomicredteam.io/' },
                        { name: 'Empire', desc: 'PowerShell/Python/C# C2.', url: 'https://github.com/BC-SECURITY/Empire' },
                        { name: 'Havoc', desc: 'Modern C2 framework.', url: 'https://havocframework.com/' },
                        { name: 'SpiderFoot', desc: 'Open-source OSINT automation.', url: 'https://www.spiderfoot.net/' },
                        { name: 'Covenant', desc: '.NET C2 framework.', url: 'https://github.com/cobbr/Covenant' },
                        { name: 'Impacket', desc: 'Networking protocol library.', url: 'https://github.com/fortra/impacket' },
                        { name: 'Mimikatz', desc: 'Credential harvesting tool.', url: 'https://github.com/gentilkiwi/mimikatz' },
                        { name: 'Rubeus', desc: 'Kerberos interaction/abuse.', url: 'https://github.com/GhostPack/Rubeus' },
                        { name: 'PowerView', desc: 'Active Directory discovery.', url: 'https://github.com/PowerShellMafia/PowerSploit' },
                        { name: 'Responder', desc: 'LLMNR/NBT-NS/mDNS poisoner.', url: 'https://github.com/lgandx/Responder' },
                        { name: 'Sherlock', desc: 'OSINT username search.', url: 'https://github.com/sherlock-project/sherlock' }
                    ]
                },
                {
                    id: 'p5',
                    title: 'Phase 5: AI Security (Modern Era)',
                    duration: 'Months 15-18',
                    resources: [
                        { name: 'Fireship - AI Security & LLMs Explained', url: 'https://www.youtube.com/@Fireship/search?query=ai', type: 'Video', platform: 'YouTube' },
                        { name: 'Yannic Kilcher - LLM & AI Research Videos', url: 'https://www.youtube.com/@YannicKilcher/videos', type: 'Video', platform: 'YouTube' },
                        { name: 'Deeplearning.AI - LLMs & Security', url: 'https://www.youtube.com/@DeepLearningAI/videos', type: 'Video', platform: 'YouTube' },
                        { name: 'PortSwigger - LLM Attack Labs', url: 'https://portswigger.net/web-security/llm-attacks', type: 'Lab', platform: 'PortSwigger' },
                        { name: 'OWASP LLM Top 10 Project', url: 'https://owasp.org/www-project-top-10-for-large-language-model-applications/', type: 'Doc', platform: 'OWASP' },
                        { name: 'Microsoft AI for Security', url: 'https://microsoft.github.io/AI-For-Beginners/', type: 'Course', platform: 'Microsoft' }
                    ],
                    tools: [
                        { name: 'Garak', desc: 'LLM vulnerability scanner.', url: 'https://github.com/leondz/garak' },
                        { name: 'PyRIT', desc: 'Redteaming AI Toolkit.', url: 'https://github.com/Azure/pyrit' },
                        { name: 'Giskard', desc: 'LLM Security Scanner.', url: 'https://github.com/Giskard-AI/giskard' },
                        { name: 'TextAttack', desc: 'Adversarial attacks for LLMs.', url: 'https://github.com/QData/TextAttack' },
                        { name: 'Foolbox', desc: 'Robustness benchmarking library.', url: 'https://github.com/bethgelab/foolbox' },
                        { name: 'AI Fairness 360', desc: 'Bias detection & mitigation.', url: 'https://aif360.res.ibm.com/' },
                        { name: 'Counterfit', desc: 'Azure AI red teaming tool.', url: 'https://github.com/Azure/counterfit' },
                        { name: 'ART', desc: 'Adversarial Robustness Toolbox.', url: 'https://github.com/Trusted-AI/adversarial-robustness-toolbox' },
                        { name: 'LangChain', desc: 'Building secure LLM apps.', url: 'https://www.langchain.com/' },
                        { name: 'Inspect', desc: 'Evaluation framework for AI.', url: 'https://github.com/UKGovernmentBEIS/inspect' },
                        { name: 'Probe', desc: 'LLM security evaluation.', url: 'https://github.com/vigil-security/vigil-llm' },
                        { name: 'Advertools', desc: 'SEO & AI analysis toolkit.', url: 'https://github.com/eliasdabbas/advertools' },
                        { name: 'Shred', desc: 'Dataset vulnerability scanner.', url: 'https://github.com/cleanlab/cleanlab' },
                        { name: 'Guardrails AI', desc: 'Validation for LLM outputs.', url: 'https://www.guardrailsai.com/' },
                        { name: 'Nemoguardrails', desc: 'Safety rails for AI.', url: 'https://github.com/NVIDIA/NeMo-Guardrails' }
                    ]
                }
            ]
        },
        B: {
            id: 'planB',
            title: 'Data Analyst Path',
            subtitle: 'Excel -> SQL -> Python -> Dashboards -> Storytelling',
            color: '#0EA5E9',
            icon: '📈',
            phases: [
                {
                    id: 'p1',
                    title: 'Phase 1: Spreadsheet Foundations',
                    duration: 'Months 1-2',
                    resources: [
                        { name: 'Excel Skills for Business (Audit)', url: 'https://www.coursera.org/specializations/excel', type: 'Course', platform: 'Coursera' },
                        { name: 'Google Sheets Training', url: 'https://support.google.com/a/users/answer/9282959', type: 'Doc', platform: 'Google' },
                        { name: 'Khan Academy Statistics', url: 'https://www.khanacademy.org/math/statistics-probability', type: 'Course', platform: 'Khan Academy' },
                        { name: 'Alex The Analyst - Excel Playlist', url: 'https://www.youtube.com/@AlexTheAnalyst', type: 'Video', platform: 'YouTube' },
                        { name: 'Data Cleaning in Spreadsheets', url: 'https://www.kaggle.com/learn/data-cleaning', type: 'Course', platform: 'Kaggle' },
                        { name: 'Microsoft Excel - Official Training', url: 'https://support.microsoft.com/en-us/excel', type: 'Doc', platform: 'Microsoft' },
                        { name: 'Chandoo - Excel Pro Tips', url: 'https://www.chandoo.org/excel', type: 'Course', platform: 'Chandoo' },
                        { name: 'Leila Gharani - Excel Tutorials', url: 'https://www.youtube.com/@LeilaGharani/videos', type: 'Video', platform: 'YouTube' },
                        { name: 'Maven Analytics - Excel for Data Analysts', url: 'https://www.youtube.com/@MavenAnalytics/search?query=excel', type: 'Video', platform: 'YouTube' },
                        { name: 'DataCamp - Excel Courses', url: 'https://www.datacamp.com/courses/spreadsheet-basics', type: 'Course', platform: 'DataCamp' },
                        { name: 'Udemy - Excel Complete Guide', url: 'https://www.udemy.com/courses/search/?q=excel%20complete', type: 'Course', platform: 'Udemy' },
                        { name: 'Google Sheets - Official Learning Center', url: 'https://support.google.com/sheets/answer/2494822', type: 'Doc', platform: 'Google' },
                        { name: 'Alex The Analyst - Excel Essentials', url: 'https://www.youtube.com/@AlexTheAnalyst/search?query=excel', type: 'Video', platform: 'YouTube' },
                        { name: 'Kevin Stratvert - Excel Tutorials', url: 'https://www.youtube.com/@KevinStratvert/videos', type: 'Video', platform: 'YouTube' },
                        { name: 'Contextures - Excel Tips & Tricks', url: 'https://www.youtube.com/@contextures/videos', type: 'Video', platform: 'YouTube' }
                    ],
                    tools: [
                        { name: 'Microsoft Excel', desc: 'Core spreadsheet analysis tool.', url: 'https://www.microsoft.com/microsoft-365/excel' },
                        { name: 'Google Sheets', desc: 'Cloud spreadsheets and collaboration.', url: 'https://www.google.com/sheets/about/' },
                        { name: 'OpenRefine', desc: 'Data cleaning and transformation.', url: 'https://openrefine.org/' },
                        { name: 'Notion', desc: 'Analyst notes and project documentation.', url: 'https://www.notion.so/' }
                    ]
                },
                {
                    id: 'p2',
                    title: 'Phase 2: SQL & Data Querying',
                    duration: 'Months 3-4',
                    resources: [
                        { name: 'Alex The Analyst - SQL Complete Course', url: 'https://www.youtube.com/@AlexTheAnalyst/search?query=sql', type: 'Video', platform: 'YouTube' },
                        { name: 'Code with Mosh - SQL Tutorial', url: 'https://www.youtube.com/@programmingwithmosh/search?query=sql', type: 'Video', platform: 'YouTube' },
                        { name: 'Mode SQL Tutorial', url: 'https://mode.com/sql-tutorial/', type: 'Course', platform: 'Mode' },
                        { name: 'LeetCode Database Problems', url: 'https://leetcode.com/problemset/database/', type: 'Lab', platform: 'LeetCode' },
                        { name: 'SQLBolt Interactive Lessons', url: 'https://sqlbolt.com/', type: 'Lab', platform: 'SQLBolt' },
                        { name: 'DataLemur SQL Practice', url: 'https://datalemur.com/sql-interview-questions', type: 'Lab', platform: 'DataLemur' },
                        { name: 'Maven Analytics - SQL for Analysts', url: 'https://www.youtube.com/@MavenAnalytics/search?query=sql', type: 'Video', platform: 'YouTube' },
                        { name: 'DataCamp - SQL for Beginners', url: 'https://www.datacamp.com/courses/introduction-to-sql', type: 'Course', platform: 'DataCamp' }
                    ],
                    tools: [
                        { name: 'PostgreSQL', desc: 'Reliable relational database engine.', url: 'https://www.postgresql.org/' },
                        { name: 'DBeaver', desc: 'Universal SQL client.', url: 'https://dbeaver.io/' },
                        { name: 'DB Fiddle', desc: 'Quick SQL sandbox.', url: 'https://www.db-fiddle.com/' },
                        { name: 'Metabase', desc: 'Lightweight analytics dashboarding.', url: 'https://www.metabase.com/' }
                    ]
                },
                {
                    id: 'p3',
                    title: 'Phase 3: Python Analytics & BI',
                    duration: 'Months 5-6',
                    resources: [
                        { name: 'Alex The Analyst - Python for Data Science', url: 'https://www.youtube.com/@AlexTheAnalyst/search?query=python', type: 'Video', platform: 'YouTube' },
                        { name: 'Code with Mosh - Python Complete Course', url: 'https://www.youtube.com/@programmingwithmosh/search?query=python', type: 'Video', platform: 'YouTube' },
                        { name: 'Kaggle - Python & Pandas Courses', url: 'https://www.kaggle.com/learn/python', type: 'Course', platform: 'Kaggle' },
                        { name: 'Ken Jee - Python Data Science Portfolio', url: 'https://www.youtube.com/@KenJee1/videos', type: 'Video', platform: 'YouTube' },
                        { name: 'Power BI Learning Path', url: 'https://learn.microsoft.com/en-us/training/powerplatform/power-bi/', type: 'Course', platform: 'Microsoft' },
                        { name: 'Tableau Public Training Videos', url: 'https://www.tableau.com/learn/training', type: 'Video', platform: 'Tableau' },
                        { name: 'freeCodeCamp - Python Data Science', url: 'https://www.youtube.com/@freecodecamp/search?query=python+data', type: 'Video', platform: 'YouTube' },
                        { name: 'DataCamp - Python Data Analysis', url: 'https://www.datacamp.com/courses/python-for-data-professionals', type: 'Course', platform: 'DataCamp' }
                    ],
                    tools: [
                        { name: 'Python', desc: 'Data scripting and analysis language.', url: 'https://www.python.org/' },
                        { name: 'Pandas', desc: 'Data wrangling library.', url: 'https://pandas.pydata.org/' },
                        { name: 'Jupyter Notebook', desc: 'Interactive analysis environment.', url: 'https://jupyter.org/' },
                        { name: 'Power BI Desktop', desc: 'Business intelligence dashboards.', url: 'https://powerbi.microsoft.com/desktop/' },
                        { name: 'Tableau Public', desc: 'Interactive public dashboards.', url: 'https://public.tableau.com/' }
                    ]
                },
                {
                    id: 'p4',
                    title: 'Phase 4: Statistics & Advanced Analysis',
                    duration: 'Months 7-8',
                    resources: [
                        { name: 'StatQuest with Josh Starmer - Statistics', url: 'https://www.youtube.com/@statquest/videos', type: 'Video', platform: 'YouTube' },
                        { name: '3Blue1Brown - Linear Algebra Fundamentals', url: 'https://www.youtube.com/@3blue1brown/search?query=linear+algebra', type: 'Video', platform: 'YouTube' },
                        { name: 'Khan Academy - Statistics & Probability', url: 'https://www.khanacademy.org/math/statistics-probability', type: 'Course', platform: 'Khan Academy' },
                        { name: 'DataCamp - Statistical Thinking in Python', url: 'https://www.datacamp.com/courses/statistical-thinking-in-python-part-1', type: 'Course', platform: 'DataCamp' },
                        { name: 'Kaggle - Statistics for Data Science', url: 'https://www.kaggle.com/learn/statistics', type: 'Course', platform: 'Kaggle' },
                        { name: 'Coursera - Statistics with R', url: 'https://www.coursera.org/learn/bayesian-statistics', type: 'Course', platform: 'Coursera' }
                    ],
                    tools: [
                        { name: 'SciPy', desc: 'Scientific computing and statistics.', url: 'https://scipy.org/' },
                        { name: 'NumPy', desc: 'Numerical computing library.', url: 'https://numpy.org/' },
                        { name: 'Statsmodels', desc: 'Statistical modeling library.', url: 'https://www.statsmodels.org/' },
                        { name: 'R (RStudio)', desc: 'Statistical computing environment.', url: 'https://www.r-project.org/' },
                        { name: 'Scikit-learn', desc: 'Machine learning library for Python.', url: 'https://scikit-learn.org/' }
                    ]
                },
                {
                    id: 'p5',
                    title: 'Phase 5: Big Data & Advanced BI',
                    duration: 'Months 9-10',
                    resources: [
                        { name: 'freeCodeCamp - PySpark Complete Tutorial', url: 'https://www.youtube.com/@freecodecamp/search?query=pyspark', type: 'Video', platform: 'YouTube' },
                        { name: 'Databricks Academy - Apache Spark', url: 'https://academy.databricks.com/', type: 'Course', platform: 'Databricks' },
                        { name: 'DataCamp - Big Data with Spark', url: 'https://www.datacamp.com/courses/big-data-fundamentals-with-pyspark', type: 'Course', platform: 'DataCamp' },
                        { name: 'Power BI Advanced Analytics', url: 'https://learn.microsoft.com/en-us/training/paths/advanced-analytics-power-bi/', type: 'Course', platform: 'Microsoft' },
                        { name: 'Tableau Advanced Dashboard Design', url: 'https://www.tableau.com/learn/training', type: 'Course', platform: 'Tableau' },
                        { name: 'AWS Certified Data Analytics Specialty', url: 'https://aws.amazon.com/certification/certified-data-analytics-specialty/', type: 'Course', platform: 'AWS' }
                    ]
                    tools: [
                        { name: 'Apache Spark', desc: 'Distributed computing framework.', url: 'https://spark.apache.org/' },
                        { name: 'PySpark', desc: 'Python API for Spark.', url: 'https://spark.apache.org/docs/latest/api/python/' },
                        { name: 'Hadoop', desc: 'Distributed data processing platform.', url: 'https://hadoop.apache.org/' },
                        { name: 'Hive', desc: 'Data warehouse on Hadoop.', url: 'https://hive.apache.org/' },
                        { name: 'Databricks Community Edition', desc: 'Collaborative Spark workspace.', url: 'https://databricks.com/' }
                    ]
                }
            ]
        }
    },
    pdfInsights: {
        A: {
            source: 'Cyber Security Roadmap (roadmap.sh)',
            checkpoints: [
                { skill: 'Fundamental IT Skills', estimate: '2-4 weeks', phase: 'Beginner' },
                { skill: 'Networking and OS Basics', estimate: '4-8 weeks', phase: 'Beginner' },
                { skill: 'Core Security Concepts', estimate: '6-8 weeks', phase: 'Intermediate' },
                { skill: 'Incident Response and Detection', estimate: '6-10 weeks', phase: 'Intermediate' },
                { skill: 'Cloud Security Fundamentals', estimate: '4-6 weeks', phase: 'Intermediate' },
                { skill: 'Programming for Security Automation', estimate: '6-8 weeks', phase: 'Intermediate' }
            ],
            domains: [
                {
                    title: 'Core Foundations',
                    items: ['Hardware and operating systems', 'Subnetting and IP terminology', 'Protocols, ports, and packet analysis']
                },
                {
                    title: 'Security Operations',
                    items: ['CIA triad and defense-in-depth', 'Threat hunting and vulnerability management', 'IDS/IPS, SIEM, and SOAR workflows']
                },
                {
                    title: 'Response and Governance',
                    items: ['Incident response lifecycle', 'NIST/CIS/ISO standards', 'Risk, compliance, and reporting discipline']
                },
                {
                    title: 'Modern Skills',
                    items: ['Cloud shared responsibility model', 'Identity and zero-trust basics', 'Python/Bash/PowerShell automation']
                }
            ],
            certifications: {
                beginner: ['CompTIA A+', 'CompTIA Network+', 'CompTIA Security+', 'CCNA', 'CompTIA Linux+'],
                advanced: ['CEH', 'CISA', 'CISM', 'CISSP', 'OSCP', 'GIAC Tracks']
            }
        },
        B: {
            source: 'Data Analyst Roadmap (roadmap.sh + Code with Mosh)',
            checkpoints: [
                { skill: 'Math and Statistics', estimate: '1-2 months', phase: 'Beginner' },
                { skill: 'Excel for Analysis and Reporting', estimate: '2-3 weeks', phase: 'Beginner' },
                { skill: 'SQL and Relational Databases', estimate: '1-2 months', phase: 'Beginner' },
                { skill: 'Python for Data Analysis', estimate: '1-2 months', phase: 'Beginner' },
                { skill: 'Version Control with Git', estimate: '1-2 weeks', phase: 'Beginner' },
                { skill: 'Data Collection and Preparation', estimate: '1-2 months', phase: 'Intermediate' },
                { skill: 'Data Visualization and Storytelling', estimate: '1-2 months', phase: 'Intermediate' },
                { skill: 'Machine Learning (Optional)', estimate: '1-2 months', phase: 'Advanced' },
                { skill: 'Big Data (Optional)', estimate: '1-2 months', phase: 'Advanced' }
            ],
            domains: [
                {
                    title: 'Analysis Foundations',
                    items: ['Descriptive and diagnostic analytics', 'Central tendency and dispersion', 'Hypothesis testing and regression']
                },
                {
                    title: 'Data Handling',
                    items: ['Collect from CSV/APIs/web sources', 'Clean missing and duplicate data', 'Transform and model usable datasets']
                },
                {
                    title: 'Visualization and Communication',
                    items: ['Dashboard chart selection', 'Data storytelling for decisions', 'Executive-ready summary writing']
                },
                {
                    title: 'Growth Layer',
                    items: ['Kaggle competitions', 'Portfolio case studies', 'Networking and certification tracks']
                }
            ],
            certifications: {
                beginner: ['Google Data Analytics', 'Microsoft PL-300', 'IBM Data Analyst', 'SQL Portfolio Badge'],
                advanced: ['Tableau Desktop Specialist', 'AWS Data Analytics Specialty', 'Databricks Data Analyst Associate']
            }
        }
    },
    opportunities: {
        global: {
            verification: {
                jobBoards: '2026-03-20',
                communities: '2026-03-19',
                scholarships: '2026-03-18',
                freelance: '2026-03-17'
            },
            jobBoards: [
                { name: 'LinkedIn Jobs', url: 'https://www.linkedin.com/jobs' },
                { name: 'Indeed Worldwide', url: 'https://www.indeed.com/worldwide' },
                { name: 'Wellfound (Startups)', url: 'https://wellfound.com/jobs' },
                { name: 'Remote OK', url: 'https://remoteok.com' },
                { name: 'We Work Remotely', url: 'https://weworkremotely.com' }
            ],
            communities: [
                { name: 'Roadmap.sh Community', url: 'https://roadmap.sh/community' },
                { name: 'Kaggle Community', url: 'https://www.kaggle.com/discussions' },
                { name: 'OWASP Chapters', url: 'https://owasp.org/chapters/' },
                { name: 'GitHub Explore', url: 'https://github.com/explore' },
                { name: 'Hashnode', url: 'https://hashnode.com' }
            ],
            scholarships: [
                { name: 'Google Career Certificates Scholarships', url: 'https://grow.google/certificates/' },
                { name: 'Coursera Financial Aid', url: 'https://www.coursera.org/about/financial-aid' },
                { name: 'Microsoft Learn Student Hub', url: 'https://learn.microsoft.com/en-us/training/student-hub/' },
                { name: 'IBM SkillsBuild', url: 'https://skillsbuild.org' },
                { name: 'AWS Educate', url: 'https://aws.amazon.com/education/awseducate/' }
            ],
            freelance: [
                { name: 'Upwork', url: 'https://www.upwork.com' },
                { name: 'Toptal', url: 'https://www.toptal.com' },
                { name: 'Contra', url: 'https://contra.com' },
                { name: 'Fiverr', url: 'https://www.fiverr.com' },
                { name: 'Freelancer', url: 'https://www.freelancer.com' }
            ]
        },
        countryMeta: {
            Uganda: { continent: 'Africa', verifiedOn: '2026-03-20' },
            Kenya: { continent: 'Africa', verifiedOn: '2026-03-19' },
            Nigeria: { continent: 'Africa', verifiedOn: '2026-03-18' },
            India: { continent: 'Asia', verifiedOn: '2026-03-20' },
            'South Africa': { continent: 'Africa', verifiedOn: '2026-03-18' }
        },
        countries: {
            Uganda: {
                jobBoards: [
                    { name: 'BrighterMonday Uganda', url: 'https://www.brightermonday.co.ug' },
                    { name: 'Fuzu Uganda', url: 'https://www.fuzu.com/ug' },
                    { name: 'LinkedIn Jobs Uganda', url: 'https://www.linkedin.com/jobs' },
                    { name: 'Remote African Jobs', url: 'https://remoteafrican.com' },
                    { name: 'Daily Monitor Jobs & Careers', url: 'https://www.monitor.co.ug/uganda/jobs-and-career' }
                ],
                communities: [
                    { name: 'Innovation Village (Ntinda)', url: 'https://innovationvillage.co.ug' },
                    { name: 'Outbox Hub', url: 'https://outbox.co.ug' },
                    { name: 'Hive Colab', url: 'http://www.hivecolab.org' },
                    { name: 'Refactory Academy', url: 'https://refactory.ug' },
                    { name: 'GDG Kampala', url: 'https://gdg.community.dev/gdg-kampala/' }
                ],
                programs: [
                    { name: 'Andela Learning Community (Africa)', url: 'https://andela.com' },
                    { name: 'UNICEF Venture Fund (Global, incl. Uganda)', url: 'https://www.unicefinnovationfund.org' },
                    { name: 'Mastercard Foundation Programs', url: 'https://mastercardfdn.org' }
                ]
            },
            Kenya: {
                jobBoards: [
                    { name: 'BrighterMonday Kenya', url: 'https://www.brightermonday.co.ke' },
                    { name: 'MyJobMag Kenya', url: 'https://www.myjobmag.co.ke' },
                    { name: 'Fuzu Kenya', url: 'https://www.fuzu.com/ke' }
                ],
                communities: [
                    { name: 'Nailab', url: 'https://nailab.co.ke' },
                    { name: 'iHub Nairobi', url: 'https://ihub.co.ke' },
                    { name: 'GDG Nairobi', url: 'https://gdg.community.dev/gdg-nairobi/' }
                ],
                programs: [
                    { name: 'Ajira Digital Program', url: 'https://ajiradigital.go.ke' },
                    { name: 'Moringa School', url: 'https://moringaschool.com' }
                ]
            },
            Nigeria: {
                jobBoards: [
                    { name: 'Jobberman', url: 'https://www.jobberman.com' },
                    { name: 'MyJobMag Nigeria', url: 'https://www.myjobmag.com' },
                    { name: 'Hot Nigerian Jobs', url: 'https://www.hotnigerianjobs.com' }
                ],
                communities: [
                    { name: 'CcHub', url: 'https://cchub.africa' },
                    { name: 'GDG Lagos', url: 'https://gdg.community.dev/gdg-lagos/' },
                    { name: 'forLoop Africa', url: 'https://forloop.africa' }
                ],
                programs: [
                    { name: 'ALX Africa', url: 'https://www.alxafrica.com' },
                    { name: 'Ingressive for Good', url: 'https://ingressive.org' }
                ]
            },
            India: {
                jobBoards: [
                    { name: 'Naukri', url: 'https://www.naukri.com' },
                    { name: 'LinkedIn India Jobs', url: 'https://www.linkedin.com/jobs' },
                    { name: 'Cutshort', url: 'https://cutshort.io/jobs' }
                ],
                communities: [
                    { name: 'GDG India Chapters', url: 'https://gdg.community.dev' },
                    { name: 'Analytics Vidhya', url: 'https://www.analyticsvidhya.com' },
                    { name: 'Null Community', url: 'https://null.community' }
                ],
                programs: [
                    { name: 'NASSCOM FutureSkills Prime', url: 'https://futureskillsprime.in' },
                    { name: 'Smart India Hackathon', url: 'https://www.sih.gov.in' }
                ]
            },
            'South Africa': {
                jobBoards: [
                    { name: 'PNet', url: 'https://www.pnet.co.za' },
                    { name: 'Careers24', url: 'https://www.careers24.com' },
                    { name: 'OfferZen', url: 'https://www.offerzen.com' }
                ],
                communities: [
                    { name: 'Geekulcha', url: 'https://www.geekulcha.com' },
                    { name: 'GirlCode', url: 'https://girlcode.co.za' },
                    { name: 'GDG Cape Town', url: 'https://gdg.community.dev/gdg-cape-town/' }
                ],
                programs: [
                    { name: 'Explore Data Science Academy', url: 'https://www.explore.ai' },
                    { name: 'Mlab Southern Africa', url: 'https://www.mlab.co.za' }
                ]
            }
        }
    },
    uganda: {
        communities: [
            { name: 'Innovation Village (Ntinda)', url: 'https://innovationvillage.co.ug' },
            { name: 'Outbox Hub', url: 'https://outbox.co.ug' },
            { name: 'Hive Colab', url: 'http://www.hivecolab.org' },
            { name: 'Refactory Academy', url: 'https://refactory.ug' },
            { name: 'PyLadies Kampala', url: 'https://twitter.com/pyladieskla' },
            { name: 'GDG Kampala', url: 'https://gdg.community.dev/gdg-kampala/' },
            { name: 'Women in Tech Uganda', url: 'https://witug.org/' },
            { name: 'Node.js Uganda', url: 'https://twitter.com/nodejsuganda' }
        ],
        jobs: [
            { name: 'BrighterMonday Uganda', url: 'https://www.brightermonday.co.ug' },
            { name: 'Fuzu Uganda', url: 'https://www.fuzu.com/ug' },
            { name: 'LinkedIn Jobs Uganda', url: 'https://www.linkedin.com/jobs' },
            { name: 'Remote African Jobs', url: 'https://remoteafrican.com' },
            { name: 'The Independent Uganda Jobs', url: 'https://www.independent.co.ug/jobs/' },
            { name: 'Daily Monitor Classifieds', url: 'https://www.monitor.co.ug/monitor/magazines/jobs-and-career' }
        ]
    },
    projects: [
        // --- PLAN A: CYBERSECURITY (5 projects) ---
        {
            id: 1, plan: 'A', name: 'Log Analysis Dashboard',
            difficulty: 'Intermediate', time: '1 week',
            desc: 'Build a Splunk dashboard analyzing sample security logs (Boss of the SOC dataset).',
            problem: 'Organizations generate millions of log events daily but lack visibility into security threats hiding in the noise. SOC analysts need fast, visual ways to detect anomalies like brute-force attacks, lateral movement, and data exfiltration.',
            solution: 'Ingest the BOTS (Boss of the SOC) dataset into Splunk, create custom dashboards with visualizations for failed login attempts, suspicious DNS queries, and unusual outbound traffic. Build correlation searches and alert thresholds that flag real threats automatically.',
            technologies: { languages: ['SPL (Search Processing Language)'], frameworks: ['Splunk Enterprise'], databases: ['Splunk Index'], other: ['BOTS Dataset', 'Sysmon Logs', 'Windows Event Logs'] },
            skills: ['SIEM', 'log analysis', 'threat detection'],
            tools: ['Splunk Free', 'BOTS dataset'],
            steps: ['Install Splunk Free', 'Ingest BOTS dataset', 'Create index patterns', 'Build visualizations for failed logins', 'Create alert thresholds'],
            portfolio: 'Shows hands-on SIEM experience'
        },
        {
            id: 2, plan: 'A', name: 'Virtual SOC Lab Environment',
            difficulty: 'Intermediate', time: '1-2 weeks',
            desc: 'Build a complete home SOC lab with Security Onion, attacking machine, and victim machines.',
            problem: 'Aspiring security analysts have no safe environment to practice detecting and responding to real attacks. Cloud labs are expensive and limited — you need a persistent, customizable lab you fully control.',
            solution: 'Build a multi-VM network with Security Onion as the monitoring hub, Kali Linux as the attacker, and Windows/Linux VMs as targets. Configure IDS/IPS rules, practice generating and detecting attacks, and build familiarity with real SOC tooling.',
            technologies: { languages: ['Bash', 'PowerShell'], frameworks: ['Security Onion', 'Elastic Stack'], databases: ['Elasticsearch'], other: ['VirtualBox/VMware', 'Kali Linux', 'Windows Server', 'Suricata', 'Zeek'] },
            skills: ['Virtualization', 'IDS/IPS', 'network security'],
            tools: ['VirtualBox', 'Security Onion', 'Kali Linux', 'Windows VMs'],
            steps: ['Setup VirtualBox/VMware', 'Install Security Onion', 'Deploy Kali and Windows targets', 'Configure network topology', 'Test log ingestion'],
            portfolio: 'Demonstrates practical security operations capability'
        },
        {
            id: 3, plan: 'A', name: 'Vulnerability Assessment & Report',
            difficulty: 'Beginner-Intermediate', time: '3-5 days',
            desc: 'Scan a website for vulnerabilities using OWASP ZAP, create a professional pentest-style report.',
            problem: 'Web applications are the #1 attack surface, yet most small businesses and developers ship code without security testing. They need affordable, thorough assessments that identify critical risks before attackers do.',
            solution: 'Use OWASP ZAP for automated scanning and Burp Suite for manual testing. Map all endpoints, identify OWASP Top 10 vulnerabilities (XSS, SQLi, broken auth), verify findings manually to eliminate false positives, and deliver a professional report with severity ratings and remediation steps.',
            technologies: { languages: ['Python', 'JavaScript'], frameworks: ['OWASP Testing Guide'], databases: [], other: ['OWASP ZAP', 'Burp Suite Community', 'Nmap', 'Nikto', 'CVSS Scoring'] },
            skills: ['Web app testing', 'OWASP Top 10', 'report writing'],
            tools: ['OWASP ZAP', 'Burp Suite Community'],
            steps: ['Obtain permission', 'Run automated scan', 'Manual verification', 'Document findings', 'Propose remediations'],
            portfolio: 'Real-world pentest report for interviews'
        },
        {
            id: 4, plan: 'A', name: 'Network Penetration Testing Lab',
            difficulty: 'Intermediate-Advanced', time: '2-3 weeks',
            desc: 'Build multi-machine vulnerable network, perform full pentest, document methodology.',
            problem: 'Enterprise networks have multiple interconnected systems where a single compromised host can lead to full domain takeover. Security teams need pentesters who can think like attackers and chain vulnerabilities across network segments.',
            solution: 'Design a realistic multi-subnet network with vulnerable services. Perform full-scope penetration testing: reconnaissance, exploitation, post-exploitation, pivoting between machines, privilege escalation. Document everything in a professional pentest report following PTES methodology.',
            technologies: { languages: ['Python', 'Bash', 'PowerShell'], frameworks: ['Metasploit Framework', 'PTES'], databases: [], other: ['Nmap', 'Kali Linux', 'Metasploitable', 'Wireshark', 'Netcat', 'LinPEAS/WinPEAS'] },
            skills: ['Network pentesting', 'pivoting', 'privilege escalation'],
            tools: ['VirtualBox', 'Metasploitable', 'Windows VMs', 'Kali'],
            steps: ['Design network topology', 'Setup VMs', 'Scan network', 'Exploit entry point', 'Pivot and escalate'],
            portfolio: 'Shows end-to-end pentesting skills'
        },
        {
            id: 5, plan: 'A', name: 'Active Directory Attack & Defense Lab',
            difficulty: 'Advanced', time: '2-3 weeks',
            desc: 'Build AD environment, demonstrate common attack paths, create defensive recommendations.',
            problem: '95% of Fortune 500 companies use Active Directory. Misconfigurations in AD are the most common path to full enterprise compromise, yet most organizations lack staff who understand both the attack and defense sides of AD security.',
            solution: 'Build a realistic AD forest with domain controller, workstations, and user accounts. Demonstrate attacks like Kerberoasting, AS-REP roasting, Pass-the-Hash, and DCSync. Then implement and document defensive measures: LAPS, tiered admin model, monitoring with BloodHound, and GPO hardening.',
            technologies: { languages: ['PowerShell', 'Python', 'C#'], frameworks: ['MITRE ATT&CK', 'BloodHound'], databases: ['LDAP/AD DS'], other: ['Mimikatz', 'Impacket', 'PowerView', 'Rubeus', 'CrackMapExec', 'Windows Server'] },
            skills: ['AD exploitation', 'Kerberos attacks', 'lateral movement'],
            tools: ['BloodHound', 'Mimikatz', 'Impacket', 'PowerView'],
            steps: ['Setup Domain Controller', 'Create users/groups', 'Run BloodHound', 'Execute Kerberoasting', 'Document defenses'],
            portfolio: 'Enterprise-critical skill highly valued by employers'
        },

        // --- PLAN B: DATA ANALYST (5 projects) ---
        {
            id: 6, plan: 'B', name: 'Uganda Jobs Data Dashboard',
            difficulty: 'Intermediate', time: '1 week',
            desc: 'Scrape and analyze Uganda tech job listings, then publish a dashboard of trends.',
            problem: 'Job seekers struggle to understand which skills and roles are trending because openings are spread across many sites.',
            solution: 'Collect listings from public job boards, clean and standardize titles and skills, then build a dashboard showing demand by role, skill, and location.',
            technologies: { languages: ['Python', 'SQL'], frameworks: ['Pandas'], databases: ['PostgreSQL'], other: ['Power BI', 'BeautifulSoup'] },
            skills: ['data cleaning', 'dashboarding', 'trend analysis'],
            tools: ['Python', 'PostgreSQL', 'Power BI'],
            steps: ['Collect job data', 'Clean and normalize fields', 'Write SQL aggregations', 'Build visuals', 'Publish insights'],
            portfolio: 'Shows end-to-end analyst workflow on local market data'
        },
        {
            id: 7, plan: 'B', name: 'Retail Sales KPI Tracker',
            difficulty: 'Beginner-Intermediate', time: '4-6 days',
            desc: 'Build a KPI dashboard for revenue, margin, and product performance.',
            problem: 'Small shops track sales manually and cannot quickly identify top products or slow movers.',
            solution: 'Model daily sales data, build KPI definitions, and create dashboards for category performance, seasonality, and outlier detection.',
            technologies: { languages: ['SQL'], frameworks: [], databases: ['SQLite', 'PostgreSQL'], other: ['Excel', 'Power BI'] },
            skills: ['KPI design', 'SQL', 'business reporting'],
            tools: ['SQL', 'Excel', 'Power BI'],
            steps: ['Define KPI metrics', 'Import and clean sales data', 'Create SQL views', 'Build dashboard pages', 'Document recommendations'],
            portfolio: 'Demonstrates business-focused analytics delivery'
        },
        {
            id: 8, plan: 'B', name: 'Customer Churn Analysis',
            difficulty: 'Intermediate', time: '1 week',
            desc: 'Analyze customer behavior to identify churn signals and retention opportunities.',
            problem: 'Teams lose customers without understanding the behavioral patterns leading up to churn.',
            solution: 'Use Python and SQL to segment cohorts, compare retained vs churned users, and produce a retention action report with clear metrics.',
            technologies: { languages: ['Python', 'SQL'], frameworks: ['Pandas'], databases: ['PostgreSQL'], other: ['Jupyter', 'Seaborn'] },
            skills: ['cohort analysis', 'EDA', 'data storytelling'],
            tools: ['Python', 'Jupyter', 'PostgreSQL'],
            steps: ['Load customer events', 'Create cohorts', 'Measure churn patterns', 'Visualize findings', 'Write retention recommendations'],
            portfolio: 'Strong analytical thinking and communication evidence'
        },
        {
            id: 9, plan: 'B', name: 'SQL Case Study Portfolio',
            difficulty: 'Intermediate', time: '5 days',
            desc: 'Solve practical SQL business questions and publish answers with clear explanation.',
            problem: 'Employers want SQL fluency, but candidates often only show toy examples with weak business context.',
            solution: 'Build a case-study repo with realistic datasets, optimized SQL queries, and short narratives explaining decisions and trade-offs.',
            technologies: { languages: ['SQL'], frameworks: [], databases: ['PostgreSQL'], other: ['DBeaver', 'GitHub'] },
            skills: ['joins', 'window functions', 'query optimization'],
            tools: ['PostgreSQL', 'DBeaver', 'GitHub'],
            steps: ['Pick datasets', 'Write baseline queries', 'Optimize with CTE/window functions', 'Validate outputs', 'Publish write-ups'],
            portfolio: 'Interview-ready SQL project set with business framing'
        },
        {
            id: 10, plan: 'B', name: 'Executive Insights Report',
            difficulty: 'Advanced', time: '1 week',
            desc: 'Create a management-ready analytics report and presentation from raw operational data.',
            problem: 'Decision-makers receive raw tables but need concise narratives and actionable recommendations.',
            solution: 'Transform raw data into executive KPIs, highlight risks and opportunities, and present decisions using charts, narrative, and prioritized actions.',
            technologies: { languages: ['Python', 'SQL'], frameworks: ['Pandas'], databases: ['PostgreSQL'], other: ['Power BI', 'PowerPoint'] },
            skills: ['executive communication', 'insight prioritization', 'decision support'],
            tools: ['Python', 'SQL', 'Power BI'],
            steps: ['Frame business questions', 'Prepare analysis dataset', 'Build executive visuals', 'Write narrative summary', 'Present recommendations'],
            portfolio: 'Proves analyst impact beyond charts into decisions'
        },

        // --- PLAN A: CYBERSECURITY (10 additional projects) ---
        {
            id: 11, plan: 'A', name: 'SOC Alert Triage Playbook',
            difficulty: 'Beginner-Intermediate', time: '4-6 days',
            desc: 'Design a practical triage flow for common SOC alerts with severity mapping and response actions.',
            problem: 'Analysts burn time without standardized triage steps, causing inconsistent investigations and missed threats.',
            solution: 'Create a playbook for phishing, brute-force, malware, and suspicious login alerts with clear decision trees, evidence checklist, and escalation criteria.',
            technologies: { languages: ['Markdown'], frameworks: ['MITRE ATT&CK'], databases: [], other: ['TheHive', 'Wazuh', 'Splunk'] },
            skills: ['incident triage', 'playbook design', 'threat prioritization'],
            tools: ['TheHive', 'Wazuh', 'Splunk'],
            steps: ['Identify top alert types', 'Define severity rubric', 'Document response steps', 'Create evidence checklist', 'Run tabletop review'],
            portfolio: 'Demonstrates SOC process maturity and practical IR thinking'
        },
        {
            id: 12, plan: 'A', name: 'Phishing Detection Pipeline',
            difficulty: 'Intermediate', time: '1 week',
            desc: 'Build an automated pipeline to score suspicious emails using header and content indicators.',
            problem: 'Teams receive high volumes of suspicious emails and need a repeatable way to prioritize likely phishing attempts.',
            solution: 'Parse email headers, extract IOC features, score risk with weighted rules, and export analyst-ready summaries.',
            technologies: { languages: ['Python'], frameworks: [], databases: ['SQLite'], other: ['YARA', 'VirusTotal API', 'Pandas'] },
            skills: ['phishing analysis', 'automation', 'IOC extraction'],
            tools: ['Python', 'VirusTotal API', 'Pandas'],
            steps: ['Collect sample emails', 'Extract indicators', 'Define risk scoring', 'Generate analyst report', 'Tune false positives'],
            portfolio: 'Shows automation applied to a high-impact SOC use case'
        },
        {
            id: 13, plan: 'A', name: 'Threat Hunting with Sigma Rules',
            difficulty: 'Intermediate-Advanced', time: '1-2 weeks',
            desc: 'Create and test Sigma detection rules against sample telemetry.',
            problem: 'Static alerting misses emerging attacker behaviors that require hypothesis-driven hunts.',
            solution: 'Write Sigma rules for suspicious process chains, encoded commands, and lateral movement indicators, then validate rule quality on logs.',
            technologies: { languages: ['YAML'], frameworks: ['Sigma'], databases: ['Elasticsearch'], other: ['Sysmon', 'Kibana'] },
            skills: ['threat hunting', 'detection engineering', 'log analysis'],
            tools: ['Sigma', 'Sysmon', 'Kibana'],
            steps: ['Define hunt hypotheses', 'Write Sigma rules', 'Replay sample attacks', 'Measure precision', 'Document tuning changes'],
            portfolio: 'Great evidence of blue-team detection engineering ability'
        },
        {
            id: 14, plan: 'A', name: 'Cloud IAM Misconfiguration Audit',
            difficulty: 'Intermediate', time: '1 week',
            desc: 'Audit cloud IAM policies and identify privilege escalation risks.',
            problem: 'Excessive IAM permissions are a common breach path in cloud environments.',
            solution: 'Inventory identities and policies, detect wildcards and risky role assumptions, and provide least-privilege remediation guidance.',
            technologies: { languages: ['Python'], frameworks: [], databases: [], other: ['AWS IAM Access Analyzer', 'Azure IAM', 'Prowler'] },
            skills: ['cloud security', 'IAM review', 'risk reporting'],
            tools: ['Prowler', 'AWS IAM Access Analyzer', 'Azure Portal'],
            steps: ['Export IAM config', 'Flag risky permissions', 'Prioritize fixes', 'Apply least privilege updates', 'Retest'],
            portfolio: 'Highlights practical cloud governance and access control skills'
        },
        {
            id: 15, plan: 'A', name: 'Container Security Baseline',
            difficulty: 'Intermediate', time: '5-7 days',
            desc: 'Build and enforce baseline controls for secure containerized workloads.',
            problem: 'Containers are often deployed with weak defaults, expanding attack surface in CI/CD pipelines.',
            solution: 'Scan images for CVEs, enforce minimal base images, configure runtime restrictions, and document secure deployment standards.',
            technologies: { languages: ['YAML', 'Bash'], frameworks: ['CIS Benchmarks'], databases: [], other: ['Trivy', 'Docker', 'Kubernetes'] },
            skills: ['container security', 'hardening', 'DevSecOps'],
            tools: ['Trivy', 'Docker', 'kubectl'],
            steps: ['Select baseline controls', 'Scan existing images', 'Harden Dockerfiles', 'Apply runtime policies', 'Publish checklist'],
            portfolio: 'Shows cloud-native security readiness'
        },
        {
            id: 16, plan: 'A', name: 'Malware Sandbox Analysis Notes',
            difficulty: 'Intermediate', time: '1 week',
            desc: 'Analyze malware samples safely and produce IOC-focused reports.',
            problem: 'Security teams need practical malware triage capabilities to respond quickly to suspicious binaries.',
            solution: 'Run samples in isolated sandbox, capture process/network behavior, extract indicators, and summarize findings for SOC consumption.',
            technologies: { languages: ['Python'], frameworks: [], databases: [], other: ['Any.Run', 'Cuckoo Sandbox', 'Wireshark'] },
            skills: ['malware analysis', 'IOC generation', 'incident reporting'],
            tools: ['Any.Run', 'Wireshark', 'YARA'],
            steps: ['Prepare sandbox', 'Execute sample safely', 'Collect behavior artifacts', 'Extract IOCs', 'Write response brief'],
            portfolio: 'Useful DFIR artifact demonstrating investigative discipline'
        },
        {
            id: 17, plan: 'A', name: 'SIEM Use Case Engineering',
            difficulty: 'Advanced', time: '2 weeks',
            desc: 'Design and implement 10 high-value SIEM detections with tuning notes.',
            problem: 'Many SIEM deployments have noisy alerts and poor coverage of critical attack techniques.',
            solution: 'Create mapped detections for ATT&CK techniques, test against benign/malicious data, and tune with suppression and thresholds.',
            technologies: { languages: ['SPL', 'KQL'], frameworks: ['MITRE ATT&CK'], databases: ['Splunk Index', 'Log Analytics'] , other: ['Splunk', 'Microsoft Sentinel'] },
            skills: ['SIEM engineering', 'detection tuning', 'ATT&CK mapping'],
            tools: ['Splunk', 'Microsoft Sentinel'],
            steps: ['Choose threat scenarios', 'Write detections', 'Validate with sample data', 'Tune noise', 'Document runbooks'],
            portfolio: 'High-signal project for SOC/detection engineering roles'
        },
        {
            id: 18, plan: 'A', name: 'Web App Bug Bounty Practice Lab',
            difficulty: 'Intermediate', time: '1-2 weeks',
            desc: 'Practice bug bounty methodology on legal lab targets and report findings professionally.',
            problem: 'Bug bounty requires systematic recon and reporting, not just random scanning.',
            solution: 'Run scoped recon, identify exploitable issues, verify impact, and submit standardized vulnerability reports with repro steps.',
            technologies: { languages: ['JavaScript', 'Python'], frameworks: ['OWASP Top 10'], databases: [], other: ['Burp Suite', 'Subfinder', 'Nuclei'] },
            skills: ['recon', 'web exploitation', 'report writing'],
            tools: ['Burp Suite', 'Nuclei', 'Subfinder'],
            steps: ['Define legal scope', 'Perform recon', 'Validate vulnerabilities', 'Assess impact', 'Write report'],
            portfolio: 'Demonstrates offensive workflow and communication quality'
        },
        {
            id: 19, plan: 'A', name: 'Blue Team Metrics Dashboard',
            difficulty: 'Intermediate', time: '1 week',
            desc: 'Create a dashboard for MTTD, MTTR, incident volumes, and alert quality metrics.',
            problem: 'Security operations struggle to improve without measurable performance indicators.',
            solution: 'Model SOC event data and build KPI dashboards with trend lines and SLA views for leadership reporting.',
            technologies: { languages: ['SQL', 'Python'], frameworks: [], databases: ['PostgreSQL'], other: ['Power BI', 'Tableau'] },
            skills: ['security metrics', 'data storytelling', 'operations reporting'],
            tools: ['PostgreSQL', 'Power BI'],
            steps: ['Define SOC KPIs', 'Prepare event model', 'Build visuals', 'Add SLA slices', 'Publish monthly report template'],
            portfolio: 'Bridges technical security work with leadership visibility'
        },
        {
            id: 20, plan: 'A', name: 'Incident Response Tabletop Kit',
            difficulty: 'Beginner-Intermediate', time: '3-5 days',
            desc: 'Build a reusable tabletop exercise kit for ransomware and data breach scenarios.',
            problem: 'Teams often have plans on paper but little rehearsal of real incident decision-making.',
            solution: 'Create scenario cards, inject timeline events, role prompts, and post-mortem templates to run recurring tabletop sessions.',
            technologies: { languages: ['Markdown'], frameworks: ['NIST 800-61'], databases: [], other: ['Miro', 'Notion'] },
            skills: ['incident planning', 'facilitation', 'post-incident review'],
            tools: ['Notion', 'Miro'],
            steps: ['Define scenario scope', 'Create inject timeline', 'Assign roles', 'Run tabletop', 'Capture lessons learned'],
            portfolio: 'Demonstrates preparedness and leadership in response readiness'
        },

        // --- PLAN B: DATA ANALYST (10 additional projects) ---
        {
            id: 21, plan: 'B', name: 'Marketing Funnel Conversion Analysis',
            difficulty: 'Intermediate', time: '1 week',
            desc: 'Analyze full-funnel conversion from impressions to paid customers.',
            problem: 'Marketing teams spend budget without clarity on where conversion drop-offs happen.',
            solution: 'Build funnel stages, compute stage-to-stage conversion, segment by channel/campaign, and recommend optimization actions.',
            technologies: { languages: ['SQL', 'Python'], frameworks: ['Pandas'], databases: ['PostgreSQL'], other: ['Power BI'] },
            skills: ['funnel analytics', 'segmentation', 'business recommendations'],
            tools: ['SQL', 'Python', 'Power BI'],
            steps: ['Define funnel stages', 'Prepare event table', 'Calculate conversions', 'Segment by channel', 'Present actions'],
            portfolio: 'Shows direct revenue-impact analytics'
        },
        {
            id: 22, plan: 'B', name: 'A/B Test Results Analyzer',
            difficulty: 'Intermediate', time: '4-6 days',
            desc: 'Evaluate experiment outcomes with significance checks and stakeholder summary.',
            problem: 'Teams run experiments but misinterpret noise as meaningful improvements.',
            solution: 'Compute uplift, confidence intervals, and p-values; flag statistical validity; publish clear decision recommendation.',
            technologies: { languages: ['Python', 'SQL'], frameworks: ['SciPy', 'Pandas'], databases: ['PostgreSQL'], other: ['Jupyter'] },
            skills: ['experiment analysis', 'statistics', 'decision support'],
            tools: ['Python', 'Jupyter', 'SciPy'],
            steps: ['Ingest test data', 'Validate sample quality', 'Run significance tests', 'Summarize outcomes', 'Recommend next step'],
            portfolio: 'Strong product analytics competency marker'
        },
        {
            id: 23, plan: 'B', name: 'Supply Chain Delay Insights',
            difficulty: 'Intermediate', time: '1 week',
            desc: 'Identify causes of delivery delays and model risk patterns by route and vendor.',
            problem: 'Operations teams face recurring delays but lack root-cause visibility.',
            solution: 'Build delay KPIs, correlate delays with route/vendor/weather dimensions, and propose process improvements.',
            technologies: { languages: ['SQL', 'Python'], frameworks: ['Pandas'], databases: ['PostgreSQL'], other: ['Tableau'] },
            skills: ['root cause analysis', 'ops analytics', 'dashboarding'],
            tools: ['SQL', 'Python', 'Tableau'],
            steps: ['Define delay metrics', 'Join operational dimensions', 'Find top delay drivers', 'Visualize trends', 'Propose mitigations'],
            portfolio: 'Demonstrates operational analytics impact'
        },
        {
            id: 24, plan: 'B', name: 'HR Attrition Insights Dashboard',
            difficulty: 'Beginner-Intermediate', time: '5 days',
            desc: 'Analyze employee attrition trends by department, tenure, and role.',
            problem: 'HR teams need evidence-driven retention strategies but often rely on anecdotal signals.',
            solution: 'Create attrition cohorts, highlight high-risk segments, and present retention-focused recommendations with supporting visuals.',
            technologies: { languages: ['SQL'], frameworks: [], databases: ['PostgreSQL'], other: ['Power BI', 'Excel'] },
            skills: ['HR analytics', 'cohorting', 'executive communication'],
            tools: ['SQL', 'Power BI'],
            steps: ['Prepare HR dataset', 'Build attrition cohorts', 'Analyze segment risk', 'Create dashboard', 'Summarize retention ideas'],
            portfolio: 'Business-friendly analysis with clear actionability'
        },
        {
            id: 25, plan: 'B', name: 'Customer Segmentation Model',
            difficulty: 'Advanced', time: '1-2 weeks',
            desc: 'Segment customers using behavioral and monetary signals for targeted strategy.',
            problem: 'One-size-fits-all campaigns reduce engagement and waste budget.',
            solution: 'Engineer RFM features, run clustering, profile segments, and generate strategy playbook per segment.',
            technologies: { languages: ['Python', 'SQL'], frameworks: ['scikit-learn', 'Pandas'], databases: ['PostgreSQL'], other: ['Jupyter'] },
            skills: ['feature engineering', 'clustering', 'segment strategy'],
            tools: ['Python', 'scikit-learn', 'Jupyter'],
            steps: ['Build RFM metrics', 'Scale features', 'Run clustering', 'Interpret clusters', 'Create strategy brief'],
            portfolio: 'Shows applied analytics + modeling capability'
        },
        {
            id: 26, plan: 'B', name: 'Financial Performance Variance Report',
            difficulty: 'Intermediate', time: '1 week',
            desc: 'Build variance analysis between budget and actual performance.',
            problem: 'Leadership needs fast visibility into where budget assumptions diverge from reality.',
            solution: 'Create variance views by business unit, identify main drivers, and provide corrective action recommendations.',
            technologies: { languages: ['SQL', 'Python'], frameworks: ['Pandas'], databases: ['PostgreSQL'], other: ['Power BI'] },
            skills: ['financial analytics', 'variance analysis', 'executive reporting'],
            tools: ['SQL', 'Python', 'Power BI'],
            steps: ['Import budget and actuals', 'Model variance calculations', 'Slice by dimension', 'Highlight outliers', 'Deliver executive memo'],
            portfolio: 'Strong finance-facing analytics project'
        },
        {
            id: 27, plan: 'B', name: 'Product Usage Cohort Dashboard',
            difficulty: 'Intermediate', time: '1 week',
            desc: 'Track retention and engagement by signup cohort over time.',
            problem: 'Product teams need to know whether changes improve long-term user retention.',
            solution: 'Build cohort tables and heatmaps, compare retention curves, and annotate product release impacts.',
            technologies: { languages: ['SQL', 'Python'], frameworks: ['Pandas'], databases: ['PostgreSQL'], other: ['Tableau'] },
            skills: ['cohort analysis', 'retention analytics', 'product insights'],
            tools: ['SQL', 'Python', 'Tableau'],
            steps: ['Define cohort keys', 'Build retention matrix', 'Create heatmap visuals', 'Compare pre/post release', 'Recommend experiments'],
            portfolio: 'Excellent product analytics case study'
        },
        {
            id: 28, plan: 'B', name: 'Customer Support Ticket Intelligence',
            difficulty: 'Intermediate', time: '5-7 days',
            desc: 'Analyze support ticket trends, resolution times, and recurring issue categories.',
            problem: 'Support teams need data-backed prioritization to reduce backlog and improve response quality.',
            solution: 'Classify ticket categories, measure SLA breaches, and surface high-impact recurring issues for process fixes.',
            technologies: { languages: ['Python', 'SQL'], frameworks: ['Pandas'], databases: ['PostgreSQL'], other: ['Power BI'] },
            skills: ['service analytics', 'SLA reporting', 'process improvement'],
            tools: ['Python', 'SQL', 'Power BI'],
            steps: ['Load ticket history', 'Classify issue categories', 'Compute SLA metrics', 'Visualize bottlenecks', 'Propose improvements'],
            portfolio: 'Shows operations + customer experience analytics'
        },
        {
            id: 29, plan: 'B', name: 'Geo Sales Performance Map',
            difficulty: 'Beginner-Intermediate', time: '4-6 days',
            desc: 'Build location-aware sales visuals to compare region performance.',
            problem: 'Regional teams need visibility into underperforming territories and growth opportunities.',
            solution: 'Map sales and margin metrics by geography, compare trend deltas, and identify expansion priorities.',
            technologies: { languages: ['SQL'], frameworks: [], databases: ['PostgreSQL'], other: ['Tableau', 'Power BI Maps'] },
            skills: ['geospatial analytics', 'sales reporting', 'regional planning'],
            tools: ['SQL', 'Tableau'],
            steps: ['Prepare geo dimensions', 'Join sales metrics', 'Build map visuals', 'Compare regional trends', 'Draft territory recommendations'],
            portfolio: 'Clear business-facing visualization project'
        },
        {
            id: 30, plan: 'B', name: 'End-to-End Analytics Portfolio Site',
            difficulty: 'Advanced', time: '1-2 weeks',
            desc: 'Publish your analytics projects with methodology, dashboards, and outcome summaries.',
            problem: 'Analysts often have great work but weak presentation, reducing interview impact.',
            solution: 'Build a portfolio site featuring problem context, data prep steps, dashboards, and measurable outcomes for each project.',
            technologies: { languages: ['HTML', 'CSS', 'JavaScript'], frameworks: [], databases: [], other: ['GitHub Pages', 'Power BI Embed'] },
            skills: ['portfolio storytelling', 'analytics communication', 'personal branding'],
            tools: ['GitHub Pages', 'Power BI', 'Tableau Public'],
            steps: ['Choose 4-6 projects', 'Write structured case studies', 'Embed dashboards', 'Add outcomes section', 'Publish and test mobile layout'],
            portfolio: 'High-value capstone for job applications'
        }
    ]
};
