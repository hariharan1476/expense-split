import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-6 px-4 mt-6 bg-gray-50">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Hariharan Krishnamoorthy. All rights reserved.
            </p>
          </div>
          <div className="flex items-center">
            <p className="text-sm text-gray-600 flex items-center">
              Made with <Heart className="h-4 w-4 text-red-500 mx-1" fill="currentColor" /> by Hari1476
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
