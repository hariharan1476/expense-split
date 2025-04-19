import React from 'react';
import { Settlement, ParticipantBalance, Participant } from '../types';
import { formatCurrency } from '../utils/formatters';
import { ArrowLeft, ArrowRight, CreditCard, DollarSign, PiggyBank } from 'lucide-react';

interface SettlementResultsProps {
  settlements: Settlement[];
  balances: ParticipantBalance[];
  participants: Participant[];
  onReset: () => void;
}

const SettlementResults: React.FC<SettlementResultsProps> = ({ 
  settlements, 
  balances, 
  participants,
  onReset
}) => {
  const getParticipantName = (id: string): string => {
    return participants.find(p => p.id === id)?.name || 'Unknown';
  };

  const getParticipantColorClass = (id: string): string => {
    // Generate a consistent color based on the participant ID
    const index = participants.findIndex(p => p.id === id);
    const colors = [
      'bg-teal-100 text-teal-800',
      'bg-purple-100 text-purple-800',
      'bg-amber-100 text-amber-800',
      'bg-sky-100 text-sky-800',
      'bg-rose-100 text-rose-800',
      'bg-lime-100 text-lime-800',
      'bg-orange-100 text-orange-800',
      'bg-blue-100 text-blue-800',
    ];
    
    return colors[index % colors.length];
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 animate-fadeIn">
      <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
        <PiggyBank className="h-6 w-6 mr-2 text-teal-600" />
        Settlement Results
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-3 flex items-center">
            <DollarSign className="h-5 w-5 mr-1 text-purple-600" />
            Individual Balances
          </h3>
          <div className="space-y-2">
            {balances.map((balance) => (
              <div 
                key={balance.id} 
                className="flex justify-between items-center p-2 rounded border-b border-gray-200"
              >
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${getParticipantColorClass(balance.id)}`}>
                    {balance.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium">{balance.name}</span>
                </div>
                <div className="text-right">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 mr-1">Paid:</span>
                    <span className="font-medium">{formatCurrency(balance.paid)}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 mr-1">Owes:</span>
                    <span className="font-medium">{formatCurrency(balance.owes)}</span>
                  </div>
                  <div className={`flex items-center font-bold ${
                    balance.netBalance > 0 
                      ? 'text-green-600' 
                      : balance.netBalance < 0 
                        ? 'text-red-600' 
                        : 'text-gray-600'
                  }`}>
                    <span className="text-sm mr-1">Net:</span>
                    <span>{formatCurrency(balance.netBalance)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-3 flex items-center">
            <CreditCard className="h-5 w-5 mr-1 text-amber-600" />
            Optimized Settlements
          </h3>
          
          {settlements.length === 0 ? (
            <div className="text-center text-gray-500 py-4">
              <p>No settlements needed! Everyone is even.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {settlements.map((settlement, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg animate-slideIn"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getParticipantColorClass(settlement.from)}`}>
                      {getParticipantName(settlement.from).charAt(0).toUpperCase()}
                    </div>
                    <span className="mx-2 text-gray-600 font-medium">{getParticipantName(settlement.from)}</span>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <ArrowRight className="h-5 w-5 text-gray-400" />
                    <span className="text-sm font-bold text-gray-800">
                      {formatCurrency(settlement.amount)}
                    </span>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="mx-2 text-gray-600 font-medium">{getParticipantName(settlement.to)}</span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getParticipantColorClass(settlement.to)}`}>
                      {getParticipantName(settlement.to).charAt(0).toUpperCase()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="flex justify-center">
        <button
          onClick={onReset}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-teal-700 bg-teal-100 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors duration-200"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Expenses
        </button>
      </div>
    </div>
  );
};

export default SettlementResults;