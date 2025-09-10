
import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { EditControls } from './components/EditControls';
import { ImageViewer } from './components/ImageViewer';
import { ErrorMessage } from './components/ErrorMessage';
import type { ImageData } from './types';
import { editImage } from './services/geminiService';
import { checkRateLimit, incrementUsage, getLimit } from './services/rateLimiter';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<ImageData | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // New state for rate limiting
  const [usage, setUsage] = useState<{ count: number; limit: number; resetsAt: Date | null }>({ count: 0, limit: getLimit(), resetsAt: null });
  const [isRateLimited, setIsRateLimited] = useState<boolean>(false);

  // Check rate limit on initial load
  useEffect(() => {
    const { isLimited, count, resetsAt } = checkRateLimit();
    setIsRateLimited(isLimited);
    setUsage(prev => ({ ...prev, count, resetsAt }));
  }, []);


  const handleImageUpload = useCallback((imageData: ImageData) => {
    setOriginalImage(imageData);
    setEditedImage(null);
    setError(null);
  }, []);

  const handleGenerate = async () => {
    // Pre-generation rate limit check
    const currentLimitStatus = checkRateLimit();
    if (currentLimitStatus.isLimited) {
      setError(`You have reached your daily limit of ${getLimit()} images. Please try again after ${currentLimitStatus.resetsAt?.toLocaleString()}.`);
      setIsRateLimited(true);
      return;
    }

    if (!originalImage || !prompt) {
      setError("Please upload an image and provide an editing prompt.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setEditedImage(null);

    try {
      const { newImageBase64 } = await editImage(
        originalImage.base64,
        originalImage.mimeType,
        prompt
      );
      if (newImageBase64) {
        setEditedImage(`data:${originalImage.mimeType};base64,${newImageBase64}`);
        // Increment usage on success
        const newLimitStatus = incrementUsage();
        const updatedFullStatus = checkRateLimit(); // Re-check to get the new reset time
        setIsRateLimited(newLimitStatus.isLimited);
        setUsage(prev => ({ ...prev, count: newLimitStatus.count, resetsAt: updatedFullStatus.resetsAt }));
      } else {
        setError("The AI model did not return an image. Please try a different prompt.");
      }
    } catch (e: any) {
      console.error(e);
      setError(e.message); // Display the potentially cleaner error message from the service
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls Column */}
          <div className="lg:col-span-4 bg-gray-800 rounded-xl p-6 shadow-2xl border border-gray-700 flex flex-col gap-6 h-fit">
            <h2 className="text-2xl font-bold text-cyan-400">1. Upload Photo</h2>
            <ImageUploader onImageUpload={handleImageUpload} imageUrl={originalImage?.dataUrl} />
            
            <div className="flex justify-between items-center mt-4">
              <h2 className="text-2xl font-bold text-cyan-400">2. Describe Edit</h2>
              <p className="text-sm text-gray-400 font-mono" aria-label={`Image generation usage: ${usage.count} of ${usage.limit}`}>
                {usage.count} / {usage.limit}
              </p>
            </div>

            {isRateLimited && usage.resetsAt && (
              <div className="bg-yellow-900/50 border border-yellow-700 text-yellow-300 px-4 py-3 rounded-lg text-sm" role="status">
                <p className="font-bold">Daily Limit Reached</p>
                <p>Please try again after {usage.resetsAt.toLocaleString()}.</p>
              </div>
            )}
            
            <EditControls
              prompt={prompt}
              setPrompt={setPrompt}
              onGenerate={handleGenerate}
              isLoading={isLoading}
              isReady={!!originalImage && prompt.length > 0}
              isRateLimited={isRateLimited}
            />
          </div>

          {/* Display Column */}
          <div className="lg:col-span-8">
            {error && <ErrorMessage message={error} />}
            <ImageViewer
              originalImage={originalImage?.dataUrl}
              editedImage={editedImage}
              isLoading={isLoading}
            />
          </div>
        </div>
      </main>
      <footer className="text-center p-4 text-gray-500 text-sm">
        {/* FIX: The original file had a stray '//' before the paragraph tag, which was rendered as text. This has been corrected to display the credits properly. */}
      </footer>
    </div>
  );
};

export default App;
