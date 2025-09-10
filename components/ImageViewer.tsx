// FIX: Implemented the ImageViewer component to resolve module errors.
import React from 'react';
import { Loader } from './Loader';

interface ImageViewerProps {
  originalImage: string | undefined;
  editedImage: string | null;
  isLoading: boolean;
}

const Placeholder: React.FC<{ text: string }> = ({ text }) => (
  <div className="w-full h-full bg-gray-800 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-700">
    <p className="text-gray-500 text-center p-4">{text}</p>
  </div>
);

const DownloadIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);


export const ImageViewer: React.FC<ImageViewerProps> = ({ originalImage, editedImage, isLoading }) => {
  const handleDownload = () => {
    if (!editedImage) return;

    const link = document.createElement('a');
    link.href = editedImage;

    // Extract file extension from mime type in data URL
    const mimeType = editedImage.split(';')[0].split(':')[1];
    const extension = mimeType ? mimeType.split('/')[1] : 'png';

    link.download = `edited-image.${extension}`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
      {/* Original Image */}
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-gray-300 text-center">Original</h3>
        <div className="aspect-square relative bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-700">
          {originalImage ? (
            <img src={originalImage} alt="Original" className="object-contain w-full h-full" />
          ) : (
            <Placeholder text="Upload an image to start" />
          )}
        </div>
      </div>

      {/* Edited Image */}
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-gray-300 text-center">Edited</h3>
        <div className="aspect-square relative bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-700">
          {isLoading && (
            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center z-10">
              <Loader />
              <p className="text-gray-300 mt-2">Generating your image...</p>
            </div>
          )}
          {editedImage ? (
            <>
              <img src={editedImage} alt="Edited" className="object-contain w-full h-full" />
              <button
                onClick={handleDownload}
                className="absolute bottom-4 right-4 flex items-center justify-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500 transition-all duration-200 opacity-80 hover:opacity-100"
                aria-label="Download edited image"
              >
                <DownloadIcon />
                Download
              </button>
            </>
          ) : (
            !isLoading && <Placeholder text="Your edited image will appear here" />
          )}
        </div>
      </div>
    </div>
  );
};
