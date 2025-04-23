import React, { useState, useEffect } from 'react';
import { CopyCheck, Copy } from 'lucide-react';

interface TextEncoderProps {
  originalText: string;
  encodedText: string;
  decodedText: string;
}

const TextEncoder: React.FC<TextEncoderProps> = ({ 
  originalText, 
  encodedText, 
  decodedText 
}) => {
  const [copied, setCopied] = useState(false);
  
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(encodedText);
      setCopied(true);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Encoding Results</h3>
      
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <h4 className="text-sm font-medium text-gray-700">Original Text</h4>
          <span className="text-xs text-gray-500">{originalText.length} characters</span>
        </div>
        <div className="border border-gray-300 bg-gray-50 rounded p-2 text-gray-800 font-mono text-sm h-20 overflow-auto">
          {originalText || <span className="text-gray-400 italic">Enter text to encode</span>}
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <h4 className="text-sm font-medium text-gray-700">Encoded Binary</h4>
          <button 
            onClick={handleCopy}
            disabled={!encodedText}
            className="flex items-center space-x-1 text-xs text-indigo-600 hover:text-indigo-800 disabled:text-gray-400"
          >
            {copied ? (
              <>
                <CopyCheck size={14} />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
        <div className="border border-gray-300 bg-gray-50 rounded p-2 text-blue-600 font-mono text-sm h-20 overflow-auto break-all">
          {encodedText || <span className="text-gray-400 italic">No encoded text yet</span>}
        </div>
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-1">
          <h4 className="text-sm font-medium text-gray-700">Decoded Text</h4>
          <span className="text-xs text-gray-500">{decodedText.length} characters</span>
        </div>
        <div className="border border-gray-300 bg-gray-50 rounded p-2 text-green-600 font-mono text-sm h-20 overflow-auto">
          {decodedText || <span className="text-gray-400 italic">No decoded text yet</span>}
        </div>
        {originalText && decodedText && originalText === decodedText ? (
          <p className="text-sm text-green-600 mt-1 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Perfect match! The decoded text matches the original input.
          </p>
        ) : originalText && decodedText ? (
          <p className="text-sm text-red-600 mt-1 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Error: The decoded text does not match the original input.
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default TextEncoder;