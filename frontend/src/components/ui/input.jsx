import React from 'react';

export function Input({ className, ...props }) {
  return (
    <input
      className={`px-4 py-2 bg-[#2a2f45] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    />
  );
} 