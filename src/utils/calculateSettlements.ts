import { Expense, Participant, Settlement, ParticipantBalance } from '../types';

// Calculate what each person paid and what they owe
export const calculateBalances = (
  participants: Participant[],
  expenses: Expense[]
): ParticipantBalance[] => {
  // Initialize balances
  const balances = participants.map((participant) => ({
    id: participant.id,
    name: participant.name,
    paid: 0,
    owes: 0,
    netBalance: 0,
  }));

  // Calculate what each person paid and what they owe
  expenses.forEach((expense) => {
    // Add what the payer paid
    const payer = balances.find((b) => b.id === expense.paidBy);
    if (payer) {
      payer.paid += expense.amount;
    }

    // Calculate what each person owes
    const numSharing = expense.sharedBy.length;
    if (numSharing > 0) {
      const amountPerPerson = expense.amount / numSharing;
      
      expense.sharedBy.forEach((participantId) => {
        const participant = balances.find((b) => b.id === participantId);
        if (participant) {
          participant.owes += amountPerPerson;
        }
      });
    }
  });

  // Calculate net balance
  balances.forEach((balance) => {
    balance.netBalance = balance.paid - balance.owes;
  });

  return balances;
};

// Optimized debt minimization algorithm to calculate settlements
export const calculateSettlements = (balances: ParticipantBalance[]): Settlement[] => {
  const settlements: Settlement[] = [];
  
  // Create a copy of balances to work with
  const workingBalances = [...balances];
  
  // Sort by net balance (ascending for debtors, descending for creditors)
  const debtors = workingBalances
    .filter((b) => b.netBalance < 0)
    .sort((a, b) => a.netBalance - b.netBalance);
    
  const creditors = workingBalances
    .filter((b) => b.netBalance > 0)
    .sort((a, b) => b.netBalance - a.netBalance);

  // Match debtors with creditors
  let debtorIndex = 0;
  let creditorIndex = 0;

  while (debtorIndex < debtors.length && creditorIndex < creditors.length) {
    const debtor = debtors[debtorIndex];
    const creditor = creditors[creditorIndex];
    
    // Calculate the transaction amount (min of what debtor owes and what creditor is owed)
    const amount = Math.min(Math.abs(debtor.netBalance), creditor.netBalance);
    
    if (amount > 0) {
      // Add settlement
      settlements.push({
        from: debtor.id,
        to: creditor.id,
        amount: parseFloat(amount.toFixed(2)),
      });
      
      // Update balances
      debtor.netBalance += amount;
      creditor.netBalance -= amount;
      
      // Move to next person if their balance is close to zero
      // Using a small epsilon for floating point comparison
      if (Math.abs(debtor.netBalance) < 0.01) {
        debtorIndex++;
      }
      
      if (Math.abs(creditor.netBalance) < 0.01) {
        creditorIndex++;
      }
    }
  }

  return settlements;
};