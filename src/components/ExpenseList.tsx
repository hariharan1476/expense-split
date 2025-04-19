import React from 'react';
import { Expense, Participant } from '../types';
import { formatDate, formatCurrency } from '../utils/formatters';
import { ReceiptText, Trash2, UserCircle } from 'lucide-react';

interface ExpenseListProps {
  expenses: Expense[];
  participants: Participant[];
  onRemoveExpense: (id: string) => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ 
  expenses, 
  participants, 
  onRemoveExpense 
}) => {
  const getParticipantName = (id: string): string => {
    return participants.find(p => p.id === id)?.name || 'Unknown';
  };

  if (expenses.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Expenses</h2>
        <div className="text-center text-gray-500 py-8 border border-dashed border-gray-300 rounded-lg">
          <ReceiptText className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm">No expenses added yet</p>
          <p className="text-xs">Add an expense to start tracking</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        Expenses ({expenses.length})
      </h2>
      
      <div className="space-y-3">
        {expenses.map((expense) => (
          <div 
            key={expense.id} 
            className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium text-gray-900">
                  {expense.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {formatDate(expense.date)}
                </p>
              </div>
              <div className="flex items-center">
                <span className="text-lg font-semibold text-gray-900 mr-3">
                  {formatCurrency(expense.amount)}
                </span>
                <button
                  onClick={() => onRemoveExpense(expense.id)}
                  className="p-1 text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-gray-200"
                  aria-label="Remove expense"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="mt-3 pt-3 border-t border-gray-200">
              <div className="flex items-center mb-2">
                <UserCircle className="h-4 w-4 text-purple-500 mr-1" />
                <span className="text-sm text-gray-700 mr-1">Paid by:</span>
                <span className="text-sm font-medium">
                  {getParticipantName(expense.paidBy)}
                </span>
              </div>
              
              <div className="flex flex-wrap">
                <span className="text-sm text-gray-700 mr-2 mb-1">Shared with:</span>
                <div className="flex flex-wrap">
                  {expense.sharedBy.map((id) => (
                    <span 
                      key={id} 
                      className="inline-flex items-center bg-gray-200 text-xs text-gray-800 rounded-full px-2 py-1 mr-1 mb-1"
                    >
                      {getParticipantName(id)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;