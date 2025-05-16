import { Projects } from "./projects";

export interface UserProfile {
  userID: number;
  userName: string;
  userEmail: string;
  projects: Projects[];
}
