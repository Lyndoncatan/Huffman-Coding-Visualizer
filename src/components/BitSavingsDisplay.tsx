import React from 'react';

interface BitSavingsProps {
  original: number;
  encoded: number;
  savings: number;
  percentage: number;
}

const BitSavingsDisplay: React.FC<BitSavingsProps> = ({ 
  original, 
  encoded, 
  savings, 
  percentage 
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Compression Results</h3>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-50 p-3 rounded">
          <p className="text-sm text-gray-500">Original Size</p>
          <p className="text-xl font-bold text-gray-800">{original} bits</p>
          <p className="text-xs text-gray-500">({Math.ceil(original / 8)} bytes)</p>
        </div>
        
        <div className="bg-gray-50 p-3 rounded">
          <p className="text-sm text-gray-500">Compressed Size</p>
          <p className="text-xl font-bold text-blue-600">{encoded} bits</p>
          <p className="text-xs text-gray-500">({Math.ceil(encoded / 8)} bytes)</p>
        </div>
      </div>
      
      <div className="bg-indigo-50 p-3 rounded mb-4">
        <div className="flex justify-between items-center">
          <p className="text-sm font-medium text-indigo-800">Space Saved</p>
          <p className="text-lg font-bold text-indigo-700">{savings} bits</p>
        </div>
        
        <div className="mt-2 bg-gray-200 rounded-full h-2.5 overflow-hidden">
          <div 
            className="h-full bg-indigo-600 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        
        <p className="text-right mt-1 text-sm font-medium text-indigo-800">
          {percentage}% reduction
        </p>
      </div>
      
      <p className="text-sm text-gray-600 italic">
        Note: Actual file savings would be slightly less due to overhead for storing the Huffman tree.
      </p>
    </div>
  );
};

export default BitSavingsDisplay;