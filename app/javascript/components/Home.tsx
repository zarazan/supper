import React from 'react';

function Home(): React.ReactElement {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-3xl font-bold mb-8">What should I have for supper?</h2>
      <button 
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
        onClick={() => alert("Placeholder")}
      >
        I'm feeling lucky
      </button>
    </div>
  );
}

export default Home;
