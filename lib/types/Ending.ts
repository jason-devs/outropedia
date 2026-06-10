import { Tables } from "../database";

export interface Ending extends Tables<"endings"> {
  audioUrl: string;
}
