import React from 'react';

interface ErrorMessageProps {
  error: string;
}

function ErrorMessage({ error }: ErrorMessageProps) {
  return (
    <div>
      <p className="text-center text-red-400">{error}</p>
    </div>
  );
}

export default ErrorMessage;
