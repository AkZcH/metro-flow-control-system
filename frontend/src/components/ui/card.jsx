import React from 'react';

export function Card({ className, ...props }) {
  return (
    <div
      className={`bg-[#1e2130] rounded-xl shadow-lg ${className}`}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }) {
  return (
    <div
      className={`${className}`}
      {...props}
    />
  );
} 