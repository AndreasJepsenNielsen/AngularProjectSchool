import { User } from './user';

export class Quiz {
  _id: string;
  visible: boolean;
  user?: User; // This might be old (not updated) data.
  title: string;
  created?: Date; // ? = optional field
  questions: Question[]; 
  customerId?: string;
}

export class Question {
  title: string;
  options: Option[];
  answered?: boolean = false;
}

export class Option {
  answer: string;
  correct: boolean;
  selected?: boolean = false;
}

