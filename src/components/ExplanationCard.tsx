import React from 'react';

interface ExplanationCardProps {
  title: string;
  children: React.ReactNode;
}

const ExplanationCard: React.FC<ExplanationCardProps> = ({ title, children }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      <div className="bg-indigo-600 px-4 py-2">
        <h3 className="text-lg font-medium text-white">{title}</h3>
      </div>
      <div className="p-4 text-gray-700 text-sm leading-relaxed">
        {children}
      </div>
    </div>
  );
};

export default ExplanationCard;