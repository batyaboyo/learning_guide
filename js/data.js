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
                        { name: 'TryHackMe SOC Level 1', url: 'https://tryhackme.com/path/outline/soclevel1', type: 'Lab', platform: 'TryHackMe' },
                        { name: 'Google Cybersecurity Certificate (Audit)', url: 'https://www.coursera.org/professional-certificates/google-cybersecurity', type: 'Course', platform: 'Coursera' },
                        { name: 'Rangeforce: Immersive Solo Labs', url: 'https://www.rangeforce.com/solo-labs', type: 'Lab', platform: 'Rangeforce' },
                        { name: 'Splunk Fundamentals (Free)', url: 'https://www.splunk.com/en_us/training/free-courses/splunk-fundamentals-1.html', type: 'Course', platform: 'Splunk' },
                        { name: 'Microsoft SC-900 Training', url: 'https://learn.microsoft.com/en-us/credentials/certifications/security-compliance-and-identity-fundamentals/', type: 'Course', platform: 'Microsoft' },
                        { name: 'Professor Messer Security+ SY0-701', url: 'https://www.youtube.com/playlist?list=PLG49S3nxzAnkL2ulTSqvMrbCdISPNK9Pr', type: 'Video', platform: 'YouTube' },
                        { name: 'Cisco Introduction to Cybersecurity', url: 'https://www.skillsforall.com/course/introduction-to-cybersecurity', type: 'Course', platform: 'Cisco' },
                        { name: 'Wazuh SIEM Lab Tutorial', url: 'https://www.youtube.com/watch?v=kYJv5_W_k6w', type: 'Video', platform: 'YouTube' },
                        { name: 'LetsDefend.io SOC Foundations', url: 'https://letsdefend.io/', type: 'Course', platform: 'LetsDefend' },
                        { name: 'Cybrary: Defensive Security Ops', url: 'https://www.cybrary.it/course/defensive-security-operations', type: 'Course', platform: 'Cybrary' },
                        { name: 'Security Blue Team: FREE Training', url: 'https://www.securityblue.team/', type: 'Course', platform: 'SBT' }
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
                        { name: 'Blue Team Labs Online (BTLO)', url: 'https://blueteamlabs.online/', type: 'Lab', platform: 'BTLO' },
                        { name: 'CyberDefenders Case Blue', url: 'https://cyberdefenders.org/blueteam-ctf-challenges/', type: 'Lab', platform: 'CyberDefenders' },
                        { name: 'DFIR Science: DFS101', url: 'https://dfir.science/courses/dfs101-intro-to-digital-forensics.html', type: 'Course', platform: 'DFIRScience' },
                        { name: 'Blue Cape: DFIR Foundations', url: 'https://bluecapesecurity.com/courses/dfir-foundations/', type: 'Course', platform: 'Blue Cape' },
                        { name: 'CISA: Incident Response Training', url: 'https://www.cisa.gov/resources-tools/programs/training', type: 'Course', platform: 'CISA' },
                        { name: 'Cybrary: IR Lifecycle', url: 'https://www.cybrary.it/course/incident-response-lifecycle', type: 'Course', platform: 'Cybrary' },
                        { name: 'Autopsy Forensic Tutorial', url: 'https://www.basistech.com/digital-forensics/autopsy/training/', type: 'Video', platform: 'Autopsy' },
                        { name: 'KAPE Tool Guide', url: 'https://aboutdfir.com/tools/kape/', type: 'Doc', platform: 'AboutDFIR' },
                        { name: 'Digital Forensics Search (GitHub)', url: 'https://github.com/DFIR-Science/Digital-Forensics-Challenges', type: 'Lab', platform: 'GitHub' },
                        { name: 'SANS DFIR Summit Archives', url: 'https://www.sans.org/blog/sans-dfir-summit-archive/', type: 'Video', platform: 'SANS' }
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
                        { name: 'TryHackMe Jr Pentesting', url: 'https://tryhackme.com/path/outline/jrpenetrationtester', type: 'Lab', platform: 'TryHackMe' },
                        { name: 'HackTheBox Academy (Starter)', url: 'https://academy.hackthebox.com/preview/modules', type: 'Lab', platform: 'HTB' },
                        { name: 'PortSwigger Web Security Academy', url: 'https://portswigger.net/web-security', type: 'Lab', platform: 'PortSwigger' },
                        { name: 'VulnHub: Vulnerable VMs', url: 'https://www.vulnhub.com/', type: 'Lab', platform: 'VulnHub' },
                        { name: 'PentesterLab: Free Exercises', url: 'https://pentesterlab.com/exercises', type: 'Lab', platform: 'PentesterLab' },
                        { name: 'OWASP Juice Shop', url: 'https://pwning.owasp-juice.shop/', type: 'Lab', platform: 'OWASP' },
                        { name: 'CTFlearn: Capture The Flag', url: 'https://ctflearn.com/', type: 'Lab', platform: 'CTFlearn' },
                        { name: 'TCM Security: PEH (27h Series)', url: 'https://www.youtube.com/watch?v=3Kq1MIfTWCE', type: 'Video', platform: 'YouTube' },
                        { name: 'EC-Council: Android Bug Bounty', url: 'https://www.eccouncil.org/free-cybersecurity-resources/', type: 'Course', platform: 'EC-Council' },
                        { name: 'Metasploit Unleashed', url: 'https://www.offsec.com/metasploit-unleashed/', type: 'Course', platform: 'OffSec' },
                        { name: 'Bugcrowd University', url: 'https://www.bugcrowd.com/university/', type: 'Course', platform: 'Bugcrowd' }
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
                        { name: 'TryHackMe Red Teaming Path', url: 'https://tryhackme.com/path/outline/redteaming', type: 'Lab', platform: 'TryHackMe' },
                        { name: 'Sliver Agent C2 Framework', url: 'https://github.com/BishopFox/sliver', type: 'Tool', platform: 'GitHub' },
                        { name: 'Atomic Red Team Tests', url: 'https://atomicredteam.io/', type: 'Lab', platform: 'Atomic Red Team' },
                        { name: 'MITRE Caldera (Adv Emulation)', url: 'https://caldera.mitre.org/', type: 'Tool', platform: 'MITRE' },
                        { name: 'Gophish: Phishing Framework', url: 'https://getgophish.com/', type: 'Tool', platform: 'GitHub' },
                        { name: 'Root-Me: Offensive Security', url: 'https://www.root-me.org/', type: 'Lab', platform: 'Root-Me' },
                        { name: 'Pwn College: Systems Security', url: 'https://pwn.college/', type: 'Course', platform: 'Pwn College' },
                        { name: 'BloodHound Graph Theory', url: 'https://bloodhound.readthedocs.io/', type: 'Doc', platform: 'BloodHound' },
                        { name: 'Active Directory Security (Sean Metcalf)', url: 'https://adsecurity.org/', type: 'Blog', platform: 'ADSecurity' },
                        { name: 'IppSec HC Video Search', url: 'https://ippsec.rocks/', type: 'Video', platform: 'IppSec' }
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
                        { name: 'Web Security Academy: LLM Attacks', url: 'https://portswigger.net/web-security/llm-attacks', type: 'Lab', platform: 'PortSwigger' },
                        { name: 'Giskard: LLM Security Scanner', url: 'https://github.com/Giskard-AI/giskard', type: 'Tool', platform: 'GitHub' },
                        { name: 'NVIDIA: Adversarial ML Course', url: 'https://www.nvidia.com/en-us/training/online/adversarial-machine-learning/', type: 'Lab', platform: 'NVIDIA' },
                        { name: 'TextAttack: LLM Stress Testing', url: 'https://github.com/QData/TextAttack', type: 'Tool', platform: 'GitHub' },
                        { name: 'Codecademy: AI Ethical Hacking', url: 'https://www.codecademy.com/learn/prompt-engineering-ethical-hacking-and-generative-ai-fusion', type: 'Course', platform: 'Codecademy' },
                        { name: 'APIsec University: AI Security', url: 'https://www.apisecuniversity.com/courses/ai-security-fundamentals', type: 'Course', platform: 'APIsec' },
                        { name: 'Microsoft: AI for Beginners', url: 'https://microsoft.github.io/AI-For-Beginners/', type: 'Course', platform: 'Microsoft' },
                        { name: 'Securiti.ai: AI Governance Cert', url: 'https://securiti.ai/education/ai-security-governance-certification/', type: 'Course', platform: 'Securiti' },
                        { name: 'Learn Prompting: Adversarial AI', url: 'https://learnprompting.org/docs/adversarial/introduction', type: 'Doc', platform: 'LearnPrompting' },
                        { name: 'OWASP LLM Top 10', url: 'https://owasp.org/www-project-top-10-for-large-language-model-applications/', type: 'Doc', platform: 'OWASP' },
                        { name: 'SANS AI Security Resources', url: 'https://www.sans.org/top25/ai-security/', type: 'Video', platform: 'SANS' }
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
            title: 'Full-Stack Django Dev',
            subtitle: 'Python → JS → Django → React',
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
                    ],
                    tools: [
                        { name: 'Python', desc: 'The core language.', url: 'https://www.python.org/' },
                        { name: 'VS Code', desc: 'Best-in-class code editor.', url: 'https://code.visualstudio.com/' },
                        { name: 'PyCharm (Comm)', desc: 'Powerful Python IDE.', url: 'https://www.jetbrains.com/pycharm/download/' },
                        { name: 'Pip', desc: 'Package installer for Python.', url: 'https://pypi.org/project/pip/' },
                        { name: 'Poetry', desc: 'Modern dependency management.', url: 'https://python-poetry.org/' },
                        { name: 'Virtualenv', desc: 'Isolated Python environments.', url: 'https://virtualenv.pypa.io/' },
                        { name: 'Pytest', desc: 'Testing framework.', url: 'https://docs.pytest.org/' },
                        { name: 'Black', desc: 'Uncompromising code formatter.', url: 'https://github.com/psf/black' },
                        { name: 'Flake8', desc: 'Linter for style/errors.', url: 'https://flake8.pycqa.org/' },
                        { name: 'Requests', desc: 'Elegant HTTP library.', url: 'https://requests.readthedocs.io/' },
                        { name: 'BeautifulSoup', desc: 'Web scraping library.', url: 'https://www.crummy.com/software/BeautifulSoup/' },
                        { name: 'Pandas', desc: 'Data analysis and manipulation.', url: 'https://pandas.pydata.org/' },
                        { name: 'Jupyter', desc: 'Interactive computing.', url: 'https://jupyter.org/' },
                        { name: 'Bandit', desc: 'Security linter for Python.', url: 'https://bandit.readthedocs.io/' },
                        { name: 'Conda', desc: 'Package and env manager.', url: 'https://docs.conda.io/' }
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
                    ],
                    tools: [
                        { name: 'Django', desc: 'The high-level web framework.', url: 'https://www.djangoproject.com/' },
                        { name: 'Django Debug Toolbar', desc: 'Optimizer/Profiler.', url: 'https://github.com/jazzband/django-debug-toolbar' },
                        { name: 'Django Extensions', desc: 'Power-user utilities.', url: 'https://django-extensions.readthedocs.io/' },
                        { name: 'Postman', desc: 'API testing tool.', url: 'https://www.postman.com/' },
                        { name: 'DBeaver', desc: 'Universal database manager.', url: 'https://dbeaver.io/' },
                        { name: 'SQLAlchemy', desc: 'Python SQL toolkit (ORM).', url: 'https://www.sqlalchemy.org/' },
                        { name: 'Redis', desc: 'Caching and message broker.', url: 'https://redis.io/' },
                        { name: 'Celery', desc: 'Distributed task queue.', url: 'https://docs.celeryq.dev/' },
                        { name: 'Whitenoise', desc: 'Static file serving for Django.', url: 'https://whitenoise.readthedocs.io/' },
                        { name: 'CORS Headers', desc: 'Handle Cross-Origin Resource Sharing.', url: 'https://github.com/adamchainz/django-cors-headers' },
                        { name: 'Django Filter', desc: 'Dynamic filtering for queries.', url: 'https://django-filter.readthedocs.io/' },
                        { name: 'Django Simple JWT', desc: 'JSON Web Token authentication.', url: 'https://django-rest-framework-simplejwt.readthedocs.io/' },
                        { name: 'Gunicorn', desc: 'WSGI HTTP Server.', url: 'https://gunicorn.org/' },
                        { name: 'Nginx', desc: 'Web server / Reverse proxy.', url: 'https://www.nginx.com/' },
                        { name: 'PgAdmin', desc: 'PostgreSQL management tool.', url: 'https://www.pgadmin.org/' }
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
                    ],
                    tools: [
                        { name: 'Docker', desc: 'Containerization.', url: 'https://www.docker.com/' },
                        { name: 'Sentry', desc: 'Error tracking.', url: 'https://sentry.io/' },
                        { name: 'Gunicorn', desc: 'Production WSGI server.', url: 'https://gunicorn.org/' },
                        { name: 'Git', desc: 'Version control.', url: 'https://git-scm.com/' },
                        { name: 'GitHub Desktop', desc: 'Simple git interface.', url: 'https://desktop.github.com/' },
                        { name: 'Axios', desc: 'Promise-based HTTP for JS.', url: 'https://axios-http.com/' },
                        { name: 'Vite', desc: 'Frontend build tool.', url: 'https://vitejs.dev/' },
                        { name: 'NPM', desc: 'Node package manager.', url: 'https://www.npmjs.com/' },
                        { name: 'Prettier', desc: 'Opinionated code formatter.', url: 'https://prettier.io/' },
                        { name: 'ESLint', desc: 'JavaScript linter.', url: 'https://eslint.org/' },
                        { name: 'React DevTools', desc: 'Debug React components.', url: 'https://react.dev/learn/react-developer-tools' },
                        { name: 'Redux DevTools', desc: 'Debug state changes.', url: 'https://github.com/reduxjs/redux-devtools' },
                        { name: 'PostCSS', desc: 'Tool for transforming CSS.', url: 'https://postcss.org/' },
                        { name: 'Framer Motion', desc: 'React animation library.', url: 'https://www.framer.com/motion/' },
                        { name: 'Lucide Icons', desc: 'Beautiful open-source icons.', url: 'https://lucide.dev/' }
                    ]
                }
            ]
        },
        C: {
            id: 'planC',
            title: 'IT Support & Admin',
            subtitle: 'Hardware → OS → Networking → Cloud',
            color: '#3B82F6',
            icon: '🔧',
            phases: [
                {
                    id: 'p1',
                    title: 'Phase 1: IT Foundations (Hardware & OS)',
                    duration: 'Months 1-3',
                    resources: [
                        { name: 'Professor Messer A+ Course', url: 'https://www.professormesser.com/free-a-plus-training/220-1101/220-1101-video/220-1101-training-course', type: 'Course', platform: 'Professor Messer' },
                        { name: 'Google IT Support Certificate', url: 'https://www.coursera.org/professional-certificates/google-it-support', type: 'Course', platform: 'Coursera' },
                        { name: 'Microsoft Windows 11 Support', url: 'https://learn.microsoft.com/en-us/training/paths/support-windows-11-devices/', type: 'Course', platform: 'Microsoft' },
                        { name: 'Linux Journey (Foundations)', url: 'https://linuxjourney.com', type: 'Course', platform: 'Web' },
                        { name: 'PowerCert: How a CPU Works', url: 'https://www.youtube.com/watch?v=FZGugFqdr60', type: 'Video', platform: 'YouTube' },
                        { name: 'Eli the Computer Guy', url: 'https://www.youtube.com/@Elithecomputerguypage', type: 'Video', platform: 'YouTube' }
                    ],
                    tools: [
                        { name: 'Sysinternals Suite', desc: 'Advanced Windows utilities.', url: 'https://learn.microsoft.com/en-us/sysinternals/' },
                        { name: 'Rufus', desc: 'Create bootable USB drives.', url: 'https://rufus.ie/' },
                        { name: 'WinDirStat', desc: 'Disk usage stats viewer.', url: 'https://windirstat.net/' },
                        { name: '7-Zip', desc: 'File archiver.', url: 'https://www.7-zip.org/' },
                        { name: 'KeePassXC', desc: 'Password manager.', url: 'https://keepassxc.org/' }
                    ]
                },
                {
                    id: 'p2',
                    title: 'Phase 2: Networking & Cloud Admin',
                    duration: 'Months 4-6',
                    resources: [
                        { name: 'Professor Messer Network+', url: 'https://www.professormesser.com/network-plus/n10-008/n10-008-video/n10-008-training-course/', type: 'Course', platform: 'Professor Messer' },
                        { name: 'Cisco Introduction to Networks', url: 'https://www.skillsforall.com/course/introduction-to-networks', type: 'Course', platform: 'Cisco' },
                        { name: 'AWS Cloud Practitioner Essentials', url: 'https://explore.skillbuilder.aws/learn/course/external/view/elearning/134/aws-cloud-practitioner-essentials', type: 'Course', platform: 'AWS' },
                        { name: 'Azure Fundamentals (AZ-900)', url: 'https://learn.microsoft.com/en-us/training/paths/microsoft-azure-fundamentals-describe-cloud-concepts/', type: 'Course', platform: 'Microsoft' },
                        { name: 'NetworkChuck: CCNA Series', url: 'https://www.youtube.com/watch?v=H8W9SshmS54', type: 'Video', platform: 'YouTube' }
                    ],
                    tools: [
                        { name: 'PuTTY', desc: 'SSH/Telnet client.', url: 'https://www.putty.org/' },
                        { name: 'Angry IP Scanner', desc: 'Fast IP & port scanner.', url: 'https://angryip.org/' },
                        { name: 'Wireshark', desc: 'Network protocol analyzer.', url: 'https://www.wireshark.org/' },
                        { name: 'Nmap', desc: 'Network discovery.', url: 'https://nmap.org/' },
                        { name: 'RustDesk', desc: 'Remote desktop tool.', url: 'https://rustdesk.com/' }
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
            skills: ['SIEM', 'log analysis', 'threat detection'],
            tools: ['Splunk Free', 'BOTS dataset'],
            steps: ['Install Splunk Free', 'Ingest BOTS dataset', 'Create index patterns', 'Build visualizations for failed logins', 'Create alert thresholds'],
            portfolio: 'Shows hands-on SIEM experience'
        },
        {
            id: 2, plan: 'A', name: 'Virtual SOC Lab Environment',
            difficulty: 'Intermediate', time: '1-2 weeks',
            desc: 'Build a complete home SOC lab with Security Onion, attacking machine, and victim machines.',
            skills: ['Virtualization', 'IDS/IPS', 'network security'],
            tools: ['VirtualBox', 'Security Onion', 'Kali Linux', 'Windows VMs'],
            steps: ['Setup VirtualBox/VMware', 'Install Security Onion', 'Deploy Kali and Windows targets', 'Configure network topology', 'Test log ingestion'],
            portfolio: 'Demonstrates practical security operations capability'
        },
        {
            id: 3, plan: 'A', name: 'Vulnerability Assessment & Report',
            difficulty: 'Beginner-Intermediate', time: '3-5 days',
            desc: 'Scan a website for vulnerabilities using OWASP ZAP, create a professional pentest-style report.',
            skills: ['Web app testing', 'OWASP Top 10', 'report writing'],
            tools: ['OWASP ZAP', 'Burp Suite Community'],
            steps: ['Obtain permission', 'Run automated scan', 'Manual verification', 'Document findings', 'Propose remediations'],
            portfolio: 'Real-world pentest report for interviews'
        },
        {
            id: 4, plan: 'A', name: 'Network Penetration Testing Lab',
            difficulty: 'Intermediate-Advanced', time: '2-3 weeks',
            desc: 'Build multi-machine vulnerable network, perform full pentest, document methodology.',
            skills: ['Network pentesting', 'pivoting', 'privilege escalation'],
            tools: ['VirtualBox', 'Metasploitable', 'Windows VMs', 'Kali'],
            steps: ['Design network topology', 'Setup VMs', 'Scan network', 'Exploit entry point', 'Pivot and escalate'],
            portfolio: 'Shows end-to-end pentesting skills'
        },
        {
            id: 5, plan: 'A', name: 'Active Directory Attack & Defense Lab',
            difficulty: 'Advanced', time: '2-3 weeks',
            desc: 'Build AD environment, demonstrate common attack paths, create defensive recommendations.',
            skills: ['AD exploitation', 'Kerberos attacks', 'lateral movement'],
            tools: ['BloodHound', 'Mimikatz', 'Impacket', 'PowerView'],
            steps: ['Setup Domain Controller', 'Create users/groups', 'Run BloodHound', 'Execute Kerberoasting', 'Document defenses'],
            portfolio: 'Enterprise-critical skill highly valued by employers'
        },

        // --- PLAN B: DJANGO (5 projects) ---
        {
            id: 6, plan: 'B', name: 'RESTful API with Authentication',
            difficulty: 'Intermediate-Advanced', time: '2 weeks',
            desc: 'Build a production-grade REST API with JWT auth, documentation, versioning, and tests.',
            skills: ['Django REST Framework', 'API design', 'testing'],
            tools: ['DRF', 'JWT authentication', 'Swagger/Postman'],
            steps: ['Define API requirements', 'Setup DRF', 'Implement Endpoints', 'Add JWT Auth', 'Generate Swagger docs'],
            portfolio: 'Backend API proficiency — most asked about in interviews'
        },
        {
            id: 7, plan: 'B', name: 'E-commerce Platform',
            difficulty: 'Intermediate-Advanced', time: '3-4 weeks',
            desc: 'Product catalog, shopping cart, checkout, order management with payment integration.',
            skills: ['Complex business logic', 'sessions', 'payments'],
            tools: ['Django', 'Stripe/Flutterwave', 'PostgreSQL'],
            steps: ['Setup models', 'Implement Cart logic', 'Integrate Payments', 'Build Order history', 'Secure checkout'],
            portfolio: 'Major portfolio piece covering full-stack skills'
        },
        {
            id: 8, plan: 'B', name: 'Task & Project Management Tool',
            difficulty: 'Intermediate', time: '2 weeks',
            desc: 'Projects, tasks, assignments, deadlines, team collaboration with Kanban board.',
            skills: ['User permissions', 'notifications', 'dashboard design'],
            tools: ['Django', 'JavaScript', 'drag-and-drop'],
            steps: ['Create Project/Task models', 'Implement Kanban view', 'Add user assignments', 'Build deadline alerts', 'Create dashboard'],
            portfolio: 'Demonstrates complex CRUD, roles, and UX thinking'
        },
        {
            id: 9, plan: 'B', name: 'Real-time Chat Application',
            difficulty: 'Advanced', time: '2 weeks',
            desc: 'WhatsApp-style chat with Django Channels and WebSockets.',
            skills: ['Real-time communications', 'WebSockets', 'async Python'],
            tools: ['Django Channels', 'Redis', 'JavaScript'],
            steps: ['Setup Channels/Redis', 'Create Room/Message models', 'Implement simple chat', 'Add user presence', 'Polish UI'],
            portfolio: 'Shows WebSocket/real-time expertise — impressive in interviews'
        },
        {
            id: 10, plan: 'B', name: 'Portfolio Website with CMS Backend',
            difficulty: 'Intermediate', time: '1 week',
            desc: 'Beautiful portfolio site with Django backend to manage and showcase your projects.',
            skills: ['Frontend design', 'Django admin customization', 'deployment'],
            tools: ['Django', 'modern CSS', 'Gunicorn'],
            steps: ['Design frontend', 'Build Project model', 'Create API/Template', 'Populate content', 'Deploy'],
            portfolio: 'YOUR portfolio — direct proof of skills for every interview'
        },

        // --- PLAN C: IT SUPPORT (5 projects) ---
        {
            id: 11, plan: 'C', name: 'Home Lab Setup & Documentation',
            difficulty: 'Beginner-Intermediate', time: '1 week',
            desc: 'Build a virtualized home lab with Active Directory, networking, and detailed documentation.',
            skills: ['Virtualization', 'Active Directory', 'documentation'],
            tools: ['VirtualBox', 'Windows Server', 'Ubuntu'],
            steps: ['Select hardware', 'Install VirtualBox', 'Setup Network (NAT/Bridge)', 'Install Windows Server + AD', 'Document topology'],
            portfolio: 'Shows hands-on initiative and self-learning'
        },
        {
            id: 12, plan: 'C', name: 'Network Setup for Small Business',
            difficulty: 'Intermediate', time: '1-2 days per client',
            desc: 'Design and implement complete network infrastructure with security and documentation.',
            skills: ['Networking', 'router configuration', 'security'],
            tools: ['Routers', 'switches', 'cable management'],
            steps: ['Assess requirements', 'Run cabling', 'Configure Router/WiFi', 'Secure access points', 'Document network map'],
            portfolio: 'Practical networking skills employers want to see'
        },
        {
            id: 13, plan: 'C', name: 'Office 365/Google Workspace Migration',
            difficulty: 'Intermediate', time: '1-3 days per client',
            desc: 'Migrate email, documents, train users, troubleshoot cloud platform issues.',
            skills: ['Cloud administration', 'migration tools', 'training'],
            tools: ['Microsoft 365 admin', 'Google Admin'],
            steps: ['Setup tenant', 'Verify domain', 'Create users', 'Migrate emails/data', 'Train staff'],
            portfolio: 'Cloud migration expertise — high demand skill'
        },
        {
            id: 14, plan: 'C', name: 'Data Backup & Disaster Recovery Plan',
            difficulty: 'Beginner-Intermediate', time: '1 week',
            desc: 'Design and implement automated backup strategy with documented disaster recovery procedures.',
            skills: ['Backup software', 'cloud services', 'data management'],
            tools: ['Windows Backup', 'cloud storage', 'cloning tools'],
            steps: ['Identify critical data', 'Select backup medium (Cloud/NAS)', 'Configure auto-backup', 'Test recovery', 'Write DR policy'],
            portfolio: 'Data protection expertise every company needs'
        },
        {
            id: 15, plan: 'C', name: 'IT Asset Management System',
            difficulty: 'Intermediate', time: '2 weeks',
            desc: 'Create a system to track company IT assets, maintenance schedules, and lifecycle management.',
            skills: ['Database management', 'reporting', 'inventory'],
            tools: ['Excel/Google Sheets', 'custom web app'],
            steps: ['Inventory all assets', 'Design tracking sheet/db', 'Tag physical assets', 'Input data', 'Setup maintenance schedule'],
            portfolio: 'IT management skills valued in enterprise roles'
        }
    ]
};
