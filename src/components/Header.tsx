import React from 'react';
import { SplitSquareVertical } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="py-6 px-4 mb-6">
      <div className="container mx-auto flex justify-center">
        <div className="flex items-center">
          <SplitSquareVertical className="h-8 w-8 text-teal-600 mr-2" />
          <h1 className="text-3xl font-bold text-gray-900">
            Split<span className="text-teal-600">Fair</span>
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;