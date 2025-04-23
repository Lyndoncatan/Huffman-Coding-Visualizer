import React from 'react';
import { EncodingData } from '../utils/HuffmanCoding';

interface EncodingTableProps {
  encodingData: EncodingData[];
}

const EncodingTable: React.FC<EncodingTableProps> = ({ encodingData }) => {
  const totalFreq = encodingData.reduce((sum, entry) => sum + entry.freq, 0);
  const totalBits = encodingData.reduce((sum, entry) => sum + entry.bits, 0);
  
  return (
    <div className="w-full overflow-auto border border-gray-200 rounded-lg bg-white">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Character
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Frequency
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Huffman Code
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Code Length
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total Bits
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {encodingData.map((entry, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-sm font-medium text-gray-900">
                  {entry.char === ' ' ? 'Space' : 
                   entry.char === '\n' ? '\\n' : 
                   entry.char === '\t' ? '\\t' : 
                   entry.char}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-sm text-gray-500">
                  {entry.freq} ({(entry.freq / totalFreq * 100).toFixed(1)}%)
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="font-mono text-sm text-blue-600">
                  {entry.code}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {entry.code.length}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {entry.bits} ({(entry.bits / totalBits * 100).toFixed(1)}%)
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="bg-gray-50">
          <tr>
            <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total
            </td>
            <td className="px-6 py-3 text-left text-xs font-medium text-gray-500">
              {totalFreq}
            </td>
            <td className="px-6 py-3"></td>
            <td className="px-6 py-3"></td>
            <td className="px-6 py-3 text-left text-xs font-medium text-gray-500">
              {totalBits} bits
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default EncodingTable;