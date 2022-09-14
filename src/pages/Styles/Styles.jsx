import React from 'react';
import { useState } from 'react';

const Styles = () => {
  const [text, setText] = useState('');

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const addText = (originalText) => {
    if (text !== '') return text;
    else return originalText;
  };

  return (
    <div>
      <input type="text" onChange={handleChange} value={text} />
      <button
        onClick={() => {
          setText('');
        }}
      >
        R
      </button>
      <div>
        <h3>Botones</h3>
        <button className="btn primary">{addText('btn primary')}</button>
        <button className="btn secondary">{addText('btn secondary')}</button>
        <button className="btn animate">{addText('btn animate')}</button>
      </div>
      <div>
        <h3>Fonts</h3>
      </div>
    </div>
  );
};

export default Styles;
