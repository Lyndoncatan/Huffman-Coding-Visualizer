import React from 'react';
import { HuffmanNode } from '../utils/HuffmanCoding';

interface TreeNodeProps {
  node: HuffmanNode;
  x: number;
  y: number;
  isRoot?: boolean;
  isLeft?: boolean;
  parentX?: number;
  parentY?: number;
}

const TreeNode: React.FC<TreeNodeProps> = ({ 
  node, 
  x, 
  y, 
  isRoot = false, 
  isLeft = false, 
  parentX, 
  parentY 
}) => {
  const nodeRadius = 25;
  const isLeaf = !node.left && !node.right;
  
  // Color based on node type
  const fillColor = isLeaf 
    ? 'fill-emerald-500' 
    : isRoot 
      ? 'fill-indigo-600' 
      : 'fill-blue-500';
  
  const strokeColor = isLeaf 
    ? 'stroke-emerald-600' 
    : isRoot 
      ? 'stroke-indigo-700' 
      : 'stroke-blue-600';
  
  // Render connecting line to parent if this is not the root
  const renderLine = () => {
    if (!isRoot && parentX !== undefined && parentY !== undefined) {
      return (
        <line
          x1={parentX}
          y1={parentY}
          x2={x}
          y2={y}
          className={`stroke-gray-400 ${isLeft ? 'stroke-dashed' : 'stroke-solid'}`}
          strokeWidth="2"
        />
      );
    }
    return null;
  };

  // Determine what to display in the node
  const displayText = isLeaf 
    ? node.char === ' ' 
      ? 'Space' 
      : node.char === '\n' 
        ? '\\n' 
        : node.char === '\t' 
          ? '\\t' 
          : node.char
    : node.freq.toString();

  return (
    <>
      {renderLine()}
      
      {/* Node circle */}
      <circle
        cx={x}
        cy={y}
        r={nodeRadius}
        className={`${fillColor} ${strokeColor} stroke-2 transition-all duration-300`}
      />
      
      {/* Node text */}
      <text
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="middle"
        className="fill-white text-xs font-semibold"
      >
        {displayText}
      </text>
      
      {/* Frequency for leaf nodes */}
      {isLeaf && (
        <text
          x={x}
          y={y + nodeRadius + 15}
          textAnchor="middle"
          className="fill-gray-700 text-xs"
        >
          Freq: {node.freq}
        </text>
      )}
      
      {/* Code for leaf nodes */}
      {isLeaf && node.code && (
        <text
          x={x}
          y={y + nodeRadius + 30}
          textAnchor="middle"
          className="fill-indigo-700 text-xs font-medium"
        >
          Code: {node.code}
        </text>
      )}
      
      {/* Edge labels (0 for left, 1 for right) */}
      {!isRoot && parentX !== undefined && parentY !== undefined && (
        <text
          x={(x + parentX) / 2}
          y={(y + parentY) / 2 - 10}
          textAnchor="middle"
          className="fill-gray-700 text-xs font-bold"
        >
          {isLeft ? '0' : '1'}
        </text>
      )}
    </>
  );
};

export default TreeNode;