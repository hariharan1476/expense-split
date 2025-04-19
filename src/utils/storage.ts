import { Participant, Expense } from '../types';

const STORAGE_KEY = 'splitfair-data';

interface StoredData {
  participants: Participant[];
  expenses: Expense[];
}

// Save data to localStorage
export const saveData = (participants: Participant[], expenses: Expense[]): void => {
  try {
    const data: StoredData = { participants, expenses };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving data to localStorage:', error);
  }
};

// Load data from localStorage
export const loadData = (): StoredData | null => {
  try {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (!storedData) return null;
    return JSON.parse(storedData) as StoredData;
  } catch (error) {
    console.error('Error loading data from localStorage:', error);
    return null;
  }
};

// Clear all stored data
export const clearData = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing data from localStorage:', error);
  }
};