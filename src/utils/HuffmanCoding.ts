export interface HuffmanNode {
  char: string;
  freq: number;
  left: HuffmanNode | null;
  right: HuffmanNode | null;
  code?: string;
}

export interface FrequencyData {
  [key: string]: number;
}

export interface EncodingData {
  char: string;
  freq: number;
  code: string;
  bits: number;
}

// Calculate frequency of each character in the input string
export const calculateFrequency = (text: string): FrequencyData => {
  const frequency: FrequencyData = {};
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    frequency[char] = (frequency[char] || 0) + 1;
  }
  
  return frequency;
};

// Build the Huffman tree from character frequencies
export const buildHuffmanTree = (frequency: FrequencyData): HuffmanNode | null => {
  if (Object.keys(frequency).length === 0) return null;
  
  // Create leaf nodes for each character
  const nodes: HuffmanNode[] = Object.entries(frequency).map(([char, freq]) => ({
    char,
    freq,
    left: null,
    right: null
  }));
  
  // If there's only one unique character
  if (nodes.length === 1) {
    const node = nodes[0];
    return {
      char: '',
      freq: node.freq,
      left: node,
      right: null
    };
  }
  
  // Build the tree by combining nodes
  while (nodes.length > 1) {
    // Sort by frequency (ascending)
    nodes.sort((a, b) => a.freq - b.freq);
    
    // Take the two nodes with lowest frequencies
    const left = nodes.shift()!;
    const right = nodes.shift()!;
    
    // Create a new internal node with these two as children
    const newNode: HuffmanNode = {
      char: '',
      freq: left.freq + right.freq,
      left,
      right
    };
    
    // Add the new node back to the list
    nodes.push(newNode);
  }
  
  // The last remaining node is the root
  return nodes[0];
};

// Generate Huffman codes for each character
export const generateCodes = (
  node: HuffmanNode | null, 
  currentCode: string = '',
  codes: Map<string, string> = new Map()
): Map<string, string> => {
  if (!node) return codes;
  
  // If this is a leaf node (has a character)
  if (node.char && node.freq > 0) {
    codes.set(node.char, currentCode || '0'); // Default to '0' for single character inputs
    node.code = currentCode || '0';
  }
  
  // Traverse left (add 0)
  if (node.left) {
    generateCodes(node.left, currentCode + '0', codes);
  }
  
  // Traverse right (add 1)
  if (node.right) {
    generateCodes(node.right, currentCode + '1', codes);
  }
  
  return codes;
};

// Encode text using the generated Huffman codes
export const encodeText = (text: string, codes: Map<string, string>): string => {
  let encodedText = '';
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    encodedText += codes.get(char) || '';
  }
  
  return encodedText;
};

// Decode the encoded text using the Huffman tree
export const decodeText = (encodedText: string, root: HuffmanNode | null): string => {
  if (!root) return '';
  if (encodedText.length === 0) return '';
  
  let decodedText = '';
  let currentNode = root;
  
  // Special case for a tree with a single node
  if (!root.left && !root.right && root.char) {
    return root.char.repeat(encodedText.length);
  }
  
  for (let i = 0; i < encodedText.length; i++) {
    const bit = encodedText[i];
    
    if (bit === '0') {
      currentNode = currentNode.left!;
    } else if (bit === '1') {
      currentNode = currentNode.right!;
    }
    
    // If we reached a leaf node
    if (currentNode.char && !currentNode.left && !currentNode.right) {
      decodedText += currentNode.char;
      currentNode = root; // Reset to the root for the next character
    }
  }
  
  return decodedText;
};

// Calculate the bit savings
export const calculateBitSavings = (
  originalText: string,
  encodedText: string
): { original: number; encoded: number; savings: number; percentage: number } => {
  // Original text in ASCII is 8 bits per character
  const originalBits = originalText.length * 8;
  const encodedBits = encodedText.length;
  
  const bitsSaved = originalBits - encodedBits;
  const percentage = (bitsSaved / originalBits) * 100;
  
  return {
    original: originalBits,
    encoded: encodedBits,
    savings: bitsSaved,
    percentage: Math.round(percentage * 100) / 100
  };
};

// Prepare encoding data for display
export const prepareEncodingData = (
  frequency: FrequencyData,
  codes: Map<string, string>
): EncodingData[] => {
  return Object.entries(frequency).map(([char, freq]) => {
    const code = codes.get(char) || '';
    return {
      char,
      freq,
      code,
      bits: code.length * freq
    };
  }).sort((a, b) => b.freq - a.freq);
};