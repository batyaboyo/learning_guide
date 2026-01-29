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
    }
};
