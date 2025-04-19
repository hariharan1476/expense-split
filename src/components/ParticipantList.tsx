import React from 'react';
import { Participant } from '../types';
import { X, Mail, User } from 'lucide-react';

interface ParticipantListProps {
  participants: Participant[];
  onRemoveParticipant: (id: string) => void;
}

const ParticipantList: React.FC<ParticipantListProps> = ({ participants, onRemoveParticipant }) => {
  if (participants.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="text-center text-gray-500 py-4">
          <User className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm">No participants added yet</p>
          <p className="text-xs">Add participants to start tracking expenses</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Participants ({participants.length})</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {participants.map((participant) => (
          <div 
            key={participant.id} 
            className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg group hover:bg-gray-100 transition-colors duration-200"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-600">
                {participant.name.charAt(0).toUpperCase()}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{participant.name}</p>
                {participant.email && (
                  <div className="flex items-center text-xs text-gray-500">
                    <Mail className="h-3 w-3 mr-1" />
                    {participant.email}
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={() => onRemoveParticipant(participant.id)}
              className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 rounded-full text-gray-400 hover:text-red-500 focus:outline-none"
              aria-label="Remove participant"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParticipantList;