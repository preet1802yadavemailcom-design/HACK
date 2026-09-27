export type RealmId = 
  | 'genesis'
  | 'architecture'
  | 'resonance'
  | 'nebula'
  | 'nexus'
  | 'forge'
  | 'breakthrough'
  | 'sanctuary'
  | 'apex';

export interface RealmInfo {
  id: RealmId;
  index: number;
  name: string;
  tagline: string;
  title: string;
  dimensionType: string;
  significance: string;
  hacktoberfestTheme: string;
  techLayer: string;
  palette: {
    primary: string;
    secondary: string;
    accent: string;
    glow: string;
    fog: string;
    ambient: string;
  };
  cameraPos: [number, number, number];
  targetPos: [number, number, number];
  quote: string;
  environmentDescription: string;
}

export type QuestType = 'BUILD' | 'CONTRIBUTE' | 'LEARN' | 'COLLABORATE';

export interface RegistrationPayload {
  fullName: string;
  studentId: string;
  email: string;
  branch: string;
  semester: string;
  teamStatus: 'Joining a team' | 'Bringing a team' | 'Looking for teammates' | 'Solo';
  githubHandle?: string;
}
