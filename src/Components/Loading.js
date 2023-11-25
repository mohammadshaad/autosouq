// src/components/Loading.js

import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-black">
      <div className="animate-spin rounded-full border-t-4 border-lightOrange border-opacity-25 border-b-4 h-16 w-16"></div>
    </div>
  );
};

export default Loading;
