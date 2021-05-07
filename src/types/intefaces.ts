export interface IUser {
  id: number;
  nom: string;
}
export interface IPatient {
  id: number;
  nom: string;
  prenom: string;
  adresse: string;
  age: number;
  sexe: string;
  commentaire: string;
}
export interface IConsultation {
  id: number;
  title: string;
  date: Date;
  commentaire?: string;
}
export interface INote {
  id: number;
  content: string;
}
export interface IConsultationDetail {
  details: IConsultation;
  patient: IPatient;
  notes?: INote[];
}
