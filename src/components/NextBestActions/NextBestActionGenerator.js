import React, { useState } from 'react';
import { generateNextBestActions } from '../../services/aiService';

const NextBestActionGenerator = ({ objectType, objectId }) => {
  const [actions, setActions] = useState([]);
  const [prompt, setPrompt] = useState('');

  const handleGenerateActions = async () => {
    const generatedActions = await generateNextBestActions(objectType, objectId, prompt);
    setActions(generatedActions);
  };

  return (
    <div>
      <h3>Next Best Actions</h3>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter a prompt for AI suggestions"
      />
      <button onClick={handleGenerateActions}>Generate Actions</button>
      <ul>
        {actions.map((action, index) => (
          <li key={index}>{action}</li>
        ))}
      </ul>
    </div>
  );
};

export default NextBestActionGenerator;