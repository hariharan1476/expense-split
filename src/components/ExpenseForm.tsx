import React, { useState } from 'react';
import { Participant, Expense } from '../types';
import { ReceiptText } from 'lucide-react';

interface ExpenseFormProps {
  participants: Participant[];
  onAddExpense: (expense: Expense) => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ participants, onAddExpense }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState('');
  const [sharedBy, setSharedBy] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !amount || !paidBy || sharedBy.length === 0) {
      return;
    }

    const newExpense: Expense = {
      id: crypto.randomUUID(),
      title: title.trim(),
      amount: parseFloat(amount),
      paidBy,
      sharedBy,
      date: new Date().toISOString(),
    };

    onAddExpense(newExpense);
    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setAmount('');
    setPaidBy('');
    setSharedBy([]);
  };

  const handleSharedByChange = (participantId: string) => {
    setSharedBy(prev => 
      prev.includes(participantId)
        ? prev.filter(id => id !== participantId)
        : [...prev, participantId]
    );
  };

  const selectAll = () => {
    setSharedBy(participants.map(p => p.id));
  };

  const deselectAll = () => {
    setSharedBy([]);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Add Expense</h2>
      
      {participants.length < 2 ? (
        <div className="text-center text-gray-500 py-4 border border-dashed border-gray-300 rounded-lg">
          <ReceiptText className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm">Add at least 2 participants to start tracking expenses</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title *
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50 p-2 border"
                placeholder="What is this expense for?"
                required
              />
            </div>
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                Amount *
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0.01"
                step="0.01"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50 p-2 border"
                placeholder="0.00"
                required
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="paidBy" className="block text-sm font-medium text-gray-700">
              Paid By *
            </label>
            <select
              id="paidBy"
              value={paidBy}
              onChange={(e) => setPaidBy(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50 p-2 border"
              required
            >
              <option value="">Select who paid</option>
              {participants.map((participant) => (
                <option key={participant.id} value={participant.id}>
                  {participant.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <fieldset>
              <legend className="block text-sm font-medium text-gray-700 mb-2">
                Shared By *
              </legend>
              
              <div className="flex space-x-2 mb-2">
                <button
                  type="button"
                  onClick={selectAll}
                  className="text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
                >
                  Select All
                </button>
                <button
                  type="button"
                  onClick={deselectAll}
                  className="text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
                >
                  Deselect All
                </button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {participants.map((participant) => (
                  <label 
                    key={participant.id} 
                    className={`flex items-center p-2 rounded border ${
                      sharedBy.includes(participant.id) 
                        ? 'bg-teal-50 border-teal-200' 
                        : 'border-gray-200 hover:bg-gray-50'
                    } transition-colors cursor-pointer`}
                  >
                    <input
                      type="checkbox"
                      checked={sharedBy.includes(participant.id)}
                      onChange={() => handleSharedByChange(participant.id)}
                      className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700 truncate">
                      {participant.name}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
          
          <button
            type="submit"
            className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors duration-200"
          >
            <ReceiptText className="h-5 w-5 mr-2" />
            Add Expense
          </button>
        </form>
      )}
    </div>
  );
};

export default ExpenseForm;