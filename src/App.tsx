import React, { useState, useEffect } from 'react';
import { Participant, Expense, Settlement, ParticipantBalance } from './types';
import { calculateBalances, calculateSettlements } from './utils/calculateSettlements';
import { saveData, loadData } from './utils/storage';
import Header from './components/Header';
import Footer from './components/Footer';
import ParticipantForm from './components/ParticipantForm';
import ParticipantList from './components/ParticipantList';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import SettlementResults from './components/SettlementResults';
import { SplitSquareVertical, Calculator, Info } from 'lucide-react';

function App() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [settlements, setSettlements] = useState<Settlement[]>([]);
  const [balances, setBalances] = useState<ParticipantBalance[]>([]);
  const [isCalculated, setIsCalculated] = useState(false);

  // Load data from localStorage on initial render
  useEffect(() => {
    const storedData = loadData();
    if (storedData) {
      setParticipants(storedData.participants);
      setExpenses(storedData.expenses);
    }
  }, []);

  // Save data to localStorage whenever participants or expenses change
  useEffect(() => {
    saveData(participants, expenses);
  }, [participants, expenses]);

  const handleAddParticipant = (participant: Participant) => {
    setParticipants([...participants, participant]);
  };

  const handleRemoveParticipant = (id: string) => {
    // First check if this participant is involved in any expenses
    const isInvolved = expenses.some(
      expense => expense.paidBy === id || expense.sharedBy.includes(id)
    );

    if (isInvolved) {
      alert('Cannot remove this participant as they are involved in expenses.');
      return;
    }

    setParticipants(participants.filter(p => p.id !== id));
  };

  const handleAddExpense = (expense: Expense) => {
    setExpenses([...expenses, expense]);
    setIsCalculated(false); // Reset calculation state when adding a new expense
  };

  const handleRemoveExpense = (id: string) => {
    setExpenses(expenses.filter(e => e.id !== id));
    setIsCalculated(false); // Reset calculation state when removing an expense
  };

  const handleCalculate = () => {
    if (participants.length === 0 || expenses.length === 0) {
      alert('You need at least one participant and one expense to calculate.');
      return;
    }

    const calculatedBalances = calculateBalances(participants, expenses);
    const calculatedSettlements = calculateSettlements(calculatedBalances);
    
    setBalances(calculatedBalances);
    setSettlements(calculatedSettlements);
    setIsCalculated(true);
  };

  const resetCalculation = () => {
    setIsCalculated(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 pb-10">
        {!isCalculated ? (
          <>
            <div className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-lg shadow-md p-6 mb-8 text-white">
              <div className="flex items-start">
                <div className="hidden sm:block mr-6">
                  <SplitSquareVertical className="h-12 w-12 text-white opacity-80" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold mb-2">Welcome to SplitFair</h1>
                  <p className="mb-3">
                    The smart way to split expenses with friends, roommates, or travel buddies.
                  </p>
                  <div className="flex items-center text-teal-100 text-sm">
                    <Info className="h-4 w-4 mr-1" />
                    <p>Add participants, track expenses, and let SplitFair calculate who owes whom.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <ParticipantForm onAddParticipant={handleAddParticipant} />
                <ParticipantList 
                  participants={participants} 
                  onRemoveParticipant={handleRemoveParticipant} 
                />
              </div>
              
              <div className="lg:col-span-2">
                <ExpenseForm 
                  participants={participants} 
                  onAddExpense={handleAddExpense} 
                />
                <ExpenseList 
                  expenses={expenses} 
                  participants={participants} 
                  onRemoveExpense={handleRemoveExpense} 
                />
                
                {participants.length > 0 && expenses.length > 0 && (
                  <div className="mt-6 flex justify-center">
                    <button
                      onClick={handleCalculate}
                      className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-md text-base font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200 transform hover:scale-105"
                    >
                      <Calculator className="h-5 w-5 mr-2" />
                      Calculate Settlements
                    </button>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <SettlementResults 
            settlements={settlements} 
            balances={balances} 
            participants={participants} 
            onReset={resetCalculation} 
          />
        )}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;