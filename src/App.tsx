import React, { useState, useEffect } from 'react';
import { 
  calculateFrequency, 
  buildHuffmanTree, 
  generateCodes, 
  encodeText, 
  decodeText, 
  calculateBitSavings,
  prepareEncodingData,
  HuffmanNode
} from './utils/HuffmanCoding';
import BinaryTree from './components/BinaryTree';
import EncodingTable from './components/EncodingTable';
import ExplanationCard from './components/ExplanationCard';
import BitSavingsDisplay from './components/BitSavingsDisplay';
import TextEncoder from './components/TextEncoder';
import { BookOpen } from 'lucide-react';

function App() {
  const [inputText, setInputText] = useState('');
  const [huffmanTree, setHuffmanTree] = useState<HuffmanNode | null>(null);
  const [encodingData, setEncodingData] = useState<any[]>([]);
  const [encodedText, setEncodedText] = useState('');
  const [decodedText, setDecodedText] = useState('');
  const [bitSavings, setBitSavings] = useState({ 
    original: 0, 
    encoded: 0, 
    savings: 0, 
    percentage: 0 
  });
  
  // Process text and generate Huffman coding
  useEffect(() => {
    if (inputText.trim()) {
      // Calculate character frequencies
      const frequency = calculateFrequency(inputText);
      
      // Build the Huffman tree
      const tree = buildHuffmanTree(frequency);
      setHuffmanTree(tree);
      
      // Generate Huffman codes
      const codes = generateCodes(tree);
      
      // Encode the input text
      const encoded = encodeText(inputText, codes);
      setEncodedText(encoded);
      
      // Decode the encoded text
      const decoded = decodeText(encoded, tree);
      setDecodedText(decoded);
      
      // Calculate bit savings
      setBitSavings(calculateBitSavings(inputText, encoded));
      
      // Prepare data for encoding table
      setEncodingData(prepareEncodingData(frequency, codes));
    } else {
      // Reset everything if input is empty
      setHuffmanTree(null);
      setEncodingData([]);
      setEncodedText('');
      setDecodedText('');
      setBitSavings({ original: 0, encoded: 0, savings: 0, percentage: 0 });
    }
  }, [inputText]);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
      <header className="bg-indigo-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <BookOpen size={24} />
            <h1 className="text-2xl font-bold">Huffman Coding Visualizer</h1>
          </div>
          <p className="mt-1 text-indigo-100">
            A visual demonstration of the Huffman coding algorithm
          </p>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <ExplanationCard title="What is Huffman Coding?">
            <p className="mb-2">
              Huffman coding is a lossless data compression algorithm that uses variable-length codes to represent characters based on their frequency of occurrence.
            </p>
            <p className="mb-2">
              The algorithm assigns shorter bit sequences to frequently occurring characters and longer sequences to less frequent ones, resulting in efficient data compression.
            </p>
            <p>
              This is a <strong>greedy algorithm</strong> that builds an optimal prefix code based on character frequencies.
            </p>
          </ExplanationCard>
        </div>
        
        <div className="mb-6">
          <label htmlFor="input-text" className="block text-sm font-medium text-gray-700 mb-1">
            Enter text to encode:
          </label>
          <textarea
            id="input-text"
            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type or paste text here to generate Huffman codes..."
          />
        </div>
        
        {inputText.trim() ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <TextEncoder 
                originalText={inputText} 
                encodedText={encodedText} 
                decodedText={decodedText} 
              />
              
              <BitSavingsDisplay 
                original={bitSavings.original}
                encoded={bitSavings.encoded}
                savings={bitSavings.savings}
                percentage={bitSavings.percentage}
              />
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Huffman Tree Visualization
              </h2>
              <ExplanationCard title="How to Read the Tree">
                <p className="mb-2">
                  The Huffman tree is built bottom-up by repeatedly combining the two nodes with the lowest frequencies.
                </p>
                <ul className="list-disc pl-5 mb-2">
                  <li>Purple node: Root of the tree</li>
                  <li>Blue nodes: Internal nodes showing combined frequencies</li>
                  <li>Green nodes: Leaf nodes representing individual characters</li>
                  <li>Left edges (0): Represented by dashed lines</li>
                  <li>Right edges (1): Represented by solid lines</li>
                </ul>
                <p>
                  To find a character's code, traverse from the root to the leaf, recording 0 for left turns and 1 for right turns.
                </p>
              </ExplanationCard>
              <div className="mt-4">
                <BinaryTree root={huffmanTree} />
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Character Encoding Table
              </h2>
              <ExplanationCard title="Understanding the Encoding Process">
                <p>
                  The table below shows how each character is encoded. Characters with higher frequencies are assigned shorter codes, which leads to an efficient compression. The algorithm guarantees that no code is a prefix of another code, ensuring unambiguous decoding.
                </p>
              </ExplanationCard>
              <div className="mt-4">
                <EncodingTable encodingData={encodingData} />
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                The Huffman Algorithm
              </h2>
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <ol className="list-decimal pl-5 space-y-4">
                  <li className="text-gray-800">
                    <strong>Calculate frequencies</strong>: Count how often each character appears in the input text.
                  </li>
                  <li className="text-gray-800">
                    <strong>Create leaf nodes</strong>: For each character, create a node containing the character and its frequency.
                  </li>
                  <li className="text-gray-800">
                    <strong>Build the tree</strong>: 
                    <ul className="list-disc pl-5 mt-2 space-y-2">
                      <li>Take the two nodes with the lowest frequencies.</li>
                      <li>Create a new internal node with these two as children.</li>
                      <li>Assign the sum of the children's frequencies to the new node.</li>
                      <li>Replace the two nodes with the new node in the list.</li>
                      <li>Repeat until only one node remains (the root).</li>
                    </ul>
                  </li>
                  <li className="text-gray-800">
                    <strong>Generate codes</strong>: Traverse the tree, assigning 0 to each left branch and 1 to each right branch.
                  </li>
                  <li className="text-gray-800">
                    <strong>Encode the text</strong>: Replace each character with its corresponding code.
                  </li>
                </ol>
                
                <div className="mt-6 bg-indigo-50 p-4 rounded">
                  <h3 className="font-semibold text-indigo-800 mb-2">Why is this a Greedy Algorithm?</h3>
                  <p className="text-gray-800">
                    Huffman coding is considered a greedy algorithm because at each step, it makes the locally optimal choice (combining the two nodes with the lowest frequencies) without considering the global picture. This local optimization strategy leads to a globally optimal solution for the prefix coding problem.
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Enter some text to see Huffman coding in action
            </h2>
            <p className="text-gray-600">
              The visualization will update automatically as you type or paste text.
            </p>
          </div>
        )}
      </main>
      
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>Huffman Coding Visualizer - An educational tool for understanding the Huffman algorithm</p>
        </div>
      </footer>
    </div>
  );
}

export default App;