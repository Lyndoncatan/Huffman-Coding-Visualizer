This application is built using TypeScript and React, with Tailwind CSS for styling. Here are the key features and functions:

Core Algorithm Implementation:
Character frequency calculation
Huffman tree construction
Binary code generation
Text encoding and decoding
Compression ratio calculation
Interactive Components:
Text input area for entering content to encode
Real-time visualization of the Huffman binary tree
Dynamic encoding table showing character frequencies and codes
Bit savings display showing compression statistics
Copy-to-clipboard functionality for encoded binary
Visual Elements:
Color-coded tree nodes (purple for root, blue for internal nodes, green for leaf nodes)
Interactive binary tree visualization with labeled edges (0 for left, 1 for right)
Progress bar showing compression percentage
Validation indicators for successful encoding/decoding
Key Functions:
calculateFrequency(): Counts occurrence of each character in input text


const frequency = calculateFrequency("hello"); 
// Returns: { h: 1, e: 1, l: 2, o: 1 }
buildHuffmanTree(): Creates binary tree based on character frequencies

Combines lowest frequency nodes
Builds tree bottom-up
Assigns weights to internal nodes
generateCodes(): Creates binary codes for each character

Traverses tree from root to leaves
Assigns 0 for left branches, 1 for right
Ensures prefix-free codes
encodeText(): Converts input text to binary using generated codes


const encoded = encode
decodeText(): Converts binary back to original text using tree

Traverses tree following binary path
Reconstructs original characters
calculateBitSavings(): Compares original vs compressed sizes

Original: 8 bits per character (ASCII)
Compressed: Variable-length Huffman codes
Shows percentage saved
The app demonstrates the greedy nature of Huffman coding by:

Always combining lowest frequency nodes first
Assigning shorter codes to frequent characters
Building an optimal prefix code tree
Achieving efficient compression without loss of data
All components update in real-time as the user types, providing immediate visual feedback about the compression process.
