import React from 'react';
import { Loader } from './Loader';

interface EditControlsProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
  isReady: boolean;
  isRateLimited: boolean;
}

export const EditControls: React.FC<EditControlsProps> = ({ prompt, setPrompt, onGenerate, isLoading, isReady, isRateLimited }) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="e.g., add a pirate hat to the person, make the background a surreal landscape, change the style to synthwave..."
        className="w-full h-32 p-3 bg-gray-900 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors duration-200 text-gray-200 placeholder-gray-500 resize-none"
        disabled={isLoading || isRateLimited}
      />
      <button
        onClick={onGenerate}
        disabled={!isReady || isLoading || isRateLimited}
        className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500 transition-all duration-200"
      >
        {isLoading ? (
          <>
            <Loader />
            Generating...
          </>
        ) : isRateLimited ? (
          'Limit Reached'
        ) : (
          'Generate Image'
        )}
      </button>
    </div>
  );
};