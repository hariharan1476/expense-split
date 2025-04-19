// Define TypeScript types for the application

export interface Participant {
  id: string;
  name: string;
  email?: string;
}

export interface Expense {
  id: string;
  title: string;
  amount: number;
  paidBy: string; // Participant ID
  sharedBy: string[]; // Array of Participant IDs
  date: string;
}

export interface Settlement {
  from: string; // Participant ID
  to: string; // Participant ID
  amount: number;
}

export interface ParticipantBalance {
  id: string;
  name: string;
  paid: number;
  owes: number;
  netBalance: number;
}