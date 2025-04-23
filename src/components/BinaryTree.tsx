import React from 'react';
import { HuffmanNode } from '../utils/HuffmanCoding';
import TreeNode from './TreeNode';

interface BinaryTreeProps {
  root: HuffmanNode | null;
}

const BinaryTree: React.FC<BinaryTreeProps> = ({ root }) => {
  const svgWidth = 900;
  const svgHeight = 500;
  const levelHeight = 80;
  
  // Get tree height for spacing calculations
  const getTreeHeight = (node: HuffmanNode | null): number => {
    if (!node) return 0;
    return 1 + Math.max(
      getTreeHeight(node.left),
      getTreeHeight(node.right)
    );
  };
  
  const treeHeight = getTreeHeight(root);
  
  // Render node and its children recursively
  const renderTree = (
    node: HuffmanNode | null, 
    x: number, 
    y: number, 
    level: number = 0,
    isLeft: boolean = false,
    parentX?: number,
    parentY?: number
  ): React.ReactNode => {
    if (!node) return null;
    
    // Calculate width for this level (narrower as we go deeper)
    const levelWidth = svgWidth / Math.pow(2, level + 1);
    
    // Calculate positions for children
    const leftX = x - levelWidth / 2;
    const rightX = x + levelWidth / 2;
    const childY = y + levelHeight;
    
    return (
      <>
        <TreeNode
          node={node}
          x={x}
          y={y}
          isRoot={level === 0}
          isLeft={isLeft}
          parentX={parentX}
          parentY={parentY}
        />
        
        {node.left && renderTree(
          node.left, 
          leftX, 
          childY, 
          level + 1, 
          true, 
          x, 
          y
        )}
        
        {node.right && renderTree(
          node.right, 
          rightX, 
          childY, 
          level + 1, 
          false, 
          x, 
          y
        )}
      </>
    );
  };
  
  return (
    <div className="w-full overflow-auto border border-gray-200 rounded-lg bg-white">
      <svg 
        width={svgWidth} 
        height={Math.max(svgHeight, treeHeight * levelHeight + 100)}
        className="mx-auto"
      >
        <g transform={`translate(0, 50)`}>
          {root 
            ? renderTree(root, svgWidth / 2, 50)
            : (
              <text 
                x={svgWidth / 2} 
                y={svgHeight / 2} 
                textAnchor="middle" 
                className="fill-gray-500 text-lg"
              >
                Enter text to generate Huffman tree
              </text>
            )
          }
        </g>
      </svg>
    </div>
  );
};

export default BinaryTree;