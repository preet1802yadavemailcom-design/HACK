export type RealmId = 
  | 'shailputri'
  | 'brahmacharini'
  | 'chandraghanta'
  | 'kushmanda'
  | 'skandamata'
  | 'katyayani'
  | 'kalaratri'
  | 'mahagauri'
  | 'siddhidatri';

export interface RealmInfo {
  id: RealmId;
  index: number;
  name: string;
  sanskritName: string;
  title: string;
  goddessForm: string;
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
