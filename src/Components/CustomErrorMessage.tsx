import React from 'react';

interface ErrorMessageProps {
  error: string;
}

function CustomErrorMessage({ error }: ErrorMessageProps) {
  return (
    <div>
      <p className="text-center text-red-400">{error}</p>
    </div>
  );
}

export default CustomErrorMessage;
