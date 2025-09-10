
import React from 'react';

const BananaIcon: React.FC = () => (
    // FIX: Replaced the generic icon with a banana icon to match the theme of the 'nano-banana' model.
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-300" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.39,10.28,19.43,2.44a1,1,0,0,0-1.28-.73l-1,0.36a1,1,0,0,0-.73,1.28l1,3.47L13,8.2a1,1,0,0,0-1.28.73l-1,3.47L6,13.78a1,1,0,0,0-.73,1.28l1,3.47a1,1,0,0,0,1.28.73l1-0.36a1,1,0,0,0,.73-1.28l-1-3.47L12.7,11.8a1,1,0,0,0,1.28-.73l1-3.47,4.38,1.58A1,1,0,0,0,22.39,10.28Z" />
    </svg>
);

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            {/* FIX: Updated studio name to better reflect the 'nano-banana' model theme. */}
            <span className="text-xl font-bold tracking-wider text-yellow-300">
              Vivek Studio
            </span>
            <span className="text-xl font-light text-gray-300">
              AI Photo Editor
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
