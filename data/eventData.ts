export interface EventTrack {
  id: string;
  title: string;
  category: string;
  description: string;
  techStack: string[];
  deliverable: string;
}

export const EVENT_TRACKS: EventTrack[] = [
  {
    id: 'open-source',
    title: 'Open Source & PR Sprints',
    category: 'HACKTOBERFEST UPSTREAM',
    description: 'Contribute directly to active open-source repositories on GitHub. Solve existing issues, optimize code, improve documentation, and get pull requests reviewed and merged.',
    techStack: ['Git', 'GitHub', 'Open Source Tooling', 'Markdown'],
    deliverable: 'Merged Pull Requests + Upstream Issue Fixes',
  },
  {
    id: 'web-cloud',
    title: 'Web & Full-Stack Applications',
    category: 'FULL-STACK DEVELOPMENT',
    description: 'Build functional, modern web apps and digital products solving real-world utility problems for students, colleges, or local communities.',
    techStack: ['React', 'Next.js', 'Node.js', 'Tailwind CSS', 'PostgreSQL / MongoDB'],
    deliverable: 'Working Prototype + Deployed Web App + GitHub Repo',
  },
  {
    id: 'ai-ml',
    title: 'AI, Automation & Smart Tools',
    category: 'INTELLIGENT SYSTEMS',
    description: 'Leverage generative AI APIs, local LLMs, intelligent agents, or automated developer tools to streamline workflows and solve complex automation challenges.',
    techStack: ['Python', 'Gemini API', 'TypeScript', 'LangChain', 'FastAPI'],
    deliverable: 'Interactive AI Assistant / Workflow Tool + Live Demo',
  },
  {
    id: 'open-innovation',
    title: 'Open Innovation & Tools',
    category: 'HARDWARE / UTILITIES / APPS',
    description: 'Create developer utilities, CLI tools, mobile applications, or hardware IoT prototypes with complete creative freedom.',
    techStack: ['Flutter', 'Go', 'Rust', 'React Native', 'C++ / IoT'],
    deliverable: 'Functional Build / CLI Tool / Cross-Platform App',
  },
];

export const EVENT_SCHEDULE = [
  {
    time: '09:30 AM',
    title: 'Check-in & Badge Issuance',
    description: 'Arrive at Prasad Institute of Technology auditorium. Verify your registration pass, collect your participant badge, and get seated at your workstation.',
  },
  {
    time: '10:00 AM',
    title: 'Opening Briefing & Squad Mixer',
    description: 'Official opening remarks by hosts Shubhasheesh Kundu & Preet Yadav. Problem scoping, hackathon rules briefing, and team matchmaking for unplaced hackers.',
  },
  {
    time: '11:00 AM',
    title: 'Hackathon Sprint Begins',
    description: 'Main in-person build block. Work with your squad, write code, submit commits, and consult with on-ground student mentors circulating between tables.',
  },
  {
    time: '01:30 PM',
    title: 'Code Freeze & PR Submissions',
    description: 'Sprint wrap-up. Push final commits to GitHub, open pull requests, ensure README documentation is complete, and prepare demo links.',
  },
  {
    time: '02:30 PM',
    title: 'Project Showcase & Stage Demos',
    description: 'Live lightning demos on the auditorium projector. Present your pull requests, software prototypes, and hacks to peers and organizers.',
  },
  {
    time: '03:00 PM',
    title: 'Closing Ceremony & Wrap-up',
    description: 'Keynote closing address, acknowledgment of all student builders, community group photographs, and closing announcements.',
  },
];

export const EVENT_DETAILS = {
  name: 'Hacktoberfest Hack Day 2026',
  edition: 'Jaunpur Edition × Prasad Institute of Technology',
  date: 'Saturday, October 24, 2026',
  time: '09:30 AM – 3:00 PM IST',
  format: 'Offline / In-Person (On-Campus)',
  venue: 'Prasad Institute of Technology, Jaunpur',
  address: 'QP5G+W4Q, Jaunpur - Azamgarh Rd, Balibhaddarpur, Jaunpur, Uttar Pradesh 222002, India',
  hosts: ['Shubhasheesh Kundu', 'Preet Yadav'],
  institution: 'Prasad Institute of Technology, Jaunpur',
  audience: 'University Students & Engineering Undergraduates across all departments',
  swagPolicy: 'Swag, prizes and participant benefits will be announced after official organizer confirmation.',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Prasad+Institute+of+Technology+Jaunpur+QP5G%2BW4Q',
};
