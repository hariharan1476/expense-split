import React, { useState } from 'react';
import { Participant } from '../types';
import { UserPlus } from 'lucide-react';

interface ParticipantFormProps {
  onAddParticipant: (participant: Participant) => void;
}

const ParticipantForm: React.FC<ParticipantFormProps> = ({ onAddParticipant }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newParticipant: Participant = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: email.trim() || undefined,
    };

    onAddParticipant(newParticipant);
    setName('');
    setEmail('');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Add Participant</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name *
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50 p-2 border"
            placeholder="Enter name"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email (optional)
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50 p-2 border"
            placeholder="Enter email (optional)"
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors duration-200"
        >
          <UserPlus className="h-5 w-5 mr-2" />
          Add Participant
        </button>
      </form>
    </div>
  );
};

export default ParticipantForm;